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

// Update User

router.put('/:id', async (req, res) => {
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

// router.put('/:id', async (req, res) => {
//     try {
//         const {id} = req.params
//         const {username} = req.body
//         const updateUser = await db.query(
//             "UPDATE users SET username = $1 WHERE user_id = $2",
//             [username, id]
//         )
//         const user = await db.query('SELECT * FROM users WHERE user_id = $1', [id])
//         return res.status(200).json(user.rows[0])
//     } catch (err) {
//         return res.status(400).json(err.message)
//     }
// })

// Delete User

module.exports = router