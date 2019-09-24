const mongoose = require('mongoose')
const Schema = mongoose.Schema


const chatSchema = new Schema({
   message:[{
    username: String,
    message: String
  }]
})


const ChatBox = mongoose.model('ChatBox', chatSchema)

module.exports = ChatBox