import React from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Train, 
  Truck, 
  Wifi, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Activity
} from 'lucide-react'

interface InfraStatus {
  name: string
  status: 'operational' | 'warning' | 'down'
  uptime: number
  details?: string
}

const powerGridStatus: InfraStatus[] = [
  { name: 'Northern Grid', status: 'operational', uptime: 99.2, details: '45.2 GW' },
  { name: 'Southern Grid', status: 'operational', uptime: 98.7, details: '38.7 GW' },
  { name: 'Eastern Grid', status: 'warning', uptime: 95.4, details: '22.1 GW' },
  { name: 'Western Grid', status: 'operational', uptime: 99.6, details: '42.8 GW' },
  { name: 'North East Grid', status: 'operational', uptime: 97.8, details: '3.2 GW' }
]

const railwayStatus: InfraStatus[] = [
  { name: 'Central Railway', status: 'operational', uptime: 98.1 },
  { name: 'Western Railway', status: 'warning', uptime: 94.7 },
  { name: 'Eastern Railway', status: 'operational', uptime: 97.3 },
  { name: 'Northern Railway', status: 'operational', uptime: 99.1 },
  { name: 'Southern Railway', status: 'operational', uptime: 98.8 }
]

const transportStatus = [
  { name: 'NH-1 (Delhi-Amritsar)', status: 'operational', details: 'Clear' },
  { name: 'NH-8 (Delhi-Mumbai)', status: 'warning', details: 'Heavy Traffic' },
  { name: 'NH-4 (Chennai-Mumbai)', status: 'down', details: 'Accident at KM 245' },
  { name: 'NH-2 (Delhi-Kolkata)', status: 'operational', details: 'Normal Flow' }
]

const InfrastructurePanel: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-4 w-4 text-neon-green" />
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-amber" />
      case 'down':
        return <XCircle className="h-4 w-4 text-alert-red" />
      default:
        return <Activity className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-neon-green'
      case 'warning':
        return 'text-amber'
      case 'down':
        return 'text-alert-red'
      default:
        return 'text-gray-400'
    }
  }

  const getUptimeColor = (uptime: number) => {
    if (uptime >= 98) return 'text-neon-green'
    if (uptime >= 95) return 'text-amber'
    return 'text-alert-red'
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
          <Zap className="h-5 w-5 text-electric-blue mr-2" />
          Infrastructure
        </h2>
        <div className="flex items-center space-x-1 text-xs">
          <div className="h-2 w-2 bg-neon-green rounded-full animate-pulse"></div>
          <span className="text-gray-400">Live Status</span>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto">
        {/* Power Grid Status */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
            <Zap className="h-4 w-4 text-electric-blue mr-2" />
            Power Grid Status
          </h3>
          <div className="space-y-2">
            {powerGridStatus.map((grid, index) => (
              <motion.div
                key={grid.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-deep-navy/50 border border-electric-blue/20 rounded-lg p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(grid.status)}
                    <h4 className="font-medium text-white text-sm">{grid.name}</h4>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-mono font-bold ${getUptimeColor(grid.uptime)}`}>
                      {grid.uptime.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-400">Uptime</div>
                  </div>
                </div>
                {grid.details && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Current Load:</span>
                    <span className="text-electric-blue font-mono">{grid.details}</span>
                  </div>
                )}
                <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                  <div 
                    className={`h-1 rounded-full transition-all duration-500 ${
                      grid.uptime >= 98 ? 'bg-neon-green' : 
                      grid.uptime >= 95 ? 'bg-amber' : 'bg-alert-red'
                    }`}
                    style={{ width: `${grid.uptime}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Railway Network */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
            <Train className="h-4 w-4 text-electric-blue mr-2" />
            Railway Network
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {railwayStatus.map((railway, index) => (
              <motion.div
                key={railway.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-deep-navy/50 border border-electric-blue/20 rounded-lg p-3"
              >
                <div className="flex items-center justify-between mb-1">
                  {getStatusIcon(railway.status)}
                  <div className={`text-sm font-mono font-bold ${getUptimeColor(railway.uptime)}`}>
                    {railway.uptime.toFixed(1)}%
                  </div>
                </div>
                <h4 className="font-medium text-white text-xs">{railway.name}</h4>
                <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                  <div 
                    className={`h-1 rounded-full transition-all duration-500 ${
                      railway.uptime >= 98 ? 'bg-neon-green' : 
                      railway.uptime >= 95 ? 'bg-amber' : 'bg-alert-red'
                    }`}
                    style={{ width: `${railway.uptime}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Highway Status */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
            <Truck className="h-4 w-4 text-electric-blue mr-2" />
            Highway Status
          </h3>
          <div className="space-y-2">
            {transportStatus.map((highway, index) => (
              <motion.div
                key={highway.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-deep-navy/50 border rounded-lg p-3 ${
                  highway.status === 'down' ? 'border-alert-red/50 bg-alert-red/5' :
                  highway.status === 'warning' ? 'border-amber/50 bg-amber/5' :
                  'border-electric-blue/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(highway.status)}
                    <div>
                      <h4 className="font-medium text-white text-sm">{highway.name}</h4>
                      <p className={`text-xs ${getStatusColor(highway.status)}`}>
                        {highway.details}
                      </p>
                    </div>
                  </div>
                  <div 
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      highway.status === 'operational' ? 'bg-neon-green/20 text-neon-green' :
                      highway.status === 'warning' ? 'bg-amber/20 text-amber' :
                      'bg-alert-red/20 text-alert-red'
                    }`}
                  >
                    {highway.status.toUpperCase()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Infrastructure Summary */}
        <div className="bg-deep-navy/50 border border-electric-blue/20 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
            <Activity className="h-4 w-4 text-electric-blue mr-2" />
            Overall Infrastructure Health
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-mono font-bold text-neon-green">98.2%</div>
              <p className="text-xs text-gray-400">Power Grid</p>
            </div>
            <div>
              <div className="text-2xl font-mono font-bold text-amber">97.6%</div>
              <p className="text-xs text-gray-400">Railways</p>
            </div>
            <div>
              <div className="text-2xl font-mono font-bold text-alert-red">89.4%</div>
              <p className="text-xs text-gray-400">Highways</p>
            </div>
          </div>
        </div>

        {/* Network Connectivity */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-deep-navy/50 border border-electric-blue/20 rounded-lg p-3 text-center">
            <Wifi className="h-6 w-6 text-electric-blue mx-auto mb-1" />
            <div className="text-lg font-mono font-bold text-white">847M</div>
            <p className="text-xs text-gray-400">Internet Users</p>
          </div>
          <div className="bg-deep-navy/50 border border-electric-blue/20 rounded-lg p-3 text-center">
            <Zap className="h-6 w-6 text-neon-green mx-auto mb-1" />
            <div className="text-lg font-mono font-bold text-white">152 GW</div>
            <p className="text-xs text-gray-400">Total Capacity</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default InfrastructurePanel