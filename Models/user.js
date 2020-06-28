const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    is_admin: {
        type: Boolean,
        default: false
    }
})



userSchema.pre('save', async function(next) {
    const user = this;

    if(user.password && user.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password  = await bcrypt.hash(user.password, salt);
    }
    next()
})

const User = mongoose.model('user', userSchema)

module.exports = User;