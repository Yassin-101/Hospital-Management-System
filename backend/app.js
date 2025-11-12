require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const connectCloudinary = require('./config/cloudinary')



app.use(cors())
app.use(express.json())
connectCloudinary()


const adminRouter = require('./routes/adminRoute')
const doctorRouter = require('./routes/doctorRoute')
const userRouter = require('./routes/userRoutes')


//middlware


//api endpoints
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

module.exports = app