    const validator = require('validator')
    const bycrypt = require('bcrypt')
    const userModel = require('../models/user')
    const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctor');
const appointmentModel = require('../models/appointment');
    const cloudinary = require('cloudinary').v2;
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    

    // API to register user
    const registerUser = async(req,res)=>{
        try {
            const {name,email,password} = req.body

            if(!name || !email || !password){
                return res.json({success:false,message:"Missing Details"})
            }

            // validating email format

            if(!validator.isEmail(email)){
            return res.json({success:false,message:"enter a valid email"})
            }

            // validating strong password

            if(password.length < 8){
            return res.json({success:false,message:"enter a strong password"})
            }

            // hashing user password
            const salt = await bycrypt.genSalt(10)
            const hashedPassword = await bycrypt.hash(password,salt)

            const userData = {
                name,
                email,
                password:hashedPassword
            }

            const newUser = new userModel(userData)
            const user = await newUser.save()
            
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true,token})

        } catch (error) {
            console.log(error)
            res.json({success:false,message:error.message})
        }
    }

    // API for user login
    const loginUser = async (req,res)=>{
        try {
            const {email,password} = req.body
            const user = await userModel.findOne({email})

            if (!user) {
            return res.json({success:false,message:'User does not exist'})
            }

            const isMatch = await bycrypt.compare(password,user.password)

            if(isMatch){
                const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
                res.json({success:true,token})
            }else{
                res.json({success:false,message:'Invalid email and password'})
            }
        } catch (error) {
            console.log(error)
            res.json({success:false,message:error.message})
        }
    }

    // API to get user profile data
    const getProfile =async (req,res)=>{
        try {
            const userId  = req.userId
            const userData = await userModel.findById(userId).select('-password')
            res.json({success:true,userData})
        } catch (error) {
            console.log(error)
            res.json({success:false,message:error.message})
        }
    }

    // API to update user profile
   const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file; // lowercase .file, not .File

    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      await userModel.findByIdAndUpdate(userId, { image: imageUpload.secure_url });
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// API to book appointment
const bookAppointment = async(req,res)=>{
    try {

        const userId = req.userId; // ← GET FROM TOKEN
    const { docId, slotDate, slotTime } = req.body;

        const docData = await doctorModel.findById(docId).select('-password')

        if(!docData.available){
            return res.json({success:false,message:"Doctor not available"})
        }

        let slots_booked = docData.slots_booked

        // checking for slots availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                 return res.json({success:false,message:"Slot not available"})
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked

        const appointmentData = {
            userId,docId,userData,docData,amount:docData.fees,slotTime,slotDate,date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
        
    } catch (error) {
         console.log(error);
    res.json({ success: false, message: error.message });
    }
}

// API to get user appointments for frontend my-appoitments page
const listAppointment = async(req,res)=>{

    try {
         const userId = req.userId; 
         const appointments = await appointmentModel.find({userId})

         res.json({success:true,appointments})
    } catch (error) {
          console.log(error);
    res.json({ success: false, message: error.message });
    }
}

// API to cancel appointment
const cancelAppointment = async(req,res)=>{
    try {
        const userId = req.userId; 
        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        // verify appointment user
        if (appointmentData.userId !== userId) {
            return res.json({success:false, message:"Unauthorized action"})
        }

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

        // releasing doctor slot

        const {docId, slotDate, slotTime} = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e =>  e!== slotTime)

        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({success:true,message:"Appointment Cancelled"})
        
    } catch (error) {
         console.log(error);
    res.json({ success: false, message: error.message });
    }
}



// API to make payment of appointmnet using rayzor pay

// API to pay for appointment using Stripe
const paymentStripe = async (req, res) => {
    try {
        const userId = req.userId; // from auth middleware
        const { appointmentId } = req.body;

        // 1. Get appointment
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment cancelled or not found" });
        }

        // 2. Verify user
        if (appointmentData.userId.toString() !== userId) {
            return res.json({ success: false, message: "Unauthorized action" });
        }

        // 3. Create Stripe PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(appointmentData.amount * 100), // amount in fils
            currency: 'aed', // change if needed
            metadata: {
                appointmentId: appointmentData._id.toString(),
                userId: userId
            },
            receipt: appointmentId
        });

        // 4. Send client secret to frontend
        res.json({ success: true, clientSecret: paymentIntent.client_secret });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


    module.exports = {registerUser, loginUser , getProfile, updateProfile, bookAppointment,listAppointment, cancelAppointment, paymentStripe}