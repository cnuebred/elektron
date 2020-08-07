const load = require("../../common/database/load")
const Tool = require("../../common/object/toolObject")
const ObjectMongo = require("../../common/database/mongo/object/objectMongoData")
const { UserModel } = require("../../common/database/mongo/schema/userSchema")
const { save } = require("../../common/database/save")
const { greetingEvent } = require("../../common/useful/overMethods/greeting")


const saveUserData = async function () {
    new UserModel(
        this.userSchema
    ).save()
        .then(res => {
            console.log(`new user added ${res.username}`)
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports.addUser = async function (member) {
    const user = member.user
    const filter = { userID: user.id }
    const database = await load(null, new Tool(null, { std: 'stdu', filter: filter }))

    const guildName = `${member.guild.name.replace(' ', '-')}__${member.guild.id}`
    const option = {
        joinedTimestamp: member.joinedTimestamp
    }
    const userSchema = await new ObjectMongo({ guilds: { [guildName]: option } }).user(user)
    this.userSchema = userSchema
    greetingEvent(member)
    if (!database || !database.guilds) return saveUserData.call(this)

    const saveDataUser = async (data) => {
        await save(null, guildName, data, new Tool(null, {
            std: 'stdu',
            filter: filter,
            folder: 'guilds'
        }))
    }
    const conditions = Object.getOwnPropertyNames(database.guilds).includes(guildName)
    if (conditions)
        saveDataUser({ ...database.guilds[guildName], ...option })
    else if (!conditions)
        saveDataUser(option)
}