import React from 'react'

const PressedButton = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  ...props
}) => {
  const baseClasses = `
    relative inline-flex items-center justify-center font-semibold
    transition-all duration-200 ease-out
    border-2 border-transparent
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    transform active:scale-95
  `

  const variants = {
    primary: `
      bg-gradient-to-b from-blue-500 to-blue-600
      hover:from-blue-600 hover:to-blue-700
      text-white
      shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_8px_rgba(0,0,0,0.15)]
      hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_2px_4px_rgba(0,0,0,0.1)]
      active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.05)]
      focus:ring-blue-500
    `,
    secondary: `
      bg-gradient-to-b from-gray-200 to-gray-300
      hover:from-gray-300 hover:to-gray-400
      text-gray-800
      shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_4px_8px_rgba(0,0,0,0.15)]
      hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.1)]
      active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.05)]
      focus:ring-gray-500
    `,
    danger: `
      bg-gradient-to-b from-red-500 to-red-600
      hover:from-red-600 hover:to-red-700
      text-white
      shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_8px_rgba(0,0,0,0.15)]
      hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_2px_4px_rgba(0,0,0,0.1)]
      active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.05)]
      focus:ring-red-500
    `
  }

  const sizes = {
    small: 'px-4 py-2 text-sm rounded-lg',
    medium: 'px-6 py-3 text-base rounded-xl',
    large: 'px-8 py-4 text-lg rounded-2xl'
  }

  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.trim()

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {/* Top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-60" />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>

      {/* Bottom shadow for depth */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-t from-black/20 to-transparent rounded-b-xl" />
    </button>
  )
}

export default PressedButton