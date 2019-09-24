const express = require('express')
const { upload, isLoggedIn } = require('../../middleware/auth')
const User = require('../../models/User')
const Post = require('../../models/Post')
const router = express.Router()


/**
 * Create a post
 * POST /api/posts
 */
router.post('/', (req, res, next) => {
    const postData = { title, content, image } = req.body
    postData.author = req.user._id
    const newPost = new Post(postData)
    return newPost.save()
})

/**
 * Get a specific post
 * GET /api/posts/:id
 */
router.get('/:id', (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) throw new Error()
        res.send(post)
    } catch (e) {
        res.status(404).send()
    }
})

/**
 * Delete a specific post
 * DELETE /api/posts/:id
 */
router.delete(`/:id`, isLoggedIn, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) throw new Error()
        await post.remove()
        res.status(202).send(post)
    } catch (e) {
        res.status(404).send()
    }
})


/**
 * Update a specific post
 * POST /api/posts/:id
 */
router.patch(`/:id`, isLoggedIn, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'location', 'role']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

    try {
        const post = await Post.findById(req.params.id)
        if (!post) throw new Error()
        updates.forEach((update) => post[update] = req.body[update])
        await post.save()
        res.json(post)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router