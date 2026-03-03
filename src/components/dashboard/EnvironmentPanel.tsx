import React from 'react'
import { motion } from 'framer-motion'
import { Leaf, Thermometer, AlertCircle, Cloud } from 'lucide-react'
import { useData } from '../../contexts/DataContext'

const mockAQIData = [
  { city: 'Delhi', state: 'DL', aqi: 287, pm25: 178.5, category: 'Poor', color: '#FF3366' },
  { city: 'Mumbai', state: 'MH', aqi: 154, pm25: 98.2, category: 'Moderate', color: '#FFB800' },
  { city: 'Kolkata', state: 'WB', aqi: 198, pm25: 125.7, category: 'Poor', color: '#FF3366' },
  { city: 'Chennai', state: 'TN', aqi: 89, pm25: 54.3, category: 'Satisfactory', color: '#00FF88' },
  { city: 'Bengaluru', state: 'KA', aqi: 76, pm25: 45.1, category: 'Satisfactory', color: '#00FF88' },
  { city: 'Hyderabad', state: 'TS', aqi: 132, pm25: 83.4, category: 'Moderate', color: '#FFB800' },
  { city: 'Ahmedabad', state: 'GJ', aqi: 167, pm25: 105.2, category: 'Moderate', color: '#FFB800' },
  { city: 'Pune', state: 'MH', aqi: 118, pm25: 72.8, category: 'Moderate', color: '#FFB800' }
]

const mockWeatherAlerts = [
  { id: 1, type: 'Heat Wave', location: 'Rajasthan', severity: 'warning', icon: Thermometer },
  { id: 2, type: 'Heavy Rain', location: 'Kerala', severity: 'critical', icon: Cloud },
  { id: 3, type: 'Cyclone Alert', location: 'Odisha Coast', severity: 'critical', icon: AlertCircle },
  { id: 4, type: 'Air Quality', location: 'NCR Region', severity: 'warning', icon: Leaf }
]

const EnvironmentPanel: React.FC = () => {
  const { } = useData()

  const getAQICategory = (aqi: number) => {
    if (aqi <= 50) return { text: 'Good', color: '#00FF88' }
    if (aqi <= 100) return { text: 'Satisfactory', color: '#22C55E' }
    if (aqi <= 200) return { text: 'Moderate', color: '#FFB800' }
    if (aqi <= 300) return { text: 'Poor', color: '#FF3366' }
    return { text: 'Very Poor', color: '#7F1D1D' }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-cyber-card border border-cyber-border rounded-xl p-6 h-full flex flex-col "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white flex items-center">
          <Leaf className="h-5 w-5 text-green-600 mr-2" />
          Environment
        </h2>
        <div className="flex items-center space-x-1 text-xs">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-gray-500">Real-time</span>
        </div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto">
        {/* AQI Cities Grid */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-3">Air Quality Index - Major Cities</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {mockAQIData.map((city, index) => {
              const category = getAQICategory(city.aqi)
              return (
                <motion.div
                  key={city.city}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-cyber-bg border border-cyber-border rounded-lg p-3 hover: transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-white text-sm">{city.city}</h4>
                      <p className="text-xs text-gray-500">{city.state}</p>
                    </div>
                    <div 
                      className="px-3 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: category.color }}
                    >
                      {city.aqi}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">PM2.5: {city.pm25}</span>
                    <span style={{ color: category.color }} className="font-medium">
                      {category.text}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div 
                      className="h-1.5 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.min((city.aqi / 500) * 100, 100)}%`,
                        backgroundColor: category.color 
                      }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Weather Alerts */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-3">Weather Alerts</h3>
          <div className="space-y-2">
            {mockWeatherAlerts.map((alert, index) => {
              const Icon = alert.icon
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`border rounded-lg p-3 flex items-center space-x-3 ${
                    alert.severity === 'critical' 
                      ? 'border-red-200 bg-red-50' 
                      : 'border-yellow-200 bg-yellow-50'
                  }`}
                >
                  <Icon 
                    className={`h-5 w-5 ${
                      alert.severity === 'critical' ? 'text-red-600' : 'text-yellow-600'
                    }`} 
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white">{alert.type}</h4>
                    <p className="text-xs text-gray-500">{alert.location}</p>
                  </div>
                  <div 
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      alert.severity === 'critical' 
                        ? 'bg-red-600 text-white' 
                        : 'bg-yellow-600 text-white'
                    }`}
                  >
                    {alert.severity.toUpperCase()}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Temperature Overview */}
        <div className="bg-cyber-bg border border-cyber-border rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
            <Thermometer className="h-4 w-4 text-neon-cyan mr-2" />
            Temperature Range Today
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-mono font-bold text-blue-600">18°C</div>
              <p className="text-xs text-gray-500">Min (Kashmir)</p>
            </div>
            <div>
              <div className="text-2xl font-mono font-bold text-green-600">28°C</div>
              <p className="text-xs text-gray-500">Avg (National)</p>
            </div>
            <div>
              <div className="text-2xl font-mono font-bold text-red-600">45°C</div>
              <p className="text-xs text-gray-500">Max (Rajasthan)</p>
            </div>
          </div>
        </div>

        {/* Quick Environment Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-cyber-bg border border-cyber-border rounded-lg p-3 text-center">
            <Leaf className="h-6 w-6 text-green-600 mx-auto mb-1" />
            <div className="text-lg font-mono font-bold text-white">24%</div>
            <p className="text-xs text-gray-500">Forest Cover</p>
          </div>
          <div className="bg-cyber-bg border border-cyber-border rounded-lg p-3 text-center">
            <Cloud className="h-6 w-6 text-neon-cyan mx-auto mb-1" />
            <div className="text-lg font-mono font-bold text-white">67%</div>
            <p className="text-xs text-gray-500">Humidity Avg</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default EnvironmentPanel