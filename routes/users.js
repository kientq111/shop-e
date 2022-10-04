var express = require('express');
var router = express.Router();
const { getAllUsers } = require('../controllers/userController');
const { protect, isAdmin } = require('../middlewares/auth.Middleware')

// 1.
// @desc: get all user
// @route: GET /api/users
// @access: Public - return token
router.get('/', protect, getAllUsers);

module.exports = router;
