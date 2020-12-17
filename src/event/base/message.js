const parser = require('../../command/parser_system/parser')
const load = require('../../common/database/load')
const { save } = require('../../common/database/save')
const globalVaribles = require('../../common/object/globalVaribles')
const addPoints = require('../create/addPoints')
const { saveMessage } = require('../create/saveMessage')
const stdMessage = require('../create/stdMessage')
const { updateUser } = require('../create/updateUser')


module.exports.messageEvent = async (bot, message) => {
    //if (msg.author.bot) return
    if (message.content.startsWith('scan')) {
        updateUser(bot)
        // ok = await load(message, { collection: 'user', forloop: true, type: 'mongo', filter: { __v: 0 } })
        // new_arr = []
        // for (el of ok) {
        //     guilds = {}
        //     for (keys of Object.keys(el)) {
        //         if ((keys).match(/^\d/)) {
        //             guilds[keys] = el[keys]
        //             delete el[keys]
        //         }
        //     }
        //     //console.log(guilds)
        //     console.log(Object.assign(el, { 'guilds': guilds }))
        //     save(message, 'guilds', guilds, {
        //         type: 'mongo',
        //         collection: 'user',
        //         filter: { userID: el.userID }
        //     }
        //     )
        // }
    }
    if (message.content.startsWith(globalVaribles.PREFIX))
        parser({ bot: bot, msg: message })
    else if (message.channel.type !== 'dm') {
        saveMessage(bot, message)
        stdMessage(bot, message)
        addPoints(bot, message)
    }
}

