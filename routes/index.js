const express = require('express');
const router = express.Router();
var app = require('express')();
var http = require('http').Server(app);

http.listen(3000, function(){
    console.log('listening on *:3000');
  });


/* GET home page */
router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/api-key', (req, res, next) => {
    res.json({
        GOOGLEMAPS_API_KEY: process.env.GOOGLEMAPS_API_KEY
    })
})

module.exports = router;