# Hubbli Hospital - Frontend

A modern, responsive React frontend for the Hubbli Hospital medical records management system.

## Features

✨ **Modern UI** - Built with React & Tailwind CSS  
🔐 **Secure Authentication** - JWT-based login/register with role-based access  
👨‍⚕️ **Doctor Dashboard** - View all patient records and statistics  
🏥 **Patient Dashboard** - Manage personal medical records and appointments  
📋 **Records Management** - Upload, search, and filter medical documents  
📅 **Appointment Booking** - Schedule appointments with doctors  
📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile  

## Tech Stack

- **Frontend**: React 18, React Router v6
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **API Client**: Axios
- **Icons**: Lucide React

## Installation

1. **Install dependencies**
```bash
npm install
```

2. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar
│   ├── Card.jsx            # Reusable card component
│   └── ProtectedRoute.jsx  # Route protection
├── pages/
│   ├── Login.jsx           # Login page
│   ├── Register.jsx        # Registration page
│   ├── PatientDashboard.jsx
│   ├── DoctorDashboard.jsx
│   ├── RecordsManagement.jsx
│   └── Appointments.jsx
├── services/
│   └── api.js              # API service with axios
├── App.jsx                 # Main app component
├── main.jsx                # Entry point
└── index.css               # Global styles
```

## API Integration

The frontend communicates with the backend API at `http://localhost:5000/api`:

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Records
- `GET /records` - Get all records (doctors see all, patients see their own)
- `POST /records/upload` - Upload a medical record
- `GET /records/search` - Search and filter records

### Appointments
- `POST /appointments/book` - Book an appointment

## Environment Variables

Create a `.env.local` file in the root directory:

```
VITE_API_URL=http://localhost:5000/api
```

## Demo Account

**Patient**
- Email: patient@gov.in
- Password: password123

**Doctor**
- Email: doctor@gov.in
- Password: password123

## Features in Detail

### 👥 Authentication
- Register as Patient or Doctor
- Secure JWT token storage
- Protected routes based on user role
- Automatic redirection on login/logout

### 🏥 Patient Features
- View personal medical records
- Upload new medical documents
- Book appointments with doctors
- Track appointment status
- View health overview

### 👨‍⚕️ Doctor Features
- Access all patient records
- View patient statistics
- Search and filter records by category
- Generate reports
- View active cases

### 📁 Records Management
- Upload PDF, DOC, JPG, PNG files
- Categorize records (Lab Report, X-Ray, Prescription, etc.)
- Search by title and category
- Download records
- View file descriptions

## UI Components

### Navbar
- Responsive navigation with mobile menu
- User information display
- Quick logout button
- Active route highlighting

### Dashboard Cards
- Statistics display with icons
- Quick action buttons
- Data summary panels

### Forms
- Modern form inputs with icons
- File upload with drag-and-drop
- Form validation
- Error handling

## Styling Features

- Tailwind CSS utility classes
- Gradient backgrounds
- Smooth transitions and animations
- Responsive grid layouts
- Custom color scheme (Blue & Cyan)

## Error Handling

- API error messages displayed to users
- Form validation
- Try-catch blocks for async operations
- Error toast notifications
- Loading states

## Performance Optimizations

- Code splitting with React Router
- Lazy loading components
- Optimized re-renders
- Efficient API calls

## Future Enhancements

- Add video consultation feature
- Prescription management
- Medicine reminders
- Doctor ratings and reviews
- Notification system
- Dark mode
- PWA support

## Troubleshooting

1. **Backend connection error**: Ensure backend is running on port 5000
2. **CORS errors**: Check backend CORS configuration
3. **Login issues**: Verify user credentials and JWT secret
4. **File upload fails**: Check file size and format restrictions

## Support

For issues or questions, please contact the development team.

---

**Happy Coding! 🚀**
