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
        const {rows} = await db.query('SELECT * FROM users ORDER BY user_id ASC')

        return res.status(200).json({
            success: true,
            users: rows
        })
    } catch (err) {
        console.log(err.message)
    }
})

// Get a User
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const user = await db.query(
            'SELECT * FROM users WHERE user_id = $1',
            [id]
        )

        res.status(200).json(user.rows[0])
    } catch (err) {
        console.log(err.message)
    }
})

// Follow a User

// Unfollow a User

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

            // Update Is Admin
            // if (req.body.is_admin) {
            //     try {
            //         if (isAdmin.rows[0].is_admin) {
            //             const updateIsAdmin = db.query(
            //                 'UPDATE users SET is_admin = true WHERE user_id = $2', [is_admin, id]
            //             )
            //             const updatedUser = db.query(
            //                 'SELECT * WHERE user_id = $1', [id]
            //             )
            //             return res.status(200).json(updatedUser.rows[0])
            //         } else {
            //             return res.status(404).json('User is not an admin')
            //         }
            //     } catch (err) {
            //         return res.status(500).json(err.message)
            //     }
                
            // }

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

// Update Username
router.put('/:id/username', async (req, res) => {
    try {
        const {id} = req.params
        const {username, userId} = req.body
        const isAdmin = await db.query(
            'SELECT is_admin FROM users WHERE user_id = $1', [userId]
        )
        // console.log(isAdmin.rows[0].is_admin)
        
        // console.log(user.rows[0].is_admin)
        // console.log(`Req body = ${userId}, Req params = ${id}`)
        // console.log(userId === id)

        if (userId === id || isAdmin.rows[0].is_admin) {
            const updateUser = await db.query(
                'UPDATE users SET username = $1 WHERE user_id = $2',
                [username, id]
            )
            const user = await db.query(
                'SELECT * FROM users WHERE user_id = $1',
                [id]
            )
            return res.status(200).json(user.rows[0])
        } else {
            return res.status(400).json('You cannot update another user')
        }

    } catch (err) {
        return res.status(500).json(err.message)
    }
})

// Update User Email
router.put('/:id/email', async (req, res) => {
    try {
        const {id} = req.params
        const {email, userId} = req.body
        const isAdmin = await db.query(
            'SELECT is_admin FROM users WHERE user_id = $1', [userId]
        )

        console.log(isAdmin.rows[0].is_admin)

        if (userId === id || isAdmin.rows[0].is_admin) {
            const updateEmain = await db.query(
                'UPDATE users SET email = $1 WHERE user_id = $2', [email, id]
            )
            const user = await db.query(
                'SELECT * FROM users WHERE user_id = $1', [id]
            )
            return res.status(201).json(user.rows[0])
        } else {
            return res.status(400).json('You cannot update another user')
        }
    } catch (err) {
        return res.status(500).json(err.message)
    }
})

module.exports = router