import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { DataProvider } from './contexts/DataContext'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import StateDetail from './pages/StateDetail'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import StateComparison from './pages/StateComparison'
import EducationScorecard from './pages/EducationScorecard'
import HealthcareIndicators from './pages/HealthcareIndicators'
import ElectionMap from './pages/ElectionMap'
import CrimeStatistics from './pages/CrimeStatistics'
import Agriculture from './pages/Agriculture'
import './index.css'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>
  return user ? <>{children}</> : <Navigate to="/login" replace />
}

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>
  return user ? <Navigate to="/dashboard" replace /> : <>{children}</>
}

const DP: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute><DataProvider>{children}</DataProvider></ProtectedRoute>
)

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
        <Route path="/dashboard" element={<DP><Dashboard /></DP>} />
        <Route path="/state/:stateCode" element={<DP><StateDetail /></DP>} />
        <Route path="/analytics" element={<DP><Analytics /></DP>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/compare" element={<DP><StateComparison /></DP>} />
        <Route path="/education" element={<DP><EducationScorecard /></DP>} />
        <Route path="/healthcare" element={<DP><HealthcareIndicators /></DP>} />
        <Route path="/elections" element={<DP><ElectionMap /></DP>} />
        <Route path="/crime" element={<DP><CrimeStatistics /></DP>} />
        <Route path="/agriculture" element={<DP><Agriculture /></DP>} />
      </Routes>
      <Toaster position="top-right" toastOptions={{ style: { background: '#fff', color: '#1E293B', border: '1px solid #E2E8F0' } }} />
    </Router>
  )
}

function App() {
  return <AuthProvider><AppRoutes /></AuthProvider>
}
export default App
