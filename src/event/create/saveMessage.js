const { save } = require("../../common/database/save")
const Tool = require("../../common/object/toolObject")
const load = require("../../common/database/load")
const ObjectMongo = require("../../common/database/mongo/object/objectMongoData")
const { MessageModel } = require("../../common/database/mongo/schema/messageSchema")


module.exports.saveMessage = async function (bot, message) {
    this.msg = {}
    this.specific = false
    try {
        if (message.content.split(' ').length > 1 && message.content.match(/^[0-9 \s]*$/gi)) {
            for (messagePart of message.content.split(' ')) {
                this.specific = true
                this.msg = await message.channel.messages.fetch(messagePart)
                await saveMessageDataBase.call(this)
            }
        }
        this.msg = await message.channel.messages.fetch(message.content)
        this.specific = true
    } catch {
        this.msg = message
        this.specific = false
    }

    await saveMessageDataBase.call(this)
}
async function saveMessageDataBase() {
    var messageDatabase = await load(this.msg, { collection: 'messagedb', type: 'mongo', filter: { guildID: this.msg.guild.id } })

    if (!messageDatabase) await saveDataBase.call()

    const messageObject = {
        author: {
            tag: this.msg.author.tag,
            name: this.msg.author.username,
            id: this.msg.author.id
        },
        specific: this.specific,
        content: this.msg.content,
        date: this.msg.createdTimestamp,
        embeds: this.msg.embeds,
        type: this.msg.type,
        attachments: this.msg.attachments.map(att => {
            return [att.attachment, att.name, att.size, att.proxyURL, [att.height, att.width]]
        }),
        reactions: msg.reactions.cache.map(reaction => {
            return [reaction._emoji.id ? reaction._emoji.id : reaction._emoji.name, reaction.count]
        }),
        adress: `https://discordapp.com/channels/${this.msg.guild.id}/${this.msg.channel.id}/${this.msg.id}`
    }

    await save(this.msg, await code.coder(this.msg.guild.id + this.msg.channel.id + this.msg.id), messageObject, {
        collection: 'messagedb',
        type: 'mongo',
        folder: `channel_${this.msg.channel.id}`,
        filter: { guildID: this.msg.guild.id }
    })
}

async function saveDataBase() {
    let messagesSchema = new ObjectMongo().message(this.msg)
    console.log(messagesSchema)

    new MessageModel(Object.assign(messagesSchema)).save().then(x => console.log('save guild messages'))
}

const code = {
    type: '16',
    sliceCoder: 9,
    sliceDecoder: 8,
    async coder(num) {
        let codeArr = []
        num.toString()
        let numberLoops = num.length / this.sliceCoder
        for (i = 0; i < numberLoops; i++) {
            codeArr.push(parseInt(num.substr(0, this.sliceCoder)).toString(this.type))
            num = num.slice(this.sliceCoder)
        }
        return codeArr.join('')
    },
    async decoder(num) {
        let codeArr = []
        let numberLoops = num.length / this.sliceDecoder
        for (i = 0; i < numberLoops; i++) {
            codeArr.push(parseInt(num.substr(0, this.sliceDecoder), this.type))
            num = num.slice(this.sliceDecoder)
        }
        return codeArr.join('')
    }
}
module.exports.coder = code