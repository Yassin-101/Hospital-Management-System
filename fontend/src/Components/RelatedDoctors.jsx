import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({speciality,docId}) => {

    const {doctors} = useContext(AppContext)
    const navigate = useNavigate()

    const[relDoc,setRelDoc] = useState([])

    useEffect(()=>{

        if(doctors.length > 0 && speciality){
            const doctorData = doctors.filter((doc)=>doc.speciality === speciality && doc._id !== docId )
            setRelDoc(doctorData)
        }

    },[doctors,speciality,docId])
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-blue-600 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
      <div className='w-full grid grid-cols-4 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
          {relDoc.slice(0,5).map((item,index)=>(
            <div onClick={()=>{navigate(`/appointments/${item._id}`); scrollTo(0,0) }} className='border border-gray-400'>
              <img className='bg-blue-50 cursor-pointer' src={item.image} alt="" />
                <div className="p-4 text-center text-gray-900">
                <p className="text-lg font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">{item.speciality}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default RelatedDoctors
