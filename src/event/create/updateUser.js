const { UserModel } = require("../../common/database/mongo/schema/userSchema")
const ObjectMongo = require("../../common/database/mongo/object/objectMongoData")
const globalMethods = require("../../common/useful/globalMethods")
const load = require("../../common/database/load")
const Tool = require("../../common/object/toolObject")
const { update } = require("../../common/database/updateDatabase")

async function saveUserData(schema) {
    const userData = new UserModel(schema)
    userData.save().then(x => console.log('saved user - updater'))
}

async function getUserGuildMemberData(bot, user) {
    const guilds = await globalMethods.getGuilds(bot)
    let objectOfGuilds = {}
    for (let guild of guilds) {
        const member = await globalMethods.findMember(guild, user.id)
        if (!member) continue
        Object.assign(objectOfGuilds, {
            [`${guild.name.replace(' ', '-')}__${guild.id}`]: {
                joinedTimestamp: member.joinedTimestamp
            }
        })
    }
    return objectOfGuilds
}

module.exports.updateUser = async (bot) => {
    const users = await globalMethods.getUsers(bot)
    for (user of users) {
        const options = await getUserGuildMemberData(bot, user)

        const schema = await new ObjectMongo(options).user(user)
        const filter = { userID: user.id }

        const userData = await load(null, new Tool(null, { std: 'stdu', filter: filter }))
        if (!userData) {
            saveUserData(schema)
            continue
        }

        await update('user', filter, schema)
    }
    console.log('update user - done')
}