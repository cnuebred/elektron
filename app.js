const discord = require("discord.js");
const bot = new discord.Client();
const connect = require("./src/common/database/connect/connectMongodb")
const { messageEvent } = require("./src/event/base/message")
const globalVaribles = require("./src/common/object/globalVaribles")
const { reactionAdd } = require("./src/event/base/reactionAdd")
const { reactionRemove } = require("./src/event/base/reactionRemove");
const { addGuild } = require("./src/event/base/addGuild");
const { removeGuild } = require("./src/event/base/removeGuild");
const { addUser } = require("./src/event/base/userJoin");
const clock = require("./src/event/create/clock");
'use strict'

require("dotenv").config() // add permission to .env file
connect() //connect to mongo database

bot.on("ready", async () => {
    console.log("I'm active")
    clock(bot)
})

bot.on("message", async (message) => {
    if (message.type == 'GUILD_MEMBER_JOIN') {
        addUser(message.author, message.guild)
    }
    messageEvent(bot, message)
})
bot.on("raw", (e) => {
    if (!globalVaribles.EVENTS.hasOwnProperty(e.t)) return;
    console.log(e.d)
    let data = {
        user: e.d.user_id,
        message: e.d.message_id,
        guild: e.d.guild_id,
        emoji: e.d.emoji,
    };
    Object.assign(e, data)
    if (e.t === "MESSAGE_REACTION_ADD") reactionAdd(bot, e)
    else reactionRemove(bot, e)
})
bot.on('guildCreate', async guild => {
    addGuild(guild)
})
bot.on('guildDelete', async guild => {
    removeGuild(guild)
})
bot.login(process.env.SECRET_BOT_TOKEN)
