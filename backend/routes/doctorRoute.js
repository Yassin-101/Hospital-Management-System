const express = require('express');
const { doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel } = require('../controllers/doctorController');
const authDoctor = require('../middlewares/authDoctor');

const doctorRouter = express.Router();

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor, appointmentsDoctor)
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete)
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel)
module.exports = doctorRouter