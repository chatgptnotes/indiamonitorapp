import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Waves, CloudLightning, Mountain } from 'lucide-react'

const disasters = [
  { type: 'Earthquake', location: 'Assam', severity: 'Moderate', magnitude: '4.2', time: '2h ago', icon: Mountain, color: 'text-orange-600 bg-orange-50' },
  { type: 'Flood', location: 'Kerala', severity: 'High', magnitude: 'Level 3', time: '6h ago', icon: Waves, color: 'text-blue-600 bg-blue-50' },
  { type: 'Cyclone', location: 'Odisha Coast', severity: 'Warning', magnitude: 'Cat 2', time: '12h ago', icon: CloudLightning, color: 'text-purple-600 bg-purple-50' },
  { type: 'Earthquake', location: 'Uttarakhand', severity: 'Low', magnitude: '2.8', time: '1d ago', icon: Mountain, color: 'text-yellow-600 bg-yellow-50' },
]

const severityColor: Record<string, string> = { Low: 'bg-green-100 text-green-700', Moderate: 'bg-yellow-100 text-yellow-700', High: 'bg-red-100 text-red-700', Warning: 'bg-purple-100 text-purple-700' }

const DisasterTracker: React.FC = () => (
  <div className="space-y-3">
    <h4 className="text-sm font-semibold text-gray-300 flex items-center"><AlertTriangle className="h-4 w-4 mr-1 text-danger" />Disaster Tracker</h4>
    {disasters.map((d, i) => {
      const Icon = d.icon
      return (
        <motion.div key={i} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} className="bg-cyber-card rounded-lg border border-cyber-border p-3 flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${d.color}`}><Icon className="h-4 w-4" /></div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white">{d.type} - {d.location}</p>
            <p className="text-xs text-gray-500">{d.magnitude} | {d.time}</p>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${severityColor[d.severity]}`}>{d.severity}</span>
        </motion.div>
      )
    })}
  </div>
)
export default DisasterTracker
