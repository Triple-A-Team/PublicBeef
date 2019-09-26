const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectID,
        ref: "User"
    },
    comments: [{
        type: Schema.Types.ObjectID,
        ref: "Comment"
    }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})

function autopopulate(next) {
    this.populate([
        { path: 'comments' }
    ])
    next();
}

postSchema.set('toObject', { hide: '_id', virtuals: true })
postSchema.pre('find', autopopulate);
postSchema.pre('findOne', autopopulate);
const Post = mongoose.model('Post', postSchema)

module.exports = Post