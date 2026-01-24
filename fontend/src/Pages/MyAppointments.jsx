import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import {loadStripe} from '@stripe/stripe-js'
import { useSearchParams, useNavigate } from 'react-router-dom';

const MyAppointments = () => {

  const { backendUrl, token, getDoctorsData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])
   const [searchParams] = useSearchParams();
 
  const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate)=>{
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }
   const navigate = useNavigate();

  const getUserAppointments = async()=>{
    try {
      const {data} = await axios.get(backendUrl + '/api/user/appointments', {headers:{token}})

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async(appointmentId) =>{
    try {
      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId}, {headers:{token}})

      if(data.success){
          toast.success(data.message)
          getUserAppointments()
          getDoctorsData()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
       console.log(error)
      toast.error(error.message)
    }
  }
  const handlePaymentQuery = async () => {
  const appointmentId = searchParams.get('appointmentId');
  const paid = searchParams.get('paid');

  if (appointmentId && paid === 'true') {
    try {
      // Update backend
      await axios.post(
        backendUrl + '/api/user/mark-paid',
        { appointmentId },
        { headers: { token } }
      );

      // Update local state so it immediately shows Paid
      setAppointments(prev =>
        prev.map(app =>
          app._id === appointmentId ? { ...app, payment: true } : app
        )
      );

      toast.success('Payment successful!');

      // Remove query params without reloading
      const url = window.location.pathname;
      window.history.replaceState(null, '', url);

    } catch (error) {
      toast.error('Failed to mark payment');
    }
  }
};


const appointmentStripe = async (appointmentId) => {
  try {
    const { data } = await axios.post(
      backendUrl + "/api/user/payment-stripe",
      { appointmentId },
      { headers: { token } }
    );

    if (data.success) {
      // redirect to the Stripe-hosted checkout page
      window.location.href = data.url;
    }
  } catch (error) {
    console.error(error);
    toast.error("Payment failed");
  }
};

  useEffect(()=>{
    if (token) {
      getUserAppointments()
      handlePaymentQuery()
    }
  },[token])
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <p className='pb-3 mt-12 font-medium text-[#18528f] border-b'>My Appoinments</p>

      <div>
        {appointments.map((item, index) => (
          <div className='gird grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
            </div>

            {/* doctor information */}
            <div className='flex-1 text-sm text-[#18528f] '>
              <p className='text-blue-800 font-semibold '>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-700 font medium mt-1 '>Adress:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-sm mt-1'><span className='text-sm text-blue-900 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
            {/* to make this structure responsive */}
            <div></div>

            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button>}
              {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={()=>appointmentStripe(item._id)} className='text-sm cursor-pointer text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-blue-400 hover:text-white transition-all duration-300 '>Pay Online</button>}
              {!item.cancelled && !item.isCompleted && <button onClick={()=>cancelAppointment(item._id)} className='text-sm cursor-pointer text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>}
              {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>}
              {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
