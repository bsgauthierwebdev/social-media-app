const router = require('express').Router()

// Build test route for Users routing
router.get('/', (req, res) => {
    res.send('This is the userRoutes function working properly.')
})

module.exports = router