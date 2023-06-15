const { Message, EmbedBuilder } = require("discord.js")

module.exports = {
    name: "coinflip",
    description: "this command does a coinflip, | to seporate the heads and tails",

    /**
     * @param {String[]} args
     * @param {Message} message 
     */

    execute(message, _, args){
        message.delete()



        let tempnum = Math.random() * 1
        let number = Math.round(tempnum)
        let split = args.join(" ").indexOf("|")

        coinbed = new EmbedBuilder()
        .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
        .setColor(0x00ffc8)
        .setFooter({ text: tempnum.toString() })
        .setTimestamp()
        if(args[0] === undefined){
            if (number === 0){
                coinbed.setTitle("Tails")
                .setDescription("No inputs given")
                .setImage("https://cdn.discordapp.com/attachments/988903771650285608/1067894529908297728/tails.png")
            }else{
                coinbed.setTitle("Heads")
                .setDescription("No inputs given")
                .setImage("https://cdn.discordapp.com/attachments/988903771650285608/1067894529530806353/heads.png")
            }
        }
        else{
            if (number === 0){
                coinbed.setTitle(`Tails: ${args.join(" ").substring(split+1, args.join(" ").length)}`)
                .setDescription(`Heads: ${args.join(" ").substring(0, split)}`)
                .setImage("https://cdn.discordapp.com/attachments/988903771650285608/1067894529908297728/tails.png")
            }else{
                coinbed.setTitle(`Heads: ${args.join(" ").substring(0, split)}`)
                .setDescription(`Tails: ${args.join(" ").substring(split+1, args.join(" ").length)}`)
                .setImage("https://cdn.discordapp.com/attachments/988903771650285608/1067894529530806353/heads.png")
            }
        }

        message.channel.send({ embeds: [coinbed] })
    }
}