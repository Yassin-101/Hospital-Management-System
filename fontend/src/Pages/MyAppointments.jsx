import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext'

const MyAppointments = () => {

  const { doctors } = useContext(AppContext)
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <p className='pb-3 mt-12 font-medium text-[#18528f] border-b'>My Appoinments</p>

      <div>
        {doctors.slice(0, 2).map((item, index) => (
          <div className='gird grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.image} alt="" />
            </div>

            {/* doctor information */}
            <div className='flex-1 text-sm text-[#18528f] '>
              <p className='text-blue-800 font-semibold '>{item.name}</p>
              <p>{item.speciality}</p>
              <p className='text-zinc-700 font medium mt-1 '>Adress:</p>
              <p className='text-xs'>{item.address.line1}</p>
              <p className='text-xs'>{item.address.line2}</p>
              <p className='text-sm mt-1'><span className='text-sm text-blue-900 font-medium'>Date & Time:</span>25, July, 2024 | 8:30 PM</p>
            </div>
            {/* to make this structure responsive */}
            <div></div>

            <div className='flex flex-col gap-2 justify-end'>
              <button className='text-sm cursor-pointer text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-blue-400 hover:text-white transition-all duration-300 '>Pay Online</button>
              <button className='text-sm cursor-pointer text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
