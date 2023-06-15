const { Message, Client } = require("discord.js")

module.exports = {
    name: "user",
    description: "Gets a users information(please don't use, has a high chance of breaking)",

    /**
     * @param {Message} message 
     * @param {Client} client 
     * @param {String[]} args 
     */

    execute(message, client, args){
        if(message.mentions.users.size){
            let Target = message.mentions.users.first()
            message.channel.send(`Username: ${Target.username}\nId: ${Target.id}\nIs bot: ${Target.bot}\nCreated at: ${Target.createdAt}\n${Target.avatarURL()}`)
            message.delete()
        }
    }
}