const mongoose = require('mongoose')
const Schema = mongoose.Schema


const chatMessageSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String
    }
})

function autopopulate(next) {
    this.populate([
        { path: 'author' }
    ])
    next();
}

chatMessageSchema.pre('find', autopopulate);
chatMessageSchema.pre('findOne', autopopulate);

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema)

module.exports = ChatMessage