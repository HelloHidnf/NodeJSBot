const { Message, Client, EmbedBuilder } = require("discord.js")
const { deleteMessage } = require("../modules")

module.exports = {
    name: "suggest",
    description: "Suggest something to add to the bot",

    /**
     * @param {Message} message 
     * @param {Client} client 
     * @param {String[]} args
     */

    execute(message, client, args){
        if(args[0] === undefined){
            message.channel.send("you have to add something to suggest").then(msg => deleteMessage(msg, 5000))
            return
        }

        embed = new EmbedBuilder()
        .setTitle(`Suggestion from ${message.author.username} (${message.author.id})`)
        .setDescription(args.join(" "))
        .setTimestamp()
        .setColor(0x00ffc8)
        .setFooter({ text: `Suggestion from ${message.guild.name}` })
        .setThumbnail(message.guild.iconURL())

        message.delete()
        client.channels.cache.get("1020693775254814721").send({ embeds: [embed] })
    }
}