const express = require('express')
const { isLoggedIn } = require('../../middleware/auth')
const ChatMessage = require('../../models/ChatMessage')
const router = express.Router()


/** 
 * Get all posts.
 * @example
 * GET /api/messages
 * */
router.get('/', async(req, res, next) => {
    res.json(await ChatMessage.find())
})

/** 
 * Get specific chat message.
 * @example
 * GET /api/messages/:id
 * */
router.get('/:id', async(req, res, next) => {
    try {
        const chatMessage = await ChatMessage.findById(req.params.id)
        if (!chatMessage) throw new Error()
        res.status(202).send(chatMessage)
    } catch (e) {
        res.status(404).send(e)
    }
})

/**
 * Create a chatMessage.
 * @example 
 * POST /api/messages
 */
router.post('/', isLoggedIn, async(req, res, next) => {
    try {
        const { message, author } = req.body
        const chatMessageData = { message, author: author || req.user._id }
        await new ChatMessage(chatMessageData).save()
        res.status(201).redirect('/')
    } catch (err) {
        next(err)
    }
})

/**
 * Delete a specific chatMessage
 * @example 
 * DELETE /api/messages/:id
 */
router.delete(`/:id`, isLoggedIn, async(req, res) => {
    try {
        const chatMessage = await ChatMessage.findById(req.params.id)
        if (!chatMessage) throw new Error()
        if (!req.user._id.equals(chatMessage.author)) {
            res.status(403).send('You do not have permission to delete this resource.')
            return
        }
        await chatMessage.remove()
        res.status(202).send(chatMessage)
    } catch (e) {
        res.status(404).send(e)
    }
})

module.exports = router