const jwt = require('jsonwebtoken');
const Account = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');

const protect = expressAsyncHandler(async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const userVerify = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await Account.findById(userVerify.id).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized or token invalid');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized or token invalid');
    }
})

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not permission');
    }
}

module.exports = {
    protect, isAdmin
}