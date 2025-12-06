import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import './App.css'

// const BASE_URL = 'http://localhost:5000'
const BASE_URL = 'https://adminbackend.hire4drive.com'

function App() {
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSendOtp = async () => {
    if (!mobile || mobile.length < 10) {
      toast.error('Please enter a valid mobile number')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/api/driver/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        toast.success(data.message || 'OTP sent successfully')
        setShowOtpInput(true)
      } else {
        toast.error(data.message || 'Failed to send OTP')
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!otp || otp.length < 6) {
      toast.error('Please enter a valid OTP')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/api/driver/deleteAccount`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNo: mobile })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        toast.success(data.message || 'Account deleted successfully')
        // Reset form
        setMobile('')
        setOtp('')
        setShowOtpInput(false)
      } else {
        toast.error(data.message || 'Failed to delete account')
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="card">
        <h1>Hire4Drive Driver Account Deletion</h1>
        
        {!showOtpInput ? (
          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              maxLength={10}
              disabled={loading}
            />
            <button 
              onClick={handleSendOtp} 
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </div>
        ) : (
          <div className="form-group">
            <label>Enter OTP</label>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              disabled={loading}
            />
            <button 
              onClick={handleDeleteAccount} 
              disabled={loading}
              className="btn-danger"
            >
              {loading ? 'Deleting...' : 'Delete Account'}
            </button>
            <button 
              onClick={() => {
                setShowOtpInput(false)
                setOtp('')
              }} 
              disabled={loading}
              className="btn-secondary"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
