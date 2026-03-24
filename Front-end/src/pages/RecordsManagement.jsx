import React, { useState, useEffect } from 'react'
import { Upload, Search, Download, Loader } from 'lucide-react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import { recordsService } from '../services/api'

function RecordsManagement({ user }) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Lab Report',
    description: '',
    file: null
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

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const response = await recordsService.searchRecords({
        title: searchQuery,
        category: categoryFilter
      })
      setRecords(response.data)
    } catch (err) {
      console.error('Search failed:', err)
      alert('Search failed. Please try again.')
    }
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setCategoryFilter('')
    fetchRecords()
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!formData.file) {
      alert('Please select a file')
      return
    }

    setUploading(true)
    try {
      await recordsService.uploadRecord(formData)
      setShowUploadForm(false)
      setFormData({ title: '', category: 'Lab Report', description: '', file: null })
      fetchRecords()
      alert('Record uploaded successfully!')
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.message || 'Unknown error'))
    } finally {
      setUploading(false)
    }
  }

  const categories = [...new Set(records.map(r => r.category))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-blue-100">
      <Navbar user={user} onLogout={() => {}} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Medical Records</h1>
          <p className="text-gray-600">Manage and organize your medical documents</p>
        </div>

        {/* Upload Section */}
        <Card title="📤 Upload New Record" className="mb-8 shadow-2xl hover:shadow-3xl transition-all duration-300">
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-3 px-4 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
          >
            <Upload size={24} />
            <span>{showUploadForm ? '✕ Cancel Upload' : '+ Upload New Record'}</span>
          </button>

          {showUploadForm && (
            <form onSubmit={handleUpload} className="mt-6 space-y-6 slide-in">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Record Title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option>Lab Report</option>
                  <option>X-Ray</option>
                  <option>Prescription</option>
                  <option>Doctor Notes</option>
                  <option>Test Results</option>
                  <option>Other</option>
                </select>
              </div>
              <textarea
                placeholder="Description (optional)"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                rows="4"
              ></textarea>
              <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center bg-blue-50/50 hover:bg-blue-50 transition-all">
                <input
                  type="file"
                  onChange={(e) => setFormData({...formData, file: e.target.files[0]})}
                  className="hidden"
                  id="file-input"
                  required
                />
                <label htmlFor="file-input" className="cursor-pointer">
                  <Upload className="mx-auto mb-4 text-blue-500" size={48} />
                  <p className="text-gray-700 font-semibold text-lg mb-2">
                    {formData.file ? `📎 ${formData.file.name}` : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-gray-500 text-sm">PDF, DOC, JPG, PNG (Max 10MB)</p>
                </label>
              </div>
              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center space-x-2 transform hover:scale-105 shadow-lg"
              >
                {uploading && <Loader size={24} className="animate-spin" />}
                <span>{uploading ? '🚀 Uploading...' : '📤 Upload Record'}</span>
              </button>
            </form>
          )}
        </Card>

        {/* Search and Filter */}
        <Card title="🔍 Search & Filter Records" className="mb-8 shadow-2xl hover:shadow-3xl transition-all duration-300">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-blue-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
              >
                🔍 Search
              </button>
              <button
                type="button"
                onClick={handleClearSearch}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
              >
                🗑️ Clear
              </button>
            </div>
          </form>
        </Card>

        {/* Records List */}
        <Card title={`📄 Records (${records.length})`} className="shadow-2xl">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
                <p className="text-gray-600 font-semibold">Loading records...</p>
              </div>
            </div>
          ) : records.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-500 text-lg">No records found</p>
              <p className="text-gray-400 text-sm mt-2">Upload your first medical record to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Title</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr key={record._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="py-3 px-4 font-medium">{record.title}</td>
                      <td className="py-3 px-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">{record.category}</span></td>
                      <td className="py-3 px-4 text-sm text-gray-600 truncate max-w-xs">{record.description}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">{new Date(record.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <a
                          href={`http://localhost:5000/${record.file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
                        >
                          <Download size={16} />
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default RecordsManagement
