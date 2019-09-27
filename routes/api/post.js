const express = require('express')
const { isLoggedIn } = require('../../middleware/auth')
const uploadCloud = require('../../configs/cloudinary')
const Post = require('../../models/Post')
const router = express.Router()

/** 
 * Get all users within a specific distance.
 * @example
 * GET /api/posts/search?lat=20&lon=-60&limit=50
 * GET /api/posts/search?lat=20&lon=-60&maxDist=100
 * */
router.get('/search', async(req, res, next) => {
    const lat = req.query.lat || 25.756365
    const lon = req.query.lon || -80.375716
    const maxDist = req.query.maxDist || 32186.9 // 20 miles
    const limit = req.query.limit || 50

    Post.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lon, lat]
                    },
                    $maxDistance: maxDist
                }
            }
        }, 
        {}, 
        { sort: { "createdAt": 1 } 
        })
        .limit(limit)
        .populate('author')
        .then(posts => {
            res.json(posts)
        })
        .catch(err => next(err))
})

/** 
 * Get all posts.
 * @example
 * GET /api/posts/all
 * */
router.get('/all', async(req, res, next) => {
    res.json(await Post.find().populate('author'))
})

/**
 * Create a post
 * @example POST /api/posts
 */
router.post('/', uploadCloud.single('image'), (req, res, next) => {
    postData = {
        title: req.body.title,
        content: req.body.content,
        author: req.user._id,
        location: { coordinates: req.user.location.coordinates }
    }

    if (req.file) {
        postData.image = req.file.url
    }

    Post.create(postData)
        .then((test) => {
            res.json(test)
        })

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
        if (!req.user._id.equals(post.author)) res.status(403).send('You do not have permission to delete this resource.')
        await post.remove()
        res.status(202).send(post)
    } catch (e) {
        res.status(404).send(e)
    }
})

/**
 * Update a specific post
 * @example POST /api/posts/:id
 */
router.patch(`/:id`, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'content', 'image']
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