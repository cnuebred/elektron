const { connectionToDatabase } = require('./connect/connectDatabase')
const Tool = require('../object/toolObject')
const quick = require('quick.db');
const load = require('./load');
const { update } = require('./updateDatabase');

module.exports.save = async (msg, name, data, tool = {
    collection: String,
    filter: Object,
    folder: String,
    type: String,
    confirm: Boolean
}) => {
    if (!tool)
        return console.log('I dont have basic data tool') //TODO
    if (tool.type === 'mongo')
        return await new mongodb(msg, name, data, tool).setDatabase()
    else if (tool.type === 'sqlite')
        return await new sqlite(msg, name, data, tool).setDatabase()
}

class sqlite {
    constructor(msg, name, data, tool) {
        this.msg = msg
        this.name = name
        this.data = data
        this.tool = tool
    }
    async setDatabase() {
        let filter = ''
        if (this.msg)
            filter = this.filter
        else
            filtr = this.tool.tableID
        if (data === 'X') {
            quick.delete(`${this.tool.folder}_${filter}.${this.name}`)
            if (this.tool.confirm) return console.log('delete data complete') //TODO
        }
        quick.set(`${this.tool.folder}_${filtr}.${this.name}`, this.data)
        return console.log('save data complete') //TODO
    }
}

class mongodb {
    constructor(msg, name, data, tool) {
        this.msg = msg
        this.name = name
        this.data = data
        this.tool = tool
        let object = {}
        this.object = object
    }
    async setDatabase() {
        var database = await load(null, this.tool)
        if (this.msg) {
            var check = await load(null, new Tool(this.msg, { std: 'stdg' }))

            if (!check) return //error() //TODO
        }
        if (this.data === 'X') await this.removeProcces(database) // TODO
        else if (!database) return await this.createNewFolder(database) //TODO
        else this.object = {
            [this.name]: this.data
        }

        var objectToSave = {}
        if (this.tool.folder)
            objectToSave = {
                [this.tool.folder]: Object.assign(database, this.object)
            }
        else
            objectToSave = Object.assign(database, this.object)

        await this.save(await objectToSave);
    }
    async removeProcces(database) {
        if (database[this.name] === null)
            if (!this.tool.confirm)
                return console.log('Brak potwierdzenia') //error() //TODO
            else
                return console.log('Potwierdzenie usunięcia') //mes //TODO
        this.object = {
            [this.name]: null
        }
    }
    async createNewFolder(database) {
        database = {
            [this.tool.folder]: {
                [this.name]: this.data
            }
        }
        await this.save(database)
    }
    async save(objectToSave) {
        await update(await this.tool.collection, await this.tool.filter, await objectToSave)
            .then(async () => {
                if (!this.tool.confirm)
                    await console.log(`Successful edit data in ${this.tool.collection}`) //TODO
                if (this.data === 'X')
                    await console.log('data remove') //TODO
                else
                    await console.log('data saved') //TODO
            })
            .catch((err) => {
                console.error(err)
            })
    }
} 
