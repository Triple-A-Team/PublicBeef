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
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})

postSchema.virtual('rootComment', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'parent',
    justOne: true
})

function autopopulate(next) {
    this.populate([
        { path: 'author' }
    ])
    next();
}

postSchema.pre('find', autopopulate);
postSchema.pre('findOne', autopopulate);

const Post = mongoose.model('Post', postSchema)

module.exports = Post