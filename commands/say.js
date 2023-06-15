const { Message, Client } = require("discord.js")
const { checkRole, deleteMessage } = require("../modules")

module.exports = {
    name: "say",
    description: "!ADMIN!\nrepeats everything after the command",

    /**
     * @param {Message} message 
     * @param {Client} client 
     * @param {String[]} args 
     */

    execute(message, client, args){
        if(args[0] === undefined){
            message.channel.send("you have to add some text").then(msg => deleteMessage(msg, 5000))
            return
        }
        let des = ""
        if ((message.member.roles.cache.has("988541799738015774") && message.guildId === "988446971461247027") || (message.member.roles.cache.has("988346073531707392") && message.guildId === "983033385721151538")){
            if (message.stickers.first() != undefined){
                des += `\n<${message.stickers.first().name}>`
            }
        
            message.attachments.forEach(file => {
                des += `\n${file.url}`
            })
            
            message.channel.send(args.join(" ") + des)
            message.delete()
        }
    }
}