import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Users, BookOpen, TrendingUp, Leaf, AlertTriangle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import DashboardLayout from '../components/layout/DashboardLayout'
import { useData } from '../contexts/DataContext'

const StateDetail: React.FC = () => {
  const { stateCode } = useParams()
  const navigate = useNavigate()
  const { states, alerts } = useData()

  const state = states.find(s => s.code === stateCode || s.name === stateCode)
  const stateAlerts = alerts.filter(a => a.state_code === stateCode || a.state_code === state?.code)

  // Mock trend data
  const economicTrends = [
    { month: 'Jan', gdp: 2.1, employment: 94.2 },
    { month: 'Feb', gdp: 2.3, employment: 94.8 },
    { month: 'Mar', gdp: 2.5, employment: 95.1 },
    { month: 'Apr', gdp: 2.4, employment: 94.9 },
    { month: 'May', gdp: 2.6, employment: 95.3 },
    { month: 'Jun', gdp: 2.8, employment: 95.7 }
  ]

  const aqiTrends = [
    { month: 'Jan', aqi: 156 },
    { month: 'Feb', aqi: 142 },
    { month: 'Mar', aqi: 128 },
    { month: 'Apr', aqi: 134 },
    { month: 'May', aqi: 145 },
    { month: 'Jun', aqi: state?.aqi_avg || 120 }
  ]

  if (!state) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">State Not Found</h1>
            <p className="text-gray-400 mb-6">The requested state could not be found.</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2 bg-electric-blue text-deep-navy rounded-lg hover:bg-electric-blue/90 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-electric-blue/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-electric-blue" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">{state.name}</h1>
              <p className="text-gray-400">Capital: {state.capital}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono font-bold text-electric-blue">
              {state.code}
            </div>
            <p className="text-sm text-gray-400">State Code</p>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-deep-navy/30 backdrop-blur-xl border border-electric-blue/30 rounded-lg p-6 text-center"
          >
            <Users className="h-8 w-8 text-electric-blue mx-auto mb-3" />
            <div className="text-2xl font-mono font-bold text-white mb-1">
              {state.population ? (state.population / 1000000).toFixed(1) + 'M' : 'N/A'}
            </div>
            <p className="text-sm text-gray-400">Population</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-deep-navy/30 backdrop-blur-xl border border-electric-blue/30 rounded-lg p-6 text-center"
          >
            <BookOpen className="h-8 w-8 text-neon-green mx-auto mb-3" />
            <div className="text-2xl font-mono font-bold text-white mb-1">
              {state.literacy_rate ? state.literacy_rate.toFixed(1) + '%' : 'N/A'}
            </div>
            <p className="text-sm text-gray-400">Literacy Rate</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-deep-navy/30 backdrop-blur-xl border border-electric-blue/30 rounded-lg p-6 text-center"
          >
            <TrendingUp className="h-8 w-8 text-amber mx-auto mb-3" />
            <div className="text-2xl font-mono font-bold text-white mb-1">
              {state.gdp_billion_usd ? '$' + state.gdp_billion_usd.toFixed(1) + 'B' : 'N/A'}
            </div>
            <p className="text-sm text-gray-400">GDP</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-deep-navy/30 backdrop-blur-xl border border-electric-blue/30 rounded-lg p-6 text-center"
          >
            <Leaf className="h-8 w-8 text-alert-red mx-auto mb-3" />
            <div className="text-2xl font-mono font-bold text-white mb-1">
              {state.aqi_avg || 'N/A'}
            </div>
            <p className="text-sm text-gray-400">Average AQI</p>
          </motion.div>
        </div>

        {/* Charts and Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Economic Trends */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-deep-navy/30 backdrop-blur-xl border border-electric-blue/30 rounded-lg p-6"
          >
            <h2 className="text-lg font-bold text-white mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 text-electric-blue mr-2" />
              Economic Trends
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={economicTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#00D4FF20" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#9CA3AF' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#9CA3AF' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0A0E1A',
                      border: '1px solid #00D4FF',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="gdp" 
                    stroke="#00D4FF" 
                    strokeWidth={2}
                    dot={{ fill: '#00D4FF', strokeWidth: 2 }}
                    name="GDP Growth (%)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="employment" 
                    stroke="#00FF88" 
                    strokeWidth={2}
                    dot={{ fill: '#00FF88', strokeWidth: 2 }}
                    name="Employment Rate (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Environmental Data */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-deep-navy/30 backdrop-blur-xl border border-electric-blue/30 rounded-lg p-6"
          >
            <h2 className="text-lg font-bold text-white mb-4 flex items-center">
              <Leaf className="h-5 w-5 text-neon-green mr-2" />
              Air Quality Trends
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={aqiTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#00D4FF20" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#9CA3AF' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#9CA3AF' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0A0E1A',
                      border: '1px solid #00D4FF',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar 
                    dataKey="aqi" 
                    fill="#FFB800"
                    radius={[2, 2, 0, 0]}
                    name="AQI"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Alerts for this State */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-deep-navy/30 backdrop-blur-xl border border-electric-blue/30 rounded-lg p-6"
        >
          <h2 className="text-lg font-bold text-white mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 text-alert-red mr-2" />
            Recent Alerts ({stateAlerts.length})
          </h2>
          {stateAlerts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stateAlerts.slice(0, 4).map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${
                    alert.severity === 'critical'
                      ? 'border-alert-red/50 bg-alert-red/5'
                      : alert.severity === 'warning'
                      ? 'border-amber/50 bg-amber/5'
                      : 'border-electric-blue/50 bg-electric-blue/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white text-sm">{alert.title}</h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        alert.severity === 'critical'
                          ? 'bg-alert-red text-white'
                          : alert.severity === 'warning'
                          ? 'bg-amber text-deep-navy'
                          : 'bg-electric-blue text-deep-navy'
                      }`}
                    >
                      {alert.severity?.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{alert.description}</p>
                  <div className="text-xs text-gray-400">
                    <span>Source: {alert.source || 'Unknown'}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">No recent alerts for this state</p>
            </div>
          )}
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-deep-navy/30 backdrop-blur-xl border border-electric-blue/30 rounded-lg p-6">
            <h3 className="font-semibold text-white mb-3">Geography</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Area:</span>
                <span className="text-white">{state.area_sq_km?.toLocaleString()} km²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Density:</span>
                <span className="text-white">
                  {state.population && state.area_sq_km 
                    ? Math.round(state.population / state.area_sq_km).toLocaleString() + '/km²'
                    : 'N/A'
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Region:</span>
                <span className="text-white">{state.region || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="bg-deep-navy/30 backdrop-blur-xl border border-electric-blue/30 rounded-lg p-6">
            <h3 className="font-semibold text-white mb-3">Development</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">HDI:</span>
                <span className="text-white">{state.hdi?.toFixed(3) || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Per Capita GDP:</span>
                <span className="text-white">
                  {state.gdp_billion_usd && state.population
                    ? '$' + Math.round((state.gdp_billion_usd * 1000000000) / state.population).toLocaleString()
                    : 'N/A'
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Literacy Rank:</span>
                <span className="text-white">
                  {state.literacy_rate && state.literacy_rate > 90 ? 'High' : 
                   state.literacy_rate && state.literacy_rate > 75 ? 'Medium' : 'Low'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-deep-navy/30 backdrop-blur-xl border border-electric-blue/30 rounded-lg p-6">
            <h3 className="font-semibold text-white mb-3">Key Sectors</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div>• Agriculture & Allied</div>
              <div>• Manufacturing</div>
              <div>• Services & IT</div>
              <div>• Tourism</div>
              <div>• Mining & Energy</div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}

export default StateDetail