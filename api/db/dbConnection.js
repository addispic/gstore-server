const mongoose = require("mongoose")

// db connection
const dbConnectionHandler = async () => {
    if(mongoose.connections[0].readyState){
        return true
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected")
    } catch (err) {
        console.log("db connection failed")
        process.exit(-1)
    }
}

// exports
module.exports = dbConnectionHandler