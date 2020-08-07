const load = require("../../common/database/load")
const Tool = require("../../common/object/toolObject")
const ObjectMongo = require("../../common/database/mongo/object/objectMongoData")
const { GuildModel } = require("../../common/database/mongo/schema/guildSchema")
const { save } = require("../../common/database/save")


const saveGuildData = async function () {
    new GuildModel(
        this.guildSchema
    ).save()
        .then(res => {
            console.log(`new guild added ${res.base.name}`)
        })
        .catch(err => {
            console.log(err)
        })
}


module.exports.addGuild = async function (guild) {
    const filter = { guildID: guild.id }
    const tool = new Tool(null, { std: 'stdg', filter: filter })
    const database = await load(null, tool)

    const guildSchema = await new ObjectMongo().guild(guild)
    this.guildSchema = guildSchema
    if (!database) return saveGuildData.call(this)

    if (database.removeData) {
        await save(null, 'removeData', database.removeData.replace('+', '-'), tool)
    }
}