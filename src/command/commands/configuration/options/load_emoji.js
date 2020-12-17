const load = require("../../../../common/database/load")
const Tool = require("../../../../common/object/toolObject")
const smartEmbed = require("../../../../common/useful/smartEmbed")
const globalMethods = require("../../../../common/useful/globalMethods")


const setGroup = async function () {
    Object.assign(this.embedObject, {
        [`field${this.i}`]: {
            title: `📌 strona ${this.i}`,
            description: this.finallMessage
        }
    })
    this.finallMessage = ''
    this.i++
}

const getSpecificData = async function (emojiData, name) {
    return smartEmbed(this.bot, this.msg, {
        title: `Dane emoji ${name}`,
        description: `
        **•** emoji została dodana do bazy danych:
        **• ${await globalMethods.time(emojiData.dataSet)}**
        **•** id wiadomości: ${emojiData.messageID}
        **•** przypisana rola: ${await globalMethods.findRole(this.msg, emojiData.role)}
        > **Adres wiadomości** [*tutaj*](${emojiData.messageAdress})`,
        color: '#688BE3'
    })
}

const getData = async function (databaseEmoji) {
    this.listOfEmoji.forEach(async emojiData => {
        if (!emojiData) return
        const emojiElement = databaseEmoji[emojiData]
        if (!emojiElement) return

        const getterEmoji = await globalMethods.findEmoji(bot, emojiElement.emoji.slice(emojiElement.emoji.lastIndexOf(':') + 1, emojiElement.emoji.lastIndexOf('>')))
        var emoji = emojiElement.emoji.startsWith('<') ? getterEmoji : emojiElement.emoji
        if (!emoji) emoji = '**-**'

        var role = globalMethods.findRole(this.msg, emojiElement.role)

        if (!role) return role = '**rola nie istnieje**'

        this.listOfData.push(`**${emojiData}** ${emoji} | ${role}\n`)
    })
}

module.exports = async (bot, msg, params) => {
    const error = new ErrorLog(msg)
    this.bot = bot
    this.msg = msg
    this.finallMessage = ''
    this.embedObject = {}
    this.listOfData = []
    this.i = 1

    const databaseEmoji = await load(msg, new Tool(msg, { std: 'stdg', folder: `configuration.${msg.configurationOption}` }))
    if (!databaseEmoji) return error.log({ code: 0.001, option: 'emoji-data' })//console.log('i can\'t find database emoji')

    this.listOfEmoji = Object.getOwnPropertyNames(databaseEmoji)

    if (this.listOfEmoji.includes(params[2]))
        return getSpecificData.call(this, databaseEmoji[params[2]], params[2])

    await getData.call(this, databaseEmoji)

    this.listOfData.forEach(async (message) => {
        this.finallMessage += message
        if (this.finallMessage.length > 900) {
            await setGroup.call(this)
        }
    })
    await setGroup.call(this)
    if (this.i > 25) return error.show({ code: 0.001, option: 'basic-data' })//console.log('error load_emoji - embed too long')

    return smartEmbed(bot, msg, Object.assign({
        title: 'Dane emoji',
        color: '#688BE3'
    }, this.embedObject))
}