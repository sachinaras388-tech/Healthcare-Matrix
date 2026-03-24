import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import PatientDashboard from './pages/PatientDashboard'
import DoctorDashboard from './pages/DoctorDashboard'
import RecordsManagement from './pages/RecordsManagement'
import Appointments from './pages/Appointments'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/patient"
          element={
            <ProtectedRoute user={user} requiredRole="patient">
              <PatientDashboard user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/doctor"
          element={
            <ProtectedRoute user={user} requiredRole="doctor">
              <DoctorDashboard user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/records"
          element={
            <ProtectedRoute user={user}>
              <RecordsManagement user={user} />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/appointments"
          element={
            <ProtectedRoute user={user}>
              <Appointments user={user} />
            </ProtectedRoute>
          }
        />
        
        <Route path="/" element={user ? <Navigate to={user.role === 'doctor' ? '/doctor' : '/patient'} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
