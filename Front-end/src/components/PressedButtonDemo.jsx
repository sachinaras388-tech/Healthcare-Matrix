import React, { useState } from 'react'
import PressedButton from '../components/PressedButton'
import Navbar from '../components/Navbar'

function PressedButtonDemo() {
  const [clickCount, setClickCount] = useState(0)
  const [variant, setVariant] = useState('primary')

  const handleClick = () => {
    setClickCount(prev => prev + 1)
  }

  const handleVariantChange = (newVariant) => {
    setVariant(newVariant)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar user={{ name: 'Demo User' }} onLogout={() => {}} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            PressedButton Component Demo
          </h1>
          <p className="text-gray-600 text-lg">
            Interactive button with realistic pressed/recessed effects
          </p>
        </div>

        {/* Click Counter */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/20">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Click Counter</h2>
          <div className="text-center">
            <div className="text-6xl font-bold text-blue-600 mb-4">{clickCount}</div>
            <p className="text-gray-600">Total button clicks</p>
          </div>
        </div>

        {/* Variant Selector */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/20">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Button Variants</h2>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {['primary', 'secondary', 'danger'].map((v) => (
              <PressedButton
                key={v}
                variant={v}
                onClick={() => handleVariantChange(v)}
                className={variant === v ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </PressedButton>
            ))}
          </div>
          <p className="text-center text-gray-600">
            Current variant: <span className="font-semibold text-blue-600">{variant}</span>
          </p>
        </div>

        {/* Size Examples */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/20">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Button Sizes</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="text-center">
              <PressedButton size="small" variant={variant} onClick={handleClick}>
                Small
              </PressedButton>
              <p className="text-sm text-gray-500 mt-2">Small</p>
            </div>
            <div className="text-center">
              <PressedButton size="medium" variant={variant} onClick={handleClick}>
                Medium
              </PressedButton>
              <p className="text-sm text-gray-500 mt-2">Medium</p>
            </div>
            <div className="text-center">
              <PressedButton size="large" variant={variant} onClick={handleClick}>
                Large
              </PressedButton>
              <p className="text-sm text-gray-500 mt-2">Large</p>
            </div>
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/20">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Interactive Examples</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Action Buttons</h3>
              <div className="space-y-3">
                <PressedButton variant="primary" onClick={handleClick}>
                  Save Changes
                </PressedButton>
                <PressedButton variant="secondary" onClick={handleClick}>
                  Cancel
                </PressedButton>
                <PressedButton variant="danger" onClick={handleClick}>
                  Delete Item
                </PressedButton>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">State Examples</h3>
              <div className="space-y-3">
                <PressedButton variant="primary" onClick={handleClick}>
                  Normal State
                </PressedButton>
                <PressedButton variant="primary" disabled>
                  Disabled State
                </PressedButton>
                <PressedButton variant="primary" onClick={handleClick}>
                  Hover Me!
                </PressedButton>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Variants</h3>
            <p className="text-3xl font-bold">3</p>
            <p className="text-blue-100">Primary, Secondary, Danger</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Sizes</h3>
            <p className="text-3xl font-bold">3</p>
            <p className="text-green-100">Small, Medium, Large</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Effects</h3>
            <p className="text-3xl font-bold">5</p>
            <p className="text-purple-100">Shadows, Gradients, Scale</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PressedButtonDemo