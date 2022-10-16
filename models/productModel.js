const mongoose = require('mongoose');


const reviewSchema = mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Account'
    },
})

const productSchema = mongoose.Schema({
    productName: { type: String, required: true, unique:true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    review: [reviewSchema],
    numReviews: { type: Number, required: true, default: 0 },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;