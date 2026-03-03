import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Activity, Map, AlertTriangle, TrendingUp, Shield, Eye, BarChart3 } from 'lucide-react'

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Activity className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-gray-900">IndiaMonitor</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex space-x-4"
            >
              <Link 
                to="/login" 
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-primary hover:text-primary transition-all duration-300 font-medium"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-300 font-medium shadow-sm"
              >
                Sign Up
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              India's Real-Time{' '}
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Intelligence Dashboard
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Monitor India's economic indicators, environmental data, and infrastructure status with real-time analytics and comprehensive reporting.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/signup"
                  className="px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg"
                >
                  Get Started
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/login"
                  className="px-8 py-4 border-2 border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-300 font-semibold text-lg"
                >
                  View Demo
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* India Map Illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-20 relative"
          >
            <div className="w-full max-w-4xl mx-auto">
              <svg viewBox="0 0 800 600" className="w-full h-auto">
                {/* Proper India Map Outline - Simplified but accurate */}
                <motion.path 
                  d="M150 200 C200 180, 250 175, 300 180 L350 185 L400 190 L450 200 L500 210 L530 220 L550 240 L565 265 L570 290 L575 315 L580 340 L585 365 L590 390 L595 415 L600 440 L605 465 L595 480 L580 490 L560 495 L530 490 L500 480 L470 465 L440 445 L410 420 L380 390 L350 355 L320 315 L300 270 L290 225 L280 200 L250 185 L220 180 L190 185 L165 195 Z M120 280 L100 300 L85 325 L75 355 L70 385 L75 415 L90 440 L115 460 L145 475 L180 485 L220 490 L260 495 L300 500 L340 505 L380 510 L420 515 L460 520 L500 525 L540 530 L575 535 L605 540 L625 550 L640 565 L650 585 L655 605 L650 625 L635 640 L610 650 L580 655 L545 650 L505 640 L460 625 L410 605 L355 580 L300 550 L245 515 L190 475 L140 430 L100 380 L85 325 L90 275 L105 235 L130 200"
                  fill="none"
                  stroke="#1E40AF"
                  strokeWidth="2"
                  strokeDasharray="1500"
                  initial={{ strokeDashoffset: 1500 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ delay: 1, duration: 3, ease: "easeInOut" }}
                />
                <motion.path 
                  d="M150 200 C200 180, 250 175, 300 180 L450 200 L530 220 L570 290 L590 390 L605 465 L580 490 L440 445 L320 315 L290 225 L190 185 Z M120 280 L85 325 L70 385 L90 440 L180 485 L340 505 L500 525 L625 550 L655 605 L610 650 L460 625 L300 550 L140 430 L85 325 Z"
                  fill="#1E40AF"
                  opacity="0.1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  transition={{ delay: 2.5, duration: 2 }}
                />
                
                {/* Data Points */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.5, duration: 1 }}
                >
                  <circle cx="300" cy="250" r="4" fill="#3B82F6" className="animate-pulse" />
                  <circle cx="450" cy="300" r="4" fill="#10B981" className="animate-pulse" />
                  <circle cx="250" cy="350" r="4" fill="#F59E0B" className="animate-pulse" />
                  <circle cx="500" cy="400" r="4" fill="#EF4444" className="animate-pulse" />
                </motion.g>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { label: "States", value: "28" },
              { label: "Union Territories", value: "8" },
              { label: "Data Points", value: "100+" },
              { label: "Real-time Updates", value: "24/7" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="text-3xl lg:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-16"
          >
            Comprehensive Monitoring
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Map,
                title: "Interactive India Map",
                description: "Explore all 28 states and 8 UTs with real-time data overlays, population metrics, and regional insights."
              },
              {
                icon: TrendingUp,
                title: "Economic Dashboard",
                description: "Track BSE Sensex, NSE Nifty, GDP trends, and sector-wise economic indicators with live updates."
              },
              {
                icon: Eye,
                title: "Environmental Monitoring",
                description: "Monitor air quality index (AQI) for major cities, weather patterns, and environmental trends."
              },
              {
                icon: AlertTriangle,
                title: "Real-time Alerts",
                description: "Receive instant notifications for natural disasters, security incidents, and infrastructure issues."
              },
              {
                icon: Shield,
                title: "Infrastructure Tracking",
                description: "Monitor power grids, transportation networks, and critical infrastructure across regions."
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description: "Comprehensive data visualization, trend analysis, and detailed reporting capabilities."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300 hover:border-primary/20"
              >
                <div className="bg-primary/10 rounded-lg p-3 w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Start Monitoring India Today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get instant access to real-time data and insights that matter.
            </p>
            <Link
              to="/signup"
              className="inline-block px-8 py-4 bg-white text-primary rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold text-lg shadow-md"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="text-gray-500 text-sm space-y-2">
            <p>drmhope.com | A Bettroi Product</p>
            <p className="text-xs text-gray-400">
              IndiaMonitor v1.0 | {new Date().toLocaleDateString()} | Built with React & TypeScript
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage