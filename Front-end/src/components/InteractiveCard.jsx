import React from 'react'

const InteractiveCard = ({
  image,
  title,
  description,
  category,
  onClick,
  className = '',
  children
}) => {
  return (
    <div
      className={`relative group cursor-pointer overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 ${className}`}
      onClick={onClick}
    >
      {/* Background Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

      {/* Glow Effect */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_40px_rgba(59,130,246,0.3)]`} />

      {/* Image Container */}
      {image && (
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={image}
            alt={title || 'Card image'}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      )}

      {/* Content */}
      <div className="relative p-6">
        {category && (
          <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-teal-500 text-white text-xs font-semibold rounded-full mb-3 transform transition-transform duration-300 group-hover:scale-105">
            {category}
          </div>
        )}

        {title && (
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">
            {title}
          </h3>
        )}

        {description && (
          <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
            {description}
          </p>
        )}

        {/* Custom Content */}
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}

        {/* Hover Indicator */}
        <div className={`absolute bottom-4 right-4 w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0`} />
      </div>

      {/* Interactive Border Effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-300/50 transition-all duration-500" />
    </div>
  )
}

export default InteractiveCard