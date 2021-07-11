var express = require('express');
var app = express();
const fetch = require('node-fetch');
app.use(express.json())

var xkcd = require('./routes/xkcd')
var players = require('./routes/players')

app.use('/api/xkcd',xkcd)
app.use('/api/players',players)

app.listen(3001);