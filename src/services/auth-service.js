const jwt = require('jsonwebtoken')
const jwtKey = "nate_is_awesome"
const bcrypt = require('bcrypt')
const User = require('../models/user-model')
const TEN_YEARS = 315360000000

const getUserFromToken = async (token) => {
    try {
        const decodedWebToken = jwt.verify(token,jwtKey)
        const userName = decodedWebToken.userName
        const user = await fetchUser(userName)
        return user;
    } catch{
        return null
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

exports.getUserFromToken = getUserFromToken
exports.getTokenForUser = getTokenForUser
exports.hashPassword = hashPassword
exports.fetchUser = fetchUser
exports.saveUser = saveUser
exports.validatePassword = validatePassword