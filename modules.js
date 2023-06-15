const { Client, Message } = require("discord.js")

function deleteMessage(message, time = 1) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        message.delete().then(resolve).catch(() => {});
      }, time);
    });
}

function checkRole(message, guildid, roleid){
  message.guildId === guildid && message.member.roles.cache.has(roleid)
}

module.exports = { deleteMessage, checkRole }