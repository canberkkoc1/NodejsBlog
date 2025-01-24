const mongoose = require('mongoose');
const dotenv= require('dotenv');

dotenv.config()

const connectDB = async () => {
    console.log(process.env.MONGODB_URI)
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            autoIndex:true
            })

            console.log('DB connection success')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports =  connectDB