const express = require("express")
const {
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/userController.js")
const router = express.Router()

router.get("/user", getUser)
router.post("/user", createUser)
router.put("/user", updateUser)
router.delete("/user", deleteUser)

module.exports = router
