const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "ChatMessage"
    }]
})

function autopopulate(next) {
    this.populate([
        { path: 'messages' },
        { path: 'users' }
    ])
    next();
}

chatSchema.pre('find', autopopulate);
chatSchema.pre('findOne', autopopulate);

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat