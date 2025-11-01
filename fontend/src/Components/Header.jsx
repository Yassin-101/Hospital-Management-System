import React from 'react'
import header from '../assets/image.png'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Fullscreen background image */}
      <img
        src={header}
        alt="Header Background"
        className="absolute top-0 left-0 w-full object-cover"
      />

      {/* Optional dark overlay for contrast */}
      <div className="absolute top-0 left-0 w-full h-auto bg-black/40"></div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white h-full text-center px-4">
        <h1 className="text-4xl md:text-8xl font-medium mb-4">SEHA, Trusted for life</h1>
        <p className="text-lg md:text-xl max-w-[34rem] pb-4">
         The largest healthcare network in the UAE: 14+ hospitals & over 7,500 healthcare professionals
        </p>
        <a href="" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 font-medium text-lg m-auto md:m-0 hover:scale-105 transition-all duration-300'>
           <img className='w-4.5' src={assets.arrow_icon} alt="" /> Book An Appointment
        </a>
      </div>
    </div>
  )
}

export default Header
