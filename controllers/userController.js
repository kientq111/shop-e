const Account = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');


const getAllUsers = expressAsyncHandler(async (req, res) => {
    const users = await Account.find({}).select('-__v');
    res.json(users);
})

module.exports = { getAllUsers }