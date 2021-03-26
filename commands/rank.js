const fs = require('fs');
const jimp = require("jimp");
const dataUriToBuffer = require('data-uri-to-buffer');
const { createCanvas, loadImage } = require('canvas');
const { Client, Message, MessageAttachment, MessageEmbed } = require("discord.js");
const { Database } = require('../unko/index');
const rankimage = require('../dat/json/rankimage.json');
const db = new Database('unkoserver.db');

module.exports = {
    info: {
        name: "rank",
        description: "MyrankとLevel確認",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Level'
    },

    /**
     * @param {Client} client
     * @param {Message} message 
     */

    run: async function (client, message, args) {
        message.channel.startTyping();
        const user = message.mentions.users.first() || client.users.cache.get(args[0]);

        if (user) {
            const userleveldata = db.levelget(user.id, message.guild.id);
            const rankimagedata = rankimage[user.id];

            const canvas = createCanvas(1500, 500);
            const ctx = canvas.getContext('2d');
            const background = await loadImage('./dat/images/default.png');
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.font = '80px Impact';
            ctx.rotate(0);
            ctx.fillText(`${user.username}\n${userleveldata.level}level ${userleveldata.xp}/${55 * userleveldata.level}xp`, canvas.width / 2.5, canvas.height / 1.8);
            ctx.beginPath();
            ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            const avatar = await loadImage(user.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar, 25, 25, 200, 200);
            message.channel.send(new MessageAttachment(canvas.toBuffer(), 'rank.png'));
            message.channel.stopTyping();

        }
        else {
            const userleveldata = db.levelget(message.author.id, message.guild.id);
            const rankimagedata = rankimage[message.author.id];

            const canvas = createCanvas(1500, 500);
            const ctx = canvas.getContext('2d');
            const background = await loadImage('./dat/images/default.png');
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.font = '80px Impact';
            ctx.rotate(0);
            ctx.fillText(`${message.author.username}\n${userleveldata.level}level ${userleveldata.xp}/${55 * userleveldata.level}xp`, canvas.width / 2.5, canvas.height / 1.8);
            ctx.beginPath();
            ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            const avatar = await loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar, 25, 25, 200, 200);
            message.channel.send(new MessageAttachment(canvas.toBuffer(), 'rank.png'));
            message.channel.stopTyping();
        }

    }
};