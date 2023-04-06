require('dotenv').config()
const { Client, IntentsBitField } = require('discord.js');
const ffmpeg = require('ffmpeg');
const https = require('https');
const fs = require('fs');

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


client.on('messageCreate', message => {
    if (message.author.bot) return;

    if (message.content.startsWith("!mp3") && message.attachments.size > 0) {
        // obtiene el primer archivo adjunto
        const attachment = message.attachments.first();


        const videoName = attachment.name.split('.')[0];
        
        if (attachment.name.endsWith('.mp4')) {
            const file = fs.createWriteStream(`${videoName}.mp4`);
            https.get(attachment.url, function(response) {
                response.pipe(file);
            })

            file.on('finish', () => {
                const process = new ffmpeg(`${videoName}.mp4`);
                process.then(function (video) {
                    video.fnExtractSoundToMP3(`${videoName}.mp3`, async function (error, file) {
                        if (!error){
                            await message.reply({ files: [file] });

                            fs.unlinkSync(`${videoName}.mp4`)
                            fs.unlinkSync(`${videoName}.mp3`)
                        }
                        else console.log(error);
                    });
                }, function (err) {
                    console.log('Error: ' + err);

                    
                });
            })
        }
    }
})


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