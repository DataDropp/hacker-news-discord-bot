//setup
const Discord = require('discord.js');
const config = require('./config');
const client = new Discord.Client();
const request = require('request');
const { title } = require('process');
const { get } = require('request');
//listen for messages

client.on('ready', () => {
    console.log(`${timestamp()} ${client.user.tag} sucessfully logged in!`)
});
client.on('message', message => {
    if (message.author.id == client.user.id) return;
    if (!message.content.startsWith(config.prefix)) return;
    let args = message.content.toLowerCase().replace(/^\-/, '').split(' ');
    let thread = undefined
    switch (args[0]) {
        case "latest":
            thread = "newest"
            getHackerNews(message,thread);
            break;
        case "news":
            thread = "news"
            getHackerNews(message,thread);
            break;
        case "ask":
            thread = "ask"
            getHackerNews(message,thread);
            break;
        case "past":
            thread = "front"
            getHackerNews(message,thread);
            break;
        case "show":
            thread = "show"
            getHackerNews(message,thread);
            break;
        default:
            break;
    }
});

//login with encoded token
client.login(Buffer.from(config.token, 'hex').toLocaleString());
//timestamp
function timestamp() {
    let date = new Date();
    return `[${date.toDateString()}]`
}
//function for fetching most types of submissions on news.ycombinator.com
function getHackerNews(message,thread) {
    try{
    request({ url: `https://news.ycombinator.com/${thread}` }, function (error, response, body) {
        console.log(`Fetching https://news.ycombinator.com/${thread}`);
        let output = body.match(RegExp(/">1\..*_(.*vote)/))
        output = (output[0].match(RegExp(/_[^']+/)));
        output = output[0].replace('_', '');
        request({ url: `https://hacker-news.firebaseio.com/v0/item/${output}.json`, json: true }, function (error, response, body) {
            console.log(`Fetching https://hacker-news.firebaseio.com/v0/item/${output}.json`)
            let embed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(body.title)
                .addField('Submitted by', `${body.by}`, false)
                .addField('URL', `${body.url}`, false)
                .setFooter(`https://news.ycombinator.com/item?id=${output}`);
            message.channel.send(embed);
        })
    })} catch(err){}
}