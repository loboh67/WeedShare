const { SlashCommandBuilder } = require("@discordjs/builders");
const { Weed } = require('../dbObjects.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("restock_weed")
        .setDescription("Restock weed")
        .addStringOption((option) =>
            option
                .setName("name")
                .setDescription("Name of the weed")
                .setRequired(true)
        )
        .addIntegerOption((option) =>
            option
                .setName("quantity")
                .setDescription("Quantity of the weed")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("date")
                .setDescription("Date of the weed")
                .setRequired(true)
        ),

    async execute(interaction) {
        const name = interaction.options.getString("name");
        const quantity = interaction.options.getInteger("quantity");
        const dateBought = interaction.options.getString("date");

        // Search for the weed object in the database
        const weed = await Weed.findOne({ where: { name: name } });

        // If the weed object is not found, return an error message
        if (!weed) {
            return interaction.reply("That weed doesn't exist.");
        }

        // Update the weed object in the database
        try {
            await weed.increment('quantity', { by: quantity });
            let datesBought = JSON.parse(weed.datesBought);
            datesBought.push(dateBought);
            weed.update({
                datesBought: JSON.stringify(datesBought)
            });

            return interaction.reply(
                `You restocked ${quantity}g of ${name} in ${dateBought}!`
            );
        } catch (error) {
            return interaction.reply("An error occurred while restocking the weed.");
        }
    },
}