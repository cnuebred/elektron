const load = require("../../../common/database/load")
const Tool = require("../../../common/object/toolObject")
const { save } = require('../../../common/database/save')
const smartEmbed = require("../../../common/useful/smartEmbed")


const rate = async (bot, msg, params) => {
    userMention = msg.mentions.users.first()
    if (!userMention) return console.log('you don\'t mention any user')
    if (userMention.id == msg.author.id) return console.log('you can\'t mention your self')
    userMentionTool = new Tool(msg, {
        std: 'stdu',
        filter: { userID: userMention.id },
        folder: `guilds.${msg.guild.id}.rating`
    })
    userTool = new Tool(msg, {
        std: 'stdu',
        filter: { userID: msg.author.id },
        folder: `guilds.${msg.guild.id}.rating`
    })

    loadUserRate = await load(msg, userTool)
    loadRate = await load(msg, userMentionTool)
    console.log(loadRate)
    if (loadUserRate && loadUserRate.togive > 0) {
        await save(msg, 'togive', loadUserRate.togive - 1, userTool)
        await save(msg, 'current', loadRate && loadRate.current ? loadRate.current + 1 : 1, userMentionTool)
        smartEmbed(bot, msg, {
            description: `${msg.author} gave ${userMention} <:pixelheart:694826200949981264>`
        })
    }
}


module.exports = {
    method: rate
}
