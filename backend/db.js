const mongoose = require("mongoose")
require("dotenv").config()

const DataBase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("#===== - Database is OnLine - =====# ")
    } catch (e) {
        console.log("error connecting to DB", e)
        process.exit(1)
    }
}

DataBase()
module.exports = DataBase