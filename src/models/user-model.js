const db = require('../services/db-service')

const userSchema = db.mongoose.Schema({
    userName: String,
    password: String,
    role: String
});

const User = db.mongoose.model("users",userSchema)

exports.userSchema = userSchema
exports.UserModel = User