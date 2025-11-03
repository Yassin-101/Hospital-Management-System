import React from 'react'
import header from '../assets/image.png'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className="relative w-full h-[80vh] sm:h-[90vh] md:h-[100vh] overflow-hidden">
      {/* Fullscreen background image */}
      <img
        src={header}
        alt="Header Background"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white h-full text-center px-4">
        <h1 className="text-3xl sm:text-5xl md:text-8xl font-medium mb-4 leading-tight">
          SEHA, Trusted for life
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-[34rem] pb-6">
          The largest healthcare network in the UAE: 14+ hospitals & over 7,500 healthcare professionals
        </p>
        <a
          href=""
          className="flex items-center gap-2 bg-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-gray-700 font-medium text-base sm:text-lg hover:scale-105 transition-all duration-300"
        >
          <img className="w-4 sm:w-5" src={assets.arrow_icon} alt="arrow" />
          Book An Appointment
        </a>
      </div>
    </div>
  )
}

export default Header
