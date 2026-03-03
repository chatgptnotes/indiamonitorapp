import React from 'react'
import { motion } from 'framer-motion'
import { Leaf, Thermometer, AlertCircle, Cloud } from 'lucide-react'
import { useData } from '../../contexts/DataContext'

const mockAQIData = [
  { city: 'Delhi', state: 'DL', aqi: 287, pm25: 178.5, category: 'Poor', color: '#8B0000' },
  { city: 'Mumbai', state: 'MH', aqi: 154, pm25: 98.2, category: 'Moderate', color: '#FFB800' },
  { city: 'Kolkata', state: 'WB', aqi: 198, pm25: 125.7, category: 'Poor', color: '#FF3366' },
  { city: 'Chennai', state: 'TN', aqi: 89, pm25: 54.3, category: 'Satisfactory', color: '#FFA500' },
  { city: 'Bengaluru', state: 'KA', aqi: 76, pm25: 45.1, category: 'Satisfactory', color: '#FFA500' },
  { city: 'Hyderabad', state: 'TS', aqi: 132, pm25: 83.4, category: 'Moderate', color: '#FFB800' },
  { city: 'Ahmedabad', state: 'GJ', aqi: 167, pm25: 105.2, category: 'Moderate', color: '#FFB800' },
  { city: 'Pune', state: 'MH', aqi: 118, pm25: 72.8, category: 'Moderate', color: '#FFB800' },
  { city: 'Jaipur', state: 'RJ', aqi: 203, pm25: 128.9, category: 'Poor', color: '#FF3366' },
  { city: 'Lucknow', state: 'UP', aqi: 245, pm25: 154.3, category: 'Poor', color: '#8B0000' }
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
    if (aqi <= 100) return { text: 'Satisfactory', color: '#FFA500' }
    if (aqi <= 200) return { text: 'Moderate', color: '#FFB800' }
    if (aqi <= 300) return { text: 'Poor', color: '#FF3366' }
    return { text: 'Very Poor', color: '#8B0000' }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-deep-navy/30 backdrop-blur-xl border border-electric-blue/30 rounded-lg p-4 h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white flex items-center">
          <Leaf className="h-5 w-5 text-neon-green mr-2" />
          Environment
        </h2>
        <div className="flex items-center space-x-1 text-xs">
          <div className="h-2 w-2 bg-neon-green rounded-full animate-pulse"></div>
          <span className="text-gray-400">Real-time</span>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto">
        {/* AQI Cities Grid */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-3">Air Quality Index - Major Cities</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {mockAQIData.slice(0, 8).map((city, index) => {
              const category = getAQICategory(city.aqi)
              return (
                <motion.div
                  key={city.city}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-deep-navy/50 border border-electric-blue/20 rounded-lg p-3 hover:border-electric-blue/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-white text-sm">{city.city}</h4>
                      <p className="text-xs text-gray-400">{city.state}</p>
                    </div>
                    <div 
                      className="px-2 py-1 rounded text-xs font-medium text-white"
                      style={{ backgroundColor: category.color }}
                    >
                      {city.aqi}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">PM2.5: {city.pm25}</span>
                    <span style={{ color: category.color }} className="font-medium">
                      {category.text}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                    <div 
                      className="h-1 rounded-full transition-all duration-500"
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
                  className={`bg-deep-navy/50 border rounded-lg p-3 flex items-center space-x-3 ${
                    alert.severity === 'critical' 
                      ? 'border-alert-red/50 bg-alert-red/5' 
                      : 'border-amber/50 bg-amber/5'
                  }`}
                >
                  <Icon 
                    className={`h-5 w-5 ${
                      alert.severity === 'critical' ? 'text-alert-red' : 'text-amber'
                    }`} 
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white">{alert.type}</h4>
                    <p className="text-xs text-gray-400">{alert.location}</p>
                  </div>
                  <div 
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      alert.severity === 'critical' 
                        ? 'bg-alert-red text-white' 
                        : 'bg-amber text-deep-navy'
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
        <div className="bg-deep-navy/50 border border-electric-blue/20 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
            <Thermometer className="h-4 w-4 text-electric-blue mr-2" />
            Temperature Range Today
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-mono font-bold text-neon-green">18°C</div>
              <p className="text-xs text-gray-400">Min (Kashmir)</p>
            </div>
            <div>
              <div className="text-2xl font-mono font-bold text-electric-blue">28°C</div>
              <p className="text-xs text-gray-400">Avg (National)</p>
            </div>
            <div>
              <div className="text-2xl font-mono font-bold text-alert-red">45°C</div>
              <p className="text-xs text-gray-400">Max (Rajasthan)</p>
            </div>
          </div>
        </div>

        {/* Quick Environment Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-deep-navy/50 border border-electric-blue/20 rounded-lg p-3 text-center">
            <Leaf className="h-6 w-6 text-neon-green mx-auto mb-1" />
            <div className="text-lg font-mono font-bold text-white">24%</div>
            <p className="text-xs text-gray-400">Forest Cover</p>
          </div>
          <div className="bg-deep-navy/50 border border-electric-blue/20 rounded-lg p-3 text-center">
            <Cloud className="h-6 w-6 text-electric-blue mx-auto mb-1" />
            <div className="text-lg font-mono font-bold text-white">67%</div>
            <p className="text-xs text-gray-400">Humidity Avg</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default EnvironmentPanel