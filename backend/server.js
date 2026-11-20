require("dotenv").config()
const express = require("express")
const cors = require("cors")
const DataBase = require("./db.js")
const app = express()
const PORT = 5000

const userRoutes = require("./routes/userRoutes.js")

//MIDDLEWARE
app.use(express.json())
app.use(cors())

app.use("/api/users", userRoutes)

DataBase()

//SERVER
app.listen(PORT, () => {
    console.log(`Server running on port, ${PORT}`)
})

