const router = require('express').Router()
const db = require('../db')
const bcrypt = require('bcryptjs')

// Build test route for Users routing
// router.get('/', (req, res) => {
//     res.send('This is the userRoutes function working properly.')
// })

// Get All Users Route
router.get('/', async (req, res) => {
    try {
        const users = await db.query(
            'SELECT * FROM users ORDER BY user_id ASC'
        )

        users.rows.forEach(user => {
            delete user.password
        })

        return res.status(200).json({
            success: true,
            users: users.rows
        })
    } catch (err) {
        return res.status(500).json(err.message)
    }
})


// router.get('/', async (req, res) => {
//     try {
//         const {rows} = await db.query('SELECT * FROM users ORDER BY user_id ASC')

//         return res.status(200).json({
//             success: true,
//             users: rows
//         })
//     } catch (err) {
//         console.log(err.message)
//     }
// })

// Get a User
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const user = await db.query(
            'SELECT * FROM users WHERE user_id = $1',
            [id]
        )

        const {password, created_at, updated_at, ...safeData} = user.rows[0]

        res.status(200).json(safeData)
    } catch (err) {
        console.log(err.message)
    }
})

// Follow a User
router.put('/:id/follow', async (req, res) => {
    const {id} = req.params
    const {userId} = req.body
    if (userId !== id) {
        try {
            const user = await db.query(
                'SELECT * FROM users WHERE user_id = $1',
                [id]
            )
            const currentUser = await db.query(
                'SELECT * FROM users WHERE user_id = $1',
                [userId]
            )

            if (!currentUser.rows[0].users_following.includes(id)) {
                await db.query(
                    'UPDATE users SET users_following = array_append(users_following, $1) WHERE user_id = $2',
                    [id, userId]
                )
                const currentUserFollowing = await db.query(
                    'SELECT user_id, users_following FROM users WHERE user_id = $1', [userId]
                )

                return res.status(200).json(currentUserFollowing)
            } else {
                return res.status(403).json('You already follow this account')
            }
        } catch (err) {
            return res.status(500).json(err.message)
        }
    } else {
        res.status(403).json('You cannot follow your own account')
    }
})

// Unfollow a User
router.put('/:id/unfollow', async (req, res) => {
    const {id} = req.params
    const {userId} = req.body
    if (userId !== id) {
        try {
            const user = await db.query(
                'SELECT * FROM users WHERE user_id = $1', [id]
            )
            const currentUser = await db.query(
                'SELECT * FROM users WHERE user_id = $1', [userId]
            )

            if (currentUser.rows[0].users_following.includes(id)) {
                await db.query(
                    'UPDATE users SET users_following = array_remove(users_following, $1) WHERE user_id = $2',
                    [id, userId]
                )
                const currentUserFollowing = await db.query(
                    'SELECT user_id, users_following FROM users WHERE user_id = $1', [userId]
                )

                return res.status(200).json(currentUserFollowing)
            } else {
                return res.status(403).json('You are not following this account')
            }
        } catch (err) {
            return res.status(500).json(err.message)
        }
    } else {
        res.status(403).json('You cannot unfollow your own account')
    }
})

// Update Admin Status

router.put('/admin/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {is_admin, userId} = req.body

        // console.log(userId, id)
        // console.log(userId === id)

        // Check if user us administrator
        const isAdmin = await db.query('SELECT is_admin FROM users WHERE user_id = $1', [userId])
        // console.log(isAdmin.rows[0].is_admin)

        if (isAdmin.rows[0].isAdmin === false) {
            return res.status(404).json('You do not have permission to update this information')
        } else if (userId === id) {
            return res.status(404).json('You cannot update your own administrator status')
        } else if (userId !== id && isAdmin.rows[0].is_admin) {
            const updateAdmin = await db.query(
                'UPDATE users SET is_admin = $1 WHERE user_id = $2', [is_admin, id]
            )
            const updatedUser = await db.query('SELECT * FROM users WHERE user_id = $1', [id])

            return res.status(200).json(updatedUser.rows[0])
        } else {
            return res.status(404).json('You are not allowed to update another user')
        }
    } catch (err) {
        return res.status(500).json(err.message)
    }
})

