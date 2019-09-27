const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere',
        default: [25.766111, -80.196183],
        required: true
    }
});

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
    }],
    location: {
        type: pointSchema,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})

postSchema.index({ location: "2dsphere" });

function autopopulate(next) {
    this.populate([
        { path: 'comments' }
    ])
    next();
}

postSchema.pre('find', autopopulate);
postSchema.pre('findOne', autopopulate);
const Post = mongoose.model('Post', postSchema)

module.exports = Post