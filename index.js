const config = require("./config.json");
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { monitorInvites, monitorLinks } = require('./monitors')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
    ]
});

client.on(Events.ClientReady, () => {
    console.log("Logged in as " + client.user.username + "#" + client.user.discriminator);
});

client.on(Events.MessageUpdate, (oldm, newm) => {
    if (newm.guildId !==  config.guild_id) return;
    monitorLinks(newm)
    monitorInvites(client, newm)
});

client.on(Events.MessageCreate, (msg) => {
    if (msg.guildId !== config.guild_id) return;
    monitorLinks(msg)
    monitorInvites(client, msg)
});

client.login(config.token);
