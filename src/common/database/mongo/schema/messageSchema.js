const mongoose = require('mongoose')

const schemeMessage = new mongoose.Schema({
    guildID: String
}
)
const MessageModel = mongoose.model('messagedb', schemeMessage)
module.exports.MessageModel = MessageModel