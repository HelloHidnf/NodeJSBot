const { Message, EmbedBuilder } = require("discord.js")

module.exports = {
    name: "coinflip",
    description: "this command does a coinflip, | to seporate the heads and tails, also, if you put a comma followed by a number, you get multiple coinflips",

    /**
     * @param {String[]} args
     * @param {Message} message 
     */

    execute(message, _, args){
        message.delete()

        let head = 0
        let tail = 0
        let loop = args.join(" ").indexOf(",")
        let count = NaN
        if (loop != -1){
            count = args.join(" ").substring(loop+1, args.join(" ").length)
        }
        
        try{
            count = parseInt(count)
        }catch{}
        if(isNaN(count)) count = 1
        else if (count > 1000000) return message.reply("but why (cap is 1 million)")

        let tempnum = 0
        let number = 0

        for (let i = 0; i < count; i++){
            tempnum = Math.random() * 1
            number = Math.round(tempnum)
    
            if (number === 0) tail++
            else head++
        }

        let split = args.join(" ").indexOf("|")

        if (loop === -1){
            loop = `Tails: ${args.join(" ").substring(split+1, args.join(" ").length)}`
        }else loop = `Tails: ${args.join(" ").substring(split+1, loop)}`

        coinbed = new EmbedBuilder()
        .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
        .setColor(0x00ffc8)
        .setFooter({ text: `${head}|${tail}` })
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
                coinbed.setTitle(loop)
                .setDescription(`Heads: ${args.join(" ").substring(0, split)}`)
                .setImage("https://cdn.discordapp.com/attachments/988903771650285608/1067894529908297728/tails.png")
            }else{
                coinbed.setTitle(`Heads: ${args.join(" ").substring(0, split)}`)
                .setDescription(loop)
                .setImage("https://cdn.discordapp.com/attachments/988903771650285608/1067894529530806353/heads.png")
            }
        }

        message.channel.send({ embeds: [coinbed] })
    }
}