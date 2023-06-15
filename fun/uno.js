const { Message, Client, EmbedBuilder } = require("discord.js")

module.exports = {
    name: "uno",
    description: "uno :)",

    /**
     * @param {Message} message 
     * @param {Client} client 
     */

    execute(message, client){
        if (!message.content === "uno") return

        embed = new EmbedBuilder()
        .setTitle("Hey")
        .setDescription("Do you want to have [a fun game of uno](https://i.redd.it/pihobmhcl1k51.jpg)?")
	.setColor(0xffffff)

        if (message.author.id === "410643436044156938"){
            message.channel.send({ embeds: [embed] })
            message.delete()
        }
    }
}