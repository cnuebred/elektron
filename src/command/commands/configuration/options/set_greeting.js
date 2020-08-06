const globalVaribles = require("../../../../common/object/globalVaribles");
const { save } = require("../../../../common/database/save");
const Tool = require("../../../../common/object/toolObject");
const smartEmbed = require("../../../../common/useful/smartEmbed");

module.exports = async (bot, msg, params) => {
    let greeten = msg.content.slice(
        params[0].length + params[1].length + globalVaribles.PREFIX.length + 2
    ).trim()

    await save(msg, 'greet', greeten, new Tool(msg, {
        std: 'stdg',
        folder: 'configuration.greeting'
    }))

    greeten = greeten.replace(/%member/gi, msg.author)
    greeten = greeten.replace(/%tag/gi, msg.author.tag)
    greeten = greeten.replace(/%server/gi, msg.guild.name)

    smartEmbed(bot, msg, {
        description: greeten
    })
}

