const { Message, Client } = require("discord.js")
const { deleteMessage } = require("../modules")
const fs = require("fs")

module.exports = {
    name: "background",
    description: "displays the code for the specified commmand",

    /**
     * @param {Message} message 
     * @param {Client} client 
     * @param {String[]} args 
     */

    execute(message, _, args, __, ___, server, ____, backgrounds){
        if (message.attachments.size === 0 && args[1] === undefined && !args[1].includes("http")){
            message.reply("you need to attach a file/link").finally(msg => {
                deleteMessage(msg, 10000);
            });
            return;
        }
        let monitor = parseInt(args[0])
        if (monitor != 1 && monitor != 2){
            message.reply("you need to specify a screen (1 or 2)").then(msg => {
                deleteMessage(msg, 10000);
            });
            return;
        }
        if (message.attachments.size > 0){
            backgrounds[monitor-1] = message.attachments.first().url;
            fetch("http://localhost:4444", {
                "method": "POST",
                "body": backgrounds
            });
        }
        else{
            if (args[1].includes("-gif")){
                fetch(args[1]).then(response => {
                    response.text().then(html => {
                        html = html.substring(html.indexOf("image_src")+17);
                        backgrounds[monitor-1] = html.substring(0, html.indexOf(".gif")+4);
                        fetch("http://localhost:4444", {
                            "method": "POST",
                            "body": backgrounds
                        });
                    })
                })
            }else{
                backgrounds[monitor-1] = args[1];
                fetch("http://localhost:4444", {
                    "method": "POST",
                    "body": backgrounds
                });
            }
            
        };

    }
}