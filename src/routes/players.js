var express = require('express');
var router = express.Router()

const DB_SERVER = process.env.NODE_ENV == "production" ? "mongodb://mongo:27017/my_db" : "mongodb://localhost:27017/my_db"
var mongoose = require('mongoose');
mongoose.connect(DB_SERVER);

var playerSchema = mongoose.Schema({
    playerName: String,
    playerClass: String,
    protected: Boolean
});

var Player = mongoose.model("player",playerSchema)

router.get('/',async (req,res) => {
    var players = await Player.find();
    res.json(players)
})

router.post('/',async (req,res) => {
    var player = new Player( {
        playerName: req.body.playerName,
        playerClass: req.body.playerClass,
        protected: false
    })

    result = await player.save();
    res.json(result);
})

router.delete('/',async (req,res) => {
    var player = new Player({
        _id: req.body._id,
    })

    var result = await player.delete(player);
    res.status(200).send()
})

module.exports = router;