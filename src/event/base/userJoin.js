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
            // console.log(res)
            console.log(`new user added`)
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports.addUser = async function (user, guild, join = true) {
    const member = await guild.members.fetch({ user: user.id, force: true })
    if (!member) return console.log('member doesn\'t exist - adduser')
    const filter = { userID: member.id }
    const database = await load(null, new Tool(null, { std: 'stdu', filter: filter }))

    console.log(member)

    const guildName = `${member.guild.id}`
    const option = {
        joinedTimestamp: member.joinedTimestamp
    }
    const userSchema = await new ObjectMongo({ guilds: { [guildName]: option } }).user(member.user)
    this.userSchema = userSchema
    if (join)
        greetingEvent(member)
    console.log(userSchema)
    if (!database) return saveUserData.call(this)

    const saveDataUser = async (data) => {
        await save(null, guildName, data, new Tool(null, {
            std: 'stdu',
            filter: filter,
            folder: 'guilds'
        }))
    }
    let conditions = false
    if (database.guilds)
        conditions = Object.getOwnPropertyNames(database.guilds).includes(guildName)
    if (conditions)
        saveDataUser({ ...database.guilds[guildName], ...option })
    else if (!conditions)
        saveDataUser(option)
}