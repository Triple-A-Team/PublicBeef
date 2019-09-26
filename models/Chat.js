const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
})

chatSchema.virtual('messages', {
    ref: 'ChatMessage',
    localField: '_id',
    foreignField: 'chat',
    justOne: false
})

chatSchema.set('toObject', { hide: '_id', virtuals: true })
const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat