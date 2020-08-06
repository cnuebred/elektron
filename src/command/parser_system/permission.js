const globalMethods = require("../../common/useful/globalMethods")
const globalVaribles = require("../../common/object/globalVaribles")
const namePermissionRoles = globalVaribles.PERMISSIONS_ROLES
const Tool = require("../../common/object/toolObject")
const load = require("../../common/database/load")


module.exports = permissionObject = {
    checkPermission: async function (msg, commandModule) {
        this.msg = msg
        this.commandModule = commandModule
        let permission = ''
        if (msg.author.id === globalVaribles.OWNER_ID || msg.author.id === bot.user.id) permission = 'owner'
        else if (msg.author.id === msg.guild.ownerID || await this.getPermissionRoles()) permission = 'admin'
        else permission = 'user'
        Object.assign(commandModule.packageCommands, { authorPermission: permission })
        return await this.equalPermissions(permission, commandModule.packageCommands.permission)
    },
    getPermissionRoles: async function () {
        let namePermissionRole = await this.getMemberRole()
        if (!namePermissionRole) return //TODO

        let availableCommands = await load(
            this.msg,
            new Tool(this.msg, { sts: 'stdg', folder: `configuration.${namePermissionRole}-commands` })
        )
        if (!availableCommands) return //TODO
        if (!availableCommands.includes(this.commandModule.params[0])) return //TODO
        else return true
    },
    getMemberRole: async function () {
        let member = await globalMethods.findMember(this.msg);
        let roleName = ''

        for (role of namePermissionRoles) {
            let roleID = await load(
                this.msg,
                new Tool(this.msg, { sts: 'stdg', folder: `configuration.basic.${role}` })
            )
            if (!roleID) continue;
            if (member.roles.find(x => x.id === roleID)) {
                roleName = role
                break
            }
        }
        return roleName
    },
    equalPermissions: async function (permission, requirePermission) {
        if (requirePermission === 'user') return true
        else if (requirePermission === 'admin' && permission !== 'user') return true
        else if (requirePermission === 'owner' && permission === 'owner') return true
        else return false
    },
    permissionChannelWall: async function () {
        if (msg.author.id === globalVaribles.OWNER_ID) {
            console.log('My lord...')
            return true
        }
        if (this.commandModule.channelType === 'all') return true
        else if (this.msg.channel.type === 'dm' && this.commandModule.channelType === 'dm') return true
        else if (this.msg.channel.type !== 'dm' && this.commandModule.channelType === 'guild') return true
        else return false
    }
}

module.exports.equalPermissions = permissionObject.equalPermissions