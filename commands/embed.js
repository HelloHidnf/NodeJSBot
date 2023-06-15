const { Message, EmbedBuilder, Client } = require("discord.js")

module.exports = {
    name: "embed",
    description: "its an embed test",

    /**
     * @param {Message} message 
     */

    execute(message){
        const embed = new EmbedBuilder()
        .setColor(0x00ffc8)
        .setTitle('Some title')
        .setURL('https://i.redd.it/fhoyry8rfl361.jpg')
        .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL(), url: "https://www.youtube.com/watch?v=kii-CstmMrk" })
        .setDescription('Some description here')
        .setThumbnail('https://i.redd.it/fhoyry8rfl361.jpg')
        .addFields(
            { name: 'Regular field title', value: 'Some value here' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Inline field title', value: 'Some value here', inline: true },
        )
        .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
        .setImage('https://i.redd.it/fhoyry8rfl361.jpg')
        .setTimestamp()
        .setFooter({ text: 'Some footer text here', iconURL: 'https://i.redd.it/fhoyry8rfl361.jpg' });
        message.channel.send({ embeds: [embed] })
        message.delete()
    }
}