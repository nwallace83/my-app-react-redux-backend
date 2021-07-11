var express = require('express');
var bodyParser = require('body-parser')
var app = express();
const fetch = require('node-fetch');

app.use(express.json())

const DB_SERVER = process.env.NODE_ENV == "production" ? "mongodb://mongo:27017/my_db" : "mongodb://localhost:27017/my_db"
var mongoose = require('mongoose');
mongoose.connect(DB_SERVER);

app.get('/api/xkcd', async (req,res) => {
    var responseBody = await fetchComics()
    res.json(responseBody)

})

async function fetchComics(){
    var promiseArray = [];
    var comics = []
    for (let index = 0; index < 10; index++) {
        promiseArray.push(
            fetch('http://xkcd.com/' + Math.floor(Math.random() * 2481 + 1) + '/info.0.json')
                .then(res => res.json())
                .then(res => comics.push({img: res.img, title:res.title}))
                .catch(err => console.log(err))
        )
    }

    await Promise.all(promiseArray)
    return comics;
}


var playerSchema = mongoose.Schema({
    playerName: String,
    playerClass: String,
    protected: Boolean
});

var Player = mongoose.model("player",playerSchema)

app.get('/api/players',async (req,res) => {
    var players = await Player.find();
    res.json(players)
})

app.post('/api/players',async (req,res) => {
    var player = new Player( {
        playerName: req.body.playerName,
        playerClass: req.body.playerClass,
        protected: false
    })

    result = await player.save();
    res.json(result);
})

app.delete('/api/players',async (req,res) => {
    var player = new Player({
        _id: req.body._id,
    })

    var result = await player.delete(player);
    res.status(200).send()
})


app.use(function(req, res, next){
    console.log("A new request received at " + Date.now());
    next();
 });

app.get('/', function(req, res){
   res.send("Hello world!");
});

app.listen(3001);