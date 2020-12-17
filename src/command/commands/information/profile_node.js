const smartEmbed = require("../../../common/useful/smartEmbed")
const globalVaribles = require("../../../common/object/globalVaribles")

const options = globalVaribles.OPTIONS_PROFILE.OPTIONS_PROFILE_COMMAND

const profileNode = async (bot, msg, params) => {
    if (!params[1])
        param = 'show'
    else if (msg.mentions.users.first() && params[1] === `<@!${msg.mentions.users.first().id}>`) {
        param = 'show'
    } else {
        param = params[1].toLowerCase()
        if (!options.includes(param))
            return smartEmbed(bot, msg, {
                description: `Dostępne opcje:\n>>> \`${options.join(', ')}\`\n`
            })
    }
    const path = `./profile/profile_${param}`
    const method = require(path)
    if (method) {
        return await method(bot, Object.assign(msg, { configurationOption: param }), params)
    }
}

module.exports = {
    method: profileNode
} 