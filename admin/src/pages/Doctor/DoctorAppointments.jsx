import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'

const DoctorAppointments = () => {

  const {dToken, appointments, getAppointements} = useContext(DoctorContext)

  useEffect(()=>{
    if(dToken){
      getAppointements()
    }
  },[])
  return (
    <div>
      
    </div>
  )
}

export default DoctorAppointments
