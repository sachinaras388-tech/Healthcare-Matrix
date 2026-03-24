import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getAllPatients: () => api.get('/auth/patients'),
  generateReport: () => api.get('/auth/report'),
}

export const recordsService = {
  getRecords: () => api.get('/records'),
  searchRecords: (params) => api.get('/records/search', { params }),
  uploadRecord: (data) => {
    const formData = new FormData()
    formData.append('file', data.file)
    formData.append('title', data.title)
    formData.append('category', data.category)
    formData.append('description', data.description)
    return api.post('/records/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
}

export const appointmentsService = {
  bookAppointment: (data) => api.post('/appointments/book', data),
}

export default api
