require("dotenv").config()

const mongoose = require("mongoose")

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB CONNECTION SUCCESS")
    }catch(error){
        console.log("MongoDB CONNECTION FAILED")
        process.exit(1)
    }
}
module.exports = connectDB