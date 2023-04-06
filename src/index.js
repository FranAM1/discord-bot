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
})

client.login(process.env.DISCORD_TOKEN);