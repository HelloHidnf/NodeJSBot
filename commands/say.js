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

    execute(message, client, args, _, __, server){
        let access = false
        if(message.author.id === message.guild.ownerId) access = true
        else{
            for (role of server.adminRoles){
                if(message.member.roles.cache.has(role)){
                    access = true
                }
            }
        }


        let des = ""
        if (access){
            if(args[0] === undefined){
                message.channel.send("you have to add some text").then(msg => deleteMessage(msg, 5000))
                return
            }
            
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