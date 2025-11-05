import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {

    const {aToken,setAToken} = useContext(AdminContext)
    const navigate = useNavigate()

    const logout = ()=>{
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
    }
  return (
    <div className='bg-[#18528f] flex justify-between items-center px-4 sm:px-10 py-3 border-b '>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-24 cursor-pointer' src={logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-white'>{aToken ? 'Admin':'Doctor'}</p>
      </div>
      <button onClick={logout} className='bg-blue-500 text-white text-sm px-10 py-2 rounded-full cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar
