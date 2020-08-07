const globalMethods = require('../../common/useful/globalMethods')
const ObjectMongo = require('../../common/database/mongo/object/objectMongoData')
const { update } = require('../../common/database/updateDatabase')
const load = require('../../common/database/load')
const Tool = require('../../common/object/toolObject')
const { GuildModel } = require('../../common/database/mongo/schema/guildSchema')

async function saveUserData(schema) {
    const guildData = new GuildModel(schema)
    guildData.save().then(x => console.log('saved guild - updater'))
}

module.exports.updateGuild = async bot => {
    const guilds = await globalMethods.getGuilds(bot)

    for (let guild of guilds) {
        const filter = { guildID: guild.id }
        const schema = await new ObjectMongo().guild(guild)
        const database = await load(null, new Tool(null, { std: 'stdg', filter: filter }))
        if (!database) {
            await saveUserData(schema)
            continue
        }
        await update('guild', filter, schema)
    }
    console.log('update guild - done')
}

