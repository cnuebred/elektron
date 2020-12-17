const globalMethods = require("../../../../common/useful/globalMethods");
const Tool = require("../../../../common/object/toolObject");
const smartEmbed = require("../../../../common/useful/smartEmbed");
const load = require("../../../../common/database/load");
const ErrorLog = require("../../../commandError");

module.exports = async (bot, msg, params) => {
    let error = new ErrorLog(msg)
    let greet = await load(msg, new Tool(msg, { std: 'stdg', folder: 'configuration.greeting.greet' }))
    let channel = await load(msg, new Tool(msg, { std: 'stdg', folder: 'configuration.basic.greeter' }))

    channel = await globalMethods.findChannel(msg.guild, channel)
    if (!channel) return error.show(0.002)//console.log('i can\'t find greeting channel')

    if (!greet) return error.show(0.003)//console.log('i can\'t find greet')

    greet = greet.replace(/%member/gi, msg.author)
    greet = greet.replace(/%tag/gi, msg.author.tag)
    greet = greet.replace(/%server/gi, msg.guild.name)

    smartEmbed(bot, msg, {
        description: `${channel}\n${greet}`
    })
}

