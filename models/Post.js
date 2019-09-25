const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = require('../configs/database')


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
    rootComment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    image: {
        type: String
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})

postSchema.methods.getThread = async function() {
    return await db.posts.aggregate([{
        $graphLookup: {
            from: "posts",
            startWith: "$rootComment",
            connectFromField: "parent",
            connectToField: "_id",
            as: "commentThread"
        }
    }]).exec()
}

const Post = mongoose.model('Post', postSchema)

module.exports = Post
