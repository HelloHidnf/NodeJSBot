function IncorrectFormatting(message){
    message.channel.send("Incorrect formatting, please format it as such depending on what you're wanting to execute:\nAdmin: -roles admins add/remove roleID\nOthers: -roles members/bots roleID")
    return
}

module.exports = {
    name: "roles",
    description: "Allows admins *the server owner if there are no admin roles added to the list yet* set roles.",

    async execute(message, _, args, ___, ____, server){
        let access = false
        if(message.author.id === message.guild.ownerId) access = true
        else{
            for (role of server.adminRoles){
                if(message.member.roles.cache.has(role)){
                    access = true
                }
            }
        }

        if ((access)){
            try{
                if(args[0].toLowerCase() === "admins"){
                    if(args[2]){
                        role = await message.guild.roles.fetch(args[2])
                    }
                    else IncorrectFormatting()
                    if(args[1].toLowerCase() === "add"){
                        if(server.adminRoles.indexOf(args[2]) === -1 && role && role.name != "@everyone"){
                            server.adminRoles.push(args[2])
                            message.channel.send("role added to the list")
                        }
                        else{
                            message.channel.send("this role is already in the list or doesn't exist")
                        }
                    }
                    else if(args[1].toLowerCase() === "remove"){
                        if (server.adminRoles.indexOf(args[2]) != -1){
                            server.adminRoles.splice(server.adminRoles.indexOf(args[2]), 1)
                            message.channel.send("role removed from the list")
                        }
                        else{
                            message.channel.send("this role isn't in the list")
                        }
                    }
                    else IncorrectFormatting()
                }
                else if(args[0].toLowerCase() === "members"){
                    role = await message.guild.roles.fetch(args[1])
                    if(role && role.name != "@everyone") server.memberRole = args[1]
                    else return message.channel.send("role doesn't exist")
                }
                else if(args[0].toLowerCase() === "bots"){
                    role = await message.guild.roles.fetch(args[1])
                    if(role && role.name != "@everyone") server.botRole = args[1]
                    else return message.channel.send("role doesn't exist")
                }
                else IncorrectFormatting()
            }catch{
                IncorrectFormatting(message)
            }

            message.delete()
            server.save()
        }
    }
}