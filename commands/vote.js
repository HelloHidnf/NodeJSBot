const { Message, Client, EmbedBuilder } = require("discord.js")
const { deleteMessage } = require("../modules")

module.exports = {
    name: "vote",
    description: "Creates a message that people can react to (doesn't say anything after)",

    /**
     * @param {Message} message 
     * @param {Client} client 
     * @param {String[]} args 
     */

    execute(message, client, args){
        message.delete()
        if(args[0] === undefined){
            message.channel.send("you have to add something to vote on").then(msg => deleteMessage(msg, 5000))
            return
        }
        
        let embed = new EmbedBuilder()
        .setTitle("Vote")
        .setDescription(args.join(" "))
        .setTimestamp()
        .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL() })
        .setColor(0x00ffc8)
        
        message.channel.send({ embeds: [embed] }).then(msg => {
            msg.react("<:bluetick:1020263036910575656>")
            msg.react("<:bluex:1020263038215008288>")
        })
    }
}