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
        refPath: 'parentModel'
    },
    author: {
        type: Schema.Types.ObjectID,
        ref: "User"
    },
    parentModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})


function autopopulate(next) {
    this.populate('author');
    this.populate('parent')
    next();
}

commentSchema.pre('find', autopopulate);
commentSchema.pre('findOne', autopopulate);

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment