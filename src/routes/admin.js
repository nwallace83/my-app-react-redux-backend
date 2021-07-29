const express = require('express');
const router = express.Router()
const user = require('../models/user-model')
const adminOnly = require('../middlware/adminOnly')

router.get('/users',adminOnly,async (req,res) => {
    const users = await user.UserModel.find()
    res.json(users)
})

router.delete('/users/:userName',adminOnly,async (req,res) => {
    user.UserModel.deleteOne({username: req.params.userName})
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