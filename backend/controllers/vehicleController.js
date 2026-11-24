const Vehicle = require('../models/vehicleModel.js')

const getVehicle = async (req, res) => {
    try {
        const result = await Vehicle.findById(req.params.id)
        if (result) {
            return res.status(200).json({message:"Vehicle fetched", data: result})
        } else {
            return res.status(404).json({message:"Vehicle Not Found"})
        }
    } catch (e) {
        res.status(500).json({message:"Internal server Error at getVehicle"})
        console.error("Internal Server Error at getVehicle: ", e)
    }
}

const postVehicle = async (req, res) => {
    try {

        const existingVehicle = await Vehicle.findOne({
            $or:[
                {vin: req.body.vin},
                {regNum: req.body.regNum},
                {vehicleId: req.body.vehicleId}
            ]
        })

        if (existingVehicle) {
            return res.status(409).json({message:"Duplicate record detected"})
        }

        const result = await Vehicle.create()
        if (result) {
            return res.status(201).json({message:"Vehicle added successfully", data: result})
        }
    } catch (e) {

        if (e.code === 11000) {
            return res.status(409).json({message:"Duplicate record conflict detected"})
        } else if (e.name === 'ValidationError') {
            return res.status(400).json({message:"please check all the fields"})
        } else {
            res.status(500).json({message:"Internal server error, please retry after sometime"})
        }

        console.error("Internal Server Error at postVehicle", e)
    }
}

module.exports = {getVehicle, postVehicle, putVehicle, deleteVehicle}