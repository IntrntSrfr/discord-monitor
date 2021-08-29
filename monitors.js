const Discord = require('discord.js');
const config = require("./config.json");

function monitorLinks(msg) {
    if (msg.author.bot) { return; }

    if (msg.member.roles.has(config.levelfive) || msg.member.roles.has(config.boosters)) { return; }

    var expression = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    var regex = new RegExp(expression);
    var t = msg.content;

    if (!t.match(regex)) { return; }

    let illegal = false;

    t.match(regex).forEach(m => {
        let bad = config.whitelist.length;
        config.whitelist.forEach(okay => {
            if (m.includes(okay)) { bad--; }
        });
        if (bad == config.whitelist.length) { illegal = true; }
    });

    if (illegal) {
        msg.delete()
        msg.reply(`you are not allowed to send links unless you are level 3 or a nitro booster (<@&${config.boosters}>). Type !rank in <#${config.bot_channel}> to check your level.`)
        .then((rep) => {
            setTimeout(() => {
                rep.delete()
            }, 15000);
        })
    }
}

function monitorInvites(client, msg) {
    if (msg.author.bot || msg.member.permissions.has("MANAGE_MESSAGES")) { return; }

    var expression = /(discord.gg\/)([a-zA-Z0-9]+)/g;
    var regex = new RegExp(expression);

    var match = regex.exec(msg.content);

    if (match){
        client.fetchInvite(match[2]).then(inv => {
            var embed = new Discord.RichEmbed()
                .setColor("c0ffee")
                .setDescription(`**Invite posted in ${msg.channel}**`)
                .addField("Posted by:", `${msg.author}\n${msg.author.username}#${msg.author.discriminator}\n${msg.author.id}`, true)
                .addField("Server info:", `${inv.guild.name}\n#${inv.channel.name}\n${inv.presenceCount}/${inv.memberCount} members`, true)
                .setThumbnail(`https://cdn.discordapp.com/icons/${inv.guild.id}/${inv.guild.icon}.jpg?size=1024`)
                .setFooter(`Link: discord.gg/${inv.code}`)
            client.channels.get(config.log_channel).send("", embed)
        });
        
    }
}

module.exports = {
    monitorLinks: monitorLinks,
    monitorInvites : monitorInvites
}