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
    {
        name: 'delete-msg',
        description: 'Delete the last 1-5 messages from a channel (default: 1)',
        options: [
            {
                name: 'channel',
                description: 'The channel you want to delete the messages from',
                type: ApplicationCommandOptionType.Channel,
                required: true
            },
            {
                name: 'amount',
                description: 'The amount of messages you want to delete',
                type: ApplicationCommandOptionType.Integer,
                required: true,
                choices: [
                    {name: '1', value: 1},
                    {name: '2', value: 2},
                    {name: '3', value: 3},
                    {name: '4', value: 4},
                    {name: '5', value: 5}
                ]
            }
        ]
    }
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
