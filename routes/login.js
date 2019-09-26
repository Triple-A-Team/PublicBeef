const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/login', (req, res, next) => {
    res.render('./login-views/login');
});

module.exports = router;
