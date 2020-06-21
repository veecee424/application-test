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
    date_deleted: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
})

const Team = mongoose.model('team', teamSchema);

module.exports = Team;