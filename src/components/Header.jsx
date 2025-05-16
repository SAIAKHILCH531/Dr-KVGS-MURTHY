import React from 'react'

const Header = ({ title, subtitle, bgColor = '#2F5A3D', textColor = 'white' }) => {
  return (
    <div className={`bg-[${bgColor}] text-${textColor} py-16 text-center`}>
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      {subtitle && (
        <p className="text-xl max-w-3xl mx-auto px-4">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default Header