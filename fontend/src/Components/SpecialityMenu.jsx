import React from 'react'
import {specialityData} from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='flex items-center flex-col gap-4 py-26 text-gray-800'>
      <h1 className='text-4xl '>Seha Specialities</h1>
      <p className='md:w-1/4 text-center text-md'>SEHA takes pride in providing an extensive range of world-class services and sub-specialties,</p>
      <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll '>
        {specialityData.map((item,index)=>(
            <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index} to={`/doctors/${item.speciality}`}>
                <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
                <p>{item.speciality}</p>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu
