var express = require('express');
var router = express.Router();
const { authLogin, registerAccount } = require('../controllers/accountController');
const { protect, isAdmin } = require('../middlewares/auth.Middleware')

// 1.
// @desc: get all user
// @route: GET /api/users
// @access: Public - return token
router.post('/login', authLogin);
router.post('/register', registerAccount);

module.exports = router;
