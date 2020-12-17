const getContainer = require("../../../commandContainer");
const globalVaribles = require("../../../../common/object/globalVaribles");
const smartEmbed = require("../../../../common/useful/smartEmbed");
const Tool = require("../../../../common/object/toolObject");
const load = require("../../../../common/database/load");
const { save } = require("../../../../common/database/save");

const point = '#'
const timeoutMessageAwait = 8000

const getPermission = async function () {
    let i = 0
    let param = this.replyCommandPermission.content.split(' ')
    let number = param[0].slice(param[0].indexOf(point) + 1)
    if (/\D/gi.test(number)) return 'err'
    if (Number(number) > this.commandsAllDatabase.length) return 'err'
    for (command of this.commandsAllDatabase) {
        i++
        if (!(i === Number(number))) continue
        this.roleCommand = command
        break
    }
};

const awaitDataPermission = async function () {
    const filter = message =>
        message.content.startsWith(point) && message.author.id === this.msg.author.id

    await this.msg.channel
        .awaitMessages(filter, { max: 5, time: timeoutMessageAwait })
        .then(async collected => {
            collected = await collected.array()
            if (!collected[0])
                return smartEmbed(this.bot, this.msg, {
                    description: `Odpowiedź powinna wygladać np. **${point}4** oraz powinna być napisana przez autora komendy`, color: [204, 75, 75]
                })
            for (replyCommandPermission of collected) {
                this.replyCommandPermission = replyCommandPermission
                let firstItem = await getPermission.call(this)
                if (firstItem === 'err') continue
                await saveDataPermission.call(this)
            }
            if (this.saved)
                await smartEmbed(this.bot, this.msg, {
                    description: `**Pomyślnie zapisano uprawnienia**\n> Aby je sprawdzić wpisz ;load permission`
                });
        })
        .catch(collected => {
            smartEmbed(this.bot, this.msg, {
                description: `Nie zdążyłeś... wpisz komendę ponownie`
            });
        });
}

const saveDataPermission = async function () {
    const tool = new Tool(this.msg, {
        std: 'stdg',
        folder: `configuration.${this.msg.configurationOption}`
    })

    let commandsDatabase = await load(this.msg, tool)
    if (commandsDatabase)
        commandsDatabase = commandsDatabase[`${this.role}-commands`]

    if (commandsDatabase) {
        if (commandsDatabase.includes(this.roleCommand))
            return smartEmbed(this.bot, this.msg, {
                description: `Błąd... to uprawnienie do **${this.roleCommand}** jest już w bazie danych tej roli - **${this.role}**`
            })
        commandsDatabase.push(this.roleCommand)
    } else
        commandsDatabase = [this.roleCommand]

    if (this.params === 'X')
        commandsDatabase.splice(0, commandsDatabase.length)

    this.saved = true
    await save(msg, `${this.role}-commands`, commandsDatabase, tool)
}

module.exports = async (bot, msg, params) => {
    const commandsFolder = (await getContainer()).admin
    this.commandsAllDatabase = Object.getOwnPropertyNames(commandsFolder)

    this.bot = bot
    this.msg = msg
    this.params = params

    var description = ``
    var i = 1

    for (command of this.commandsAllDatabase) {
        let category = commandsFolder[command].category;
        description += `#${i} ${command}┊${category}\n`
        i++
    }

    const informationEmbed = {
        description: description,
        footer: `Aby dodać uprawnienie wpisz '${point}{number uprawnienia}' | Jeśli chcesz dodac więcej niż jedno uprawnienie, napisz je w następnej wiadomości`
    };

    if (!globalVaribles.PERMISSIONS_ROLES.includes(params[2])) {
        Object.assign(informationEmbed, {
            title: `Pomoc`,
            field: {
                title: `Wybierz role`,
                description: `do jakiej roli chcesz dodać uprawnienia\n> >save permission (${globalVaribles.PERMISSIONS_ROLES.join(
                    ' **LUB** '
                )})`
            }
        })
        return smartEmbed(bot, msg, informationEmbed)
    }

    this.role = params[2]

    if (params[3] === 'X')
        return saveDataPermission.call(this)

    smartEmbed(bot, msg, informationEmbed)
    await awaitDataPermission.call(this)
}