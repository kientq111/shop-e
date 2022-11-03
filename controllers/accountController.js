const Account = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');
var bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/generateToken');
const { sendEmail } = require('../utils/sendMail');
const jwt = require('jsonwebtoken');

const authLogin = expressAsyncHandler(async (req, res) => {
    const { userName, password } = req.body;
    console.log(req.body);
    try {
        const account = await Account.findOne({ userName });
        if (account.status === false) {
            res.status(401);
            throw new Error('Account has been blocked, please contact to admin to unblock this account!')
        }
        const checkPassword = await bcrypt.compare(password, account.password);
        if (account && checkPassword) {
            res.json({
                data: {
                    id: account._id,
                    userName: account.userName,
                    email: account.email,
                    status: account.status,
                    isVerify: account.isVerify,
                    isAdmin: account.isAdmin
                },
                accessToken: generateToken(account._id, process.env.JWT_SECRET_LOGIN, "10h"),
            })
        } else {
            res.status(401);
            throw new Error('Invalid UserName or Password')
        }
    } catch (error) {
        res.status(401);
        throw new Error('Invalid UserName or Password')
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
            accessToken: generateToken(newAccount._id, process.env.JWT_SECRET_LOGIN, "10h"),
        })
    }
    else {
        res.status(500).json({
            message: 'something wrong',
        })
    }
})

const changeAccountStatus = expressAsyncHandler(async (req, res) => {
    const { id, status } = req.body;
    const account = await Account.findById(id);
    if (account) {
        account.status = status || account.status;
        const accountUpdated = await account.save();
        res.status(200).json({
            userName: accountUpdated.userName,
            status: accountUpdated.status,
            message: "change status successful"
        })
    }
})

const sendMailVerify = expressAsyncHandler(async (req, res) => {
    const { mail, userName } = req.query;
    const subject = 'Verify Email Shop-online';
    const token = generateToken(req.user._id, process.env.JWT_SECRET_VERIFY_MAIL, "1h")
    const text = `<h3>Hello ${userName}</h3> <div>Welcome and to be a member of GoShop.</div> 
    <div>Last step Please click on the link bellow to verify your email: https://www.google.com/token=${token}</div>
    <div>We hope you have a good experience with Out e-commerce service</div>
    `;
    sendEmail(mail, subject, text);
    res.status(200).json({
        message: "send mail successful"
    })
})


const VerifyMailToken = expressAsyncHandler(async (req, res) => {
    const { token } = req.body;
    try {
        const userVerify = jwt.verify(token, process.env.JWT_SECRET_VERIFY_MAIL)
        // If ok then set isVerify = true in db
        res.status(200).json({
            userVerify: userVerify,
            message: "ok"
        })
    } catch (error) {
        res.status(401);
        throw new Error('Not authorized or token invalid');
    }
})

const changePassword = expressAsyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const account = await Account.findById(req.user._id);
    const checkPassword = await bcrypt.compare(currentPassword, account.password);
    if (checkPassword) {
        account.password = newPassword;
        await account.save();
        res.status(200).json({
            message: "Change password successful!"
        })
    } else {
        res.status(400);
        throw new Error('Wrong Password!');
    }


})

module.exports = { authLogin, registerAccount, changeAccountStatus, sendMailVerify, VerifyMailToken, changePassword }