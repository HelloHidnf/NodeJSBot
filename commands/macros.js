const { Message, EmbedBuilder, Client } = require("discord.js")
const fs = require("fs")
const { deleteMessage } = require("../modules")

module.exports = {
    name: "macros",
    description: "gives a list of macros",

    /**
     * @param {Message} message
     * @param {Client} client
     * @param {prefixf} prefixf
     */

    execute(message, prefixf){
        const embed = new EmbedBuilder()
        .setColor(0x00ffc8)
        .setTitle("Macros")
        const CommandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))

        for(const file of CommandFiles){
            const Command = require(`../commands/${file}`)
            if(!Command.description.includes("!ADMIN!") || (Command.description.includes("!ADMIN!") && message.channel.parentId === "1061658730418155522")){
                embed.addFields({ name: Command.name, value: Command.description })
            }
        }
        
        message.delete()
        message.channel.send({ embeds: [embed] }).then(msg => deleteMessage(msg, 20000))
    }
}