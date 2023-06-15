const { Message, Client } = require("discord.js")
const config = require("../config.json")
const fs = require("fs")
const { File } = require("buffer")
const { deleteMessage } = require("../modules")

module.exports = {
    name: "nolog",
    description: "!ADMIN!\nAdds the current channel you're in to a list of channels to not log",

    /**
     * @param {Message} message 
     * @param {Client} client 
     * @param {String[]} args 
     */

    execute(message, client, args){
        if(message.member.roles.cache.has("988346073531707392") || message.author.id === "410643436044156938"){
            config.nolog.push(message.channelId)

            fs.writeFile("./config.json", JSON.stringify(config, null, 4), err => {
                if(err){
                    message.channel.send("write failed <:olikek:1062285888752726017>").then(msg => {
                        deleteMessage(msg, 5000)
                    })
                }else{
                    message.channel.send("channel added (hopefully)").then(msg => {
                        deleteMessage(msg, 5000)
                    })
                }
            })
            message.delete()
            let { nolog } = require("../config.json")
        }
    }
}