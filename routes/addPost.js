const express = require('express');
const router = express.Router();
const Chatbox = require('../models/ChatBox');

/* GET home page */
router.get('/login', (req, res, next) => {
    res.render('./login-views/login');
});

router.post('/post/add', (req, res, next)=>{
  Chatbox.create({
    username: req.user.username,
    message: req.body.message
  })
  .then(newMessage => {
    console.log("the new message ---- ", newMessage)
    res.json(newMessage);
  }).catch(err => next(err))
})

router.get('/messages/all', (req, res, next)=>{
  Chatbox.find()
  .then(allMessages => {
    res.json(allMessages);
  }).catch(err => next(err))
})




module.exports = router;