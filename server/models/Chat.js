const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
    name: {
        type: String
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
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