const express = require('express');
const router = express.Router()
const user = require('../models/user-model')
const adminOnly = require('../middlware/adminOnly')

router.get('/users',adminOnly,async (req,res) => {
    const users = await user.UserModel.find()
    res.json(users)
})

module.exports = router