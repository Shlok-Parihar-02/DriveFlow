const express = require("express")
const {
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/userController.js")
const router = express.Router()

router.get("/getUser", getUser)
router.post("/createUser", createUser)
router.put("/udpateUser", updateUser)
router.delete("/deleteUser", deleteUser)

module.exports = router
