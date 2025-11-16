import React, { useState, useRef, useLayoutEffect, useContext } from 'react'
import logo from '../assets/logo.png'
import { assets } from '../assets/assets'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const navRef = useRef(null)
  const [navHeight, setNavHeight] = useState(0)
  const { token, setToken, userData } = useContext(AppContext)
  const [showMenu, setShowMeu] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const logout = ()=>{
    setToken(false)
    localStorage.removeItem('token')

  }

  const isHomePage = location.pathname === '/'

  // Measure navbar height for spacing on non-home pages
  useLayoutEffect(() => {
    if (!navRef.current) return
    const measure = () => {
      const h = Math.ceil(navRef.current.getBoundingClientRect().height)
      setNavHeight(h)
      document.documentElement.style.setProperty('--navbar-height', `${h}px`)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [location.pathname])

  return (
    <>
      <header
        ref={navRef}
        className={`absolute top-0 left-0 w-full z-50 transition-all duration-300
          ${isHomePage ? 'bg-transparent border-none text-white' : 'bg-[#18528f] border-b border-b-gray-600 text-white'}
        `}
      >
        <div className="flex items-center justify-between text-sm py-4 px-4 sm:px-[10%]">
          {/* Logo */}
          <img
            className="w-24 sm:w-28 cursor-pointer"
            src={logo}
            alt="Logo"
            onClick={() => navigate('/')}
          />

          {/* Menu for larger screens */}
          <ul className="hidden md:flex items-center gap-6 font-medium text-xl">
            <li><NavLink to="/" className="py-1 font-bold">HOME</NavLink></li>
            <li><NavLink to="/doctors" className="py-1 font-bold">ALL DOCTORS</NavLink></li>
            <li><NavLink to="/about" className="py-1 font-bold">ABOUT</NavLink></li>
            <li><NavLink to="/contact" className="py-1 font-bold">CONTACT</NavLink></li>
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {token && userData ? (
              <div className="relative">
                <div
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img className="w-10 sm:w-12 rounded-full" src={userData.image} alt="profile" />
                  <img className="w-3 sm:w-4" src={assets.dropdown_icon} alt="dropdown" />
                </div>

                {/* Dropdown menu (visible on both desktop & mobile) */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 z-50 bg-stone-100 rounded flex flex-col gap-2 p-3 text-gray-800 shadow-lg cursor-pointer min-w-[180px]">
                    <button
                      onClick={() => {
                        navigate('my-profile')
                        setShowProfileMenu(false)
                      }}
                      className=" cursor-pointer text-left hover:text-black hover:font-semibold"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate('my-appointments')
                        setShowProfileMenu(false)
                      }}
                      className=" cursor-pointer text-left hover:text-black hover:font-semibold"
                    >
                      My Appointments
                    </button>
                    <button
                      onClick={() => {
                       logout()
                      setShowProfileMenu(false)
                      }}
                      className=" cursor-pointer text-left hover:text-black hover:font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="bg-white text-blue-500 px-5 cursor-pointer py-2 rounded-full text-sm sm:text-lg hidden md:inline-block"
              >
                Create Account
              </button>
            )}

            {/* Mobile Menu Icon */}
            <img
              onClick={() => setShowMeu(true)}
              className="w-6 md:hidden cursor-pointer"
              src={assets.menu_icon}
              alt="menu"
            />
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'
            } md:hidden right-0 bottom-0 top-0 z-40 overflow-hidden bg-white transition-all duration-300`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img onClick={() => navigate('/')} className="w-24" src={logo} alt="logo" />
            <img
              className="w-7 cursor-pointer"
              onClick={() => setShowMeu(false)}
              src={assets.cross_icon}
              alt="close"
            />
          </div>

          <ul className="text-black flex flex-col items-center gap-4 mt-8 px-5 text-lg font-semibold">
            <NavLink onClick={() => setShowMeu(false)} to="/"><p className="px-4 py-2 rounded inline-block">HOME</p></NavLink>
            <NavLink onClick={() => setShowMeu(false)} to="/doctors"><p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMeu(false)} to="/about"><p className="px-4 py-2 rounded inline-block">ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMeu(false)} to="/contact"><p className="px-4 py-2 rounded inline-block">CONTACT</p></NavLink>
          </ul>
        </div>
      </header>

      {/* Spacer only on non-home pages */}
      {!isHomePage && <div style={{ height: navHeight }} aria-hidden="true" />}
    </>
  )
}

export default Navbar
