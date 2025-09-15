let oldDate = Date.now();
let errorCount = 0;

const mongoose = require("mongoose");
const { token, phaze, alty, reddit, mongodb, backgrounds } = require("./config.json");
const servers = require("./db/servers");
const { Client, GatewayIntentBits, Collection, MessageMentions, EmbedBuilder, ActivityType, RequestManager, RequestMethod, Options } = require("discord.js");
const fs = require("fs");
const { deleteMessage } = require("./modules");
const snoo = require("snoowrap");
const { createCanvas, GlobalFonts } = require("@napi-rs/canvas");
const ytdl = require("ytdl-core");
const cp = require("child_process");
const { default: ffmpegPath } = require("ffmpeg-static");
require("./background-command-files/index");

const user = new snoo(reddit);

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
});

GlobalFonts.registerFromPath("./fonts/gg sans Regular.ttf", "gg");
GlobalFonts.registerFromPath("./fonts/gg sans Semibold.ttf", "gg bold");
GlobalFonts.registerFromPath("./fonts/ggsans-NormalItalic.ttf", "gg italic");
GlobalFonts.registerFromPath("./fonts/NotoColorEmoji-Regular.ttf", "emojis");

client.Commands = new Collection();

const CommandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for(const file of CommandFiles){
    const Command = require(`./commands/${file}`);

    client.Commands.set(Command.name, Command);
};

client.Fun = new Collection();

const FunFiles = fs.readdirSync("./fun").filter(file => file.endsWith(".js"));

for(const file of FunFiles){
    const Fun = require(`./fun/${file}`);

    client.Fun.set(Fun.name, Fun);
};

let nomsglog = [];
fetch(alty).then(data => {
    data.json().then(thelog => {
        nomsglog = Object.keys(thelog);
    });
});

client.once("ready", () => {
    console.log(`Connected to ${client.user.username}\n${Date.now() - oldDate}ms/${(Date.now() - oldDate)/1000} seconds`);
    client.user.setActivity("chat | @ me for prefix", { type: ActivityType.Watching });
});

client.on("messageCreate", async message => {
    let server = await servers.findById(message.guildId);
    if (!server){
        server = await servers.create({
            _id: message.guildId,
            prefix: "-",
            adminRoles: [],
            memberRole: null,
            botRole: null,
            countingChannel: null,
            logChannel: null,
            noLogChannels: []
        });
    };

    //Prefix commands
    if(!message.author.bot && message.content.startsWith(server.prefix)){
        const args = message.content.slice(server.prefix.length).trim().split(/ +/);
        const CommandName = args.shift().toLowerCase();

        const Command = client.Commands.get(CommandName);

        if(Command){
            Command.execute(message, client, args, user, cp, server, nomsglog, backgrounds);
        };
    }
    //Non-Prefix commands
    else if(!message.author.bot && !message.content.startsWith(server.prefix)){
        const args = message.content.trim().split(/ +/);
        const FunName = args.shift().toLowerCase();
        
        const Fun = client.Fun.get(FunName);

        if(["night", "gn", "gnsd", "good night"].includes(message.content.toLowerCase())) message.channel.send("Good night!");
        if (message.content.toLowerCase().includes("fuck off <@836301182175281214>") || message.content.toLowerCase().includes(`fuck you <@836301182175281214>`)) message.reply("Rude >:(")
        else if (message.content === "<@836301182175281214>") message.reply(`Thats me, the current preset is ${server.prefix}, to find out the macros please do ${server.prefix}macros`)
        else if (Fun){
            Fun.execute(message, client, args);
        };
    };
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
    let server = await servers.findById(oldMessage.guildId);

    if(oldMessage.content === newMessage.content || newMessage.author.bot || server.noLogChannels.includes(newMessage.channel.id) || nomsglog.includes(oldMessage.content.toLowerCase()) || !server.logChannel) return;

    if(oldMessage.content.length > 1024) oldMessage.content = oldMessage.content.substring(0, 1024);
    if(newMessage.content.length > 1024) newMessage.content = newMessage.content.substring(0, 1024);

    const embed = new EmbedBuilder()
    .setTitle(`Message edited in #${newMessage.channel.name}`)
    .setURL(newMessage.url)
    .setAuthor({ name: newMessage.author.username, iconURL: newMessage.author.avatarURL() })
    .setColor(0x00ffc8)
    .setTimestamp()
    .addFields(
        { name: "Old Message", value: oldMessage.content },
        { name: "New Message", value: newMessage.content }
    );

    if (server.logChannel != null){
        oldMessage.guild.channels.fetch(server.logChannel)
        .then(channel => {
            channel.send({ embeds: [embed]});
            return;
        }).catch({ });
    };
});

client.on("messageDelete", async message => {
    let server = await servers.findById(message.guildId);

    if(server.noLogChannels.includes(message.channelId) || message.author.bot || message.system || message.content.startsWith(server.prefix) || nomsglog.includes(message.content.toLowerCase()) || !server.logChannel) return;

    var des = message.content;

    message.attachments.forEach(attachment => {
        des += `\n[${attachment.name}](${attachment.url})`;
    });

    if (message.stickers.first() != undefined){
        des += `\n<${message.stickers.first().name}>`;
    };

    const embed = new EmbedBuilder()
    .setTitle(`Message got deleted in #${message.channel.name}`)
    .setURL(message.channel.url)
    .setDescription(des)
    .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
    .setTimestamp()
    .setColor(0x00ffc8);

    if (server.logChannel != null){
        message.guild.channels.fetch(server.logChannel)
        .then(channel => {
            channel.send({ embeds: [embed]});
            return;
        }).catch({ });
    };
});

client.on("guildMemberAdd", async user => {
    let server = await servers.findById(user.guild.id);
    
    if(!server) return;
    if (!user.user.bot && server.memberRole){
        user.roles.add(server.memberRole);
    }
    else if (server.botRole){
        user.roles.add(server.botRole);
    };
});

client.on("guildCreate", async guild => {
    servers.create({
        _id: guild.id,
        prefix: "-",
        adminRoles: [],
        memberRole: null,
        botRole: null,
        countingChannel: null,
        logChannel: null,
        noLogChannels: []
    });
});

process.on("uncaughtException", error => {
    console.log(error.message);
    if (error.message === "fetch failed") return;
    let date = new Date();
    fs.writeFileSync(`logs/${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}.log`, error.stack);
    let json = JSON.parse(fs.readFileSync("config.json"));
    json["backgrounds"] = backgrounds;
    fs.writeFileSync("config.json", JSON.stringify(json, null, 2));
    client.channels.fetch("995931827476910110").then(channel => {
        channel.send(`<@410643436044156938>\n\`\`\`${error}\`\`\``);
    }).finally(message => {
        process.exit();
    });
});

process.on("SIGINT", () => {
    let json = JSON.parse(fs.readFileSync("config.json"));
    json["backgrounds"] = backgrounds;
    fs.writeFileSync("config.json", JSON.stringify(json, null, 2));
    process.exit();
})

mongoose.connect(mongodb).then(() => {
    console.log("connected to mongodb");
    client.login(token);
});