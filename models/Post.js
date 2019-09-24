const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: Buffer
    },
    author: { type: Schema.types.ObjectID, ref: "User" }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post