const mongoose = require('mongoose')

const schemeGuild = new mongoose.Schema({
    guildID: {
        type: String,
        unique: true
    },
    ownerID: String,
    exist: {
        type: Boolean,
        default: true
    },
    base: {
        name: String,
        createdTimestamp: Number,
        joinedTimestamp: Number,
        icon: String,
        banner: String,
        region: String,
        details: {
            numberChannels: Number,
            numberRoles: Number,
            numberMember: Number
        }
    }
})

const GuildModel = mongoose.model('guild', schemeGuild)
module.exports.GuildModel = GuildModel