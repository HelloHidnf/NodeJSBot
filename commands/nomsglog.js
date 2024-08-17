const { Message, Client } = require("discord.js")
const { alty } = require("../config.json")

module.exports = {
    name: "nomsglog",
    description: "!ADMIN!!QSUP!\nfetches the website where the messages not to log are",

    /**
     * @param {Message} message 
     * @param {Client} client 
     * @param {String[]} args 
     */

    execute(message, client, args, _, __, server, nomsglog){
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
            message.delete()
            fetch(alty).then(data => {
                data.json().then(thelog => {
                    nomsglog = Object.keys(thelog)
                })
            })
        }
    }
}