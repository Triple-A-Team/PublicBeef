const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { adminAuth } = require('../middleware/auth')


router.get('/admin', adminAuth, async(req, res, next) => {
    try {
        let users = await User.find().populate('posts')
        res.render('./panel-views/admin', { user: req.user, users })
    } catch (err) {
        next(err)
    }
})

router.get('/delete/:id', adminAuth, (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(result => {
            req.flash('success', `Successfully deleted user ${result}`)
            res.status(204).send()
        })
        .catch(err => next(err))
})

module.exports = router