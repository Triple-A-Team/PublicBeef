const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
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


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) throw new Error('Password cannot contain "password"')
        }
    },
    location: {
        type: pointSchema,
    },
    role: {
        type: String,
        enum: ['Admin', 'User', 'Guest'],
        default: 'User'
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('Email is invalid')
        }
    },
    avatar: {
        type: Buffer
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})

userSchema.index({ location: "2dsphere" });

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.methods.findNearby = async function(lat, lon, maxDist) {
    return await User.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lon, lat]
                    },
                    $maxDistance: maxDist
                }
            }
        })
        .then(users => {
            return users
        })
        .catch(e => {
            return e
        })
}

userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({ email })
    if (!user) throw new Error('Unable to login')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('Unable to login')
    return user
}

userSchema.methods.validPassword = function validPassword(password) {
    return !bcrypt.compareSync(password, this.password)
}

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 8)
    next()
})

userSchema.pre('remove', async function(next) {
    // await Hazard.deleteMany({ creator: this._id }) // Delete user groups when user is removed
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User