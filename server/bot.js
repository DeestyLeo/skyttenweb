const { Discord, Client } = require('discord.js');
const client = new Client({ intents: 32509 });

client.once('ready', () => {
    console.log('Bot conectado como: '+client.user.tag)
});

client.login()

module.exports = client;
