const { SlashCommandBuilder } = require("@discordjs/builders");
const { Weed } = require("../dbObjects.js");
const { Smoke } = require("../dbObjects.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("smoke_weed")
    .setDescription("Smoke weed")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Name of the weed")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("date")
        .setDescription("Date of the weed")
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
            .setName("persons")
            .setDescription("@ of the persons you smoked with")
            .setRequired(false)
    ),

  async execute(interaction) {
    const name = interaction.options.getString("name");
    const quantity = interaction.options.getInteger("quantity");
    const date = interaction.options.getString("date");
    const persons = interaction.options.getString("persons");

    const personIds = persons.match(/<@(\d+)>/g).map((id) => id.replace(/[@<>]/g, "")).join(",");

    if (quantity < 0) {
      return interaction.reply("You can't smoke a negative amount of weed!");
    }

    const weed = await Weed.findOne({ where: { name: name } });

    if (!weed) {
        return interaction.reply(
            `There is no weed with the name ${name} in the database!`
        );
    }
    
    if (weed.quantity < quantity) {
        return interaction.reply(
            `You can't smoke more weed than you have!`
        );
    }

    await weed.update({
        quantity: weed.quantity - quantity,
    });

    await Smoke.create({
        weedName: name,
        quantity: quantity,
        dateSmoked: date,
        persons: personIds,
    });

    return interaction.reply(
        `You smoked ${quantity} grams of ${name} on ${date} with ${persons}!`
    );
    },
};
