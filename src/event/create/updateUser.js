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
module.exports.updateUser = async (bot) => {
    const users = await load(null, { collection: 'user', forloop: true, type: 'mongo', filter: { __v: 0 } })
    for (user of users) {
        console.log(user)
        const filter = { userID: user.userID }
        const userData = await bot.users.fetch(user.userID)
        //const options = await getUserGuildMemberData(bot, user, userData)
        console.log(userData)
        const schema = await new ObjectMongo().user(userData)
        console.log(schema)
        if (!userData) {
            saveUserData(schema)
            continue
        }

        await update('user', filter, schema, 'set')
    }
    console.log('update user - done')
}