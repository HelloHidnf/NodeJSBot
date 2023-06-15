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

    execute(message, client, args){
        if(message.member.roles.cache.has("988346073531707392")||message.member.roles.cache.has("988541799738015774")){
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