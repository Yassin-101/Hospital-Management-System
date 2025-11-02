import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

const Doctors = () => {

  const {speciality} = useParams()
  const [filterDoc,setFilterDoc] = useState([])
  const navigate = useNavigate()
  
  const {doctors} = useContext(AppContext)

  const applyFilter = ()=>{
    if(speciality){
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality)) // save the doctor in speciality else filter out other doc
    }else{
      setFilterDoc(doctors) // provide all doctor list
    }
  }

  useEffect(()=>{
        applyFilter()
  },[doctors,speciality])  // this will be executed if any of them gets changed
  return (
    <div className='mt-30 mx-4 sm:mx-[10%]'>
      <p className='text-[#18528f] font-medium'>Our Doctors</p>
      <p className='text-blue-300 text-6xl'>Book <span className='text-[#18528f]'>an Appointment</span></p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className='flex flex-col gap-4 text-sm text-[#18528f] '>
            <p onClick={()=> speciality === 'General physician' ? navigate('/doctors'):navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ?"bg-indigo-100 text-black":""}`}>General Physician</p>
            <p onClick={()=> speciality === 'Gynecologist' ? navigate('/doctors'):navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ?"bg-indigo-100 text-black":""}`}>Gynecologist</p>
            <p onClick={()=> speciality === 'Dermatologist' ? navigate('/doctors'):navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ?"bg-indigo-100 text-black":""}`}>Dermatologist</p>
            <p onClick={()=> speciality === 'Pediatricians' ? navigate('/doctors'):navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ?"bg-indigo-100 text-black":""}`}>Pediatricians</p>
            <p onClick={()=> speciality === 'Neurologist' ? navigate('/doctors'):navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ?"bg-indigo-100 text-black":""}`}>Neurologist</p>
            <p onClick={()=> speciality === 'Gastroenterologist' ? navigate('/doctors'):navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ?"bg-indigo-100 text-black":""}`}>Gastroenterologist</p>
        </div>
            {/* doctors card */}
        <div className='w-full grid grid-cols-4 gap-y-6'>
            {
              filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointments/${item._id}`)}
              className="doctor-card flex-shrink-0 w-[280px] bg-gradient-to-b from-blue-100 to-white rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:-translate-y-2 transition-all duration-500"
              style={{ scrollSnapAlign: "start" }}
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
          ))
            }
        </div>
      </div>
    </div>
  )
}

export default Doctors
