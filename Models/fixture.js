const mongoose = require('mongoose')

const fixtureSchema = new mongoose.Schema({
    home_team: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    away_team: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    venue: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
        lowercase: true
    },
    time: {
        type: String,
        required: true,
        lowercase: true
    },
    score: {
        type: String,
        required: false,
        default: '0-0'
    },
    date_deleted: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
})

const Fixture = mongoose.model('fixture', fixtureSchema);

module.exports = Fixture;