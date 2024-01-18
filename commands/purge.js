const { Message } = require("discord.js")
const Canvas = require("@napi-rs/canvas")

module.exports = {
    name: "purge",
    description: "!MODERATOR!\ndeletes all messages below the message you reply to, including what you reply to, can only be up to 14 days old",

    /**
     * @param {Message} message 
     */

    execute(message, _, __, ___, ____, server){
        let access = false
        if(message.author.id === message.guild.ownerId) access = true
        else{
            for (role of server.adminRoles){
                if(message.member.roles.cache.has(role)){
                    access = true
                }
            }
        }

        if(!access) return
        
        try{
            message.channel.messages.fetch({ after: message.reference.messageId, limit: 100 }).then(messages => {
                message.channel.bulkDelete(messages.size+1)
            })
        }catch{
            message.reply("please reply to a message you want to delete to")
        }
    }
}