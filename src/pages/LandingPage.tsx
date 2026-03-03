import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Activity, Map, AlertTriangle, TrendingUp, Shield, Eye, BarChart3, Zap } from 'lucide-react'
import AnimatedCounter from '../components/shared/AnimatedCounter'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-cyber-bg relative overflow-hidden">
      {/* Scan line effect */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.03) 2px, rgba(0,240,255,0.03) 4px)' }} />

      {/* Nav */}
      <nav className="relative z-10 border-b border-cyber-border bg-cyber-surface/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center py-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-neon-cyan" />
              <span className="text-2xl font-bold text-white font-mono">IndiaMonitor</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex space-x-4">
              <Link to="/login" className="px-6 py-2 border border-cyber-border text-gray-300 rounded-lg hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300 font-medium">Login</Link>
              <Link to="/signup" className="px-6 py-2 bg-neon-cyan text-cyber-bg rounded-lg hover:shadow-neon-cyan transition-all duration-300 font-bold">Sign Up</Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative py-20 lg:py-32">
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neon-cyan rounded-full"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="inline-flex items-center space-x-2 px-4 py-1.5 bg-neon-cyan/10 border border-neon-cyan/20 rounded-full text-neon-cyan text-sm font-mono mb-8">
              <Zap className="h-4 w-4" /><span>Real-time Intelligence Platform</span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              India's <span className="text-neon-cyan neon-text">Pulse</span>,{' '}
              <br className="hidden lg:block" />
              <span className="text-neon-magenta">Visualized</span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Monitor economic indicators, environmental data, and infrastructure status across all 28 states and 8 union territories.
            </p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/dashboard" className="px-8 py-4 bg-neon-cyan text-cyber-bg rounded-xl font-bold text-lg shadow-neon-cyan hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] transition-all duration-300 inline-block">
                  Access Dashboard
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/signup" className="px-8 py-4 border-2 border-neon-magenta text-neon-magenta rounded-xl font-bold text-lg hover:bg-neon-magenta/10 transition-all duration-300 inline-block">
                  Create Account
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* India Map Silhouette */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 1 }} className="mt-20 relative max-w-4xl mx-auto">
            <svg viewBox="0 0 800 600" className="w-full h-auto">
              <defs>
                <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              </defs>
              <motion.path
                d="M150 200 C200 180, 250 175, 300 180 L350 185 L400 190 L450 200 L500 210 L530 220 L550 240 L565 265 L570 290 L575 315 L580 340 L585 365 L590 390 L595 415 L600 440 L605 465 L595 480 L580 490 L560 495 L530 490 L500 480 L470 465 L440 445 L410 420 L380 390 L350 355 L320 315 L300 270 L290 225 L280 200 L250 185 L220 180 L190 185 L165 195 Z M120 280 L100 300 L85 325 L75 355 L70 385 L75 415 L90 440 L115 460 L145 475 L180 485 L220 490 L260 495 L300 500 L340 505 L380 510 L420 515 L460 520 L500 525 L540 530 L575 535 L605 540 L625 550 L640 565 L650 585 L655 605 L650 625 L635 640 L610 650 L580 655 L545 650 L505 640 L460 625 L410 605 L355 580 L300 550 L245 515 L190 475 L140 430 L100 380 L85 325 L90 275 L105 235 L130 200"
                fill="none" stroke="#00F0FF" strokeWidth="2" filter="url(#glow)"
                strokeDasharray="1500"
                initial={{ strokeDashoffset: 1500 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ delay: 1, duration: 3, ease: "easeInOut" }}
              />
              <motion.path
                d="M150 200 C200 180, 250 175, 300 180 L450 200 L530 220 L570 290 L590 390 L605 465 L580 490 L440 445 L320 315 L290 225 L190 185 Z M120 280 L85 325 L70 385 L90 440 L180 485 L340 505 L500 525 L625 550 L655 605 L610 650 L460 625 L300 550 L140 430 L85 325 Z"
                fill="#00F0FF" initial={{ opacity: 0 }} animate={{ opacity: 0.05 }} transition={{ delay: 2.5, duration: 2 }}
              />
              {/* Glowing data points */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5, duration: 1 }}>
                {[
                  { cx: 300, cy: 250, color: '#00F0FF' },
                  { cx: 450, cy: 300, color: '#00FF88' },
                  { cx: 250, cy: 350, color: '#FFB800' },
                  { cx: 500, cy: 400, color: '#FF00FF' },
                  { cx: 350, cy: 450, color: '#FF3366' },
                  { cx: 200, cy: 280, color: '#00F0FF' },
                  { cx: 420, cy: 500, color: '#00FF88' },
                ].map((p, i) => (
                  <g key={i}>
                    <motion.circle cx={p.cx} cy={p.cy} r="6" fill={p.color} opacity="0.2"
                      animate={{ r: [6, 12, 6], opacity: [0.2, 0.05, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                    <circle cx={p.cx} cy={p.cy} r="3" fill={p.color} filter="url(#glow)" />
                  </g>
                ))}
              </motion.g>
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Stats with animated counters */}
      <div className="bg-cyber-surface border-y border-cyber-border py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Population', value: 1.4, suffix: 'B+', decimals: 1, color: 'text-neon-cyan' },
              { label: 'States & UTs', value: 36, suffix: '', decimals: 0, color: 'text-neon-magenta' },
              { label: 'Data Points', value: 500, suffix: '+', decimals: 0, color: 'text-neon-green' },
              { label: 'Live Updates', value: 24, suffix: '/7', decimals: 0, color: 'text-neon-amber' },
            ].map((stat, index) => (
              <motion.div key={index} variants={item} className="space-y-2">
                <div className={`text-4xl lg:text-5xl font-bold font-mono ${stat.color}`}>
                  <AnimatedCounter end={stat.value} decimals={stat.decimals} suffix={stat.suffix} className={stat.color} />
                </div>
                <div className="text-gray-500 font-medium text-sm uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl lg:text-5xl font-bold text-center text-white mb-4">
            Comprehensive <span className="text-neon-cyan">Monitoring</span>
          </motion.h2>
          <p className="text-gray-500 text-center mb-16 text-lg">Everything you need to track India's progress</p>

          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Map, title: 'Interactive India Map', description: 'Explore all 28 states and 8 UTs with real-time data overlays, population metrics, and regional insights.', color: 'neon-cyan' },
              { icon: TrendingUp, title: 'Economic Dashboard', description: 'Track BSE Sensex, NSE Nifty, GDP trends, and sector-wise economic indicators with live updates.', color: 'neon-green' },
              { icon: Eye, title: 'Environmental Monitoring', description: 'Monitor air quality index (AQI) for major cities, weather patterns, and environmental trends.', color: 'neon-amber' },
              { icon: AlertTriangle, title: 'Real-time Alerts', description: 'Receive instant notifications for natural disasters, security incidents, and infrastructure issues.', color: 'danger' },
              { icon: Shield, title: 'Infrastructure Tracking', description: 'Monitor power grids, transportation networks, and critical infrastructure across regions.', color: 'neon-magenta' },
              { icon: BarChart3, title: 'Advanced Analytics', description: 'Comprehensive data visualization, trend analysis, and detailed reporting capabilities.', color: 'neon-cyan' },
            ].map((feature, index) => (
              <motion.div key={index} variants={item} className="cyber-card p-6 group">
                <div className={`bg-${feature.color}/10 rounded-lg p-3 w-fit mb-4 group-hover:shadow-${feature.color}`}>
                  <feature.icon className={`h-6 w-6 text-${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-y border-neon-cyan/20 py-16 bg-gradient-to-r from-neon-cyan/5 via-transparent to-neon-magenta/5">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Start Monitoring India <span className="text-neon-cyan">Today</span></h2>
            <p className="text-xl text-gray-400 mb-8">Get instant access to real-time data and insights that matter.</p>
            <Link to="/dashboard" className="inline-block px-8 py-4 bg-neon-cyan text-cyber-bg rounded-xl font-bold text-lg shadow-neon-cyan hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] transition-all duration-300">
              Access Dashboard
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-cyber-surface border-t border-cyber-border py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Activity className="h-6 w-6 text-neon-cyan" />
            <span className="text-lg font-bold text-white font-mono">IndiaMonitor</span>
          </div>
          <p className="text-sm text-gray-500">Powered by <a href="https://drmhope.com" className="text-neon-cyan hover:underline">drmhope.com</a></p>
          <p className="text-xs text-gray-600 mt-2">Data sources: Census of India, RBI, CPCB, MoSPI, Election Commission of India</p>
          <p className="text-xs text-gray-700 mt-2">drmhope.com | A Bettroi Product | v2.0 | {new Date().toLocaleDateString()}</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
