const { Message, Client } = require("discord.js")
const { alty } = require("../config.json")

module.exports = {
    name: "nomsglog",
    description: "!ADMIN!\nfetches the website where the messages not to log are",

    /**
     * @param {Message} message 
     * @param {Client} client 
     * @param {String[]} args 
     */

    execute(message, client, args, _, __, ___, nomsglog){
        if(message.member.roles.cache.has("988346073531707392") || message.author.id === "410643436044156938"){
            message.delete()
            fetch(alty).then(data => {
                data.json().then(thelog => {
                    nomsglog = Object.keys(thelog)
                })
            })
        }
    }
}