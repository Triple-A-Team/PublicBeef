const mongoose = require('mongoose')
const Schema = mongoose.Schema


const chatSchema = new Schema({
   message:[{
    username: 'Alex',
    message: 'Starting Public Beef'
  }]
})


const ChatBox = mongoose.model('ChatBox', chatSchema)

module.exports = ChatBox