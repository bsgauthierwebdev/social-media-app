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
        const {rows} = await db.query('SELECT * FROM users')

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
        const {username} = req.body
        const updateUser = await db.query(
            "UPDATE users SET username = $1 WHERE user_id = $2",
            [username, id]
        )
        const user = await db.query('SELECT * FROM users WHERE user_id = $1', [id])
        return res.status(200).json(user.rows[0])
    } catch (err) {
        return res.status(400).json(err.message)
    }
})

// Delete User

module.exports = router