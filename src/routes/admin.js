const express = require('express');
const router = express.Router()
const user = require('../models/user-model')
const adminOnly = require('../middlware/adminOnly')

router.get('/users',adminOnly,(req,res) => {
    user.UserModel.find()
    .then(users => {
        let filteredUsers = users.map(user => {
            return {userName: user.userName, role: user.role}
        })
        res.json(filteredUsers)
    })
})

router.delete('/users/:userName',adminOnly,(req,res) => {
    user.UserModel.deleteOne({userName: req.params.userName})
    .then(() => {
        console.log("Deleted user: " + req.params.userName)
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log(err)
        res.sendStatus(401)
    })
})

module.exports = router