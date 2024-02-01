const { Message, Client, EmbedBuilder } = require("discord.js")

module.exports = {
    name: "creator",
    description: "information about the creator of this bot",

    /**
     * @param {Message} message 
     */

    execute(message){
        embed = new EmbedBuilder()
        .setTitle("Bot Creator")
        .setDescription("The bot creator is <@410643436044156938>, me, I do this for fun and this is my third bot, I am not good at english even though its my first and only language, in other words I'm stupid")
        .addFields(
            { name: "Socials", value: "[Twitch](https://www.twitch.tv/hellohidnf)\n[YouTube](https://www.youtube.com/channel/UChMrrmwVdde88CIV4ZH0_rw)\nI barely ever go live or upload so good luck trying to catch a stream" }
        )
        .setFooter({ text: "have fun with the bot ig" })
        .setTimestamp()
        .setColor(0x00ffc8)

        message.channel.send({ embeds: [embed] })
        message.delete()
    }
}