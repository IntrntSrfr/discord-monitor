const Discord = require('discord.js');
const config = require("./config.json");

const linkRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g

/**
 * 
 * @param {Discord.Message} msg 
 * @returns 
 */
const monitorLinks = (msg) => {
    if (msg.author.bot || msg.member.roles.cache.hasAny(config.levelfive, config.boosters)) return; 
    if(!isBadMessage(msg.content)) return;

    msg.delete()
    msg.reply(`you are not allowed to send links unless you are level 3 or a nitro booster (<@&${config.boosters}>). Type !rank in <#${config.bot_channel}> to check your level.`)
        .then((rep) => {
            setTimeout(() => {
                rep.delete()
            }, 15000);
        })
}

/**
 * 
 * @param {String} content 
 * @returns 
 */
const isBadMessage = (content) => {
    let matches = content.match(linkRegex)
    if(!matches) return false;
    
    let res = matches.map(m => {
        let bad = config.whitelist.length;
        config.whitelist.forEach(okay => {
            if (m.includes(okay)) bad-- 
        });
        return bad === config.whitelist.length
    });
    return res.includes(true)
}

const discordLinkRegex = /(discord.gg\/)([a-zA-Z0-9]+)/g

/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} msg 
 * @returns 
 */
const monitorInvites = (client, msg) => {
    if (msg.author.bot || msg.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) { return; }
    var match = discordLinkRegex.exec(msg.content);
    if (!match) return; 

    client.fetchInvite(match[2]).then(inv => {
        var embed = new Discord.EmbedBuilder()
            .setColor("c0ffee")
            .setDescription(`**Invite posted in ${msg.channel}**`)
            .addFields(
                {name: "Posted by:", value: `${msg.author}\n${msg.author.username}#${msg.author.discriminator}\n${msg.author.id}`, inline: true},
                {name: "Server info:", value: `${inv.guild.name}\n#${inv.channel.name}\n${inv.presenceCount}/${inv.memberCount} members`, inline: true}
            )
            .setThumbnail(`https://cdn.discordapp.com/icons/${inv.guild.id}/${inv.guild.icon}.jpg?size=1024`)
            .setFooter({text:`Link: discord.gg/${inv.code}`})

        client.channels.cache.get(config.log_channel)
            .send({embeds:[embed]})
    });
}

module.exports = {
    monitorLinks: monitorLinks,
    monitorInvites : monitorInvites
}