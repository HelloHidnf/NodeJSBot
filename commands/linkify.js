const fs = require("fs")
const FormData = require("form-data")
const fetch = require("node-fetch")
const { Message, Client, EmbedBuilder } = require("discord.js")
const { phaze } = require("../config.json")

module.exports = {
    name: "linkify",
    description: "turns an image into a link",

    /**
     * @param {Message} message 
     * @param {Client} client 
     * @param {String[]} args 
     */

    execute(message, client, args){
        const file = message.attachments.first()
        if (file === undefined){
            message.channel.send("You have to add an image for it to work")
        }
        else if(args[0] === undefined){
            message.channel.send("You have to add a channel id for it to work")
        }else{
            fetch(file.url).then(async data => {
                let form = new FormData();

                form.append('Content-Type', 'application/octet-stream');
                form.append('file', await data.buffer(), file.name);

                fetch('https://i.phazed.xyz/api/v1/upload', {
                    headers: {
                        key: phaze,
                    },
                    body: form,
                    method: 'PUT'
                })
                    .then(data => data.text())
                    .then(data => {
                        linkbed = new EmbedBuilder()
                        .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
                        .setImage(data)
                        .setTimestamp()
                        .setColor(0x00ffc8)
                        client.channels.fetch(args[0]).then(channel => {
                            channel.send({ embeds: [linkbed] })
                        })
                    })
            })
        }

        message.delete()
    }
}
