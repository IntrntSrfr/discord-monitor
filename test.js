const linkRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
const config = require("./config.json");

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

console.log(isBadMessage("bazinga mode and crack"));
console.log(isBadMessage("i lovooove www.gskinner.com"));
console.log(isBadMessage("https://media.discordapp.net/attachments/320896491596283906/1015398268886319184/joel.gif"));
console.log(isBadMessage("https://tenor.com/view/hxh-killua-gif-20642832"));
console.log(isBadMessage("your expression with Testsdiscord.gg/a3asdf3 mode."));
