const load = require("../../database/load")
const Tool = require("../../object/toolObject")
const globalMethods = require("../globalMethods")
const smartEmbed = require("../smartEmbed")

const greetingEvent = async (member) => {
    const greetingDatabase = await load(null, new Tool(null, { std: 'stdg', folder: 'configuration', filter: { guildID: member.guild.id } }))
    if (!greetingDatabase || !greetingDatabase.greeting) return console.log('greeting database dosn\'t exist') // TODO

    const channel = await globalMethods.findChannel(member.guild, greetingDatabase.basic.greeter)
    if (!channel) return console.log('i can\'t find greeting channel')

    let greet = greetingDatabase.greeting.greet
    if (!greet)
        greet = `Witaj ${member} na serwerze **${member.guild.name}**`

    greet = greet.replace(/%member/gi, member)
    greet = greet.replace(/%tag/gi, member.user.tag)
    greet = greet.replace(/%server/gi, member.guild.name)

    smartEmbed(null, channel, {
        description: greet
    })

}

module.exports.greetingEvent = greetingEvent