const { addGuild } = require("../../../event/base/addGuild")

const addguildDatabase = async (bot, msg, params) => {
    await addGuild(msg.guild)
}

module.exports = {
    method: addguildDatabase
}