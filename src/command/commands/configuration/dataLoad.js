const smartEmbed = require("../../../common/useful/smartEmbed")
const globalVaribles = require("../../../common/object/globalVaribles")

const options = globalVaribles.OPTIONS_CONFIGURATION

const show_load = async (bot, msg, params) => {
    if (!params[1])
        return console.log('i can\'t find any params')
    param = params[1].toLowerCase()

    if (!options.includes(param))
        return smartEmbed(bot, msg, {
            description: `Dostępne opcje:\n>>> \`${options.join(', ')}\`\n`
        })

    const path = `load_${param}`
    const method = require(`./options/${path}`)
    if (method) {
        return await method(bot, Object.assign(msg, { configurationOption: param }), params)
    }
}

module.exports = {
    method: show_load
} 