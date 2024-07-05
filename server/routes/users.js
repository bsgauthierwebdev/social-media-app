const router = require('express').Router()
const db = require('../db')

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

module.exports = router