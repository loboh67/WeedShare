const { SlashCommandBuilder } = require("@discordjs/builders");
const { Weed, Smoke } = require('../dbObjects.js');
const { Op } = require('sequelize');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("get_weed_smoked_by_person")
        .setDescription("Get the weed smoked by a person")
        .addUserOption((option) =>
            option
                .setName("person")
                .setDescription("The person")
                .setRequired(true)
        ),

    async execute(interaction) {
        const userId = interaction.options.getUser("person").id;

        // Get all the smoke records of the person
        const smokeRecords = await Smoke.findAll({
            where: {
                persons: {
                    [Op.like]: `%${userId}%`
                }
            }
        });

        // Calculate the total amount of weed smoked by the person
        const weedSmoked = smokeRecords.reduce((total, record) => total + record.quantity, 0);

        return interaction.reply(`The person has smoked ${weedSmoked} grams of weed!`);
    },
}