const express = require('express');
const { doctorList, loginDoctor, appointmentsDoctor } = require('../controllers/doctorController');
const authDoctor = require('../middlewares/authDoctor');

const doctorRouter = express.Router();

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor, appointmentsDoctor)
module.exports = doctorRouter