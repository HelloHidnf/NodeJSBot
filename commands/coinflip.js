const { Message, EmbedBuilder } = require("discord.js")
const { deleteMessage } = require("../modules")

module.exports = {
    name: "coinflip",
    description: "this command does a coinflip, | to seporate the heads and tails, also, if you put a comma followed by a number, you get multiple coinflips",

    /**
     * @param {String[]} args
     * @param {Message} message 
     */

    execute(message, _, args){
        message.delete()

        let coin = 0
        let loop = args.join(" ").indexOf(",")
        let count = NaN
        if (loop != -1){
            count = args.join(" ").substring(loop+1, args.join(" ").length)
        }
        
        try{
            count = parseInt(count)
        }catch{}
        if(isNaN(count)) count = 1
        else if (count > 1000000){
            return message.channel.send("but why (cap is 1 million)").then(msg => {
                deleteMessage(msg, 5000)
            })
        }

        let tempnum = 0
        let number = 0

        for (let i = 0; i < count; i++){
            if (Math.round(Math.random())) coin++
            else coin--
        }

        let split = args.join(" ").indexOf("|")

        if (loop === -1){
            loop = `Tails: ${args.join(" ").substring(split+1, args.join(" ").length)}`
        }else loop = `Tails: ${args.join(" ").substring(split+1, loop)}`

        coinbed = new EmbedBuilder()
        .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
        .setColor(0x00ffc8)
        .setFooter({ text: `${coin}` })
        .setTimestamp()
        if(args[0] === undefined){
            if (coin < 0){
                coinbed.setTitle("Tails")
                .setDescription("No inputs given")
                .setImage("https://cdn.discordapp.com/attachments/988903771650285608/1067894529908297728/tails.png")
            }else if (coin > 0){
                coinbed.setTitle("Heads")
                .setDescription("No inputs given")
                .setImage("https://cdn.discordapp.com/attachments/988903771650285608/1067894529530806353/heads.png")
            }else{
                coinbed.setTitle("So unlikely you don't get an image of a coin")
                .setImage("https://media.discordapp.net/attachments/988903771650285608/1202721884874088499/image.png?ex=65ce7d0a&is=65bc080a&hm=56b243b9472b0bfc02e9eff9f364ed28872ab40ff61926fa2a85ebdce3c85390&=&format=webp&quality=lossless&width=235&height=168")
            }
        }
        else{
            if (coin < 0){
                coinbed.setTitle(loop)
                .setDescription(`Heads: ${args.join(" ").substring(0, split)}`)
                .setImage("https://cdn.discordapp.com/attachments/988903771650285608/1067894529908297728/tails.png")
            }else if (coin > 0){
                coinbed.setTitle(`Heads: ${args.join(" ").substring(0, split)}`)
                .setDescription(loop)
                .setImage("https://cdn.discordapp.com/attachments/988903771650285608/1067894529530806353/heads.png")
            }else{
                coinbed.setTitle("So unlikely you don't get an image of a coin")
                .setImage("https://media.discordapp.net/attachments/988903771650285608/1202721884874088499/image.png?ex=65ce7d0a&is=65bc080a&hm=56b243b9472b0bfc02e9eff9f364ed28872ab40ff61926fa2a85ebdce3c85390&=&format=webp&quality=lossless&width=235&height=168")
            }
        }

        message.channel.send({ embeds: [coinbed] })
    }
}