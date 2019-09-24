const express = require('express')
const path = require('path')
const { isLoggedIn } = require('../../middleware/auth')
const { Resize, upload } = require('../../middleware/image')
const User = require('../../models/User')
const Post = require('../../models/Post')
const router = express.Router()


/**
 * Create a post
 * @example POST /api/posts
 */
router.post('/', upload.single('image'), async(req, res, next) => {
    try {
        const imagePath = path.join(__dirname, '/public/images');
        const fileUpload = new Resize(imagePath);
        if (!req.file) res.status(401).json({ error: 'Please provide an image' })

        const filename = await fileUpload.save(req.file.buffer);
        const { title, content, author } = req.body
        const postData = { title, content, author }
        postData.author = author || req.user._id
        console.log(postData)
        const newPost = await new Post(postData)
        await newPost.save()
        res.status(201).json(newPost)
    } catch (err) {
        next(err)
    }
})


/**
 * Create a post
 * @example POST /api/posts
 */
router.post('/', upload.single('image'), async(req, res, next) => {
    try {
        const imagePath = path.join(__dirname, '/public/images');
        const fileUpload = new Resize(imagePath);
        if (!req.file) res.status(401).json({ error: 'Please provide an image' })

        const filename = await fileUpload.save(req.file.buffer);
        const { title, content, author } = req.body
        const postData = { title, content, author }
        postData.author = author || req.user._id
        console.log(postData)
        const newPost = await new Post(postData)
        await newPost.save()
        res.status(201).json(newPost)
    } catch (err) {
        next(err)
    }
})

/**
 * Get a specific post 
 * @example GET /api/posts/:id
 */
router.get('/:id', async(req, res, next) => {
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
 * @example DELETE /api/posts/:id
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
 * @example POST /api/posts/:id
 */
router.patch(`/:id`, async(req, res) => {
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