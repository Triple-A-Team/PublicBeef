const express = require('express')
const { isLoggedIn } = require('../../middleware/auth')
const { uploadCloud } = require('../../configs/cloudinary')
const Comment = require('../../models/Comment')
const Post = require('../../models/Post')
const router = express.Router()


/** 
 * Get all posts.
 * @example
 * GET /api/comments/all
 * */
router.get('/all', async(req, res, next) => {
    res.json(await Comment.find())
})

/**
 * Create a comment.  Need to send the parent.
 * @example POST /api/comments
 */
router.post('/', isLoggedIn, async(req, res, next) => {
    try {
        const { parent, content, author } = req.body
        const commentData = { title, content, parent, author: author || req.user._id, onModel: parent.collection.name }
        await new Comment(commentData).save()
        res.status(201).redirect('/')
    } catch (err) {
        next(err)
    }
})

/**
 * Delete a specific comment
 * @example DELETE /api/comments/:id
 */
router.delete(`/:id`, isLoggedIn, async(req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if (!comment) throw new Error()
        if (!req.user._id.equals(comment.author)) res.status(403).send('You do not have permission to delete this resource.')
        await comment.remove()
        res.status(202).send(comment)
    } catch (e) {
        res.status(404).send(e)
    }
})

/**
 * Update a specific comment
 * @example POST /api/comments/:id
 */
router.patch(`/:id`, async(req, res) => {
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