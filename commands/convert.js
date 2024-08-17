const { Message, Client } = require("discord.js")
const ytdl = require("ytdl-core")
const fs = require("fs")
const cp = require("child_process")
const { deleteMessage } = require("../modules")
const zlip = require("zlib")
const urlLib = require("url")
const https = require("https")

module.exports = {
    name: "convert",
    description: "converts a youtube link to an mp4",

    /**
     * @param {Message} message 
     * @param {Client} client 
     * @param {String[]} args 
     * @param {cp} cp
     */

    async execute(message, client, args, _, cp){
        let percent = 0
        message.delete()
        if(!ytdl.validateURL(args[0])){
            return message.channel.send("that isn't a youtube link").then(msg => {
                deleteMessage(msg, 30000)
            })
        }
        try{
            ytdl(args[0], {filter: "audioonly"}).pipe(fs.createWriteStream("./videos/video.mp3"))
            ytdl(args[0], {filter: "videoonly"}).pipe(fs.createWriteStream(`./videos/video.mp4`)).once("close", async () => {
                const bit = 150000000/parseInt((await ytdl.getBasicInfo(args[0])).videoDetails.lengthSeconds)

                cp.spawn("ffmpeg", [
                    "-i", `${__dirname}/../videos/video.mp3`,
                    "-i", `${__dirname}/../videos/video.mp4`,
                    "-b", `${bit}`,
                    "-vcodec", "h264",
                    "-acodec", "aac",
                    "-y",
                    `${__dirname}/../videos/output.mp4`
                ]).once("exit", () => {
                    message.channel.send({
                        files: ["./videos/output.mp4"]
                    })
                })
            })
        }catch{
            message.channel.send("internet problems").then(msg => {
                deleteMessage(msg, 30000)
            })
        }
    }
}