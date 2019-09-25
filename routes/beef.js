const express = require('express');
const User = require('../routes/api/user')
const router = express.Router();

/* GET home page */

router.get('/beef', (req, res, next) => {
    res.render('beef', {user: req.user});
});


module.exports = router;
