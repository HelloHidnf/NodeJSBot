const { Message, Client } = require("discord.js")
const { deleteMessage } = require("../modules")

module.exports = {
    name: "members",
    description: "!ADMIN!\nmakes sure every member in the server has the members role",

    /**
     * @param {Message} message 
     * @param {Client} client 
     * @param {String[]} args 
     */

    async execute(message, client, args, _, __, server){
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

        let num = 0
        if(server.memberRole){
            let count = message.guild.members.cache.filter(user => !user.user.bot && !user.roles.cache.has(server.memberRole)).size
            const c = await message.channel.send(`${num}/${count}`)
            message.guild.members.cache.filter(user => !user.user.bot && !user.roles.cache.has(server.memberRole)).forEach(async member => {
                await member.roles.add(server.memberRole)
                num+=1
                c.edit(`${num}/${count}`)
            })
            deleteMessage(c, 2000)
        }

        if(server.botRole){
            num = 0
            let count = message.guild.members.cache.filter(user => user.user.bot && !user.roles.cache.has(server.botRole)).size
            const c = await message.channel.send(`${num}/${count}`)
            message.guild.members.cache.filter(user => user.user.bot && !user.roles.cache.has(server.botRole)).forEach(async member => {
                await member.roles.add(server.botRole)
                num+=1
                c.edit(`${num}/${count}`)
            })
            message.delete()
            c.edit(`${num}/${count}, all roles added`)
            deleteMessage(c, 2000)
        }
    }
}