const express = require('express')
const Vehicle = require('../models/vehicleModel.js')

const getVehicle = async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({message:"Internal server Error at getVehicle", data: e})
    }
}

module.exports = {getVehicle, postVehicle, putVehicle, deleteVehicle}