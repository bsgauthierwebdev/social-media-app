const router = require('express').Router()
const pool = require('../db')
const {hash, compare} = require('bcryptjs')

// Test route
// router.get('/', (req, res) => {
//     res.send('This is the auth router working properly.')
// })

// REGISTER
router.post('/register', async (req, res) => {
    const {newUsername, newEmail, newPassword} = req.body

    try {
        // Hash the password
        const salt = await hash(newPassword, 10)
        // console.log(newUsername, newEmail, newPassword, salt)

        // Check database for username and email matches
        const checkUsername = await pool.query(
            'SELECT username, email FROM users WHERE username iLIKE $1', [newUsername]
        )

        const checkEmail = await pool.query(
            'SELECT username, email FROM users WHERE email iLIKE $1', [newEmail]
        )

        if (checkUsername.rows.length) {
            // console.log(checkUsername.rows[0])
            return res.status(400).json('Username already exists')
        }

        else if (checkEmail.rows.length) {
            // console.log(checkEmail.rows[0])
            return res.status(400).json('Email already exists')
        }
        else {
            // Insert new user into the database
            const newUser = await pool.query(
                'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [newUsername, newEmail, salt]
            )
            // console.log(newUser)
            
            // Remove the password from the return
            const {password, ...result} = newUser.rows[0]
            return res.status(201).json({
                message: "New user added successfully",
                user: result
            })
        }

        
    } catch (err) {
        return res.status(500).json(err.message)
    }
})

// LOGIN

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body

        const userQuery = 'SELECT * FROM users WHERE email = $1'
        const userResult = await pool.query(userQuery, [email])

        if (userResult.rows.length === 0) {
            return res.status(404).json('Invalid credentials')
        }

        const user = userResult.rows[0]

        // if (password !== user.password) {
        //     return res.status(404).json('Invalid credentials')
        // }

        const validPassword = await compare(password, user.password)

        // console.log(user)
        // console.log(password, user.password, validPassword)

        if (!validPassword) {
            return res.status(404).json('Invalid credentials')
        }

        

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router