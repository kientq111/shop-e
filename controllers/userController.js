const Account = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');


const getAllUsers = expressAsyncHandler(async (req, res) => {
    const users = await Account.find({}).select('-__v -password');
    res.json(users);
})

const updateProfile = expressAsyncHandler(async (req, res) => {
    const account = await Account.findById(req.user._id);
    if (account) {
        const userInfo = {
            firstName: req.body.firstName || account.userInfo.firstName,
            lastName: req.body.lastName || account.userInfo.lastName,
            gender: req.body.gender || account.userInfo.gender,
            dob: req.body.dob || account.userInfo.dob,
            city: req.body.city || account.userInfo.city,
            district: req.body.district || account.userInfo.district,
            street: req.body.street || account.userInfo.street,
        }

        account.userInfo = userInfo;
        const accountUpdated = await account.save();
        res.json(accountUpdated)
    } else {
        res.status(401);
        throw new Error('Account not found');
    }
})

const getUserById = expressAsyncHandler(async (req, res) => {
    try {
        const account = await Account.findById(req.params.id).select('-password -__v');
        if (account) {
            res.json(account);
        } else {
            res.status(400).json({
                message: "Not found Account"
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "Not found Account"
        })
    }
})


module.exports = { getAllUsers, updateProfile, getUserById }