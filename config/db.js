const mongoose = require('mongoose');

 const mongoAtlasUri = "mongodb+srv://kient235:Password1@cluster0.6erslef.mongodb.net/shop-online?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_URL);
        console.log(`MongoDb connected: ${connect}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;