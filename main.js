const initialt = Date.now()

const { token, test, qu, phaze, alty, reddit } = require("./config.json")
const { Client, GatewayIntentBits, Collection, MessageMentions, EmbedBuilder, ActivityType, RequestManager, RequestMethod } = require("discord.js")
const fs = require("fs")
const { deleteMessage } = require("./modules")
const snoo = require("snoowrap")
const { createCanvas } = require("@napi-rs/canvas")
const ytdl = require("ytdl-core")
const cp = require("child_process")
const { default: ffmpegPath } = require("ffmpeg-static")
let { nolog } = require("./config.json")
const { error } = require("console")

const user = new snoo(reddit)



const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions
    ]
})

const prefix = "-"

client.Commands = new Collection()

const CommandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))

for(const file of CommandFiles){
    const Command = require(`./commands/${file}`)

    client.Commands.set(Command.name, Command)
}

client.Fun = new Collection()

const FunFiles = fs.readdirSync("./fun").filter(file => file.endsWith(".js"))

for(const file of FunFiles){
    const Fun = require(`./fun/${file}`)

    client.Fun.set(Fun.name, Fun)
}

let nomsglog = []
fetch(alty).then(data => {
    data.json().then(thelog => {
        nomsglog = Object.keys(thelog)
    })
})

client.once("ready", () => {
    console.log(`Connected to ${client.user.username}\n${Date.now() - initialt}ms/${(Date.now() - initialt)/1000} seconds`)
    client.user.setActivity("chat | @ me for prefix", { type: ActivityType.Watching })
})

client.on("messageCreate", message => {
    //Prefix commands

    if(!message.author.bot && message.content.startsWith(prefix)){
        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const CommandName = args.shift().toLowerCase()

        const Command = client.Commands.get(CommandName)

        if(Command){
            Command.execute(message, client, args, user, cp, nolog, nomsglog)
        }
    }
    //Non-Prefix commands
    else if(!message.author.bot && !message.content.startsWith(prefix)){
        const args = message.content.trim().split(/ +/)
        const FunName = args.shift().toLowerCase()
        
        const Fun = client.Fun.get(FunName)

        if(["night", "gn", "gnsd", "good night"].includes(message.content.toLowerCase())) message.channel.send("Good night!")
        if (message.content.toLowerCase().includes("fuck off <@836301182175281214>") || message.content.toLowerCase().includes(`fuck you <@836301182175281214>`)) message.reply("Rude >:(")
        else if (message.content === "<@836301182175281214>") message.reply(`Thats me, the current preset is ${prefix}, to find out the macros please do ${prefix}macros`)
        else if (Fun){
            Fun.execute(message, client, args)
        }
        
    }
})

client.on("messageUpdate", (oldMessage, newMessage) => {
    if(oldMessage.content === newMessage.content || newMessage.author.bot || nolog.includes(newMessage.channel.id) || nomsglog.toLowerCase().includes(oldMessage.content)) return

    if(oldMessage.content.length > 1024) oldMessage.content = oldMessage.content.substring(0, 1024)
    if(newMessage.content.length > 1024) newMessage.content = newMessage.content.substring(0, 1024)

    const embed = new EmbedBuilder()
    .setTitle(`Message edited in #${newMessage.channel.name}`)
    .setURL(newMessage.url)
    .setAuthor({ name: newMessage.author.username, iconURL: newMessage.author.avatarURL() })
    .setColor(0x00ffc8)
    .setTimestamp()
    .addFields(
        { name: "Old Message", value: oldMessage.content },
        { name: "New Message", value: newMessage.content }
    )

    if(newMessage.guildId === "988446971461247027"){
        newMessage.guild.channels.fetch(test)
        .then(channel => {
            channel.send({ embeds: [embed] })
            return
        }).catch({ })
    }

    else if(newMessage.guildId === "983033385721151538"){
        newMessage.guild.channels.fetch(qu)
        .then(channel => {
            channel.send({ embeds: [embed] })
            return
        }).catch({ })
    }
})

client.on("messageDelete", message => {
    if(nolog.includes(message.channel.id) || message.author.bot || message.system || message.content.startsWith(prefix) || nomsglog.toLowerCase().includes(message.content)) return
    var des = message.content

    message.attachments.forEach(attachment => {
        des += `\n[${attachment.name}](${attachment.url})`
    })

    if (message.stickers.first() != undefined){
        des += `\n<${message.stickers.first().name}>`
    }

    const embed = new EmbedBuilder()
    .setTitle(`Message got deleted in #${message.channel.name}`)
    .setURL(message.channel.url)
    .setDescription(des)
    .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
    .setTimestamp()
    .setColor(0x00ffc8)

    if(message.guildId === "988446971461247027"){
        message.guild.channels.fetch(test)
        .then(channel => {
            channel.send({ embeds: [embed]})
            return
        }).catch({ })
    }

    else if(message.guildId === "983033385721151538"){
        message.guild.channels.fetch(qu)
        .then((channel) => {
            channel.send({ embeds: [embed]})
            return
        }).catch({ })
    }
})

client.on("guildMemberAdd", user => {
    if (!user.user.bot && user.guild.id === "983033385721151538"){
        user.roles.add("991027323174289418")
        return
    }
    //test server
    else if (user.guild.id === "988446971461247027"){
        user.roles.add("988542205394300949")
    }
    //quest supporters
    else if (user.guild.id === "983033385721151538"){
        user.roles.add("988390823232176158")
    }
})

process.on("uncaughtException", error => {
    client.channels.fetch(test).then(channel => {
        channel.send(`<@410643436044156938>\n\`\`\`${error}\`\`\``)
    })
})

client.login(token)