var express = require('express');
var router = express.Router();
const { protect, isAdmin } = require('../middlewares/auth.Middleware')
const { authLogin, registerAccount, changeAccountStatus, sendMailVerify, VerifyMailToken, changePassword } = require('../controllers/accountController');

// 1.
// @desc: Login account
// @route: POST /api/accounts/login
// @access: Public - return token
router.post('/login', authLogin);
// 2.
// @desc: Register account
// @route: GET /api/accounts/register
// @access: Public - return token
router.post('/register', registerAccount);

// 3.
// @desc: Change Account Status
// @route: PUT /api/accounts/status
// @access:  Admin - return token
router.put('/status', protect, isAdmin, changeAccountStatus);

// 4.
// @desc: Verify Account
// @route: PUT /api/accounts/verify
// @access: Public - return token
router.get('/verify', protect, sendMailVerify);

// 5.
// @desc: Verify Account
// @route: PUT /api/accounts/verify
// @access: Public - return token
router.post('/verify', protect, VerifyMailToken);

// 6.
// @desc: Change Password
// @route: PUT /api/accounts/verify
// @access: Public - return token
router.put('/password', protect, changePassword);

// 7.
// @desc: Forgot Password
// @route: PUT /api/accounts/verify
// @access: Public - return token
// router.put('/password', protect, VerifyMailToken);

module.exports = router;
