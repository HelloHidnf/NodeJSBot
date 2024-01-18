const { Message, EmbedBuilder, Client } = require("discord.js")
const fs = require("fs")
const { deleteMessage } = require("../modules")

module.exports = {
    name: "macros",
    description: "gives a list of macros",

    /**
     * @param {Message} message
     * @param {Client} client
     */

    execute(message, _, __, ___, ____, server){
        let access = false
        if(message.author.id === message.guild.ownerId) access = true
        else{
            for (role of server.adminRoles){
                if(message.member.roles.cache.has(role)){
                    access = true
                }
            }
        }

        const embed = new EmbedBuilder()
        .setColor(0x00ffc8)
        .setTitle("Macros")
        const CommandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))

        for(const file of CommandFiles){
            const Command = require(`../commands/${file}`)
            if((!Command.description.includes("!ADMIN!") || !Command.description.includes("!MODERATOR!")) || ((Command.description.includes("!ADMIN!") || Command.description.includes("!MODERATOR!")) && (access))){
                if(!Command.description.includes("!QSUP!") || (Command.description.includes("!QSUP!") && message.guildId === "983033385721151538")) embed.addFields({ name: Command.name, value: Command.description })
            }
        }
        
        message.delete()
        message.channel.send({ embeds: [embed] }).then(msg => deleteMessage(msg, 20000))
    }
}