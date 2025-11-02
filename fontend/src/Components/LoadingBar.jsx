// src/components/LoadingBar.jsx
import React from 'react'

const LoadingBar = ({ active }) => {
  return (
    // container (fixed at top)
    <div className="fixed top-0 left-0 w-full h-1 z-50 pointer-events-none">
      {/* inner bar animates width from 0 -> 100% (tailwind classes used) */}
      <div
        className={`h-full transition-all duration-1000 ease-out ${active ? 'w-full bg-blue-600' : 'w-0 bg-transparent'}`}
      />
    </div>
  )
}

export default LoadingBar
