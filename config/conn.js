const mongoose  = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URL)
        console.log("Connected to MongoDB successfully..")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
    }
}

module.exports = connectDB