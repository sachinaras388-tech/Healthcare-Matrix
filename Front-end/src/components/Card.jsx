import React from 'react'

function Card({ title, children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200 hover:transform hover:-translate-y-1 hover:rotate-1 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>}
      {children}
    </div>
  )
}

export default Card
