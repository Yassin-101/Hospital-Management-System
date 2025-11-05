require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
const path = require('path')



app.use(cors())
app.use(express.json())


const adminRouter = require('./routes/adminRoute')


//middlware


//api endpoints
app.use('/api/admin',adminRouter)

module.exports = app