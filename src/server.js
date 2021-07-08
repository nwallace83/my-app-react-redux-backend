var express = require('express');
var app = express();
const fetch = require('node-fetch');

app.get('/api/xkcd', async (req,res) => {
    var responseBody = await fetchComics()
    res.send(responseBody)

})

async function fetchComics(){
    var promiseArray = [];
    var comics = []
    for (let index = 0; index < 10; index++) {
        promiseArray.push(
            fetch('http://xkcd.com/' + Math.floor(Math.random() * 2481 + 1) + '/info.0.json')
                .then(res=> res.json())
                .then(res => comics.push(res))
                .catch(err => console.log(err))
        )
    }

    await Promise.all(promiseArray)
    return comics;
}

app.use(function(req, res, next){
    console.log("A new request received at " + Date.now());
    next();
 });

app.get('/', function(req, res){
   res.send("Hello world!");
});

app.listen(3001);