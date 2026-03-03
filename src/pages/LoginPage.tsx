import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity, Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [magicLinkSent, setMagicLinkSent] = useState(false)

  const { signIn, signInWithMagicLink } = useAuth()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      await signIn(email, password)
      toast.success('Signed in successfully')
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  const handleMagicLink = async () => {
    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    setLoading(true)
    try {
      await signInWithMagicLink(email)
      setMagicLinkSent(true)
      toast.success('Magic link sent to your email')
    } catch (error: any) {
      toast.error(error.message || 'Failed to send magic link')
    } finally {
      setLoading(false)
    }
  }

  if (magicLinkSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-deep-navy via-deep-navy to-blue-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-deep-navy/50 backdrop-blur-xl border border-electric-blue/30 rounded-lg p-8 text-center"
        >
          <Mail className="h-16 w-16 text-electric-blue mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Check Your Email</h2>
          <p className="text-gray-300 mb-6">
            We've sent a magic link to <strong>{email}</strong>. 
            Click the link to sign in to your account.
          </p>
          <button
            onClick={() => setMagicLinkSent(false)}
            className="text-electric-blue hover:underline"
          >
            Back to login
          </button>
        </motion.div>
      </div>
    )
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
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-300">Sign in to access the command center</p>
        </div>

        {/* Form */}
        <form onSubmit={handleEmailLogin} className="space-y-6">
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
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-electric-blue text-deep-navy rounded-lg font-semibold hover:bg-electric-blue/90 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 focus:ring-offset-deep-navy disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-electric-blue/30"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-deep-navy/50 text-gray-400">Or continue with</span>
          </div>
        </div>

        {/* Magic Link */}
        <button
          onClick={handleMagicLink}
          disabled={loading}
          className="w-full py-3 px-4 border border-electric-blue/30 text-white rounded-lg hover:bg-electric-blue/10 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 focus:ring-offset-deep-navy disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Send Magic Link
        </button>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-electric-blue hover:underline">
            Sign up here
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default LoginPage