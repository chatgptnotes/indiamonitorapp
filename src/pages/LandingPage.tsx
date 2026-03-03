import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Activity, Map, AlertTriangle, TrendingUp, Shield, Eye } from 'lucide-react'

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-navy via-deep-navy to-blue-900 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-radial from-electric-blue/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.5, 1]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-radial from-neon-green/10 to-transparent rounded-full blur-3xl"
        />
      </div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/10 via-transparent to-neon-green/10"></div>
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: `
              linear-gradient(90deg, #00D4FF 1px, transparent 1px),
              linear-gradient(0deg, #00D4FF 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
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
              className="px-6 py-2 border-2 border-electric-blue/50 text-electric-blue rounded-lg hover:border-electric-blue hover:bg-electric-blue/10 transition-all duration-300 font-semibold backdrop-blur-sm"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="px-6 py-2 bg-electric-blue text-deep-navy rounded-lg hover:bg-electric-blue/90 transition-all duration-300 font-semibold shadow-lg shadow-electric-blue/25 hover:shadow-electric-blue/40"
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/signup"
                  className="px-8 py-4 bg-gradient-to-r from-electric-blue to-neon-green text-deep-navy rounded-lg hover:from-electric-blue/90 hover:to-neon-green/90 transition-all duration-300 font-semibold text-lg shadow-lg shadow-electric-blue/30 hover:shadow-neon-green/30 border border-electric-blue/50 relative overflow-hidden group"
                >
                  <span className="relative z-10">Start Monitoring</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-green/20 to-electric-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/login"
                  className="px-8 py-4 border-2 border-electric-blue text-white rounded-lg hover:bg-electric-blue/10 hover:border-neon-green transition-all duration-300 font-semibold text-lg backdrop-blur-sm relative overflow-hidden group"
                >
                  <span className="relative z-10">View Demo</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/5 to-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* India Silhouette Animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-20 relative"
          >
            <div className="w-full max-w-3xl mx-auto opacity-30">
              <svg viewBox="0 0 800 800" className="w-full h-auto">
                <motion.path 
                  d="M300 100 L350 90 L400 95 L450 105 L500 120 L530 140 L550 160 L565 185 L570 210 L575 235 L580 260 L585 285 L590 310 L595 335 L600 360 L605 385 L610 410 L615 435 L620 460 L625 485 L630 510 L635 535 L640 560 L635 580 L625 595 L610 605 L590 610 L565 605 L540 595 L515 580 L490 560 L465 535 L440 505 L415 470 L390 430 L365 385 L340 335 L320 280 L310 220 L305 160 Z M200 300 L180 320 L160 345 L145 375 L135 410 L130 450 L135 490 L150 525 L175 555 L210 580 L250 600 L295 615 L340 625 L385 630 L430 625 L475 615 L520 600 L560 580 L595 555 L625 525 L650 490 L670 450 L685 410 L695 370 L700 330 L705 290 L710 250 L715 210 L720 170 L715 130 L700 95 L675 65 L640 40 L595 25 L545 20 L490 25 L435 40 L385 65 L340 100 L300 145"
                  fill="none"
                  stroke="url(#indiaGradient)"
                  strokeWidth="3"
                  strokeDasharray="2000"
                  initial={{ strokeDashoffset: 2000 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ delay: 1, duration: 4, ease: "easeInOut" }}
                />
                <motion.path 
                  d="M300 100 C350 85, 450 85, 500 120 C550 155, 580 210, 585 285 C590 360, 600 435, 620 485 C640 535, 635 580, 590 610 C540 640, 465 635, 390 630 C315 625, 240 620, 180 595 C120 570, 80 525, 85 470 C90 415, 130 360, 180 320 C230 280, 280 240, 300 200 C320 160, 300 130, 300 100 Z"
                  fill="url(#indiaFillGradient)"
                  opacity="0.1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  transition={{ delay: 2.5, duration: 2 }}
                />
                <defs>
                  <linearGradient id="indiaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00D4FF" />
                    <stop offset="50%" stopColor="#00FF88" />
                    <stop offset="100%" stopColor="#00D4FF" />
                  </linearGradient>
                  <radialGradient id="indiaFillGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00FF88" opacity="0.2" />
                    <stop offset="100%" stopColor="#00D4FF" opacity="0.05" />
                  </radialGradient>
                </defs>
              </svg>
              
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/5 via-transparent to-neon-green/5 rounded-full blur-3xl"></div>
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
      <footer className="bg-deep-navy border-t border-electric-blue/20 py-8 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="text-gray-500 text-sm space-y-1">
            <p>drmhope.com | A Bettroi Product</p>
            <p className="text-xs text-gray-600">
              IndiaMonitor v1.0 | Built with React & TypeScript | 
              <a href="https://github.com/chatgptnotes/indiamonitorapp" className="text-electric-blue/60 hover:text-electric-blue ml-1">
                GitHub
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage