# Discord Monitor

A very simple program to monitor invites sent in a server and notifying mods, as well as seeing if
someone who does not have a specific role has sent a link and deleting it (e.g. some person joins the server and tries to link gore)

## Running it yourself

First just do the good ol' `npm install`

Then you will need to make a config file `config.js` in the root folder

| token       | bot token [string]                                      |
|-------------|---------------------------------------------------------|
| levelfive   | id for role needed to send links [string]               |
| boosters    | booster role id [string]                                |
| log_channel | channel id where bot will log info [string]             |
| bot_channel | channel id where bot will redirect users [string]       |
| whitelist   | array of whitelisted links to ignore [array of strings] |

Afterwards you should be able to run the bot
