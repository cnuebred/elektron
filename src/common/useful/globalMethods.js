const { guild } = require("../../event/base/reactionAdd");

module.exports = GlobalMethods = {
    constructor(options = null) {
        this.options = options
    },
    async algorithmLevel(lvl) {
        return Math.floor(10 + (lvl * (lvl * 2 + Math.pow(lvl, 2))) * 3 / (Math.log2(lvl + 2)))
    },
    isGuild(msg) {
        return (msg.channel.type === 'dm');
    },
    generateRandomNumber(max, min = 0) {
        return Math.floor(Math.random() * max) + min
    },
    time(time) {
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();
        let days = time.getDate();
        let months = [time.getMonth() + 1];
        months.toString().length < 2
            ? (months = `0${months}`)
            : (months = months);
        minutes.toString().length < 2
            ? (minutes = `0${minutes}`)
            : (minutes = minutes);
        seconds.toString().length < 2
            ? (seconds = `0${seconds}`)
            : (seconds = seconds);
        hours.toString().length < 2
            ? (hours = `0${hours}`)
            : (hours = hours);
        let year = time.getFullYear();
        const date = `${year}.${months}.${days} ${hours}:${minutes}:${seconds}`;

        return date;
    },
    findEmoji(bot, id) {
        return bot.emojis.cache.find(x => x.id === id)
    },
    findUser(bot, id) {
        if (!id) return
        const user = bot.users.cache.find(x => x.id === id)
        return user ? user : null
    },
    findMember(guild, id) {
        guild = guild.guild || guild
        if (!id) id = msg.author.id
        const member = guild.members.cache.find(x => x.id === id)
        return member ? member : null
    },
    findRole(msg, id) {
        if (id && id.startsWith('<')) id = id.slice(id.indexOf('&') + 1, id.indexOf('>'))
        const role = msg.guild.roles.cache.find(x => x.id === id);
        return role ? role : null
    },
    findChannel(guild, id) {
        const channel = guild.channels.cache.find(x => x.id === id);
        return channel ? channel : null;
    },
    async findGuild(bot, id) {
        const guild = await bot.guild.cache.find(x => x.id === id)
        return guild ? guild : null
    },
    removePrefixAndSplit(content, prefix) {
        content = content.slice(prefix.length, content.length)
        content = content.split(' ')
        content = content.filter((element, index, array) => {
            return element !== ''
        })
        console.log(content)
        return content
    },
    async getGuilds(bot, options = null) {
        const guildsArray = await bot.guilds.cache.map(guilds => {
            if (options) guilds = guilds[options]
            return guilds
        })
        return guildsArray
    },
    async getUsers(bot, options = null) {
        const usersArray = await bot.users.cache.map(users => {
            if (options) users = users[options]
            return users
        });
        return usersArray
    },
    randomColor() {
        let min = 1
        let max = 255
        return [
            generateRandomNumber(max, min),
            generateRandomNumber(max, min),
            generateRandomNumber(max, min)
        ];
    },
    chanegeStatusActivity(bot) {
        let randomActivity = Math.floor(Math.random() * 4) + 0
        let randomStatus = Math.floor(Math.random() * 4) + 0
        let activity = ['WATCHING', 'LISTENING', 'STREAMING', 'PLAYING']
        let status = [';help', bot.user.tag, 'version 1.0']

        bot.user.setActivity(status[randomStatus], {
            type: activity[randomActivity]
        })
    }
}