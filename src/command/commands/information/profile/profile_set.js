const globalVaribles = require('../../../../common/object/globalVaribles')
const smartEmbed = require('../../../../common/useful/smartEmbed')
const { save } = require('../../../../common/database/save')
const Tool = require('../../../../common/object/toolObject')
const { includes } = require('quick.db')

const setOptions = [...globalVaribles.OPTIONS_PROFILE.OPTIONS_PROFILE_SET, ...globalVaribles.OPTIONS_PROFILE.OPTIONS_PROFILE_SET_LINKS]
const spliter = '=>'

module.exports = async (bot, msg, params) => {
    if (!params[2]) return smartEmbed(bot, msg, {
        description: `Nie podano ostatniego argumentu. Dostępne opcje:\n>>> \`${setOptions.join(', ')}\`\n Przykład: 
        \`${globalVaribles.PREFIX}profile set ${setOptions[0]}=>Janek\``
    })
    const setterOfOption = params[2].split(spliter)
    let obj = {}
    setOption = setterOfOption.map(el => {
        if (setOptions.includes(el.toLowerCase())) Object.assign(obj, { setter: el.toLowerCase() })
        else Object.assign(obj, { data: el })
    })

    if (!obj.setter) return smartEmbed(bot, msg, {
        description: `Dostępne opcje:\n>>> \`${setOptions.join(', ')}\`\n Przykład: 
        \`${globalVaribles.PREFIX}profile set ${setOptions[0]}=>Janek\``
    })
    if (globalVaribles.OPTIONS_PROFILE.OPTIONS_PROFILE_SET_LINKS.includes(obj.setter)) {
        if (!(obj.data.startsWith('http') || obj.data == 'null')) return smartEmbed(bot, msg, {
            description: `Wartość musi być linkiem`
        })
    }
    if (obj.data.length > 150) return smartEmbed(bot, msg, {
        description: `Podana wartość do zapisu jest za długa`
    })

    save(msg, obj.setter, obj.data, new Tool(msg, {
        std: 'stdu',
        folder: `guilds.${msg.guild.id}.profile`
    }))
}