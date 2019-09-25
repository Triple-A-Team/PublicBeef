const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { adminAuth } = require('../middleware/auth')


router.get('/admin', adminAuth, (req, res, next) => {
    res.render('admin-views/admin', { user: req.user })
})

router.get('/delete/:id', adminAuth, (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(result => {
            req.flash('success', `Successfully deleted user ${result}`)
            res.render('/admin/active-users')
        })
        .catch(err => next(err))
})

module.exports = router