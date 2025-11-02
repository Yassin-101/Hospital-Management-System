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
    <div>
      <p className='text-black'>Our Doctors</p>
      <p>Book <span className='text-[#18528f]'>an Appointment</span></p>
      <div>
        <div>
            <p>General Physician</p>
            <p>Gynecologist</p>
            <p>Dermatologist</p>
            <p>Pediatricians</p>
            <p>Neurologist</p>
            <p>Gastroenterologist</p>
        </div>
            {/* doctors card */}
        <div>
            {
              filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appoipment/${item._id}`)}
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
