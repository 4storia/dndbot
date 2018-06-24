const Discord = require('discord.js');
const client = new Discord.Client();

const commands = require('./src/commands');

const config = require('./config.json');
const { clientId } = config.discord;
const { apiToken } = config.bot;

const CommandParser = require('./src/command-parser');
const commandParser = new CommandParser({
    botId: clientId,
    ignoreOwnMessages: true,
    namespace: 'dnd'
});

client.on('ready', () => console.log("Connected to Discord"));
client.on('error', (error) => console.error(error));

client.login(apiToken);

commandParser.registerCommands(commands);


// commandParser.parse({ author: {}, content: '!dnd set initiative a, b, c'});




client.on('message', async (message) => {
    const command = await commandParser.parse(message);

    if(!command) return;
});
