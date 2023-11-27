const { Message, Client } = require("discord.js")
const fs = require("fs")
const { deleteMessage } = require("../modules")

module.exports = {
    name: "nolog",
    description: "!ADMIN!\nAdds/removes the current channel you're in to a list of channels to not log",

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

        if(access){
            let channel = server.noLogChannels.indexOf(message.channelId)
            if (args[0] != "add" && args[0] != "remove"){
                message.channel.send("Please make sure to use the correct formatting: -nolog add/remove")
                return
            }
            if (args[0].toLowerCase() === "add"){
                if (channel === -1){
                    server.noLogChannels.push(message.channelId)
                    message.channel.send("channel added to no log list")
                }else{
                    message.channel.send("channel is already in no log list")
                }
            }else if (args[0].toLowerCase() === "remove"){
                if (channel != -1){
                    server.noLogChannels.splice(channel, 1)
                    message.channel.send("channel successfully removed from no log list")
                }else{
                    message.channel.send("channel isn't in the no log list")
                }
            }else{
                message.channel.send("please format your message as such: `-nolog add/remove`")
            }
            
            message.delete()
            server.save()
        }
    }
}