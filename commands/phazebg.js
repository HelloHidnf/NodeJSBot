const { Message } = require("discord.js")
const { checkRole, deleteMessage } = require("../modules")
const fs = require("fs")

module.exports = {
    name: "phazebg",
    description: "Changes <@595628769138442250>s desktop background",

    /**
     * @param {Message} message 
     * @param {Client} client 
     * @param {String[]} args 
     */

    execute(message){
        let image = fetch(message.attachments.first().url, {
            headers: {
                "content-type": "application/json"
            }
        })
        
    }
}