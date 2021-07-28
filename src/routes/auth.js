const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')
const jwtKey = "nate_is_awesome"
const authService = require('../services/auth-service')
const TEN_YEARS = 315360000000

router.post('/login', async (req,res) => {
    let user = await authService.fetchUser(req.body.userName).then(res => this.user = res)

    if (!user || !req.body.userName || !req.body.password) {
        res.sendStatus(401)
    } else {
        if (await authService.validatePassword(req.body.userName,req.body.password)) {
            const token = authService.getTokenForUser(user.userName,user.role)
            const payload = {userName: req.body.userName, sessionToken: token}
            res.cookie("authorization",token,{expires: new Date(Number(new Date()) + TEN_YEARS)})
            res.cookie("userName",user.userName)
            res.cookie("role",user.role)
            res.json(payload)
        } else{
            res.status(401).send("invalid password")
        }
    }
})

router.post('/register', async (req,res) => {
    const user = await authService.fetchUser(req.body.userName).then(res => this.user = res)

    if (user) {
        res.status(401).send("User already exists")
    } else {
        const hashedPassword = await authService.hashPassword(req.body.password)

        let newUser = {
            userName: req.body.userName,
            password: hashedPassword,
            role: req.body.role,
        }

        await authService.saveUser(newUser)
        .then(() => {
            const token = authService.getTokenForUser(newUser.userName,newUser.role)
            res.cookie("authorization",token,{expires: new Date(Date.now() + TEN_YEARS)})
            res.json(token)
        })
        .catch(err => {
            console.error(err)
            res.sendStatus(401)
        })
    }
})

router.get('/',(req,res) => {

    if(!req.cookies.token) {
        res.status(401).send()
    }

    var payload = jwt.verify(req.cookies.token, jwtKey)

    res.json(payload)
})

module.exports = router;