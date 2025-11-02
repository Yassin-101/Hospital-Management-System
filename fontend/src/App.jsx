import React, { useState,useEffect } from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'
import Home from './Pages/Home'
import Doctors from './Pages/Doctors'
import Login from './Pages/Login'
import About from './Pages/About'
import Contact from './Pages/Contact'
import MyProfile from './Pages/MyProfile'
import MyAppointments from './Pages/MyAppointments'
import Appointments from './Pages/Appointments'
import Navbar from './Components/Navbar'
import '../src/index.css'
import Footer from './Components/Footer'
import LoadingBar from './Components/LoadingBar'

const App = () => {
  //   const location = useLocation()
  // const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   // Trigger loading when route changes
  //   setLoading(true)
  //   document.title = 'Loading... | STMC'

  //   const timer = setTimeout(() => {
  //     setLoading(false)
  //     document.title = 'STMC' // You can make this dynamic per route if you want
  //   }, 1000)

  //   return () => clearTimeout(timer)
  // }, [location.pathname])
  return (
    <div className=''>
      {/* <LoadingBar active={loading}/> */}
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/doctors/:speciality' element={<Doctors/>}/> 
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/my-profile' element={<MyProfile/>}/>
        <Route path='/my-appointments' element={<MyAppointments/>}/>
        <Route path='/appointments/:docId' element={<Appointments/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
