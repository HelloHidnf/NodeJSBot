const { Message, EmbedBuilder, Client, Emoji } = require("discord.js")

module.exports = {
    name: "emoji",
    description: "this is a test",

    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     */

    execute(message, client){
        message.reply(`this is a test of emojis and thier uses`).then(msg => msg.react("👍"))
    }
}