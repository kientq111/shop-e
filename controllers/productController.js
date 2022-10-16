const expressAsyncHandler = require('express-async-handler');
const Product = require('../models/productModel');


const getAllProduct = expressAsyncHandler(async (req, res) => {
    const product = await Product.find({}).select('-__v');
    res.json(product);
})


const createProduct = expressAsyncHandler(async (req, res) => {
    const { productName, description, image, price, category, countInStock } = req.body;
    const isProductName = await Product.findOne({ productName });
    if (isProductName) {
        res.status(400);
        throw new Error('Product is existed');
    }
    const product = new Product({
        productName: productName,
        description: description,
        image: image,
        price: price,
        category: category,
        countInStock: countInStock
    })
    const data = await product.save();
    res.status(200).json({
        message: "Success",
        data
    });
})

const getProductById = expressAsyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(400).json({
                message: "Not found product"
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "Not found product"
        })
    }
})

const reviewProduct = expressAsyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            const { rating, comment } = req.body;
            const review = {
                name: req.user.userName,
                rating: rating,
                comment: comment,
                account: req.user._id
            }
            product.review.push(review);
            //count number of review
            product.numReviews = product.review.length;
            //calculate Rating
            rvArray = product.review;
            product.rating = rvArray.reduce(function (total, currentValue, index, { length }) {
                return total + currentValue.rating / length;
            }, 0);
            const data = await product.save();
            res.status(200).json({
                message: "Success",
                data
            })
        } else {
            res.status(400).json({
                message: "Not found product"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "There is some error!"
        })
    }



})


module.exports = { getAllProduct, createProduct, getProductById, reviewProduct }