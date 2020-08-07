# hacker-news-discord-bot
Simple discord bot for communicating to the public API at https://github.com/HackerNews/API

# setting up config.js
Make a new file called config.js where bot.js is located, and paste the following
Be sure to paste your discord bot in HEXADECIMAL!!! (or just modify bot.js to not require hexadecimal)
```
const settings = {
    prefix : "-",
    token : "Convert your bot token into hexadecimal and paste it here"
}
module.exports = settings;
```
