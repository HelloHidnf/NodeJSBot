const snoo = require("snoowrap")
const { Message, Client, EmbedBuilder } = require("discord.js")
const { deleteMessage } = require("../modules")

module.exports = {
    name: "reddit",
    description: "this is a command that grabs links from reddit, if the subreddit (not the post) you specify is nsfw it won't send",

    /**
     * @param {String[]} args
     * @param {snoo} user
     * @param {Message} message 
     * @param {Client} client 
     */

    async execute(message, client, args, user, _, server){
        message.delete()

        if(args[0] === undefined){
            message.channel.send("you have to add a subreddit").then(msg => deleteMessage(msg, 5000))
            return
        }

        let embed = new EmbedBuilder()
        .setDescription(`${message.author} used -reddit ${args[0]} ${args[1]}`)
        .setColor(0x00ffc8)
        .setTimestamp()

        client.channels.fetch(server.logChannel).then(channel => channel.send({ embeds: [embed] }))

        const sub = await user.getSubreddit(args[0]).fetch().catch(err => {
            message.channel.send(`${args[0]} isn't a valid subreddit`)
        })

        try{
            if (!sub.over18 || (sub.over18 && message.channel.nsfw)){
                let num = 1

                if(args[1]){
                    let temp = parseInt(args[1])
                    if (!isNaN(temp)){
                        if(temp > 25){
                            message.channel.send("the cap is 25, will only send that many").then(msg => {
                                deleteMessage(msg, 5000)
                            })
                            temp = 25
                        }
                        num = temp
                    }
                }

                let senid = ""

                try{
                    for (let i = 0; i < num; i++){
                        let post = (await sub.getRandomSubmission()).url
                        
                        if (post === undefined) i--
                        else senid += `${post} `
                        let args2 = senid.split(/ +/).filter(word => word.includes("https")).length
                        if (args2 === 5){
                            await message.channel.send(senid)
                            senid = ""
                        }
                    }

                    if (senid.length != 0) message.channel.send(senid)
                }catch{ message.channel.send("Couldn't get images") }
            }else(message.channel.send("no"))
        }catch{}
    }
}