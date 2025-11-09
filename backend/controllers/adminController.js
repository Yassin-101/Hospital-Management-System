const validator = require('validator')
const bycrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2;
const doctorModel = require('../models/doctor')
const jwt = require('jsonwebtoken')

// api for adding doctor
const addDoctor = async(req,res)=>{
    try {
       const {name,email,password,speciality,degree,experiance,about,fees,address} = req.body 
       const imageFile = req.file

       // checking for all data to add doctor
       if(!name || !email || !password || !speciality || !degree || !experiance || !about || !fees || !address){
        return res.json({success:false, message:"Missing Details"})
       }

       // validating email format

       if (!validator.isEmail(email)) {
        return res.json({success:false, message:"Please enter the valid email"})
       }

       // validating strong password
       if (password.length < 8) {
        return res.json({success:false, message:"Please enter a strong password"})
       }

       // hashing doctor passowrd
       const salt = await bycrypt.genSalt(10)
       const hashedPassword = await bycrypt.hash(password,salt)

       // upload image to cloudanary
       const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
       const imageUrl = imageUpload.secure_url

       const doctorData = {
        name,
        email,
        image:imageUrl,
        password:hashedPassword,
        speciality,
        degree,
        experiance,
        about,
        fees,
        address:JSON.parse(address),
        date:Date.now() 
       }

       const newDoctor = new doctorModel(doctorData)
       await newDoctor.save()

       res.json({success:true,message:"doctor added"})

     
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

  // API for admin login
       const loginAdmin = async(req,res)=>{
            try {
                const {email,password} = req.body
                if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
                    const token = jwt.sign(email + password,process.env.JWT_SECRET)
                    res.json({success:true,token})
                }else{
                    res.json({success:false,message:"Invalid email and password"})
                }
            } catch (error) {
                 console.log(error)
        res.json({success:false,message:error.message})
            }
       }

       // API to get all doctor list for admin panel

       const allDoctors = async(req,res)=>{
            try {
                const doctors = await doctorModel.find({}).select('-password')
                res.json({success:true,doctors})
            } catch (error) {
                console.log(error)
        res.json({success:false,message:error.message})
            }
       }

module.exports = {addDoctor, loginAdmin,allDoctors}