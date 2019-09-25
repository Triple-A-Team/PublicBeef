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
    image: {
        type: String
    },
    rootComment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
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

postSchema.methods.getThread = async function() {
    return await Post.aggregate([{
        $graphLookup: {
            from: "posts",
            startWith: "$rootComment",
            connectFromField: "parent",
            connectToField: "_id",
            as: "commentThread"
        }
    }])
}

function autopopulate(next) {
    this.populate('author');
    this.populate('rootComment')
    next();
}

postSchema.pre('find', autopopulate);
postSchema.pre('findOne', autopopulate);

const Post = mongoose.model('Post', postSchema)

module.exports = Post