const express = require('express')
const { isLoggedIn } = require('../../middleware/auth')
const Comment = require('../../models/Comment')
const router = express.Router()


/** 
 * Get all comments.
 * @example
 * GET /api/comments
 * */
router.get('/', async(req, res, next) => {
    res.json(await Comment.find())
})

/** 
 * Get specific comment.
 * @example
 * GET /api/comments/:id
 * */
router.get('/:id', async(req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if (!comment) throw new Error()
        res.status(202).send(comment)
    } catch (e) {
        res.status(404).send(e)
    }
})

/**
 * Create a comment.
 * @example 
 * POST /api/comments
 */
router.post('/', isLoggedIn, async(req, res, next) => {
    try {
        const { content, post, author } = req.body
        const commentData = { content, post, author: author || req.user._id }
        const comment = await new Comment(commentData).save()
        res.status(201).json(comment)
    } catch (err) {
        next(err)
    }
})

/**
 * Delete a specific comment
 * @example 
 * DELETE /api/comments/:id
 */
router.delete(`/:id`, isLoggedIn, async(req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if (!comment) throw new Error()
        if (!req.user._id.equals(comment.author)) {
            res.status(403).send('You do not have permission to delete this resource.')
            return
        }
        await comment.remove()
        res.status(202).send(comment)
    } catch (e) {
        res.status(404).send(e)
    }
})

/**
 * Update a specific comment
 * @example 
 * PATCH /api/comments/:id
 */
router.patch(`/:id`, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['content']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

    try {
        const comment = await Comment.findById(req.params.id)
        if (!comment) throw new Error()
        updates.forEach((update) => comment[update] = req.body[update])
        await comment.save()
        res.json(comment)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router