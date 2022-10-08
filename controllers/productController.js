const expressAsyncHandler = require('express-async-handler');
const Product = require('../models/productModel');


const getAllProduct = expressAsyncHandler(async (req, res) => {
    const product = await Product.find({}).select('-__v');
    res.json(product);
})


const createProduct = expressAsyncHandler(async (req, res) => {
    const { productName, description, image, price, countInStock } = req.body;
    const product = new Product({
        productName: productName,
        description: description,
        image: image,
        price: price,
        countInStock: countInStock
    })
    const resultProduct = await product.save();
    res.status(200).json(resultProduct);
})

const getProductById = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(400).json({
            message: "Not found product"
        })
    }
})


module.exports = { getAllProduct, createProduct, getProductById }