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

    async execute(message, client, args){
        if(!message.member.roles.cache.has("988346073531707392")) return
        let num = 0
        let count = message.guild.members.cache.filter(user => !user.user.bot && !user.roles.cache.has("991027323174289418")).size
        const c = await message.channel.send(`${num}/${count}`)
        message.guild.members.cache.filter(user => !user.user.bot && !user.roles.cache.has("991027323174289418")).forEach(async member => {
            await member.roles.add("991027323174289418")
            num+=1
            c.edit(`${num}/${count}`)
        })

        num = 0
        count = message.guild.members.cache.filter(user => user.user.bot && !user.roles.cache.has("988390823232176158")).size
        message.guild.members.cache.filter(user => user.user.bot && !user.roles.cache.has("988390823232176158")).forEach(async member => {
            await member.roles.add("988390823232176158")
            num+=1
            c.edit(`${num}/${count}`)
        })
        message.delete()
        c.edit(`${num}/${count}, all roles added`)
        deleteMessage(c, 2000)
    }
}