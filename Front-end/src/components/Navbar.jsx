import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, Home, FileText, Calendar, User } from 'lucide-react'

function Navbar({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl hover:text-blue-100 transition">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold">H</span>
            </div>
            <span>Hospital</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to={user?.role === 'doctor' ? '/doctor' : '/patient'} className="flex items-center space-x-1 hover:text-blue-100 transition">
              <Home size={20} />
              <span>Dashboard</span>
            </Link>
            <Link to="/records" className="flex items-center space-x-1 hover:text-blue-100 transition">
              <FileText size={20} />
              <span>Records</span>
            </Link>
            {user?.role === 'patient' && (
              <Link to="/appointments" className="flex items-center space-x-1 hover:text-blue-100 transition">
                <Calendar size={20} />
                <span>Appointments</span>
              </Link>
            )}
            <div className="flex items-center space-x-3 pl-6 border-l border-blue-400">
              <User size={20} />
              <span className="text-sm">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center space-x-1 transition"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-blue-100 transition"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 animate-in fade-in">
            <Link to={user?.role === 'doctor' ? '/doctor' : '/patient'} className="block px-4 py-2 hover:bg-blue-500 rounded transition">
              Dashboard
            </Link>
            <Link to="/records" className="block px-4 py-2 hover:bg-blue-500 rounded transition">
              Records
            </Link>
            {user?.role === 'patient' && (
              <Link to="/appointments" className="block px-4 py-2 hover:bg-blue-500 rounded transition">
                Appointments
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 bg-red-500 hover:bg-red-600 rounded transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
