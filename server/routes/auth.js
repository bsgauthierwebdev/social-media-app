const router = require('express').Router()
const pool = require('../db')
const {hash, compare} = require('bcryptjs')

// Test route
// router.get('/', (req, res) => {
//     res.send('This is the auth router working properly.')
// })

// REGISTER
router.post('/register', async(req, res) => {
    const {username, email, password} = req.body
    try {
        // Hash the password
        // const salt = await bcrypt.genSalt(10)
        const hashedPassword = await hash(password, 10)

        // const user = await pool.query(
        //     'SELECT * FROM users WHERE username = $1 OR email = $2', 
        //     [username, email]
        // )

        // if (user.rows.length !== 0) {
        //     return res.status(401).send('User is already registered.')
        // }

        const newUser = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
            [username, email, hashedPassword]
        )

        res.status(201).json(newUser)
    } catch (err) {
        console.error(err.message)
        res.status(500).json(err)
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