import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { assets } from '../assets/assets'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation() //  Detect current route
  const [showMenu, SetShowMenu] = useState(false)
  const [token, SetToken] = useState(true)

  // Check if the current page is NOT home
  const isHomePage = location.pathname === '/'

  return (
    <div className={`absolute top-0 left-0 w-full z-20`}>
      <div
        className={`flex items-center justify-between text-sm py-4 border-b border-b-gray-600 px-4 sm:px-[10%] text-white transition-all duration-300 
        ${isHomePage ? 'bg-transparent' : 'bg-[#18528f]'}  //change background color
        `}
      >
        {/* Logo */}
        <img className="w-30 cursor-pointer" src={logo} alt="Logo" onClick={() => navigate('/')} />

        {/* Menu Links */}
        <ul className="hidden md:flex items-start gap-5 font-medium text-xl">
          <NavLink to="/"><li className="py-1 font-bold">HOME</li></NavLink>
          <NavLink to="/doctors"><li className="py-1 font-bold">ALL DOCTORS</li></NavLink>
          <NavLink to="/about"><li className="py-1 font-bold">ABOUT</li></NavLink>
          <NavLink to="/contact"><li className="py-1 font-bold">CONTACT</li></NavLink>
        </ul>

        {/* Right side (profile / login) */}
        <div className="flex items-center gap-4">
          {token ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img className="w-12 rounded-full" src={assets.profile_pic} alt="" />
              <img className="w-4" src={assets.dropdown_icon} alt="" />
              {/* Dropdown menu */}
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                  <p onClick={() => navigate('my-profile')} className="hover:text-black cursor-pointer">My Profile</p>
                  <p onClick={() => navigate('my-appointments')} className="hover:text-black cursor-pointer">My Appointments</p>
                  <p onClick={() => SetToken(false)} className="hover:text-black cursor-pointer">Logout</p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-blue-500 px-8 py-3 rounded-full text-lg hidden cursor-pointer md:block"
            >
              Create Account
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
