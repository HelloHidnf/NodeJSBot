const { Message } = require("discord.js")
const config = require("../config.json")
const fs = require("fs")
const { deleteMessage } = require("../modules")

module.exports = {
    name: "logchannel",
    description: "!ADMIN! sets the log channel of the server",

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

        if(access){
            server.logChannel = message.channelId

            message.delete()
            message.channel.send("# This is now the log channel")
            server.save()
        }
    }
}