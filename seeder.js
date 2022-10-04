const users = require('./data/users');
const Account = require('./models/userModel');
const {protect, isAdmin} = require('./middlewares/auth.Middleware')
const connectDB = require('./config/db')


connectDB();


const importData = async () => {
    try {
        await Account.deleteMany();
        await Account.insertMany(users);
        console.log('insert successful');
    } catch (error) {
        console.log('Fail', error);
    }
}




importData();