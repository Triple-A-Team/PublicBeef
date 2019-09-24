const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/signup', (req, res, next) => {
    res.render('./signup-views/signup');
});

// router.get('/api-key', (req, res, next) => {
//     res.json({
//         GOOGLEMAPS_API_KEY: process.env.GOOGLEMAPS_API_KEY
//     })
// })

module.exports = router;
