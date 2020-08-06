const globalMethods = require("../../../common/useful/globalMethods")
const globalVaribles = require("../../../common/object/globalVaribles")
const smartEmbed = require("../../../common/useful/smartEmbed")

const separator = ';;'
const emojiNumber = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣']

const multiForm = async function () {
    const promise = async (message) => {
        for (emoji of emojiNumber) {
            if (this.options.includes(emoji))
                await message.react(emoji);
        }
    }
    smartEmbed(this.bot, this.msg, {
        title: `📊 **${this.title}**`,
        description: this.options,
        color: '#4D77D1',
        timestamp: true,
        footer: `by ${this.msg.author.tag}`
    }, promise)
}

const singleForm = async function () {
    const green_mark = globalMethods.findEmoji(this.bot, globalVaribles.EMOJIS.GREEN_MARK)
    const red_mark = globalMethods.findEmoji(this.bot, globalVaribles.EMOJIS.RED_MARK)
    const promise = async (message) => {
        await message.react(green_mark)
        await message.react(red_mark)
    }
    smartEmbed(this.bot, this.msg, {
        description: `📊 **${this.contentForm}**`,
        color: '#4D77D1',
        timestamp: true,
        footer: `by ${this.msg.author.tag}`
    }, promise)
}

const form = async function (bot, msg, params) {
    this.bot = bot
    this.msg = msg
    this.contentForm = ''
    this.options = ''
    this.title = ''
    let i = 0

    if (!params[1]) return console.log('I can\'t see parameters') //TODO
    this.contentForm = msg.content.slice(params[0].length + 1).toString()

    if (!this.contentForm.includes(separator)) return singleForm.call(this)
    console.log(this.contentForm)
    this.title = this.contentForm.slice(0, this.contentForm.indexOf(separator))
    this.contentForm = this.contentForm.slice(this.contentForm.indexOf(separator) + separator.length)
    for (option of this.contentForm.split(separator)) {
        if (!option) continue
        if (i >= 9) break
        this.options += `${emojiNumber[i]} ${option}\n`
        i++
    }
    console.log(this.contentForm)
    return multiForm.call(this)
}
module.exports = {
    method: form
}