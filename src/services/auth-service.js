const jwt = require('jsonwebtoken')
const jwtKey = "nate_is_awesome"
const bcrypt = require('bcrypt')
const User = require('../models/user-model')
const TEN_YEARS = 315360000000

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token,jwtKey,(err,user) => {
            if (err) {
                res.sendStatus(401)
            }

            req.user = user
        })

        next()
    }
}

const fetchUser = (userName) => {
    return User.UserModel.findOne({userName: userName.toLowerCase()})
}

const saveUser = async (newUser) => {
    return new User.UserModel({
        userName: newUser.userName.toLowerCase(),
        password: newUser.password,
        role: newUser.role.toUpperCase()
    }).save()
}

const validatePassword = async (userName,password) => {
    let user = await fetchUser(userName)
        .then(res => this.user = res)
        .catch(err => {
            console.error(err)
            return false;
        })
    
    return await bcrypt.compare(password,user.password)
}

const hashPassword = async (plainTextPassword) => {
    let hashedPassword = await bcrypt.hash(plainTextPassword,10).then(res => this.hashedPassword = res)
    return hashedPassword
}

const getTokenForUser = (username,role) => {
    const expireDate = new Date().getTime() + TEN_YEARS
    return jwt.sign({userName: username, role: role, expiresAt: expireDate},jwtKey,{algorithm: "HS256",expiresIn: TEN_YEARS})
}

exports.verifyToken = verifyToken
exports.getTokenForUser = getTokenForUser
exports.hashPassword = hashPassword
exports.fetchUser = fetchUser
exports.saveUser = saveUser
exports.validatePassword = validatePassword