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
    if (newm.guildId !== '320896491596283906') return;
    monitorLinks(newm)
    monitorInvites(client, newm)
});

client.on(Events.MessageCreate, (msg) => {
    if (msg.guildId !== '320896491596283906') return;
    monitorLinks(msg)
    monitorInvites(client, msg)
});

client.login(config.token);
