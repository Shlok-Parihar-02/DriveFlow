const express = require("express")
const User = require("../models/UserModel.js")
const bcrypt = require("bcrypt")

const getUser = async (req, res) => {
    try{
        const result = await User.findById(req.user.id)
        if (!result) return res.status(404).json({message:"User Doesnt Exists"})
        res.status(200).json({message:"getUser API success.!", data: result})
    } catch (e) {
        console.error("Error at getUser", e)
        res.status(500).json({message:"Internal Server Error, getUser", data: e})
    }
}
const createUser = async (req, res) => {
    try{
        const {userEmail, userPassword } = req.body
        const salt = await bcrypt.genSalt(6)
        const HASHPASS = await bcrypt.hash(userPassword, salt)
        const result = await User.create({userEmail, userPassword : HASHPASS})
        res.status(201).json({message:"Account created successfully"})
        console.info(result)
    } catch (e) {
        console.error("Error at createUser", e)
        res.status(500).json({message:"Internal Server Error, createUser", data: e})
    }
}
const updateUser = async (req, res) => {
    try{
        const {userName} = req.body
        const updatedUser = await User.findByIdAndUpdate({userName}) 
        res.status(200).json({message:"Account updated Successfully", data: updatedUser})
    } catch (e) {
        console.error("Error at updateUser", e)
        res.status(500).json({message:"Internal Server Error, updateUser", data: e})
    }
}
const deleteUser = async (req, res) => {
    try{
        const result = await User.findByIdAndDelete(req.user.id)
        if (!result) {
            res.status(404).json({message:"User Not Found"})
        }
    } catch (e) {
        console.error("Error at deleteUser", e)
        res.status(500).json({message:"Internal Server Error, deleteUser", data: e})
    }
}


module.exports = {getUser, createUser, updateUser, deleteUser}