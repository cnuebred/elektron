const globalMethods = require("../../common/useful/globalMethods")
const load = require("../../common/database/load")
const Tool = require("../../common/object/toolObject")


const checkData = async function () {
    const tool = new Tool(null, { std: 'stdg', folder: 'configuration.emoji', filter: { guildID: this.guild.id } })

    const emojiDatabase = await load(null, tool)

    if (!emojiDatabase) return console.log('database is empty')
    const emojiObject = Object.keys(emojiDatabase).find(key => {
        let obj = emojiDatabase[key]
        return obj.emoji.startsWith('<') ? obj.emoji.substring(obj.emoji.indexOf(':') + 1, obj.emoji.lastIndexOf(':')) : obj.emoji === this.event.emoji.name
            && obj.messageID === this.event.message
    })
    return emojiDatabase[emojiObject]
}

module.exports.reactionAdd = async (bot, event) => {
    this.event = event
    this.guild = bot.guilds.cache.find(x => x.id === event.guild)
    const member = this.guild.members.cache.find(x => x.id === event.user)

    if (member.id === bot.user.id) return
    if (!member) return console.log('Can not find author of reaction')

    const emojiData = await checkData.call(this)

    if (!emojiData) return
    member.roles.add(emojiData.role)
        .then(res => {
            console.log('add role by reaction')
        }).catch(err => {
            if (err.code === 50013) console.log('i don\'t have permission to add role - reaction')
        })
}