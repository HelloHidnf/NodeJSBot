const { Message, Client, AttachmentBuilder } = require("discord.js");
const { createCanvas, loadImage, Image, GlobalFonts } = require("@napi-rs/canvas");

async function getMessages(msg, arg){
    let messages = [];
    let messagecontent = [];
    let messagelist = [];
    let lastuser = null;
    let replying;
    let timemessage;
    let yaxis = 10;
    let maxx = 100;
    let width = 0;
    let height = 0;

    let canvas = createCanvas(1, 1);
    let context = canvas.getContext("2d");

    let message = await msg.fetchReference()

    if (arg > 1){
        messagelist = (await message.channel.messages.fetch({ before: message.id, limit: arg-1 })).reverse();
    };

    for (let i = 0; i < messagelist.size; i++){
        timemessage = messagelist.at(i);
        messagecontent = [];

        

        if (timemessage.reference){
            if (yaxis > 10) yaxis += 40;

            yaxis += 20;
            let content = await timemessage.fetchReference();
            messagecontent.push(yaxis, content);

            context.font = "15px gg, emojis";

            width = Math.ceil(context.measureText(messagecontent[1].member.displayName).width);

            context.fillStyle = "#ffff";
            if (messagecontent[1].attachments.size && messagecontent[1].cleanContent === ""){
                maxx = Math.max(Math.ceil(context.measureText("attachment").width)+85+width, maxx);
            }else{
                maxx = Math.max(Math.ceil(context.measureText(messagecontent[1].cleanContent).width)+85+width, maxx);
            };

            replying = true;
            yaxis += 5;
        };

        if (timemessage.author.id != lastuser || replying){
            if (!replying){
                if (yaxis > 10) yaxis += 40;
                messagecontent.push(yaxis, false);
            }
            messagecontent.push(timemessage.member.displayAvatarURL(), timemessage.member);

            context.font = "20px gg bold, emojis";
    
            yaxis += 20;
            maxx = Math.max(Math.ceil(context.measureText(timemessage.member.displayName).width)+80, maxx);

            lastuser = timemessage.author.id
            replying = false;
        }else{
            messagecontent.push(yaxis, false, false, false);
        };

        if (timemessage.cleanContent.length > 0){
            yaxis += 25;
            messagecontent.push(timemessage.cleanContent);
        }else{
            messagecontent.push(false);
        };

        imagecheck: if (timemessage.attachments.size > 0){
            if (!timemessage.attachments.first().contentType.includes("image")){
                break imagecheck;
            };

            let img = timemessage.attachments.first();
                
            if (img.width < img.height) {
                // image is taller
                height = Math.min(img.height, 600);
                width = img.width * (height/img.height);
            } else {
                // image is wider
                width = Math.min(img.width, 600);
                height = img.height * (width/img.width);
            }

            messagecontent.push(img.url, width, height);

            if (messagecontent[5]){
                yaxis += 10;
            }else{
                yaxis -= 10;
            };

            maxx = Math.max(width+80, maxx);
            yaxis += height;
        }else{
            messagecontent.push(false, false, false);
        };
        
        maxx = Math.max(Math.ceil(context.measureText(timemessage.cleanContent).width)+80, maxx);
        messages.push(messagecontent);
    };

    messagecontent = [];

    if (message.reference){
        if (yaxis > 10) yaxis += 40;

        yaxis += 20;
        let content = await message.fetchReference();
        messagecontent.push(yaxis, content);

        context.font = "15px gg, emojis";            

        width = Math.ceil(context.measureText(messagecontent[1].member.displayName).width);

        context.fillStyle = "#ffff";
        if (messagecontent[1].attachments.size && messagecontent[1].cleanContent === ""){
            maxx = Math.max(Math.ceil(context.measureText("attachment").width)+85+width, maxx);
        }else{
            maxx = Math.max(Math.ceil(context.measureText(messagecontent[1].cleanContent).width)+85+width, maxx);
        };

        replying = true;
        yaxis += 5;
    };

    if (message.author.id != lastuser || replying){
        if (!replying){
            if (yaxis > 10) yaxis += 40;
            messagecontent.push(yaxis, false);
        }

        messagecontent.push(message.member.displayAvatarURL(), message.member);

        context.font = "20px gg bold, emojis";

        yaxis+=20
        maxx = Math.max(Math.ceil(context.measureText(message.member.displayName).width)+80, maxx);

        lastuser = message.author.id
        replying = false;
    }else{
        messagecontent.push(yaxis, false, false, false);
    };

    if (message.cleanContent.length > 0){
        yaxis += 25;
        messagecontent.push(message.cleanContent);
    }else{
        messagecontent.push(false);
    };

    imagecheck: if (message.attachments.size > 0){
        if (!message.attachments.first().contentType.includes("image")){
            break imagecheck;
        };

        let img = message.attachments.first();
            
        if (img.width < img.height) {
            // image is taller
            height = Math.min(img.height, 600);
            width = img.width * (height/img.height);
        } else {
            // image is wider
            width = Math.min(img.width, 600);
            height = img.height * (width/img.width);
        }

        messagecontent.push(img.url, width, height);

        if (messagecontent[5]){
            yaxis += 10;
        }else{
            yaxis -= 10;
        };

       maxx = Math.max(width+80, maxx);
       yaxis += height;
    }else{
        messagecontent.push(false, false, false);
    };
    
    maxx = Math.max(Math.ceil(context.measureText(message.cleanContent).width)+80, maxx);
    messages.push(messagecontent);
    return [maxx+10, yaxis+10, messages, message.url];
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
        if (message.guildId != "988446971461247027") return;
        if (message.reference === null) {
            message.reply("please reply to a message that you want to highlight, if you want to highlight more than one, you can type a number afte the command");
            return;
        };

        //new
        let contents = await getMessages(message, args[0]);
        let messages = contents[2];
        let timemessage;
        
        //old
        let positions = [];

        let canvas = createCanvas(parseInt(contents[0]), parseInt(contents[1]));
        let context = canvas.getContext("2d");
        
        context.fillStyle = "#2c2f33";
        context.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < messages.length; i++){
            timemessage = messages.at(i);
            yaxis = timemessage[0];

            if (timemessage[1]){
                context.font = "15px gg bold, emojis";

                if (timemessage[1].member.roles.color === null){
                    context.fillStyle = "#ffff";
                }else{
                    context.fillStyle = timemessage[1].member.roles.color.hexColor;
                };
                context.fillText(timemessage[1].member.displayName, 80, yaxis);

                width = Math.ceil(context.measureText(timemessage[1].member.displayName).width);

                context.font = "15px gg, emojis";
                context.fillStyle = "#ffff";
                if (timemessage[1].attachments.size && timemessage[1].cleanContent === ""){
                    context.fillText("attachment", 85+width, yaxis);
                }else{
                    context.fillText(timemessage[1].cleanContent, 85+width, yaxis);
                };

                yaxis += 5;
            };

            if (timemessage[2]){
                positions.push([yaxis, await loadImage(timemessage[2])])
                
                context.font = "20px gg bold, emojis";
                if (timemessage[3].roles.color === null){
                    context.fillStyle = "#ffff";
                }else{
                    context.fillStyle = timemessage[3].roles.color.hexColor;
                };
        
                context.fillText(timemessage[3].displayName, 80, yaxis+=20);
            };
            
            context.font = "20px gg, emojis";
            context.fillStyle = "#ffff";
    
            if (timemessage[4]){
                context.fillText(timemessage[4], 80, yaxis+=25);
            };

            if (timemessage[5]){
                let img = await loadImage(timemessage[5]);
    
                if (timemessage[5]){
                    yaxis += 10;
                }else{
                    yaxis -= 10;
                };

                context.drawImage(img, 80, yaxis, timemessage[6], timemessage[7]);
                yaxis += timemessage[7];
            };
        };

        context.beginPath();
        positions.forEach(profile => {
            context.arc(35, profile[0]+25, 25, 0, Math.PI * 2, true);
        });
        context.closePath();
        context.clip();

        positions.forEach(async profile => {
            context.drawImage(profile[1], 10, profile[0], 50, 50);
        })

        message.guild.channels.fetch("999271331247964202").then(async channel => {
            channel.send({ content: `${contents[3]} was highlighted by ${message.author.username}`, files: [new AttachmentBuilder(await canvas.encode("png"), { name: "highlight.png" })] });
        })
        message.delete();
    }
};