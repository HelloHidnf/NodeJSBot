const { Message, Client, AttachmentBuilder } = require("discord.js");
const { createCanvas, loadImage, Image, GlobalFonts } = require("@napi-rs/canvas");
const { Messages } = require("../modules");

async function getMessages(msg, arg){
    let messages = new Messages;
    messages.avatars = [];
    messages.messages = [];
    messages.images = [];

    let msg = await message.fetchReference()

    if (arg > 1){
        messagelist = (await message.channel.messages.fetch({ before: message.reference.messageId, limit: arg-1 })).reverse();
    };

    for (let i = 0; i < messagelist.size; i++){
        timemessage = messagelist.at(i);

        if (timemessage.reference){
            if (yaxis > 10) yaxis += 40;

            messages.message.reply = true;
            messages.message.replyContent = await timemessage.fetchReference();
            messages.message.replyAuthor = messages.message.replyContent.author;

            yaxis += 20;

            width = Math.ceil(context.measureText(messages.message.replyContent.member.displayName).width);

            context.font = "15px gg, emojis";
            context.fillStyle = "#ffff";
            if (reply.attachments.size && reply.cleanContent === ""){
                context.fillText("attachment", 85+width, yaxis);

                maxx = Math.max(Math.ceil(context.measureText("attachment").width)+85+width, maxx);
            }else{
                context.fillText(reply.cleanContent, 85+width, yaxis);

                maxx = Math.max(Math.ceil(context.measureText(reply.cleanContent).width)+85+width, maxx);
            };

            maxx = Math.max(Math.ceil(context.measureText(reply.cleanContent).width)+85+width, maxx);
            replying = true;
            yaxis += 5;
        };
        if (timemessage.author.id != lastuser || replying){
            if (yaxis > 10 && !replying) yaxis += 40;
            positions.push([yaxis, await loadImage(timemessage.member.displayAvatarURL())])

            context.font = "20px gg bold, emojis";
            if (timemessage.member.roles.color === null){
                context.fillStyle = "#ffff";
            }else{
                context.fillStyle = timemessage.member.roles.color.hexColor;
            };
    
            context.fillText(timemessage.member.displayName, 80, yaxis+=20);
            maxx = Math.max(Math.ceil(context.measureText(timemessage.member.displayName).width)+80, maxx);

            lastuser = timemessage.author.id
            replying = false;
        };

        currentMessage = timemessage.cleanContent.split("\n");
        context.font = "20px gg, emojis";
        context.fillStyle = "#ffff";
        
        currentMessage.forEach(content => {
            context.fillText(content, 80, yaxis+=25);
        });
        if (timemessage.attachments.size > 0){
            if (timemessage.attachments.first().contentType.includes("image")){
                let img = await loadImage(timemessage.attachments.first().url);
                
                if (img.width < 400 && img.height < 400){
                    width = img.width;
                    height = img.height;
                }
                else if (img.width - img.height){
                    ratio = img.width/img.height;
                    width = 400*ratio;
                    height = 400;
               }else{
                   ratio = img.height/img.width;
                   width = 400;
                   height = 400*ratio;
               }

               if (timemessage.cleanContent.length === 0){
                   context.drawImage(img, 80, yaxis-=10, width, height);
               }else{
                   context.drawImage(img, 80, yaxis+=10, width, height);
               };
               maxx = Math.max(width+80, maxx);
               yaxis += height;
            };
        };
        
        maxx = Math.max(Math.ceil(context.measureText(timemessage.cleanContent).width)+80, maxx);
    };

    if (msg.reference){
        if (yaxis > 10) yaxis += 40;

        let reply = await msg.fetchReference();

        context.font = "15px gg bold, emojis";
        if (reply.member.roles.color === null){
            context.fillStyle = "#ffff";
        }else{
            context.fillStyle = reply.member.roles.color.hexColor;
        };
        context.fillText(reply.member.displayName, 80, yaxis += 20);

        width = Math.ceil(context.measureText(reply.member.displayName).width);

        context.font = "15px gg, emojis";
        context.fillStyle = "#ffff";
        if (reply.attachments.size && reply.cleanContent === ""){
            context.fillText("attachment", 85+width, yaxis);

            maxx = Math.max(Math.ceil(context.measureText("attachment").width)+85+width, maxx);
        }else{
            context.fillText(reply.cleanContent, 85+width, yaxis);

            maxx = Math.max(Math.ceil(context.measureText(reply.cleanContent).width)+85+width, maxx);
        };

        replying = true;
        yaxis += 5;
    };
    if (msg.author.id != lastuser || replying){
        if (yaxis > 10 && !replying) yaxis += 40;
        positions.push([yaxis, await loadImage(msg.member.displayAvatarURL())])

        context.font = "20px gg bold, emojis";
        if (msg.member.roles.color === null){
            context.fillStyle = "#ffff";
        }else{
            context.fillStyle = msg.member.roles.color.hexColor;
        };

        context.fillText(msg.member.displayName, 80, yaxis+=20);
        maxx = Math.max(Math.ceil(context.measureText(msg.member.displayName).width)+80, maxx);
    };

    currentMessage = msg.cleanContent.split("\n");
    context.font = "20px gg, emojis";
    context.fillStyle = "#ffff";

    currentMessage.forEach(content => {
        context.fillText(content, 80, yaxis+=25);
    });
    if (msg.attachments.size > 0){
        if (msg.attachments.first().contentType.includes("image")){
            let img = await loadImage(msg.attachments.first().url);

            if (img.width < 400 && img.height < 400){
                width = img.width;
                height = img.height;
            }
            else if (img.width - img.height){
                ratio = img.width/img.height;
                width = 400*ratio;
                height = 400;
           }else{
               ratio = img.height/img.width;
               width = 400;
               height = 400*ratio;
           }

           if (msg.cleanContent.length === 0){
               context.drawImage(img, 80, yaxis-=10, width, height);
           }else{
               context.drawImage(img, 80, yaxis+=10, width, height);
           };
           maxx = Math.max(width+80, maxx);
           yaxis += height;
        };
    };

    maxx = Math.max(Math.ceil(context.measureText(msg.cleanContent).width)+80, maxx);
}

