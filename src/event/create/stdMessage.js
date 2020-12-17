const load = require("../../common/database/load")
const Tool = require("../../common/object/toolObject")
const ratingChannel = require("../../common/useful/overMethods/ratingChannel")


module.exports = async (bot, msg) => {
    const channel = await load(msg, new Tool(msg, { std: 'stdg', folder: 'configuration.basic' }))
    // here load method get every what is in basic bd, but us interesting only channels
    if (!channel) return
    const listOfChannels = Object.getOwnPropertyNames(channel)

    const listOfChannelsId = listOfChannels.map((channelName) => {
        return channel[channelName]
    })

    if (listOfChannelsId.includes(msg.channel.id))
        if (listOfChannels.includes('rate'))
            ratingChannel(bot, msg)
}