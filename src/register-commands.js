require('dotenv').config()
const { REST, Routes, ApplicationCommandOptionType} = require('discord.js');


const commands = [
    {
        name: 'icon',
        description: 'Get the icon of an user',
        options: [
            {
                name: 'user',
                description: 'The user you want to get the icon',
                type: ApplicationCommandOptionType.User,
                required: true
            }
        ]
    },
]

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN); 

(async () => {
    try {
        console.log('Registering slash commands...')

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {
                body: commands
            }
        )

        console.log('Slash commands registered!')
    } catch(error){
        console.error(error);
    }
})();
