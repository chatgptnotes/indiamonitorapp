import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Activity, Map, AlertTriangle, TrendingUp, Shield, Eye } from 'lucide-react'

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-navy via-deep-navy to-blue-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/10 via-transparent to-neon-green/10"></div>
        
        {/* Navigation */}
        <nav className="relative z-10 flex justify-between items-center p-6 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Activity className="h-8 w-8 text-electric-blue" />
            <span className="text-2xl font-bold text-white">IndiaMonitor</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex space-x-4"
          >
            <Link 
              to="/login" 
              className="px-4 py-2 text-white hover:text-electric-blue transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="px-6 py-2 bg-electric-blue text-deep-navy rounded-lg hover:bg-electric-blue/90 transition-colors font-semibold"
            >
              Sign Up
            </Link>
          </motion.div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Real-time Intelligence
              <br />
              <span className="text-electric-blue">Dashboard for India</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Monitor India's pulse with comprehensive data on economy, environment, 
              infrastructure, and emergency alerts in one unified command center.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link 
                to="/signup"
                className="px-8 py-4 bg-electric-blue text-deep-navy rounded-lg hover:bg-electric-blue/90 transition-colors font-semibold text-lg shadow-lg hover:shadow-electric-blue/25"
              >
                Start Monitoring
              </Link>
              <Link 
                to="/login"
                className="px-8 py-4 border-2 border-electric-blue text-white rounded-lg hover:bg-electric-blue/10 transition-colors font-semibold text-lg"
              >
                View Demo
              </Link>
            </motion.div>
          </motion.div>

          {/* India Silhouette Animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-20 relative"
          >
            <div className="w-full max-w-2xl mx-auto opacity-20">
              <svg viewBox="0 0 400 400" className="w-full h-auto">
                <motion.path 
                  d="M200 50 L250 100 L300 150 L280 200 L300 250 L250 300 L200 350 L150 300 L100 250 L120 200 L100 150 L150 100 Z"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  strokeDasharray="1000"
                  initial={{ strokeDashoffset: 1000 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ delay: 1, duration: 3 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00D4FF" />
                    <stop offset="100%" stopColor="#00FF88" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-deep-navy/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-center text-white mb-16"
          >
            Command Center Features
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Map,
                title: "Interactive India Map",
                description: "Explore all 28 states and 8 UTs with real-time data overlays, population density, and economic indicators."
              },
              {
                icon: TrendingUp,
                title: "Economic Dashboard",
                description: "Live BSE Sensex, NSE Nifty, GDP trends, and sector-wise analysis with beautiful charts and analytics."
              },
              {
                icon: Eye,
                title: "Environmental Monitoring",
                description: "AQI tracking for major cities, weather alerts, and environmental trend analysis across regions."
              },
              {
                icon: AlertTriangle,
                title: "Emergency Alerts",
                description: "Real-time alerts for natural disasters, security incidents, and infrastructure disruptions."
              },
              {
                icon: Shield,
                title: "Infrastructure Status",
                description: "Monitor power grid, railway networks, and transportation systems across all regions."
              },
              {
                icon: Activity,
                title: "Real-time Analytics",
                description: "Live data streams, trend analysis, and comprehensive reporting with advanced visualizations."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-deep-navy/50 border border-electric-blue/20 rounded-lg p-6 hover:border-electric-blue/40 transition-colors"
              >
                <feature.icon className="h-12 w-12 text-electric-blue mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-deep-navy border-t border-electric-blue/20 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-gray-500 text-sm">
            Powered by drmhope.com | A Bettroi Product
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage