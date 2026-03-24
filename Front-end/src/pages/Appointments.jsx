import React, { useState } from 'react'
import { Calendar, Clock, MapPin, User, Loader } from 'lucide-react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import { appointmentsService } from '../services/api'

function Appointments({ user }) {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: 'Dr. Rajesh Kumar',
      date: '2024-04-15',
      time: '10:30 AM',
      reason: 'Regular Checkup',
      status: 'Confirmed'
    }
  ])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    doctorName: '',
    date: '',
    time: '',
    reason: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await appointmentsService.bookAppointment(formData)
      setAppointments([...appointments, {
        id: appointments.length + 1,
        ...formData,
        status: 'Pending'
      }])
      setShowForm(false)
      setFormData({ doctorName: '', date: '', time: '', reason: '' })
      alert('Appointment booked successfully!')
    } catch (err) {
      alert('Failed to book appointment: ' + (err.response?.data?.message || 'Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return 'bg-green-100 text-green-700'
      case 'Pending': return 'bg-yellow-100 text-yellow-700'
      case 'Cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={() => {}} />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Appointments</h1>
          <p className="text-gray-600">Manage your doctor appointments</p>
        </div>

        {/* Book New Appointment */}
        <Card title="Book New Appointment" className="mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition flex items-center justify-center space-x-2"
          >
            <Calendar size={20} />
            <span>{showForm ? '✕ Cancel' : '+ Schedule Appointment'}</span>
          </button>

          {showForm && (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Doctor Name"
                value={formData.doctorName}
                onChange={(e) => setFormData({...formData, doctorName: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                placeholder="Reason for visit"
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                required
              ></textarea>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading && <Loader size={20} className="animate-spin" />}
                <span>{loading ? 'Booking...' : 'Confirm Booking'}</span>
              </button>
            </form>
          )}
        </Card>

        {/* Upcoming Appointments */}
        <Card title={`Upcoming Appointments (${appointments.length})`}>
          {appointments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No appointments scheduled</p>
          ) : (
            <div className="space-y-4">
              {appointments.map((apt) => (
                <div key={apt.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Dr. {apt.doctorName}</h3>
                    <span className={`px-4 py-2 rounded-full font-semibold text-sm ${getStatusColor(apt.status)}`}>
                      {apt.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="text-blue-500" size={24} />
                      <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-semibold text-gray-800">{new Date(apt.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="text-green-500" size={24} />
                      <div>
                        <p className="text-sm text-gray-600">Time</p>
                        <p className="font-semibold text-gray-800">{apt.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <User className="text-purple-500" size={24} />
                      <div>
                        <p className="text-sm text-gray-600">Reason</p>
                        <p className="font-semibold text-gray-800 truncate">{apt.reason}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 flex gap-3">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
                      Reschedule
                    </button>
                    <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition">
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default Appointments
