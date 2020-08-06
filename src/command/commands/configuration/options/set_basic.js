const Tool = require("../../../../common/object/toolObject")
const globalVaribles = require("../../../../common/object/globalVaribles")
const { save } = require("../../../../common/database/save")
const smartEmbed = require("../../../../common/useful/smartEmbed")

const nameSettingsRoles = globalVaribles.NAME_SETTINGS_ROLE
const nameSettingsChannel = globalVaribles.NAME_SETTINGS_CHANNEL

module.exports = async (bot, msg, params) => {
    if (!params[2])
        return console.log('i can\'t find second params')

    param = params[2].toLowerCase()

    const tool = new Tool(msg, {
        std: 'stdg',
        folder: `configuration.${msg.configurationOption}`
    })
    var channel = msg.mentions.channels.first()
    var role = msg.mentions.roles.first()

    if (nameSettingsRoles.includes(param)) {
        if (params[3] === 'X') role = 'X'
        else role = !role ? null : role.id
        if (role)
            return save(msg, param, role, tool)
        else
            return smartEmbed(bot, msg, {
                description: 'Błąd nie podałeś roli' // TODO error system
            })
    }
    if (nameSettingsChannel.includes(param)) {
        if (params[3] === 'X') channel = 'X'
        else channel = !channel ? null : channel.id
        if (channel)
            return save(msg, param, channel, tool)
        else
            return smartEmbed(bot, msg, {
                description: 'Błąd nie podałeś kanału' // TODO error system
            })
    }

}