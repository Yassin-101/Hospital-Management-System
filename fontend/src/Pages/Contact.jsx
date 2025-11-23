import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <div className='text-center text-2xl pt-10 text-blue-500 '>
        <p>CONTACT <span className='text-blue-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-md'>
        <img className='w-full max-w-[360px]' src={assets.contact_image} alt="" />
      <div className='flex flex-col justify-center items-start gap-6'>
        <p className='font-semibold text-lg text-blue-600'>OUR OFFICE</p>
        <p className='text-blue-500 '>00000 Willms Station <br />
Suite 000, Washington, USA</p>
        <p className='text-blue-500'>Tel: (000) 000-0000 <br />
Email: sehadev@gmail.com</p>
        <p className='font-semibold text-lg text-blue-600'>CAREERS AT SEHA</p>
        <p className='text-blue-500'>Learn more about our teams and job openings.</p>

        <button className='border border-blue-900 px-8 py-4 text-md cursor-pointer text-blue-700 hover:bg-blue-400 hover:text-white transition-all duration-500'>Explore Jobs</button>
      </div>
      </div>
    </div>
  )
}

export default Contact
