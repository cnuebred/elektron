const load = require("../../common/database/load")
const { save } = require("../../common/database/save")
const Tool = require("../../common/object/toolObject")
const globalMethods = require("../../common/useful/globalMethods")
const smartEmbed = require("../../common/useful/smartEmbed")
const { guild } = require("../base/reactionAdd")
const { addUser } = require("../base/userJoin")


async function saveLevelData(msg, data) {
    await save(msg, 'levelData', data, new Tool(msg, {
        std: 'stdu', folder: `guilds.${msg.guild.id}`
    }))
}

async function addLevel(bot, msg, lvl) {
    smartEmbed(bot, msg, {
        description: `Gratulacje, uzyskałeś następny poziom - ${lvl}`
    })
}

module.exports = async (bot, msg) => {
    tool = new Tool(msg, { std: 'stdu' })
    userDataAll = await load(msg, tool)
    //member = await msg.guild.members.fetch({ user: msg.author.id, force: true })
    if (!userDataAll) return await addUser(msg.author, msg.guild, false)

    const userData_ = userDataAll['guilds']
    try {
        userData = userData_[msg.guild.id]
        if (!userData) await addUser(msg.author, msg.guild, false)
    } catch {
        await addUser(msg.author, msg.guild, false)
    }

    if (msg.content.length > 5)
        await save(msg, 'messages', userData.messages ? userData.messages + 1 : 1, new Tool(msg, {
            std: 'stdu', folder: `guilds.${msg.guild.id}`
        }))
    if (userData.messages % 100 == 0) {
        await save(msg, 'togive', userData.rating.togive ? userData.rating.togive + 1 : 1, new Tool(msg, {
            std: 'stdu', folder: `guilds.${msg.guild.id}.rating`
        }))
        smartEmbed(bot, msg, {
            description: `${msg.author} get <:pixelheart:694826200949981264> to give`
        })
    }

    let data = {}
    checkLastAuthorOfMessage = await load(msg, new Tool(msg, {
        type: 'sqlite',
        folder: 'channelslevel',
        collection: [msg.channel.id]
    }))
    if (checkLastAuthorOfMessage) {
        if (msg.author.id === checkLastAuthorOfMessage) return // console.log('The same author in dobble message')
    }
    await save(msg, msg.channel.id, msg.author.id, new Tool(msg, {
        type: 'sqlite',
        folder: 'channelslevel',
        filter: msg.guild.id
    }))
    try {
        data = {
            exp: userData.levelData.exp += 1,
            lvl: userData.levelData.lvl ? userData.levelData.lvl : 1,
        }
    }
    catch {
        data = {
            exp: 0,
            lvl: 0,
        }
        return await saveLevelData(msg, data)
    }
    if (data.exp >= await globalMethods.algorithmLevel(userData.levelData.lvl)) {
        data.exp = 0
        data.lvl = userData.levelData.lvl += 1
        addLevel(bot, msg, data.lvl)
    }
    return await saveLevelData(msg, data)
}