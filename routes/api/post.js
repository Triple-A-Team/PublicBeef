const express = require('express')
const path = require('path')
const { isLoggedIn } = require('../../middleware/auth')
const { Resize, upload } = require('../../configs/cloudinary')
const User = require('../../models/User')
const Post = require('../../models/Post')
const router = express.Router()

/** 
 * Get all users within a specific distance.
 * TODO: Change this to a post so we can input a distance.
 * @example
 * GET /api/users/search?lat=20&lon=-60
 * GET /api/users/search?lat=20&lon=-60&maxDist=100
 * */
router.get('/search', (req, res, next) => {
    const lat = req.query.lat || 25.756365
    const lon = req.query.lon || -80.375716
    const maxDist = req.query.maxDist || 32186.9 // 20 miles

    console.log(`Searching for users near ${lat}, ${lon} within ${maxDist} meters`)
    User.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lon, lat]
                    },
                    $maxDistance: maxDist
                }
            }
        })
        .then(users => {
            res.json(users)
        })
        .catch(err => next(err))
})

/**
 * Create a post
 * @example POST /api/posts
 */
router.post('/', upload.single('image'), async(req, res, next) => {
    console.log('req.body:', req.body)
    try {
        if (!req.file) res.status(401).json({ error: 'Please provide an image' })
        const { title, content, author } = req.body
        const postData = { title, content, author: author || req.user_id, image: req.file.url }
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