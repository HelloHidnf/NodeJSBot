const { Message, Client } = require("discord.js")
const { createCanvas } = require("@napi-rs/canvas")

module.exports = {
    name: "sort",
    description: "!ADMIN! sorts the channels in a specific category",

    /**
     * @param {Message} message 
     * @param {Client} client 
     * @param {String[]} args 
     */

    async execute(message, client, _, __, ___, server){
        let access = false
        if(message.author.id === message.guild.ownerId) access = true
        else{
            for (role of server.adminRoles){
                if(message.member.roles.cache.has(role)){
                    access = true
                }
            }
        }
        
        if(args[0] === undefined){
            message.channel.send("you have to add some text").then(msg => deleteMessage(msg, 5000))
            return
        }

        const canvas = createCanvas(1, 1)
        const context = canvas.getContext("2d")

        if(!access) return

        message.delete()

        let sort = []

        Array.from(message.channel.parent.children.cache.values()).forEach(channel => {
            sort.push(channel)
        })

        sort = sort.sort((a, b) => context.measureText(a.name).width - context.measureText(b.name).width)

        for(i=0; i<sort.length; i++){
            await sort[i].setPosition(i)
        }
    }
}