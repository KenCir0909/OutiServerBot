const fs = require('fs');
const jimp = require("jimp");
const dataUriToBuffer = require('data-uri-to-buffer');
const { createCanvas } = require('canvas');
const { Message, MessageEmbed } = require("discord.js");

module.exports = {
    info: {
        name: "rank",
        description: "MyrankとLevel確認",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Main'
    },

    /**
     * 
     * @param {*} client 
     * @param {Message} message 
     */

    run: async function (client, message, args) {

    }
};