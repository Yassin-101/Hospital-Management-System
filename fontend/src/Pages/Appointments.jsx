import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

const Appointments = () => {
  
  const {docId} = useParams()
  const {doctors} = useContext(AppContext)

  const [docInfo,setDocInfo] = useState(null) // to save docInfo

  // find particular doctor from docId
  const fetchDocInfo =  async()=>{
        const docInfo = doctors.find(doc => doc._id === docId)
        setDocInfo(docInfo)
        console.log(docInfo)
  } 

  // to run fetchDocinfo when page gets load
  useEffect(()=>{
      fetchDocInfo()
  },[doctors,docId]) // any of these two data gets change then it will be executed
  return (
    <div className='mt-30'>
      
    </div>
  )
}

export default Appointments
