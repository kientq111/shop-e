const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userInfoSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: Boolean, required: true },
  dob: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  street: { type: String, required: true }
})

const accountSchema = mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userInfo: userInfoSchema,
  status: { type: Boolean, required: true, default: true },
  isVerify: { type: Boolean, required: true, default: false },
  isAdmin: { type: Boolean, required: true, default: false },
})

accountSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;