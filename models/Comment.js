const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    post: {
        type: Schema.Types.ObjectID,
        ref: 'Post'
    },
    author: {
        type: Schema.Types.ObjectID,
        ref: "User",
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})

function autopopulate(next) {
    this.populate([
        { path: 'author' }
    ])
    next();
}

commentSchema.pre('find', autopopulate);
commentSchema.pre('findOne', autopopulate);

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment