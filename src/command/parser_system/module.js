const globalVaribles = require("../../common/object/globalVaribles")
const globalMethods = require("../../common/useful/globalMethods")
const getContainer = require("../commandContainer")

module.exports = getCommandModules = {
    getModule: async function (basicData) {
        this.msg = basicData.msg
        this.content = this.msg.content

        const package = await this.getPackage()
        if (!package.params[0]) return //TODO

        let commandObject = package.packageCommands
        if (!commandObject) return console.log('command doesn\'t exist')//TODO don't exist
        if (!commandObject.commandContainer) return console.log('command doesn\'t have package') //TODO
        commandObject = commandObject.commandContainer
        if (!commandObject.category) return console.log('command doesn\'t have category') // TODO don't have category
        if (!commandObject.source) return console.log('command doesn\'t have source') // TODO don't have source

        const commandModule = require(`../commands/${commandObject.category}/${commandObject.source}`)

        Object.assign(package, { channelType: commandObject.channelType ? commandObject.channelType : 'guild' })
        return Object.assign(commandModule, package)

    },

    getPackage: async function () {
        const params = await globalMethods.removePrefixAndSplit(this.content, globalVaribles.PREFIX)
        return {
            params: params,
            commandName: params[0],
            packageCommands: await this.getPackageCommands(params[0])
        }

    },

    getPackageCommands: async function (command) {
        try {
            command.toString().toLowerCase()
            const container = await getContainer()
            for (let folder of Object.getOwnPropertyNames(container)) {
                if (Object.getOwnPropertyNames(container[folder]).includes(command))
                    return {
                        commandContainer: container[folder][command],
                        permission: folder.toLowerCase()
                    }
            }
        } catch {
            return //TODO
        }

    }
}

