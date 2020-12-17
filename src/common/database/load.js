const { connectionToDatabase } = require('./connect/connectDatabase')
const quick = require('quick.db');

module.exports = async (msg, tool) => {
    if (!tool)
        return console.log('I dont have basic data tool') //TODO
    if (tool.type === 'mongo')
        return await new mongodb(tool).getDatabase()
    else if (tool.type === 'sqlite')
        return await new sqlite(msg, tool).getDatabase()
    else
        return console.log('I can\' find type of data base')
}

class sqlite {
    constructor(msg, tool) {
        this.msg = msg
        this.tool = tool
    }
    async getDatabase() {
        if (this.msg) this.tool.filter = this.msg.guild.id
        else this.tool.filter = this.tool.tableID
        const data = quick.get(`${this.tool.folder}_${this.tool.filter}.${this.tool.collection}`)
        return data ? data : undefined
    }
}

class mongodb {
    constructor(tool) {
        this.tool = tool
    }
    async getDatabase() {
        var database = await connectionToDatabase(this.tool.collection, this.tool.filter)
        if (this.tool.forloop)
            return database
        database = database[0]
        if (!database)
            return console.log('database doesn\'t exist') //TODO
        if (!this.tool.folder)
            return database
        const folderPath = this.tool.folder
        const folders = folderPath.split('.')
        for (let folder of folders) {
            database = database[folder]
            if (!database)
                break
        }
        return database
    }
}