// src/components/LoadingBar.jsx
import React from 'react'

const LoadingBar = ({ active }) => (
  <div className="fixed top-0 left-0 w-full h-1 z-50">
    <div
      className={`h-full bg-blue-600 transition-all duration-1000 ease-out ${
        active ? 'w-full' : 'w-0'
      }`}
    />
  </div>
)

export default LoadingBar
