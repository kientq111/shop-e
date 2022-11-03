const users = require('./data/users');
const products = require('./data/products');
const Account = require('./models/userModel');
const Product = require('./models/productModel');
const { protect, isAdmin } = require('./middlewares/auth.Middleware')
const connectDB = require('./config/db')
require('dotenv').config()

connectDB();


const importData = async () => {
    try {
        // await Account.deleteMany();
        // await Account.insertMany(users);
        await Product.insertMany(products);
        console.log('insert successful');
    } catch (error) {
        console.log('Fail', error);
    }
}




importData();