module.exports = {
    name: "highlight",
    description: "This command highlights a message (in testing)",

    /**
     * @param {Message} message
     * @param {createCanvas} ceateCanvas
     * @param {loadImage} loadImage
     * @param {Image} Image
     * @param {GlobalFonts} GlobalFonts
     */

    async execute(message, client, args){
        if (message.guildId != "983033385721151538") return;
        if (message.reference === null) {
            message.reply("please reply to a message that you want to highlight, if you want to highlight more than one, you can type a number afte the command");
            return;
        };

        let lastuser = null;
        let replying;
        let positions = [];
        let timemessage;
        let currentMessage = [];
        let messages = [];
        let yaxis = 10;
        let maxx = 100;
        let ratio = 0;
        let width = 0;
        let height = 0;

        let avatar = await loadImage("https://cdn.discordapp.com/avatars/410643436044156938/d551c06e3c436c6c668276cc2c09d354.webp?size=40")

        if (args[0] > 1){
            messages = (await message.channel.messages.fetch({ before: message.reference.messageId, limit: args[0]-1 })).reverse();
        };

        let canvas = createCanvas(2000, 2000);
        let context = canvas.getContext("2d");
        
        context.fillStyle = "#2c2f33";
        context.fillRect(0, 0, canvas.width, canvas.height);

        let msg = await message.fetchReference()

        for (let i = 0; i < messages.size; i++){
            timemessage = messages.at(i);

            if (timemessage.reference){
                if (yaxis > 10) yaxis += 40;

                let reply = await timemessage.fetchReference();

                context.font = "15px gg bold, emojis";
                if (reply.member.roles.color === null){
                    context.fillStyle = "#ffff";
                }else{
                    context.fillStyle = reply.member.roles.color.hexColor;
                };
                context.fillText(reply.member.displayName, 80, yaxis += 20);

                width = Math.ceil(context.measureText(reply.member.displayName).width);

                context.font = "15px gg, emojis";
                context.fillStyle = "#ffff";
                if (reply.attachments.size && reply.cleanContent === ""){
                    context.fillText("attachment", 85+width, yaxis);
    
                    maxx = Math.max(Math.ceil(context.measureText("attachment").width)+85+width, maxx);
                }else{
                    context.fillText(reply.cleanContent, 85+width, yaxis);
    
                    maxx = Math.max(Math.ceil(context.measureText(reply.cleanContent).width)+85+width, maxx);
                };

                maxx = Math.max(Math.ceil(context.measureText(reply.cleanContent).width)+85+width, maxx);
                replying = true;
                yaxis += 5;
            };
            if (timemessage.author.id != lastuser || replying){
                if (yaxis > 10 && !replying) yaxis += 40;
                positions.push([yaxis, await loadImage(timemessage.member.displayAvatarURL())])
    
                context.font = "20px gg bold, emojis";
                if (timemessage.member.roles.color === null){
                    context.fillStyle = "#ffff";
                }else{
                    context.fillStyle = timemessage.member.roles.color.hexColor;
                };
        
                context.fillText(timemessage.member.displayName, 80, yaxis+=20);
                maxx = Math.max(Math.ceil(context.measureText(timemessage.member.displayName).width)+80, maxx);
    
                lastuser = timemessage.author.id
                replying = false;
            };
    
            currentMessage = timemessage.cleanContent.split("\n");
            context.font = "20px gg, emojis";
            context.fillStyle = "#ffff";
    
            currentMessage.forEach(content => {
                context.fillText(content, 80, yaxis+=25);
            });
            if (timemessage.attachments.size > 0){
                if (timemessage.attachments.first().contentType.includes("image")){
                    let img = await loadImage(timemessage.attachments.first().url);
                    
                    if (img.width < 400 && img.height < 400){
                        width = img.width;
                        height = img.height;
                    }
                    else if (img.width - img.height){
                        ratio = img.width/img.height;
                        width = 400*ratio;
                        height = 400;
                   }else{
                       ratio = img.height/img.width;
                       width = 400;
                       height = 400*ratio;
                   }
    
                   if (timemessage.cleanContent.length === 0){
                       context.drawImage(img, 80, yaxis-=10, width, height);
                   }else{
                       context.drawImage(img, 80, yaxis+=10, width, height);
                   };
                   maxx = Math.max(width+80, maxx);
                   yaxis += height;
                };
            };
    
            maxx = Math.max(Math.ceil(context.measureText(timemessage.cleanContent).width)+80, maxx);
        };

        if (msg.reference){
            if (yaxis > 10) yaxis += 40;

            let reply = await msg.fetchReference();

            context.font = "15px gg bold, emojis";
            if (reply.member.roles.color === null){
                context.fillStyle = "#ffff";
            }else{
                context.fillStyle = reply.member.roles.color.hexColor;
            };
            context.fillText(reply.member.displayName, 80, yaxis += 20);

            width = Math.ceil(context.measureText(reply.member.displayName).width);

            context.font = "15px gg, emojis";
            context.fillStyle = "#ffff";
            if (reply.attachments.size && reply.cleanContent === ""){
                context.fillText("attachment", 85+width, yaxis);

                maxx = Math.max(Math.ceil(context.measureText("attachment").width)+85+width, maxx);
            }else{
                context.fillText(reply.cleanContent, 85+width, yaxis);

                maxx = Math.max(Math.ceil(context.measureText(reply.cleanContent).width)+85+width, maxx);
            };

            replying = true;
            yaxis += 5;
        };
        if (msg.author.id != lastuser || replying){
            if (yaxis > 10 && !replying) yaxis += 40;
            positions.push([yaxis, await loadImage(msg.member.displayAvatarURL())])

            context.font = "20px gg bold, emojis";
            if (msg.member.roles.color === null){
                context.fillStyle = "#ffff";
            }else{
                context.fillStyle = msg.member.roles.color.hexColor;
            };
    
            context.fillText(msg.member.displayName, 80, yaxis+=20);
            maxx = Math.max(Math.ceil(context.measureText(msg.member.displayName).width)+80, maxx);
        };

        currentMessage = msg.cleanContent.split("\n");
        context.font = "20px gg, emojis";
        context.fillStyle = "#ffff";

        currentMessage.forEach(content => {
            context.fillText(content, 80, yaxis+=25);
        });
        if (msg.attachments.size > 0){
            if (msg.attachments.first().contentType.includes("image")){
                let img = await loadImage(msg.attachments.first().url);

                if (img.width < 400 && img.height < 400){
                    width = img.width;
                    height = img.height;
                }
                else if (img.width - img.height){
                    ratio = img.width/img.height;
                    width = 400*ratio;
                    height = 400;
               }else{
                   ratio = img.height/img.width;
                   width = 400;
                   height = 400*ratio;
               }

               if (msg.cleanContent.length === 0){
                   context.drawImage(img, 80, yaxis-=10, width, height);
               }else{
                   context.drawImage(img, 80, yaxis+=10, width, height);
               };
               maxx = Math.max(width+80, maxx);
               yaxis += height;
            };
        };

        maxx = Math.max(Math.ceil(context.measureText(msg.cleanContent).width)+80, maxx);

        context.beginPath();
        positions.forEach(profile => {
            context.arc(35, profile[0]+25, 25, 0, Math.PI * 2, true);
        });
        context.closePath();
        context.clip();

        positions.forEach(async profile => {
            context.drawImage(profile[1], 10, profile[0], 50, 50);
        })

        let canvasimg = await loadImage(await canvas.encode("png"));

        if (yaxis < 60) yaxis = 60;

        let finalCanvas = createCanvas(maxx+10, yaxis+10);
        context = finalCanvas.getContext("2d");
        context.drawImage(canvasimg, 0, 0);

        message.guild.channels.fetch("1077614318968909954").then(async channel => {
            channel.send({ content: `${msg.url} was highlighted by ${message.author.username}`, files: [new AttachmentBuilder(await finalCanvas.encode("png"), { name: "highlight.png" })] });
        })
        message.delete();


    }
};