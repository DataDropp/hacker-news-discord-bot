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
    switch (args[0]) {
        case "latest":
            getLatest(message);
            break;
        case "news":
            getNews(message);
            break;
        case "ask":
            getAsk(message);
            break;
        case "past":
            getPast(message);
            break;
        case "show":
            getShow(message);
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
//gets the latest submission on https://news.ycombinator.com/newest then outputs into message's channel.
function getLatest(message) {
    try{
    request({ url: `https://news.ycombinator.com/newest` }, function (error, response, body) {
        console.log(`Fetching https://news.ycombinator.com/newest`);
        let output = body.match(RegExp(/">1\..*_(.*vote)/))
        output = (output[0].match(RegExp(/_[^']+/)));
        output = output[0].replace('_', '');
        request({ url: `https://hacker-news.firebaseio.com/v0/item/${output}.json`, json: true }, function (error, response, body) {
            console.log(`Fetching https://hacker-news.firebaseio.com/v0/item/${output}.json`)
            let hackerNewsLatest_Embed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(body.title)
                .addField('Submitted by', `${body.by}`, false)
                .addField('URL', `${body.url}`, false)
                .setFooter(`https://news.ycombinator.com/item?id=${output}`);
            message.channel.send(hackerNewsLatest_Embed);
        })
    })} catch(err){}
}
function getNews(message) {
    try{
    request({ url: `https://news.ycombinator.com/news` }, function (error, response, body) {
        console.log(`Fetching https://news.ycombinator.com/news`);
        let output = body.match(RegExp(/">1\..*_(.*vote)/))
        output = (output[0].match(RegExp(/_[^']+/)));
        output = output[0].replace('_', '');
        request({ url: `https://hacker-news.firebaseio.com/v0/item/${output}.json`, json: true }, function (error, response, body) {
            console.log(`Fetching https://hacker-news.firebaseio.com/v0/item/${output}.json`)
            let hackerNewsLatest_Embed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(body.title)
                .addField('Submitted by', `${body.by}`, false)
                .addField('URL', `${body.url}`, false)
                .setFooter(`https://news.ycombinator.com/item?id=${output}`);
            message.channel.send(hackerNewsLatest_Embed);
        })
    })} catch(err){}
}
function getAsk(message) {
    try{
    request({ url: `https://news.ycombinator.com/ask` }, function (error, response, body) {
        console.log(`Fetching https://news.ycombinator.com/ask`);
        let output = body.match(RegExp(/">1\..*_(.*vote)/))
        output = (output[0].match(RegExp(/_[^']+/)));
        output = output[0].replace('_', '');
        request({ url: `https://hacker-news.firebaseio.com/v0/item/${output}.json`, json: true }, function (error, response, body) {
            console.log(`Fetching https://hacker-news.firebaseio.com/v0/item/${output}.json`)
            let hackerNewsLatest_Embed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(body.title)
                .addField('Submitted by', `${body.by}`, false)
                .addField('URL', `${body.url}`, false)
                .setFooter(`https://news.ycombinator.com/item?id=${output}`);
            message.channel.send(hackerNewsLatest_Embed);
        })
    })} catch(err){}
}
function getPast(message) {
    try{
    request({ url: `https://news.ycombinator.com/front` }, function (error, response, body) {
        console.log(`Fetching https://news.ycombinator.com/front`);
        let output = body.match(RegExp(/">1\..*_(.*vote)/))
        output = (output[0].match(RegExp(/_[^']+/)));
        output = output[0].replace('_', '');
        request({ url: `https://hacker-news.firebaseio.com/v0/item/${output}.json`, json: true }, function (error, response, body) {
            console.log(`Fetching https://hacker-news.firebaseio.com/v0/item/${output}.json`)
            let hackerNewsLatest_Embed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(body.title)
                .addField('Submitted by', `${body.by}`, false)
                .addField('URL', `${body.url}`, false)
                .setFooter(`https://news.ycombinator.com/item?id=${output}`);
            message.channel.send(hackerNewsLatest_Embed);
        })
    })} catch(err){}
}
function getShow(message) {
    try{
    request({ url: `https://news.ycombinator.com/show` }, function (error, response, body) {
        console.log(`Fetching https://news.ycombinator.com/show`);
        let output = body.match(RegExp(/">1\..*_(.*vote)/))
        output = (output[0].match(RegExp(/_[^']+/)));
        output = output[0].replace('_', '');
        request({ url: `https://hacker-news.firebaseio.com/v0/item/${output}.json`, json: true }, function (error, response, body) {
            console.log(`Fetching https://hacker-news.firebaseio.com/v0/item/${output}.json`)
            let hackerNewsLatest_Embed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(body.title)
                .addField('Submitted by', `${body.by}`, false)
                .addField('URL', `${body.url}`, false)
                .setFooter(`https://news.ycombinator.com/item?id=${output}`);
            message.channel.send(hackerNewsLatest_Embed);
        })
    })} catch(err){}
}