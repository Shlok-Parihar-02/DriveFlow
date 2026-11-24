const mongoose = require('mongoose')

const vehicleSchema = mongoose.Schema({
    vehicleId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    vehicleType: {
        type: String,
        required: true,
        enum: ["SUV", "Sedan", "Hatchback", "Pickup"]
    },
    vin: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    regNum: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    manufacturer: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
    },
    modelYear: {
        type: Number,
        required: true,
        min: 1900,
        max: 2100
    },
    vehicleImages: {
        type: [String],
        default: [],
        validate: {
            validator: arr => arr.length > 0,
            message: "Please upload atleast one image." // AI Showed me this trick
        }
    },
    vehicleDescription: {
        type: String,
        required: true,
        trim: true,
    },
    vehicleTechSpecs: {
        fuelType: {
            type: String,
            enum: ['Petrol', 'Diesel', 'Hybrid', 'Electric', 'CNG'],
            required: true
        },
        transmission: {
            type: String,
            enum: ['Automatic', 'Manual'],
            required: true
        },
        power: {
            type: Number,
            required: true
        },
        seatingCapacity: {
            type: Number,
            required: true
        },
        mileage: {
            type: Number,
            required: true
        },
    },
    lastServiceDate: {
        type: Date,
        default: null,
    },
    nextServiceDate: {
        type: Date,
        default: null,
    },
    insurerCompany: {
        type: String,
        required: true
    },
    insuranceExpiryDate: {
        type: Date,
        required: true
    },
    pucExpiry: {
        type: Date,
        required: true
    },
    rcExpiry: {
        type: Date,
        required: true,
    },
    assignedTrack: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track',
        required: false,
        default: null
    },
    currentLocation: {
        type: String,
        required: true,
        enum: ["Track", "Garage", "Showroom", "Carwash"]
    },
}, { timestamps: true })

module.exports = mongoose.model('vehicles', vehicleSchema)