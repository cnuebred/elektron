const globalVaribles = require('../../../common/object/globalVaribles')
const getContainer = require('../../commandContainer');
const smartEmbed = require('../../../common/useful/smartEmbed');
const globalMethods = require('../../../common/useful/globalMethods');

const commandsList = async (folder, getArray = false) => {
    let arrayFolder = Object.getOwnPropertyNames(folder)
    if (getArray)
        return arrayFolder
    let commandsFormatList = `Prefix do komend: **${globalVaribles.PREFIX}** \n`;
    for (let command of arrayFolder) {
        commandsFormatList += `\`${command}\`, `;
    }
    commandsFormatList = commandsFormatList.slice(0, commandsFormatList.length - 2)
    return await commandsFormatList;
};

const main = async (bot, msg, params) => {
    const commandContainer = await getContainer()
    let arrayUserCommand = await commandsList(commandContainer.user, true)
    let arrayAdminCommand = await commandsList(commandContainer.admin, true)

    let listUserCommand = await commandsList(commandContainer.user)
    listUserCommand = arrayUserCommand.length == 0 ? '**Niestety, nie ma jeszcze komend dla użytkowników** 🤨' : listUserCommand
    let listAdminCommand = await commandsList(commandContainer.admin)
    listAdminCommand = arrayAdminCommand.length == 0 ? '**Niestety, nie ma jeszcze komend dla administratorów** 🤨' : listAdminCommand

    let getRandomCommand = 'help'
    if (arrayUserCommand.length !== 0)
        getRandomCommand = arrayUserCommand[globalMethods.generateRandomNumber(arrayUserCommand.length - 1)]

    smartEmbed(bot, msg, {
        title: `**Lista dostępnych komend**`,
        author: 'bot',
        description: ``,
        color: '#7698EB',
        thumbnail: bot.user.avatarURL(),
        field1: {
            title: `Komendy dla użytkowników`,
            description: listUserCommand
        },
        field2: {
            title: `Komendy dla administratorów`,
            description: listAdminCommand
        },
        field3: {
            title: `Aby otrzymać więcej informacji`,
            description: `wpisz wybraną komendę z dopiskiem \`--help\`\n>>> **Przykład:**\n \`${globalVaribles.PREFIX}${getRandomCommand} --help\``
        },
    })
}

module.exports = {
    method: main
}
