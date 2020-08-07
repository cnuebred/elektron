const smartEmbed = require("../../../common/useful/smartEmbed")
const globalVaribles = require("../../../common/object/globalVaribles")
const globalMethods = require("../../../common/useful/globalMethods")

const options = globalVaribles.OPTIONS_ROLE

async function roleSystem(bot, msg, params) {
    this.msg = msg
    this.range = params[1]
    this.pattern = this.range !== 'all' ? globalMethods.findRole(msg, params[1]) : 'all'
    this.option = params[2] ? params[2].toLowerCase() : null
    this.role = globalMethods.findRole(msg, params[3])

    if (!this.range)
        return console.log('i can\'t find any params')

    if (!this.pattern)
        return console.log('I can\'t find any mentions role')

    if (!options.includes(this.option))
        return smartEmbed(bot, msg, {
            description: `Dostępne opcje:\n>>> \`${options.join(', ')}\`\n`
        })

    await getMembersCollection.call(this)

    if (this.members)
        await roleController.call(this)
    else
        return console.log('collection is empty')
}

async function getMembersCollection() {
    if (this.range === 'all') {
        this.members = this.msg.guild.members.cache
        this.role = this.role ? this.role : this.pattern
    }
    else if (this.range === `<@&${this.pattern.id}>`) {
        this.members = this.pattern.members
    }
}

async function roleController() {
    const attachList = ['add', 'remove']
    if (attachList.includes(this.option)) {
        if (!this.role) return console.log('i need two mentiones roles')
        await attach.call(this)
    }
    else if (this.option === 'info')
        await information.call(this)
    else
        await operate.call(this)
    this.msg.channel.send(`Done`)
}
async function attach() {
    for (const member of this.members) {
        if (member)
            await member[1].roles[this.option](this.role.id)
    }
}
async function operate() {
    for (const member of this.members) {
        if (member)
            await member[1][this.option]()
    }
}
async function information() {
    let role = this.pattern
    let information = `\`\`\`${role}(${role.name}) -> ${this.members.array().length}\`\`\``
    this.msg.channel.send(information)
}

module.exports = {
    method: roleSystem
}