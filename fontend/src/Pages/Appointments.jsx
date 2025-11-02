// src/Pages/Appointments.jsx
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../Components/RelatedDoctors'

const Appointments = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol } = useContext(AppContext)

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotsIndex, setSlotsIndex] = useState(0)
  const [slotsTime, setSlotsTime] = useState('')

  // find particular doctor from docId
  const fetchDocInfo = async () => {
    if (!doctors || !docId) return
    const found = doctors.find(doc => doc._id === docId)
    setDocInfo(found || null)
  }

  // build available slots for 7 days
  const getAvailableSlots = () => {
    const slotsForWeek = []
    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const dayStart = new Date(today)
      dayStart.setDate(today.getDate() + i)
      dayStart.setHours(10, 0, 0, 0)

      if (i === 0) {
        const now = new Date()
        if (now.getHours() >= 10) {
          const minutes = now.getMinutes()
          if (minutes === 0) {
            dayStart.setHours(now.getHours() + 1, 0, 0, 0)
          } else if (minutes > 0 && minutes <= 30) {
            dayStart.setHours(now.getHours(), 30, 0, 0)
          } else {
            dayStart.setHours(now.getHours() + 1, 0, 0, 0)
          }
        } else {
          dayStart.setHours(10, 0, 0, 0)
        }
      }

      const endTime = new Date(today)
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      const timeSlots = []
      const slotCursor = new Date(dayStart)

      while (slotCursor < endTime) {
        timeSlots.push({
          dateTime: new Date(slotCursor),
          time: slotCursor.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        })
        slotCursor.setMinutes(slotCursor.getMinutes() + 30)
      }

      slotsForWeek.push(timeSlots)
    }

    setDocSlots(slotsForWeek)
    console.log('slotsForWeek:', slotsForWeek)
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
  }, [])

  // helper: get date for each index
  const getDayDateForIndex = (item, index) => {
    if (item && item[0] && item[0].dateTime) {
      return new Date(item[0].dateTime)
    }
    const d = new Date()
    d.setDate(d.getDate() + index)
    d.setHours(0, 0, 0, 0)
    return d
  }

  return (
    docInfo && (
      <div className='mt-30 mx-4 sm:mx-[10%]'>
        {/* Doctor Details */}
        <div className='flex flex-col sm:flex-row gap-4'>
          <div>
            <img className='bg-blue-300 w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt={docInfo.name} />
          </div>

          <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
            <p className='flex items-center gap-2 text-2xl font-medium text-blue-500'>
              {docInfo.name} <img className='w-5' src={assets.verified_icon} alt="verified" />
            </p>

            <div className='flex items-center gap-2 text-sm mt-1 text-[#18528f]'>
              <p>{docInfo.degree} - <span className='font-medium'>{docInfo.speciality}</span></p>
              <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
            </div>

            <div>
              <p className='flex items-center gap-1 text-sm font-medium mt-3 text-blue-500'>Biography</p>
              <p className='text-sm text-[#194f90] max-w-[700] mt-1'>{docInfo.about}</p>
            </div>

            <p className='text-blue-800 font-medium mt-4'>
              Appointment fee: <span><span className='mr-1'>{currencySymbol}</span>{docInfo.fees}</span>
            </p>
          </div>
        </div>

        {/* Booking slots */}
        <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-blue-500'>
          <p>Booking Slots</p>

          <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
            {Array.isArray(docSlots) && docSlots.length === 7 && docSlots.map((item, index) => {
              const dayDate = getDayDateForIndex(item, index)
              const dayLabel = daysOfWeek[dayDate.getDay()]
              const dayNum = dayDate.getDate()

              return (
                <div
                  key={index}
                  className={`text-center py-6 min-w-[4rem] rounded-full cursor-pointer ${slotsIndex === index ? "bg-blue-500 text-white" : "border border-gray-200"}`}
                  onClick={() => setSlotsIndex(index)}
                >
                  <p>{dayLabel}</p>
                  <p>{dayNum}</p>
                </div>
              )
            })}
          </div>

          {/* Times for selected day */}
         <div className=' flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots.length && docSlots[slotsIndex].map((item,index)=>(
            <p onClick={()=>setSlotsTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotsTime ? "bg-blue-500 text-white": "border-gray-300 text-gray-400"}`} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}
         </div>

         <button className='bg-blue-500 text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer'>Book an Appoinment</button>
        </div>

        {/* Listing related doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
      </div>
    )
  )
}

export default Appointments
