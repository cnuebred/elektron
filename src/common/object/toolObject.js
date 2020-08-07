
module.exports = class Tool {
    constructor(msg, options) {
        this.msg = msg
        this.collection = options.collection
        this.type = options.type
        this.filter = options.filter
        this.folder = options.folder
        this.options = options
        if (!options.std)
            return this.chooseTool()
        else if (options.std)
            return this.standardTool()
    }
    chooseTool() {
        let type = this.type ? this.type : 'mongo'
        return {
            collection: this.collection,
            filter: this.filter,
            type: type,
            folder: this.folder
        }
    }
    standardTool() {
        let filter = this.filter
        let collection = this.collection
        let confirm = this.options.confirm ? true : false
        if (this.options.std === 'stdg') {
            if (this.msg)
                filter = this.filter ? this.filter : { guildID: this.msg.guild.id }
            collection = this.collection ? this.collection : 'guild'
        }
        if (this.options.std === 'stdu') {
            if (this.msg)
                filter = this.filter ? this.filter : { userID: this.msg.author.id }
            collection = this.collection ? this.collection : 'user'
        }
        return {
            collection: collection,
            filter: filter,
            folder: this.folder,
            type: 'mongo',
            confirm: confirm
        }
    }
    checkFolder(folder) {
        this.folder = folder
    }
} 