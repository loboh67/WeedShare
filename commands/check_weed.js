const { SlashCommandBuilder } = require("@discordjs/builders");
const { Weed } = require("../dbObjects.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("check_weed")
    .setDescription("Check weed")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Name of the weed")
        .setRequired(false)
    ),
  async execute(interaction) {
    // Check if the user provided a name for the weed
    if (!interaction.options.getString("name")) {
        // If the user didn't provide a name, return all the weed objects
        const weeds = await Weed.findAll();
        let reply = "Weeds you have in stock:\n";
        for (const weed of weeds) {
            reply += `${weed.name}\n`;
        }
        return interaction.reply(reply);
    }

    const name = interaction.options.getString("name");

    // Search for the weed object in the database
    const weed = await Weed.findOne({ where: { name: name } });

    // If the weed object is not found, return an error message
    if (!weed) {
      return interaction.reply("That weed doesn't exist.");
    }

    // Return the weed object
    return interaction.reply(
      `Name: ${weed.name}
Price: ${weed.price}€
Quantity: ${weed.quantity}g
Description: ${weed.description}`
    );
  },
};
