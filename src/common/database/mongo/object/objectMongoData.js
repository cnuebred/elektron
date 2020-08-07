
module.exports = class ObjectMongo {
    constructor(options = null) {
        this.options = options
    }
    guild(hook) {
        this.objectHook = hook || hook.guild

        if (!this.objectHook.id)
            return //error()
        const objectGuild = {
            guildID: this.objectHook.id,
            ownerID: this.objectHook.ownerID,
            base: {
                name: this.objectHook.name,
                createdTimestamp: this.objectHook.createdTimestamp,
                joinedTimestamp: this.objectHook.joinedTimestamp,
                icon: this.objectHook.iconURL(),
                banner: this.objectHook.bannerURL(),
                region: this.objectHook.region,
                details: {
                    numberChannels: this.objectHook.channels.cache.size,
                    numberRoles: this.objectHook.roles.cache.size,
                    numberMember: this.objectHook.memberCount
                }
            }
        }
        if (this.options)
            Object.assign(objectGuild, this.options)
        return objectGuild
    }
    user(hook) {
        this.objectHook = hook || hook.author
        if (!this.objectHook.id)
            return //error()
        const objectUser = {
            userID: this.objectHook.id,
            tag: this.objectHook.tag,
            username: this.objectHook.username,
            bot: this.objectHook.bot,
            createdTimestamp: this.objectHook.createdTimestamp,
        }
        if (this.options)
            Object.assign(objectUser, this.options)
        return objectUser
    }
    message(hook) {
        this.objectHook = hook
        if (!this.objectHook.id)
            return //error()
        const messageObject = {
            guildID: this.objectHook.guild.id
        }
        if (this.options)
            Object.assign(messageObject, this.options)
        return messageObject
    }
}
