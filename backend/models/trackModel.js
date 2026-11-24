const express = require('express')
const mongoose = require('mongoose')

const trackSchema = mongoose.Schema({



}, {timestamps:true})

module.exports = mongoose.model('tracks', trackSchema)