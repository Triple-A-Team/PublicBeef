const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/beef', (req, res, next) => {
    res.render('beef');
});

// router.get('/api-key', (req, res, next) => {
//     res.json({
//         GOOGLEMAPS_API_KEY: process.env.GOOGLEMAPS_API_KEY
//     })
// })

module.exports = router;