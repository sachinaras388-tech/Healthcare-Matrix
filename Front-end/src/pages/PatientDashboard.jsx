import React, { useState, useEffect } from 'react'
import { FileText, Calendar, AlertCircle, Loader } from 'lucide-react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import { recordsService, appointmentsService } from '../services/api'

function PatientDashboard({ user, onLogout }) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAppointmentForm, setShowAppointmentForm] = useState(false)
  const [appointmentData, setAppointmentData] = useState({
    doctorName: '',
    date: '',
    time: '',
    reason: ''
  })

  useEffect(() => {
    fetchRecords()
  }, [])

  const fetchRecords = async () => {
    try {
      const response = await recordsService.getRecords()
      setRecords(response.data)
    } catch (err) {
      console.error('Failed to fetch records:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleBookAppointment = async (e) => {
    e.preventDefault()
    try {
      await appointmentsService.bookAppointment(appointmentData)
      setShowAppointmentForm(false)
      setAppointmentData({ doctorName: '', date: '', time: '', reason: '' })
      alert('Appointment booked successfully!')
    } catch (err) {
      alert('Failed to book appointment: ' + (err.response?.data?.message || 'Unknown error'))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white text-gray-800">
      <Navbar user={user} onLogout={onLogout} />

      <div className="max-w-7xl mx-auto px-4 py-8 fade-in">
        <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-6">
          <aside className="bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-blue-700 mb-4">Dashboard</h2>
            <ul className="space-y-3 text-sm">
              <li className="px-3 py-2 rounded-lg bg-blue-100/50 text-blue-700">🏥 Patient Overview</li>
              <li className="px-3 py-2 rounded-lg hover:bg-blue-100 transition">📄 My Records</li>
              <li className="px-3 py-2 rounded-lg hover:bg-blue-100 transition">📅 Appointments</li>
              <li className="px-3 py-2 rounded-lg hover:bg-blue-100 transition">🔔 Alerts</li>
            </ul>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-200">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Summary</p>
              <p className="text-xl font-bold text-blue-700">{records.length}</p>
              <p className="text-xs text-gray-500">Total records</p>
            </div>
          </aside>

          <main className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl p-8 mb-8 shadow-xl backdrop-blur-sm bg-opacity-90 border border-white/20">
              <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}! 👋</h1>
              <p className="text-cyan-100">Manage your medical records and appointments in one place</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <Card className="border-l-4 border-l-purple-500 slide-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Total Records</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{records.length}</p>
              </div>
              <FileText size={40} className="text-purple-200" />
            </div>
          </Card>

          <Card className="border-l-4 border-l-green-500 slide-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Appointments</p>
                <p className="text-3xl font-bold text-green-600 mt-2">0</p>
              </div>
              <Calendar size={40} className="text-green-200" />
            </div>
          </Card>

          <Card className="border-l-4 border-l-pink-500 slide-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Account Status</p>
                <p className="text-2xl font-bold text-pink-600 mt-2">Active</p>
              </div>
              <AlertCircle size={40} className="text-pink-200" />
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Book Appointment */}
          <Card title="Book An Appointment">
            <button
              onClick={() => setShowAppointmentForm(!showAppointmentForm)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              {showAppointmentForm ? '✕ Cancel' : '+ New Appointment'}
            </button>

            {showAppointmentForm && (
              <form onSubmit={handleBookAppointment} className="mt-6 space-y-4">
                <input
                  type="text"
                  placeholder="Doctor Name"
                  value={appointmentData.doctorName}
                  onChange={(e) => setAppointmentData({...appointmentData, doctorName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="date"
                  value={appointmentData.date}
                  onChange={(e) => setAppointmentData({...appointmentData, date: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="time"
                  value={appointmentData.time}
                  onChange={(e) => setAppointmentData({...appointmentData, time: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <textarea
                  placeholder="Reason for visit"
                  value={appointmentData.reason}
                  onChange={(e) => setAppointmentData({...appointmentData, reason: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  Book Appointment
                </button>
              </form>
            )}
          </Card>

          {/* Quick Stats */}
          <Card title="Health Overview">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-700">Last Checkup</span>
                <span className="font-semibold text-blue-600">2 months ago</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700">Health Status</span>
                <span className="font-semibold text-green-600">Excellent</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-gray-700">Pending Tests</span>
                <span className="font-semibold text-yellow-600">None</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Records */}
        <Card title="Your Medical Records">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="animate-spin text-blue-600" size={32} />
            </div>
          ) : records.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No medical records yet</p>
          ) : (
            <div className="space-y-3">
              {records.map((record) => (
                <div key={record._id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{record.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{record.category}</p>
                      <p className="text-xs text-gray-500 mt-1">{record.description}</p>
                    </div>
                    <a
                      href={`http://localhost:5000/${record.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 font-semibold text-sm ml-4"
                    >
                      View →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </main>
    </div>
  </div>
</div>
  )
}

export default PatientDashboard
