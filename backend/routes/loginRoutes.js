            const express = require("express")
            const User = require("../models/UserModel.js")
            // const {
            //     login
            // } = require("../controllers/loginController.js")
            // const {
            //     // middlewares, 
            // } = require("../middleware/loginMiddleware.js")
            const router = express()

            const login = (async (req, res) => {
                try {
                    const { userPassword, userEmail } = req.user.body
                    const userInDB = await User.findOne({ userEmail })

                    const isMatch = await bcrypt.compare(
                        userPassword,
                        userInDB?.userPassword,
                    );

                    if (isMatch) {
                        return res.status(200).json({ message: "Logged in " })
                        //compare userPasswordFromFrontend to the decrypted password. 
                    }
                } catch (e) {
                        console.error("catch block of login")
                }
            })

            router.get("/login", login)

            module.exports = router
