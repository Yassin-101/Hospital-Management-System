import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

const Doctors = () => {
  const {speciality} = useParams()
  const [filterDoc,setFilterDoc] = useState([])
  const [showFilter,setShowFilter] = useState(false)
  const navigate = useNavigate()
  
  const {doctors} = useContext(AppContext)

  const applyFilter = ()=>{
    if(speciality){
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(()=>{
    applyFilter()
  },[doctors,speciality])

  return (
    <div className='mt-30 mx-4 sm:mx-[10%]'>
      <p className='text-[#18528f] font-medium'>Our Doctors</p>
      <p className='text-blue-300 text-5xl'>Book <span className='text-[#18528f]'>an Appointment</span></p>

      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        {/* Filters button for mobile */}
        <button 
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-blue-400 text-white':''}`} 
          onClick={()=>setShowFilter(prev=> !prev)}
        >
          Filters
        </button>

        {/* Filters list */}
        <div className={`flex-col gap-4 text-sm text-[#18528f] ${showFilter ?"flex":"hidden sm:flex"}`}>
          {['General physician','Gynecologist','Dermatologist','Pediatricians','Neurologist','Gastroenterologist'].map((spec, i) => (
            <p
              key={i}
              onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
              className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer 
                ${speciality === spec ? "bg-indigo-100 text-black" : ""}`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctors cards */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4'>
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointments/${item._id}`)}
              className="doctor-card w-full sm:w-auto bg-gradient-to-b from-blue-100 to-white rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:-translate-y-2 transition-all duration-500"
            >
              <img
                className="w-full h-64 object-cover"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4 text-center text-gray-900">
                <p className="text-lg font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
