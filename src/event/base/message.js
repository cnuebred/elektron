const parser = require('../../command/parser_system/parser')
const globalVaribles = require('../../common/object/globalVaribles')
const { saveMessage } = require('../create/saveMessage')


module.exports.messageEvent = async (bot, message) => {
    //if (msg.author.bot) return
    if (message.content.startsWith(globalVaribles.PREFIX))
        parser({ bot: bot, msg: message })
    else if (message.channel.type !== 'dm')
        saveMessage(bot, message)
}

