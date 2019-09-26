const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
    name: {
        type: String,
        required: true
    },
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
chatSchema.set('toJSON', { virtuals: true });
const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat