const { save } = require("../../common/database/save")
const Tool = require("../../common/object/toolObject")

module.exports.removeGuild = async (guild) => {
    const filter = { guildID: guild.id }
    await save(null, 'removeData', `${Date.now()}(+)`, new Tool(null, {
        std: 'stdg',
        filter: filter
    }))
}