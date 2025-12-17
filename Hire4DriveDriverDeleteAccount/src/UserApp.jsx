import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import './App.css'

const BASE_URL = 'https://adminbackend.hire4drive.com'

function UserApp() {
  const [mobile, setMobile] = useState('')
  const [loading, setLoading] = useState(false)

  const handleDeleteAccount = async () => {
    if (!mobile || mobile.length < 10) {
      toast.error('Please enter a valid mobile number')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/api/rider-auth/delete-rider`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        toast.success(data.message || 'Account deleted successfully')
        setMobile('')
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
        <h1>Hire4Drive User Account Deletion</h1>
        
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
            onClick={handleDeleteAccount} 
            disabled={loading}
            className="btn-danger"
          >
            {loading ? 'Deleting...' : 'Delete Account'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserApp