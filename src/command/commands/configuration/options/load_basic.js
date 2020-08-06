const load = require("../../../../common/database/load")
const Tool = require("../../../../common/object/toolObject")
const globalVaribles = require("../../../../common/object/globalVaribles")
const smartEmbed = require("../../../../common/useful/smartEmbed")
const allElementsArray = globalVaribles.NAME_SETTINGS_ROLE.concat(globalVaribles.NAME_SETTINGS_CHANNEL)


module.exports = async (bot, msg, params) => {
    this.msg = msg
    var check = ''
    var message = ''
    const databaseBasic = await load(msg, new Tool(msg, { std: 'stdg', folder: `configuration.${msg.configurationOption}` }))
    if (!databaseBasic) return console.log('i can\'t find database basic')

    for (element of allElementsArray) {
        let savedElement = databaseBasic[element]
        check = '✅'
        if (!savedElement) check = '❌'
        let existElement = this.msg.guild.roles.cache.find(x => x.id === savedElement) || this.msg.guild.channels.cache.find(x => x.id === savedElement)
        if (!existElement) existElement = ''

        message += `**${element.charAt(0).toUpperCase()}${element.slice(1)}** - ${existElement} ${check}\n`
    }

    return smartEmbed(bot, msg, {
        title: 'Dane konfiguracyjne',
        description: message
    })
}
