const globalMethods = require('../../common/useful/globalMethods');
const { updateGuild } = require('./updateGuild');
const { updateUser } = require('./updateUser');


module.exports = async function (bot) {
    setInterval(x => {
        updateGuild(bot)
        updateUser(bot)
    }, 1000 * 60 * 20);
    setInterval(x => {
        globalMethods.chanegeStatusActivity(bot)
    }, 1000 * 60 * 2);
}