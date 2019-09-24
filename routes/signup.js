const express = require('express');
const router = express.Router();

/**
 * Signup page for creating a user
 * @example
 * GET /signup
 */
router.get('/signup', (req, res, next) => {
    res.render('./signup-views/signup');
});

/**
 * Signup page for creating a user
 * @example
 * GET /create-post
 */
router.get('/create-post', (req, res, next) => {
    res.render('./post-views/new');
});

module.exports = router;
