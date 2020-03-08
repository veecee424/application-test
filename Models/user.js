const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: email,
        required: true,
        trim: true
    },
    is_admin: false
})

const User = mongoose.model('user', userSchema)

module.exports = User;