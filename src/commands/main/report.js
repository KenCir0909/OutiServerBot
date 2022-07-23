const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, TextInputBuilder, ModalBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    info: {
        name: 'report',
        description: 'バグを報告したり、Botに対する要望を開発者に送信するコマンド',
        category: 'main',
        deferReply: false,
    },

    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('バグを報告したり、Botに対する要望を開発者に送信するコマンド'),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        const modal = new ModalBuilder()
            .setCustomId('report')
            .setTitle('Bot開発者へのバグ報告・要望');
        modal.addComponents(
            new ActionRowBuilder()
                .addComponents(new TextInputBuilder()
                    .setCustomId('report_title')
                    .setLabel('タイトル')
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true),
                ),
            new ActionRowBuilder()
                .addComponents(new TextInputBuilder()
                    .setCustomId('report_content')
                    .setLabel('内容')
                    .setStyle(TextInputStyle.Paragraph)
                    .setRequired(true),
                ),
        );

        await interaction.showModal(modal);
    },
};