import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity, Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password || !confirmPassword) {
      toast.error('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      await signUp(email, password)
      toast.success('Account created successfully! Check your email to verify your account.')
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-navy via-deep-navy to-blue-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-deep-navy/50 backdrop-blur-xl border border-electric-blue/30 rounded-lg p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
            <Activity className="h-8 w-8 text-electric-blue" />
            <span className="text-2xl font-bold text-white">IndiaMonitor</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-300">Join the intelligence network</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-deep-navy border border-electric-blue/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-deep-navy border border-electric-blue/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                placeholder="Create a password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">Must be at least 6 characters</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-deep-navy border border-electric-blue/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-electric-blue text-deep-navy rounded-lg font-semibold hover:bg-electric-blue/90 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 focus:ring-offset-deep-navy disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Sign In Link */}
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-electric-blue hover:underline">
            Sign in here
          </Link>
        </p>

        {/* Terms */}
        <p className="mt-4 text-xs text-gray-500 text-center">
          By creating an account, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  )
}

export default SignupPage