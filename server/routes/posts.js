const router = require('express').Router()
const db = require('../db')

// Test Routing
// router.get('/', async (req, res) => {
//     console.log('Post Page')
// })

// Create a post
router.post('/', async (req, res) => {
    // Destructure the request
    const {userId, content, image_url} = req.body

    try {
        // Add new post
        const newPost = await db.query(
            'INSERT INTO posts (userId, content, image_url) VALUES ($1, $2, $3) RETURNING *',
            [userId, content, image_url]
        )

        return res.status(201).json(newPost.rows[0])
    } catch (err) {
        return res.status(500).json(err.message)
    }
})

// Update a post
router.put('/:id', async (req, res) => {
    // Destructure the request
    const {id} = req.params
    const {userId, content, image_url} = req.body
    
    try {
        // Find the post
        const post = await db.query(
            'SELECT * FROM posts WHERE post_id = $1',
            [id]
        )
        // console.log(post.rows[0].userId)
        // console.log(req.body.userId)
        // console.log(post.rows[0].userId == userId)

        // Check to see if the current user matches the post author
        if (post.rows[0].user_id == userId) {
            
            // Check to see what is being edited
            if (req.body.content) {
                try {
                    const updateContent = await db.query(
                        'UPDATE posts SET content = $1, updated_at = CURRENT_TIMESTAMP WHERE post_id = $2',
                        [content, id]
                    )

                    // Pull updated post
                    const updatedPost = await db.query(
                        'SELECT * FROM posts WHERE post_id = $1',
                        [id]
                    )
                    return res.status(200).json(updatedPost.rows[0])
                } catch (err) {
                    return res.status(500).json(err.message)
                }
            } else if (req.body.image_url) {
                try {
                    const updateImage = await db.query(
                        'UPDATE posts SET image_url = $1, updated_at = CURRENT_TIMESTAMP WHERE post_id = $2',
                        [image_url, id]
                    )

                    // Pull updated post
                    const updatedPost = await db.query(
                        'SELECT * FROM posts WHERE post_id = $1',
                        [id]
                    )
                    return res.status(200).json(updatedPost.rows[0])
                } catch (err) {
                    return res.status(500).json(err.message)
                }
            }
        } else {
            return res.status(404).json("You can't edit another user's posts")
        }
    } catch (err) {
        return res.status(500).json(err.message)
    }
})

// Get timeline posts

// Get a single post
router.get('/:id', async (req, res) => {
    // Destructure the request
    const {id} = req.params
    
    try {
        // Select the post with the matching id
        const post = await db.query(
            'SELECT * FROM posts WHERE post_id = $1',
            [id]
        )

        // Display the post
        return res.status(200).json(post.rows[0])
    } catch (err) {
        return res.status(500).json(err.message)
    }
})

// Like a post

// Delete a post
router.delete('/:id', async (req, res) => {
    // Deconstruct the request
    const {id} = req.params
    const {userId} = req.body

    try {
        // Check if the post is valid
        const validPost = await db.query(
            'SELECT * FROM posts WHERE post_id = $1',
            [id]
        )

        // console.log(validPost.rows)

        if (validPost.rows.length) {
            // Check if current user is an administrator
            const isAdmin = await db.query(
                'SELECT is_admin FROM users WHERE user_id = $1',
                [userId]
            )

            if (userId == validPost.rows[0].user_id || isAdmin.rows[0].is_admin) {
                await db.query(
                    'DELETE from posts WHERE post_id = $1',
                    [id]
                )
                return res.status(200).json('Post has been deleted')
            } else {
                return res.status(404).json('Access denied')
            }
        } else {
            return res.status(404).json('Post not found')
        }
    } catch (err) {
        return res.status(500).json(err.message)
    }
})


module.exports = router