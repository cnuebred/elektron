const Discord = require('discord.js')
const embedSetupOptions = [
    'setTitle',
    'setDescription',
    'setFooter',
    'setImage',
    'setThumbnail',
    'setColor',
    'addField'
]

async function getSetuper() {
    for (let setuperCheck of embedSetupOptions) {
        if (setuperCheck.toLowerCase().includes(this.objectChild.replace(/[0-9]/g, ''))) {
            this.setuper = setuperCheck
            break
        } else {
            this.setuper = null
        }
    }
}
async function addField() {
    this.fieldNumber++
    let title = this.paramsObject[this.objectChild].title
    let description = this.paramsObject[this.objectChild].description
    this.paramsObject[this.objectChild] === undefined
        ? null
        : this.embedMessage[this.setuper](title, description)
}
async function setAuthor() {
    if (this.paramsObject.author === 'user')
        this.embedMessage.setAuthor(this.msg.author.username, this.msg.author.avatarURL())
    else if (this.paramsObject.author === 'bot' && this.bot)
        this.embedMessage.setAuthor(this.bot.user.username, this.bot.user.avatarURL())
    else if (this.paramsObject.author)
        this.embedMessage.setAuthor(this.paramsObject.author.username, this.paramsObject.author.avatarURL())
}
async function smartEmbed(bot, channel, paramsObject, promise = null) {
    this.embedMessage = new Discord.MessageEmbed()
    this.fieldNumber = 0
    this.bot = bot
    this.channel = channel.channel ? channel.channel : channel
    this.paramsObject = paramsObject
    this.promise = promise
    this.objectChild = ''
    this.setuper = ''

    for (let objectChild of Object.getOwnPropertyNames(this.paramsObject)) {
        this.objectChild = objectChild
        await getSetuper.call(this)
        if (!this.setuper) continue

        if (this.objectChild.includes('field')) {
            await addField.call(this)
            continue
        }

        this.paramsObject[this.objectChild] === undefined
            ? null
            : this.embedMessage[this.setuper](this.paramsObject[this.objectChild])
    }
    await setAuthor.call(this)
    if (this.paramsObject.timestamp) this.embedMessage.setTimestamp()

    if (this.promise === 'embedMessage')
        return this.embedMessage

    this.channel.send(await this.embedMessage).then(async msg => {
        if (this.paramsObject.delete) msg.delete(this.paramsObject.delete)
        if (this.promise)
            await this.promise(msg)
    })
}

module.exports = smartEmbed