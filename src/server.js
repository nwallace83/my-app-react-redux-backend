const express = require('express');
const app = express();
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(cookieParser())

var xkcd = require('./routes/xkcd')
var players = require('./routes/players')
var auth = require('./routes/auth')
var admin = require('./routes/admin')

app.use('/api/xkcd',xkcd)
app.use('/api/players',players)
app.use('/auth',auth)
app.use('/admin',admin)

app.listen(3001);