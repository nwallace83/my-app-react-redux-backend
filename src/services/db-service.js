const DB_SERVER = process.env.NODE_ENV == "production" ? "mongodb://mongo:27017/my_db" : "mongodb://localhost:27017/my_db"
var mongoose = require('mongoose');
mongoose.connect(DB_SERVER);

exports.mongoose = mongoose;