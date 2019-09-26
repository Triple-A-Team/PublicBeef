const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    parent: {
        type: Schema.Types.ObjectID,
        refPath: 'parentModel',
        required: true
    },
    author: {
        type: Schema.Types.ObjectID,
        ref: "User",
        required: true
    },
    parentModel: {
        type: String,
        enum: ['Post', 'Comment'],
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})

commentSchema.virtual('child', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'parent',
    justOne: true
})

function autopopulate(next) {
    this.populate([
        { path: 'author' },
        { path: 'parent' }
    ])
    next();
}

commentSchema.pre('find', autopopulate);
commentSchema.pre('findOne', autopopulate);

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment