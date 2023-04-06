require('dotenv').config()
const ffmpeg = require('ffmpeg');
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', interaction => {
    if (!interaction.isChatInputCommand) return;

    if (interaction.commandName === 'icon') {
        const user = interaction.options.getUser('user');

        interaction.reply(`${user.displayAvatarURL()}`);
    }
    else if (interaction.commandName === 'delete-msg') {
        const channel = interaction.options.getChannel('channel');
        const amount = interaction.options.getInteger('amount');

        channel.bulkDelete(amount, true)
            .then(messages => interaction.reply(`Deleted ${messages.size} messages`))
            .catch(error => interaction.reply(`Error: ${error}`));
    }
})

client.login(process.env.DISCORD_TOKEN);