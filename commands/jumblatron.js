const { Message, Client } = require("discord.js")
const Canvas = require("@napi-rs/canvas")

module.exports = {
    name: "jumblatron",
    description: "the jumblatron jumbles your images (attach the image)",

    /**
     * @param {Message} message 
     * @param {Client} client 
     * @param {String[]} args 
     * @param {Canvas} Canvas
     */

    execute(message, client, args){
        if (message.attachments.size == 1){
            let image = message.attachments.first()
            let imagelink = Canvas.loadImage(image.url)
            let canvas = Canvas.createCanvas(image.width, image.height)
            let context = canvas.getContext("2d")

            
        }
    }
}