const { Message, Client } = require("discord.js")
const { deleteMessage } = require("../modules")

module.exports = {
    name: "code",
    description: "displays the code for the specified commmand",

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

        if((access) && !args[0].includes(".")){
            try{
                const code = require(`../commands/${args[0]}.js`)
                message.reply(`\`\`\`js\n${code.execute}\`\`\``)
            }catch{
                message.reply(`${args[0]} isn't a valid command`).then(msg => {
                    deleteMessage(msg, 30000)
                })
            }
        }
    }
}