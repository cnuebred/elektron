const load = require("../common/database/load")
const smartEmbed = require("../common/useful/smartEmbed")
const { save } = require('../common/database/save')
const Tool = require('../common/object/toolObject')
const { equalPermissions } = require("./parser_system/permission")
const globalVaribles = require("../common/object/globalVaribles")
const { Guild } = require("discord.js")



module.exports = class ErrorLog {
    constructor(msg = null) {
        this.msg = msg
    }
    async main() {
        const errorDatabase = await load(null, new Tool(null, {
            collection: 'container',
            filter: { category: 'errorContainer' },
            folder: 'pl',
            type: 'mongo'
        }))
        this.errorDatabase = errorDatabase
    }
    async show(code, command) {
        if (!code && !command)
            return console.log('i can\'t find any params')
        let packageCommands = this.msg.packageCommands
        let checker = await equalPermissions(packageCommands.authorPermission, packageCommands.permission)
        let embedData = {}
        await this.main()

        if (command && !code) {
            this.category = 'helper'
            this.key = command
        } else if (code) {
            this.category = 'code'
            this.key = code
        }

        try {
            embedData = this.errorDatabase[this.category][this.key]
        } catch{
            return console.log('i can\'t find helper module')
        }
        if (checker)
            smartEmbed(null, this.msg.channel, embedData ? embedData : {
                description: 'Nie udało się załadować helpera', footer: `Napisz do ${globalVaribles.OWNER_TAG}`
            })
    }
    async log(code, guild) {
        const tool = new Tool(null, { std: 'stdg', filter: { guildID: this.msg ? this.msg.guild.id : guild } })
        const errorLogsDatabase = (await load(null, tool)).errorLogs
        await this.main()
        let dataForSave = this.errorDatabase.code[code].oneline
        try {
            let lenghtOfErrorList = errorLogsDatabase.length
            await errorLogsDatabase.unshift(`${code} - ${dataForSave}`)
            if (lenghtOfErrorList > 30)
                await errorLogsDatabase.pop()
        } catch {
            console.log('Database of list error doesn\'t exist')
        }
        await save(this.msg, 'errorLogs', errorLogsDatabase ? errorLogsDatabase : [dataForSave], tool)
    }
}