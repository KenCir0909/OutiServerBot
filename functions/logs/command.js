const { Message, WebhookClient, MessageEmbed } = require('discord.js');

/**
 * コマンドログ関数
 * @param {Message} message
 * @param {string} commandname
 */

module.exports = async (message, commandname) => {
    const webhook = new WebhookClient('855242376141209610', 'teyKNpeOorWv_SGrA_uGzAbr1gU3xKZTKHO0_WmExUMHVSONygix14LAH-V-LlI1MiVx');
    webhook.send(
        new MessageEmbed()
            .addField('コマンド実行者', message.author.tag)
            .addField('コマンド実行者ID', message.author.id)
            .addField('コマンド実行ギルド', message.guild.name)
            .addField('コマンド実行ギルドID', message.guild.id)
            .addField('コマンド実行チャンネル', message.channel.name)
            .addField('コマンド実行チャンネルID', message.channel.id)
            .addField('コマンド', '```' + commandname + '```')
            .setImage(message.author.avatarURL({ format: 'webp' }))
            .setColor('RANDOM')
            .setFooter(`messageid: ${message.id}`, message.author.avatarURL({ format: 'webp' }))
            .setTimestamp()
    );
}