const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatMessageSchema = new Schema({
    content: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: "Chat"
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema)

module.exports = ChatMessage