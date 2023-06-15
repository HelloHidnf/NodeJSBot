const { Message, Client } = require("discord.js")

module.exports = {
    name: "kill",
    description: "!ADMIN!\nOnly usable by <@564423527923712000>",

    /**
     * @param {Message} message 
     * @param {Client} client
     */

    execute(message, client){
        if(message.author.id === "564423527923712000"){
            client.users.fetch("410643436044156938").then(async user => {
                await user.send("bot stopped")
                process.exit()
            })
        }
    }
}