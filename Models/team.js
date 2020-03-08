const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    team_name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    team_alias: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    date_created: {
        type: Date,
        required: true,
        default: Date.now()
    },
    date_deleted: {
        type: Date,
        default: null
    }
})

const Team = mongoose.model('team', teamSchema);

module.exports = Team;