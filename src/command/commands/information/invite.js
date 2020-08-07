const smartEmbed = require("../../../common/useful/smartEmbed");
const globalVaribles = require("../../../common/object/globalVaribles");
const globalMethods = require("../../../common/useful/globalMethods");

const invite = async (bot, msg, params) => {
    const author = await globalMethods.findUser(bot, globalVaribles.OWNER_ID)
    bot.generateInvite([
        'ADMINISTRATOR'
    ]).then(async link => {
        smartEmbed(bot, msg, {
            title: `☺ Miło mi, że **Cię** zainteresowałem`,
            description: `${await globalMethods.findEmoji(bot, globalVaribles.EMOJIS.CLICK)} **[klikni tutaj](${link})** \naby zaprosić mnie na **Swój** serwer`,
            footer: `© ${bot.user.tag}┋Twórca ${author.username}#${author.discriminator}`
        })
    }).catch(console.error)
};

module.exports = {
    method: invite
};
