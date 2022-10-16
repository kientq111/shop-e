var express = require('express');
var router = express.Router();
const { protect, isAdmin } = require('../middlewares/auth.Middleware')
const { getAllUsers, updateProfile, getUserById } = require('../controllers/userController');

// 1.
// @desc: get all user
// @route: GET /api/users
// @access: Public - return token
router.get('/', protect, isAdmin, getAllUsers);


// 2.
// @desc: update userprofile
// @route: GET /api/users
// @access: Public - return token
router.put('/profile', protect, updateProfile);


router.get('/:id', protect, getUserById);

module.exports = router;
