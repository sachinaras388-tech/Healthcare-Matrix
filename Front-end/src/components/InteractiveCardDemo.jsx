import React from 'react'
import InteractiveCard from './InteractiveCard'

const InteractiveCardDemo = () => {
  const demoCards = [
    {
      title: "Lab Report",
      description: "Complete blood count analysis from March 15, 2024",
      category: "Hematology",
      icon: "🧪"
    },
    {
      title: "Chest X-Ray",
      description: "Posterior-anterior view showing clear lung fields",
      category: "Radiology",
      icon: "🩻"
    },
    {
      title: "Prescription",
      description: "Antibiotic course for bacterial infection",
      category: "Pharmacy",
      icon: "💊"
    },
    {
      title: "Medical History",
      description: "Comprehensive patient medical background",
      category: "Records",
      icon: "📋"
    },
    {
      title: "Cardiology Report",
      description: "ECG and cardiac enzyme analysis",
      category: "Cardiology",
      icon: "❤️"
    },
    {
      title: "Dental Checkup",
      description: "Routine dental examination and cleaning",
      category: "Dentistry",
      icon: "🦷"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Interactive Card Demo
          </h1>
          <p className="text-gray-600 text-lg">
            Hover over the cards to see the 3D tilt and zoom effects
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoCards.map((card, index) => (
            <InteractiveCard
              key={index}
              title={card.title}
              description={card.description}
              category={card.category}
              onClick={() => alert(`Clicked: ${card.title}`)}
              className="h-full"
            >
              {/* Custom content */}
              <div className="flex items-center justify-center mt-4">
                <div className="text-4xl">{card.icon}</div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                <span>📅 {new Date().toLocaleDateString()}</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                  Active
                </span>
              </div>
            </InteractiveCard>
          ))}
        </div>

        {/* Stats Card Example */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Dashboard Stats Example</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <InteractiveCard
              title="Total Patients"
              category="Statistics"
              className="text-center"
            >
              <div className="text-5xl font-bold text-blue-600 mb-2">1,247</div>
              <div className="text-sm text-gray-500">Registered patients</div>
              <div className="mt-4 flex justify-center">
                <div className="text-3xl">👥</div>
              </div>
            </InteractiveCard>

            <InteractiveCard
              title="Active Records"
              category="Documents"
              className="text-center"
            >
              <div className="text-5xl font-bold text-green-600 mb-2">3,891</div>
              <div className="text-sm text-gray-500">Medical records</div>
              <div className="mt-4 flex justify-center">
                <div className="text-3xl">📄</div>
              </div>
            </InteractiveCard>

            <InteractiveCard
              title="Appointments"
              category="Schedule"
              className="text-center"
            >
              <div className="text-5xl font-bold text-purple-600 mb-2">156</div>
              <div className="text-sm text-gray-500">This month</div>
              <div className="mt-4 flex justify-center">
                <div className="text-3xl">📅</div>
              </div>
            </InteractiveCard>

            <InteractiveCard
              title="Doctors"
              category="Staff"
              className="text-center"
            >
              <div className="text-5xl font-bold text-pink-600 mb-2">24</div>
              <div className="text-sm text-gray-500">Active physicians</div>
              <div className="mt-4 flex justify-center">
                <div className="text-3xl">👨‍⚕️</div>
              </div>
            </InteractiveCard>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveCardDemo