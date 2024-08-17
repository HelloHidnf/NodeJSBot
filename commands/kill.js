const { Message, Client } = require("discord.js")

module.exports = {
    name: "kill",
    description: "!ADMIN!\nOnly usable by <@564423527923712000>",

    /**
     * @param {Message} message 
     * @param {Client} client
     */

    async execute(message, client){
        if(message.author.id === "410643436044156938"){
            await message.author.send("Bot stopped")
            process.exit()
        }
    }
}