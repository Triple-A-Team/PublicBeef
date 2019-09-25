const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    parent: {
        type: Schema.Types.ObjectID,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: Schema.Types.ObjectID,
        ref: "User"
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment