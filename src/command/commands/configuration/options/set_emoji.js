const load = require("../../../../common/database/load");
const Tool = require("../../../../common/object/toolObject");
const smartEmbed = require("../../../../common/useful/smartEmbed");
const { save } = require("../../../../common/database/save");

const removeEmoji = async function () {
    this.tool.folder = 'configuration'
    if (this.params[3] === '--all')
        return await save(this.msg, 'emoji', 'X', this.tool)

    if (!this.emojiDatabase[this.params[3]])
        return smartEmbed(bot, msg, {
            description: `Błąd... nie ma danej w bazie danych`
        });
    await save(this.msg, this.params[3], 'X', this.tool);
};

module.exports = async (bot, msg, params) => {
    this.bot = bot
    this.msg = msg
    this.params = params
    const tool = new Tool(msg, {
        std: 'stdg',
        folder: `configuration.${msg.configurationOption}`
    })
    this.tool = tool
    this.emojiDatabase = await load(msg, tool)
    const role = msg.mentions.roles.first()

    if (params[2] === 'X') return await removeEmoji.call(this)
    if (!params[2])
        return smartEmbed(bot, msg, {
            description: `Błąd... nie podałeś id wiadomości pod którą ma być emoji`
        });
    if (params[2].length !== 18)
        return smartEmbed(bot, msg, {
            description: `Błąd... id wiadomości jest niepoprawne`
        });
    if (!params[3])
        return smartEmbed(bot, msg, {
            description: `Błąd... nie podałeś emoji`
        })
    if (!role)
        return smartEmbed(bot, msg, {
            description: `Błąd... nie podałeś roli, która ma być nadana po klinknięciu na emoji`
        });
    if (!params[5])
        return smartEmbed(bot, msg, {
            description: `Błąd... nie podałeś nazwy pod którą będzie wyszukiwana baza danych\n> np: emoji-user`
        });

    // TODO ^ return error 

    if (!this.emojiDatabase);
    let dane = {
        messageID: params[2],
        emoji: params[3],
        role: role.id,
        dataSet: new Date(),
        messageAdress: `https://discordapp.com/channels/${msg.guild.id}/${msg.channel.id}/${params[2]}`
    };

    await save(msg, params[5], dane, tool);
};

