const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userInfoSchema = mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    gender: { type: Boolean, require: true },
    dob: { type: String, require: true },
    city: { type: String, require: true },
    district: { type: String, require: true },
    street: { type: String, require: true }
})

const accountSchema = mongoose.Schema({
    userName: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    userInfo: userInfoSchema ,
    status: { type: Boolean, require: true, default: true },
    isVerify: { type: Boolean, require: true, default: false },
    isAdmin: { type: Boolean, require: true, default: false },
})

accountSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        return next(error);
    }
})

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;