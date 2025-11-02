import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import { assets } from '../assets/assets'

const Appointments = () => {
  
  const {docId} = useParams()
  const {doctors} = useContext(AppContext)

  const [docInfo,setDocInfo] = useState(null) // to save docInfo

  // find particular doctor from docId
  const fetchDocInfo =  async()=>{
        const docInfo = doctors.find(doc => doc._id === docId)
        setDocInfo(docInfo)
        console.log(docInfo)
  } 

  // to run fetchDocinfo when page gets load
  useEffect(()=>{
      fetchDocInfo()
  },[doctors,docId]) // any of these two data gets change then it will be executed
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
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /> </p>
          <div>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button>{docInfo.experience}</button>
          </div>
          {/* doctor about */}
          <div>
            <p>About <img src={assets.info_icon} alt="" /></p>
            <p>{docInfo.about}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointments
