import React from 'react'
import Header from '../Components/Header'
import SpecialityMenu from '../Components/SpecialityMenu'
import TopDoctors from '../Components/TopDoctors'
import Insurance from '../Components/Insurance'

const Home = () => {
  return (
    <div>
      <Header/>
      <SpecialityMenu/>
      <TopDoctors/>
      <Insurance/>
    </div>
  )
}

export default Home
