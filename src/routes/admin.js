const express = require('express');
const router = express.Router()
const user = require('../models/user-model')

router.get('/users',async (req,res) => {
    const users = await user.UserModel.find()
    res.json(users)
})

module.exports = router