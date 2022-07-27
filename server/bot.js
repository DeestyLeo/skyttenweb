const { Discord, Client } = require('discord.js');
const client = new Client({ intents: 32509 });

client.once('ready', () => {
    console.log('Bot conectado como: '+client.user.tag)
});

client.login('OTMyMzE0NDc4NTIyMDE1ODE1.GG-kbm.051zNsnK7vDinUzNLyYkp659QUsEn-7tNtRez8')

module.exports = client;