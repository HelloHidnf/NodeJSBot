const { Message, Client } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Ping Pong :)",

    /**
     * @param {Message} message 
     */

    execute(message){
        if (message.content.toLowerCase() != "ping") return
        message.channel.send("Pong")
    }
}