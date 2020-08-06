const smartEmbed = require("../../../common/useful/smartEmbed")
const globalVaribles = require("../../../common/object/globalVaribles")
const globalMethods = require("../../../common/useful/globalMethods")
const load = require("../../../common/database/load")
const Tool = require("../../../common/object/toolObject")

const options = globalVaribles.OPTIONS_MESSAGE

const globalMessage = async function (bot, msg, params) {
    this.bot = bot
    this.msg = msg

    this.param = params[1] ? params[1].toLowerCase() : null

    if (!options.includes(this.param))
        return smartEmbed(bot, msg, {
            description: `Dostępne opcje:\n>>> \`${options.join(', ')}\`\n`
        })

    await getCustomers[this.param].call(this)

    this.users = this.users.filter((value, index, arr) => arr.indexOf(value) === index)

    await getContent.call(this)
    for (user of this.users) {
        await replaceContent.call(this, user)
        try {
            user.send(this.contentMessage)
            await getContent.call(this)
        } catch {
            console.log('i can\'t send message')
        }
    }
}

async function replaceContent(user) {
    try {
        this.contentMessage = await this.contentMessage.replace(/%server/gi, user.guild.name ? user.guild.name : '')
        this.contentMessage = await this.contentMessage.replace(/%member/gi, user.user.username ? user.user.username : '')
    } catch {
        return console.log('error message')
    }
}

async function getContent() {
    this.msg.content = this.msg.content.replace(this.param, '')
    this.contentMessage = this.msg.content.slice(this.params[0].length + globalVaribles.PREFIX.length + 1).trim()
}

const getCustomers = {
    async global() {
        this.users = await globalMethods.getUsers(this.bot)
    },
    async users() {

    },
    async owners() {
        this.users = await globalMethods.getGuilds(this.bot, 'owner')
    },
    async test() {
        this.user = [await globalMethods.findUser(this.bot, globalVaribles.OWNER_ID)]
    }
}

module.exports = {
    method: globalMessage
}