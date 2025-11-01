import React from 'react'
import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <div className='bg-[#18528f] text-white'>
      <div className='md:mx-10 flex flex-col sm:grid grid-cols-4 gap-14 my-10 mt-40 pt-20 px-10'>
        {/* First column */}
        <div>
            <img className='mb-5 w-30' src={logo} alt="" />
            <p className='w-full text-lg md:w-2/2 leading-6'>Das Tower, Sultan Bin Zayed Street, Abu Dhabi, United Arab Emirates​</p>
        </div>
         {/* Second column */}
        <div>
            <p className='text-xl font-meduim mb-5'>General</p>
            <ul className='flex flex-col gap-2'>
                <li className='cursor-pointer'>Home</li>
                <li className='cursor-pointer'>About Us</li>
                <li className='cursor-pointer'>Contact Us</li>
                <li className='cursor-pointer'>FAQs</li>
            </ul>
        </div>
         {/* Third column */}
        <div>
            <p className='text-xl font-meduim mb-5'>Resource</p>
            <ul className='flex flex-col gap-2'>
                <li>Hospitals</li>
                <li>Specialities</li>
                <li>Doctors</li>
                <li>Insurance Providers</li>
                <li>Patient Education</li>
            </ul> 
        </div>
         {/* Forth column */}
        <div>
              <p className='text-xl font-meduim mb-5'>Suport Service</p>
            <ul className='flex flex-col gap-2'>
                <li>Corporate Social Resposibility</li>
                <li>Privacy & Policy</li>
                <li>Terms & Conditions</li>
                <li>Insurance Providers</li>
                <li>Patient Education</li>
            </ul> 
        </div>
      </div>
      {/* Horizontal line & copy rigth text */}
      <div>
        <hr />
        <p className='py-5 text-sm px-18'>©️ Copyright 2024 SEHA - Abu Dhabi Health Services Co. All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
