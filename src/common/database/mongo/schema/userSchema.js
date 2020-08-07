const mongoose = require('mongoose')

const schemeUser = new mongoose.Schema({
    userID: {
        type: String,
        require: true
    },
    tag: String,
    username: String,
    bot: Boolean,
    createdTimestamp: Number,
    guilds: Object
})

const UserModel = mongoose.model('user', schemeUser);
module.exports.UserModel = UserModel;