// Update User Info

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {
            username, 
            email, 
            password, 
            profile_img, 
            cover_img, 
            users_followed, 
            users_following, 
            // is_admin, 
            about, 
            city, 
            birthplace, 
            relationship, 
            userId} = req.body
        // Check if user is an Admin
        const isAdmin = await db.query('SELECT is_admin FROM users WHERE user_id = $1', [userId])

        // Check req.body
        // console.log(req.body)
        // console.log(userId === id)

        // Confirm user is updating their account OR user is Administrator

        if (userId === id || isAdmin.rows[0].is_admin) {
            // Update username
            if (req.body.username) {
                try {
                    const updateUsername = await db.query(
                        'UPDATE users SET username = $1 WHERE user_id = $2', [username, id]
                    )
                    const user = await db.query('SELECT * FROM users WHERE user_id = $1', [id])
                    return res.status(201).json(user.rows[0])    
                } catch (err) {
                    return res.status(500).json(err.message)
                }
                
            }

            // Update email address
            else if (req.body.email) {
                try {
                    const updateEmail = await db.query(
                        'UPDATE users SET email = $1 WHERE user_id = $2', [email, id]
                    )
                    const user = await db.query('SELECT * FROM users WHERE user_id = $1', [id])
                    return res.status(201).json(user.rows[0])    
                } catch (err) {
                    return res.status(500).json(err.message)
                }
                
            }

            // Update Password
            else if (req.body.password) {
                try {
                    const hashedPassword = await bcrypt.hash(password, 10)

                    const newPassword = await db.query(
                        'UPDATE users SET password = $1 WHERE user_id = $2', [hashedPassword, id]
                    )

                    const updatedUser = await db.query(
                        'SELECT * FROM users WHERE user_id = $1', [id]
                    )

                    return res.status(201).json(updatedUser.rows[0])    
                } catch (err) {
                    return res.status(500).json(err.message)
                }
                
            }

            // Update Profile Image
            else if (req.body.profile_img) {
                try {
                    const updateProfileImg = await db.query(
                        'UPDATE users SET profile_img = $1 WHERE user_id = $2', [profile_img, id]
                    )
                    const user = await db.query('SELECT * FROM users WHERE user_id = $1', [id])
                    return res.status(201).json(user.rows[0])    
                } catch (err) {
                    return res.status(500).json(err.message)
                }
                
            }

            // Update Cover Image
            else if (req.body.cover_img) {
                try {
                    const updateCoverImg = await db.query(
                        'UPDATE users SET cover_img = $1 WHERE user_id = $2', [cover_img, id]
                    )
                    const user = await db.query('SELECT * FROM users WHERE user_id = $1', [id])
                    return res.status(201).json(user.rows[0])    
                } catch (err) {
                    return res.status(500).json(err.message)
                }
                
            }

            // Update Users Followed

            // Update Users Following

            // Update About
            if (req.body.about) {
                const updateAbout = await db.query(
                    'UPDATE users SET about = $1 WHERE user_id = $2', [about, id]
                )
                const user = await db.query('SELECT * FROM users WHERE user_id = $1', [id])
                return res.status(201).json(user.rows[0])
            }

            // Update City

            // Update Birthplace

            // Update Relationship
        }
        else {
            return res.status(400).json("You cannot update another user's account")
        }
    } catch (err) {
        return res.status(500).json(err.message)
    }
})

// Delete a User
router.delete('/:id', async (req, res) => {
    try {
        // Deconstruct the request
        const {id} = req.params
        const {userId} = req.body

        // Check if account exists
        const validAccount = await db.query(
            'SELECT * FROM users WHERE user_id = $1', [id]
        )
        if (validAccount.rows[0]) {
            // Check if user is administrator
            const isAdmin = await db.query(
                'SELECT is_admin FROM users WHERE user_id = $1', [userId]
            )
            // Check if user is allowed to alter account
            if (userId === id || isAdmin.rows[0].is_admin) {
                try {
                    const deleteUser = await db.query(
                        'DELETE FROM users WHERE user_id = $1', [id]
                    )
                    return res.status(200).json('User has been deleted')
                } catch (err) {
                    return res.status(500).json(err.message)
                }
            } else {
                return res.status(404).json("You do not have permission to update this account")
            }
        } else {
            return res.status(404).json('Account not found')
        }
    } catch (err) {
        return res.status(500).json(err.message)
    }
})



module.exports = router