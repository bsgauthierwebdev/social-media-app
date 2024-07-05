const router = require('express').Router()
const pool = require('../db')

// Test route
// router.get('/', (req, res) => {
//     res.send('This is the auth router working properly.')
// })

// REGISTER
router.post('/register', async(req, res) => {
    try {
        const {username, email, password} = req.body
        // const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])

        // if (user.rows.length !== 0) {
        //     return res.status(401).send('User is already registered.')
        // }

        const newUser = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
            [username, email, password]
        )

        res.status(201).json(newUser)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})

module.exports = router