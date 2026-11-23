const express = require('express')
const {
    getVehicle,
    postVehicle,
    putVehicle,
    deleteVehicle
} = require('../controllers/vehicleController.js')
const router = express.Router()

router.get("/vehicle", getVehicle)
router.post("/vehicle", postVehicle)
router.put("/vehicle:id", putVehicle)
router.delete("/vehicle:id", deleteVehicle)

module.exports = router