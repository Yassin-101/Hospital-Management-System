import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import { assets } from '../assets/assets'

const Appointments = () => {
  
  const {docId} = useParams()
  const {doctors, currencySymbol} = useContext(AppContext)

  const [docInfo,setDocInfo] = useState(null) // to save docInfo
  const [docSlots,setDocSlots] = useState([])
  const [slotsIndex,setSlotsIndex] = useState(0)
  const [slotsTime,setSlotsTime] = useState('')

  // find particular doctor from docId
  const fetchDocInfo =  async()=>{
        const docInfo = doctors.find(doc => doc._id === docId)
        setDocInfo(docInfo)
  } 

  // calculate available slots

  const getAvailableSlots = async()=>{
      setDocSlots([])

      // getting current date
      let today = new Date()
      
      for(let i=0; i< 7;i++){
        // getting date with index
        let currentDate = new Date(today)
        currentDate.setDate(today.getDate()+i)

        // setting end time of the date with index
        let endTime  = new Date()
        endTime.setDate(today.getDate()+1)
        endTime.setHours(21,0,0,0)

        // setting hours
        if(today.getDate() === currentDate.getDate()){
          currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours()+1: 10)
          currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)

        }else{
          currentDate.setHours(10)
          currentDate.setMinutes(0)
        } 

        let timeSlots = []

        while(currentDate < endTime){
          let formattedTime = currentDate.toLocaleDateString([], { hour: '2-digit', minute: '2-digit'})

          // add slots to array
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime
          })

          // increment current time by 30 minutes
          currentDate.setMinutes(currentDate.getMinutes()+ 30)
        }

        setDocSlots(prev => ([...prev, timeSlots]))
      }
  }

  // to run fetchDocinfo when page gets load
  useEffect(()=>{
      fetchDocInfo()
  },[doctors,docId]) // any of these two data gets change then it will be executed

  useEffect(()=>{
    getAvailableSlots()
  },[docInfo]) // when docinfo gets change then this function will be executed

  useEffect(()=>{
    console.log(docSlots)
  },[docSlots])


  return docInfo && (
    <div className='mt-30 mx-4 sm:mx-[10%]'>
      {/* Doctors Detail */}
      <div className='flex flex-col sm:flex-row gap-4'>
        {/* doctor image */}
        <div>
          <img className='bg-blue-300 w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>
          {/* doctor info : name, degree and experiance */}
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-blue-500'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /> </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-[#18528f]'>
            <p>{docInfo.degree} - <span className='font-medium'>{docInfo.speciality}</span></p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>
          {/* doctor about */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium mt-3 text-blue-500'>Biography</p>
            <p className='text-sm text-[#194f90] max-w-[700] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-blue-800 font-medium mt-4'>
            Appointment fee: <span><span className='mr-1'>{currencySymbol}</span>{docInfo.fees}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Appointments
