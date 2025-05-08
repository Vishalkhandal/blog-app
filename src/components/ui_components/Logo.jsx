import React from 'react'

function Logo({ width = "", children, className = "" }) {
  return (
    <div style={{ width }} className={`${className}`}>
      {children}
    </div>
  )
}

export default Logo