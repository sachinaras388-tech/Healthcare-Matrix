import React, { useState, useEffect } from 'react'
import { FileText, Users, Activity, Loader } from 'lucide-react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import { recordsService, authService } from '../services/api'

function DoctorDashboard({ user, onLogout }) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [patients, setPatients] = useState([])
  const [showPatients, setShowPatients] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [reportData, setReportData] = useState(null)
  const [stats, setStats] = useState({
    totalRecords: 0,
    totalPatients: 0,
    categories: {}
  })

  useEffect(() => {
    fetchRecords()
  }, [])

  const fetchRecords = async () => {
    try {
      const response = await recordsService.getRecords()

      console.log("Records:", response.data) // ✅ DEBUG

      setRecords(response.data)

      // ✅ FIXED PATIENT COUNT
      const patientsSet = new Set(
        response.data.map(r => r.userId?._id || r.userId)
      )

      const categories = {}
      response.data.forEach(r => {
        categories[r.category] = (categories[r.category] || 0) + 1
      })

      setStats({
        totalRecords: response.data.length,
        totalPatients: patientsSet.size,
        categories
      })

    } catch (err) {
      console.error("Fetch Records Error:", err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleViewPatients = async () => {
    try {
      const response = await authService.getAllPatients()

      console.log("Patients:", response.data) // ✅ DEBUG

      setPatients(response.data)
      setShowPatients(true)
      setShowReport(false)

    } catch (err) {
      console.error("Patients Error:", err.response?.data || err.message)
      alert("Failed to load patients")
    }
  }

  const handleGenerateReport = async () => {
    try {
      const response = await authService.generateReport()

      console.log("Report:", response.data) // ✅ DEBUG

      setReportData(response.data)
      setShowReport(true)
      setShowPatients(false)

    } catch (err) {
      console.error("Report Error:", err.response?.data || err.message)
      alert("Failed to generate report")
    }
  }

  const handleSearchRecords = () => {
    window.location.href = '/records'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white text-gray-800">
      <Navbar user={user} onLogout={onLogout} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <p>Total Records</p>
            <h2>{stats.totalRecords}</h2>
          </Card>

          <Card>
            <p>Total Patients</p>
            <h2>{stats.totalPatients}</h2>
          </Card>

          <Card>
            <p>Active Cases</p>
            <h2>12</h2>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-6">
          <button onClick={handleSearchRecords}>Search</button>
          <button onClick={handleViewPatients}>Patients</button>
          <button onClick={handleGenerateReport}>Report</button>
        </div>

        {/* Records */}
        <Card title="Records">
          {loading ? (
            <Loader className="animate-spin" />
          ) : records.length === 0 ? (
            <p>No records</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record._id}>
                    <td>{record.title}</td>
                    <td>{record.category}</td>
                    <td>
                      <a
                        href={`http://localhost:5000/${record.file}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>

        {/* Patients */}
        {showPatients && (
          <Card title="Patients">
            {patients.length === 0 ? (
              <p>No patients</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((p) => (
                    <tr key={p._id}>
                      <td>{p._id?.slice(-8)}</td> {/* ✅ FIX */}
                      <td>{p.name}</td>
                      <td>{p.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
        )}

        {/* Report */}
        {showReport && reportData && (
          <Card title="Report">
            <p>Total Patients: {reportData.totalPatients}</p>
            <p>Total Doctors: {reportData.totalDoctors}</p>
            <p>Total Records: {reportData.totalRecords}</p>
          </Card>
        )}

      </div>
    </div>
  )
}

export default DoctorDashboard
