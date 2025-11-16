import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AppContext = createContext()

const AppContextProvider = (props)=>{

    const currencySymbol = 'AED'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors,setDoctor] = useState([])

    const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
    // store user data
    const [userData,setUserData] = useState(false)
  

    const getDoctorsData = async()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctor(data.doctors)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const loadUserProfileData = async()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/user/get-profile',{headers:{token}})
            if (data.success) {
                setUserData(data.userData)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

      const value = {
        doctors,getDoctorsData,currencySymbol,token,setToken,backendUrl,setUserData,userData,loadUserProfileData
    }

    useEffect(()=>{
        getDoctorsData()
    },[])

    useEffect(()=>{
       if (token) {
        loadUserProfileData()
       }else{
        setUserData(false)
       }
    },[token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider