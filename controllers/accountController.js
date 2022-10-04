const Account = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');
var bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/generateToken');

const authLogin = expressAsyncHandler(async (req, res) => {
    const { userName, password } = req.body;
    const account = await Account.findOne({ userName });
    const checkPassword = await bcrypt.compare(password, account.password);
    if (account && checkPassword) {
        res.json({
            accessToken: generateToken(account._id),
        })
    } else {
        res.status(401);
        throw new Error('Invalid Email or Pwd')
    }
})

const registerAccount = expressAsyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    const usernameExist = await Account.findOne({ userName });
    const emailExist = await Account.findOne({ email });
    if (usernameExist) {
        res.status(400);
        throw new Error('Username already exist');
    }
    if (emailExist) {
        res.status(400);
        throw new Error('Email already exist');
    }
    const newAccount = await Account.create({ userName, email, password });
    if (newAccount) {
        res.status(200).json({
            _id: newAccount._id,
            username: newAccount.username,
            email: newAccount.email,
            isAdmin: newAccount.isAdmin,
            accessToken: generateToken(newAccount._id),
        })
    }
    else {
        res.status(500).json({
            message: 'something wrong',
        })
    }
})

module.exports = { authLogin, registerAccount }