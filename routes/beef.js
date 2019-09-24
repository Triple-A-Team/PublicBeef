const express = require('express');
const User = require('../routes/api/user')
const router = express.Router();

/* GET home page */

router.get('/beef', (req, res, next) => {
    res.render('beef', {user: req.user});
});

// router.get('/api/users/me', (req,res,next)=>{
   
// })

// router.get('/api-key', (req, res, next) => {
//     res.json({
//         GOOGLEMAPS_API_KEY: process.env.GOOGLEMAPS_API_KEY
//     })
// })

module.exports = router;
