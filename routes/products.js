var express = require('express');
var router = express.Router();
const { protect, isAdmin } = require('../middlewares/auth.Middleware')
const { getAllProduct, createProduct, getProductById, reviewProduct } = require('../controllers/productController');

// 1.
// @desc: get all product
// @route: GET /api/products
// @access: Public - return token
router.get('/', getAllProduct);

// 2.
// @desc: create product
// @route: POST /api/products
// @access: Private - return token
router.post('/', protect, isAdmin, createProduct);

// 3.
// @desc: get product by id
// @route: GET /api/products/:id
// @access: Public - return token
router.get('/:id', getProductById);


// 4.
// @desc: Review Product
// @route: POST /api/products/:id/review
// @access: Public - return token
router.post('/:id/review', protect, reviewProduct);


module.exports = router;
