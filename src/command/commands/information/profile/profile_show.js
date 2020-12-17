const load = require("../../../../common/database/load")
const Tool = require('../../../../common/object/toolObject')
const globalVaribles = require("../../../../common/object/globalVaribles")
const globalMethods = require('../../../../common/useful/globalMethods')
const smartEmbed = require("../../../../common/useful/smartEmbed")
const rating = require("../rating")


module.exports = async (bot, msg, params) => {
    user = msg.mentions.users.first() || msg.author
    const guildData = await load(msg, new Tool(msg, {
        std: 'stdu',
        filter: { userID: user.id },
        folder: `guilds.${msg.guild.id}`
    }))
    if (guildData)
        profileData = guildData.profile
    if (!profileData && !(guildData && guildData.levelData)) return console.log('i can\'t find database -> profile')
    let embedDescription = ``
    let embedDescription_links = ``
    console.log(profileData)
    if (profileData)
        for (let [key, value] of Object.entries(profileData)) {
            if (value === 'null') continue
            trueKey = key.charAt(0).toUpperCase() + key.slice(1)
            if (globalVaribles.OPTIONS_PROFILE.OPTIONS_PROFILE_SET_LINKS.includes(key))
                embedDescription_links += `**${trueKey}**: [click on the link ${globalMethods.findEmoji(bot, '694639052946800772')}](${value})\n`
            else
                embedDescription += `**${trueKey}**: ${value}\n`
        }
    embedData = {
        description: `Profile ${user}`,
        color: '#494D88',
        thumbnail: user.avatarURL()
    }

    if (embedDescription)
        Object.assign(embedData, {
            field1: {
                title: 'Basic',
                description: embedDescription,
                inline: true
            }
        })
    if (guildData && guildData.levelData) {
        let levelData = guildData.levelData
        Object.assign(embedData, {
            field2: {
                title: 'Server\'s data',
                description: `\n **experience**: ${levelData.exp} \n **level**: ${levelData.lvl}`,
                inline: true
            }
        })
    }
    if (embedDescription_links) {
        Object.assign(embedData, {
            field4: {
                title: 'Links',
                description: embedDescription_links,
                inline: true
            }
        })
    }
    if (guildData && guildData.rating) {
        let rating = guildData.rating
        Object.assign(embedData, {
            field3: {
                title: 'User rating',
                description: `\n<:like_it_king:779748900122132491> **generally:**  **${rating.generally ? rating.generally : '●'}** 
                                                    \n  <:like_it:779746780366766110> **current:**  **${rating.current ? rating.current : '●'}**
                                                    \n <:pixelheart:694826200949981264> **to give:**  **${rating.togive ? rating.togive : '●'}**`,
                inline: true
            }
        })
    }
    if (guildData.joinedTimestamp) {
        Object.assign(embedData, {
            field5: {
                title: 'Info',
                description: `\`\`\`● joined at:${globalMethods.time(new Date(guildData.joinedTimestamp))}\`\`\` 
                                                  \`\`\`● messages: ${guildData.messages ? guildData.messages : '●'}\`\`\` `,
                inline: true
            }
        })
    }
    return smartEmbed(bot, msg, embedData)
}