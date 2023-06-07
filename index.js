require('dotenv').config();
const { Client, Intents } = require('discord.js');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
    ],
});

client.login(process.env.DISCORD_TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!ticket')) {
        const guild = message.guild;
        const channel = await guild.channels.create(message.author.username, {
            type: 'text',
            topic: `Ticket for ${message.author.username}`,
            parent: 'Enter your parent category id here',
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                },
            ],
        });
        await message.reply(`Your ticket has been created: ${channel}`);
        const embed = new Discord.MessageEmbed()
            .setTitle(`Welcome to your ticket, ${message.author.username}!`)
            .setDescription('Please wait patiently while our support team attends to your request.')
            .setColor('BLUE');
        await channel.send({ embeds: [embed] });
    }
});