require("dotenv").config()
const express = require("express")
const cors = require("cors")
const DataBase = require("./db.js")
const app = express()
const PORT = 5000

//MIDDLEWARE
app.use(express.json())

DataBase()

//SERVER
app.listen(PORT, () => {
    console.log(`Server running on port, ${PORT}`)
})

