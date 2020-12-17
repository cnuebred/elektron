
module.exports = async (bot, msg) => {
    if (!(msg.attachments.size >= 1 || (msg.embeds[0] ? msg.embeds[0].url : false))) return

    await msg.react('👍')
    await msg.react('👎')
}