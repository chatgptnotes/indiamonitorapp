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
import './index.css'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-deep-navy flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-electric-blue"></div>
      </div>
    )
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />
}

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-deep-navy flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-electric-blue"></div>
      </div>
    )
  }

  return user ? <Navigate to="/dashboard" replace /> : <>{children}</>
}

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DataProvider>
                <Dashboard />
              </DataProvider>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/state/:stateCode" 
          element={
            <ProtectedRoute>
              <DataProvider>
                <StateDetail />
              </DataProvider>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/analytics" 
          element={
            <ProtectedRoute>
              <DataProvider>
                <Analytics />
              </DataProvider>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#0A0E1A',
            color: '#fff',
            border: '1px solid #00D4FF',
          },
        }}
      />
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App