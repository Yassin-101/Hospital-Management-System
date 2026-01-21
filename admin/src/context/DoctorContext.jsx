import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const DoctorContext = createContext()

const DoctorContextProvider = (props)=>{
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [dToken, setDToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')
   
    const [appointments, setAppointements] = useState([])
    const [dashData,setDashData] = useState(false)
    const [profileData,setProfileData] = useState(false)
   
    const getAppointements = async()=>{
      try {
         const {data} = await axios.get(backendURL + '/api/doctor/appointments', {headers:{dToken}})
         if(data.success){
            setAppointements(data.appointments)
            console.log(data.appointments);
            
         }else{
             toast.error(data.message)
         }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }

    const completeAppointment = async(appointmentId)=>{
         try {
            const {data} = await axios.post(backendURL + '/api/doctor/complete-appointment', {appointmentId}, {headers:{dToken}})
            if(data.success){
               toast.success(data.message)
               getAppointements()
            }else{
               toast.error(data.message)
            }
         } catch (error) {
            console.log(error)
        toast.error(error.message)
         }
    }

    const cancelAppointment = async(appointmentId)=>{
         try {
            const {data} = await axios.post(backendURL + '/api/doctor/cancel-appointment', {appointmentId}, {headers:{dToken}})
            if(data.success){
               toast.success(data.message)
               getAppointements()
            }else{
               toast.error(data.message)
            }
         } catch (error) {
            console.log(error)
        toast.error(error.message)
         }
    }

    const getDashData = async () => {
         try {
            const {data} = await axios.get(backendURL + '/api/doctor/dashboard', {headers:{dToken}})
            if (data.success) {
               setDashData(data.dashData)
               console.log(data.dashData);
               
            }else{
               toast.error(data.message)
            }
         } catch (error) {
             console.log(error)
        toast.error(error.message)
         }
    }

    const getProfileData = async()=>{
      try {
         const {data} = await axios.get(backendURL + '/api/doctor/profile',{headers:{dToken}})
         if (data.success) {
            setProfileData(data.profileData)
            console.log(data.profileData)
         }
      } catch (error) {
         console.log(error)
        toast.error(error.message)
      }
    }


     const value = {
        dToken,setDToken,backendURL,getAppointements,appointments,setAppointements,completeAppointment,cancelAppointment,getDashData,dashData,setDashData
        ,profileData,setProfileData,getProfileData
     }

     return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
     )
}

export default DoctorContextProvider