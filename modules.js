const { Client, Message } = require("discord.js");

function deleteMessage(message, time = 1) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        message.delete().then(resolve).catch(() => {});
      }, time);
    });
};

function checkRole(message, guildid, roleid){
  message.guildId === guildid && message.member.roles.cache.has(roleid);
};

class Message{
  constructor(reply, replyAuthor, replyContent, author, seperate, message, x, y){
    this.reply = reply;
    this.replyAuthor = replyAuthor;
    this.replyContent = replyContent;
    this.author = author;
    this.seperate = seperate;
    this.message = message;
    this.x = x;
    this.y = y;
  };
};

class Messages{
  constructor(avatars, messages, images){
    this.avatars = avatars;
    this.messages = messages;
    this.images = images;
    this.message = new Message;
  };
};

module.exports = { deleteMessage, checkRole, Messages };