const getCommandModules = require("./module")
const permission = require("./permission")
const ErrorLog = require("../commandError")


const commandParser = {
    parser: async function (basicData) {
        this.bot = basicData.bot
        this.msg = basicData.msg

        const commandModule = await getCommandModules.getModule(basicData)
        if (!commandModule) return console.log('warning, I can\'t find module')
        const barrier = await permission.checkPermission(basicData.msg, commandModule)
        if (!barrier) return console.log('missing permission on barrier section')
        const barrierChannel = await permission.permissionChannelWall()
        if (!barrierChannel) return console.log('invaild channel type')

        if (commandModule.params.includes('--help')) return new ErrorLog(this.msg).show(null, this.msg.commandName)

        if (!commandModule.method) return console.log('method function, don\'t exist')
        await commandModule.method(
            basicData.bot,
            Object.assign(basicData.msg, commandModule),
            commandModule.params
        )
    }
}

module.exports = commandParser.parser