const Discord = require('discord.js');
const { report } = require('process');
const client = new Discord.Client();
const config = require("./config.json");
const monitors = require("./monitors.js")

client.on('ready', () => {
    console.log("Logged in as " + client.user.username + "#" + client.user.discriminator);
});

client.on('messageUpdate', (oldm, newm) => {
    monitors.monitorLinks(newm)
    monitors.monitorInvites(client, newm)
});

client.on('message', msg => {
    monitors.monitorLinks(msg)
    monitors.monitorInvites(client, msg)
});


client.login(config.token);
