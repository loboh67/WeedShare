const { SlashCommandBuilder } = require("@discordjs/builders");
const { Weed } = require('../dbObjects.js');

// This command takes the following arguments:
// - A name for the weed
// - A price for the weed
// - A quantity for the weed
// - A description for the weed
// - A date for the weed
module.exports = {
  data: new SlashCommandBuilder()
    .setName("buy_weed")
    .setDescription("Buy weed")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Name of the weed")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("price")
        .setDescription("Price of the weed")
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
        .setName("description")
        .setDescription("Description of the weed")
        .setRequired(true)
    ),
  async execute(interaction) {
    const name = interaction.options.getString("name");
    const price = interaction.options.getInteger("price");
    const quantity = interaction.options.getInteger("quantity");
    const description = interaction.options.getString("description");

    // Add the weed object to the database
    try {
        console.log("Creating weed")
        await Weed.create({
            name: name,
            price: price,
            quantity: quantity,
            description: description,
        });

      return interaction.reply(
        `You bought ${quantity}g of ${name} for ${price}€ each!`
      );
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return interaction.reply("That weed already exists.");
      }

      return interaction.reply("Something went wrong with adding the weed.");
    }
  },
};
