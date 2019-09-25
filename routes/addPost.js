const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


router.post('/api/post', (req, res, next)=>{
  Post.create({
    username: req.user.username,
    message: req.body.message
  })
  .then(newMessage => {
    console.log("the new message ---- ", newMessage)
    res.json(newMessage);
  }).catch(err => next(err))
})

router.get('/messages/all', (req, res, next)=>{
  Post.find()
  .then(allMessages => {
    res.json(allMessages);
  }).catch(err => next(err))
})




module.exports = router;