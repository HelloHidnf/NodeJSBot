const { Message, Client, EmbedBuilder } = require("discord.js")

module.exports = {
    name: "uno",
    description: "uno :)",

    /**
     * @param {Message} message 
     * @param {Client} client 
     */

    execute(message){
        if (!message.content === "uno" && !message.author.id === "410643436044156938") return

        embed = new EmbedBuilder()
        .setTitle("Hey")
        .setDescription("Do you want to have [a fun game of uno](https://i.redd.it/pihobmhcl1k51.jpg)?")
	    .setColor(0xffffff)

        message.channel.send({ embeds: [embed] })
        message.delete()
    }
}