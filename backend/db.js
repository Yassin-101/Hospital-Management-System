const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database conneted successfully🚀🚀🚀")
    } catch (error) {
        console.log("Connection failed💀💀💀")
        process.exit(1) 
    }
}

module.exports = connectDB