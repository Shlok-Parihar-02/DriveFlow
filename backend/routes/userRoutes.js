const express = require("express")
const {
    getUser,
    createUser,
    udpateUser,
    deleteUser
} = require("../controllers/userController.js")
const router = express()

router.get("/getUser", getUser)
router.post("/createUser", createUser)
router.put("/udpateUser", udpateUser)
router.delete("/deleteUser", deleteUser)

module.exports = router
