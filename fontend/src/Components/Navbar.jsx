import React, { useState } from 'react'
import logo from '../assets/logo.png'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu,SetShowMenu] = useState(false)
  const [token,SetToken] = useState(true) // if we have token then login
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 '>
      <img className='w-20 cursor-pointer' src={logo} alt="Logo"  /> 
      <ul className='hidden md:flex items-start gap-5 font-medium '>
        <NavLink to='/'>
          <li className='py-1'>HOME</li>
        </NavLink>
          <NavLink to='/doctors'>
          <li className='py-1'>ALL DOCTORS</li>
        </NavLink>
          <NavLink to='/about'>
          <li className='py-1'>ABOUT</li>
        </NavLink>
          <NavLink to='/contact'>
          <li className='py-1'>CONTACT</li>
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        {
          token // if login then it shows user profile picture
          ? <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-8 rounded-full ' src={assets.profile_pic} alt="" />
            <img className='w-2.5 ' src={assets.dropdown_icon} alt="" />
              {/* when you hover it it shows the dropdown menu */}
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                  <p onClick={()=>navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={()=>navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                  <p onClick={()=>SetToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
            </div>
          </div>
          :  <button onClick={()=>navigate('/login')} className='bg-blue-500 text-white px-8 py-3 rounded-full font-light hidden cursor-pointer md:block'>Create Account</button>
        }
      
      </div>

    </div>
  )
}

export default Navbar
