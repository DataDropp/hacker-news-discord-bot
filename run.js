const request = require('request');
request({url: `https://news.ycombinator.com/newest`}, function(error,response,body){
    let output = body.match(RegExp(/">1\..*_(.*vote)/))
    output = (output[0].match(RegExp(/_[^']+/)));
    output = output[0].replace('_','');
    request({url: `https://hacker-news.firebaseio.com/v0/item/${output}.json`,json:true}, function(error,response,body){
        console.log(body);
    })
});