import React from 'react'
import { motion } from 'framer-motion'
import { Wind } from 'lucide-react'

const cities = [
  { name: 'Delhi', aqi: 387, lat: 28.6, lng: 77.2 },
  { name: 'Mumbai', aqi: 124, lat: 19.0, lng: 72.8 },
  { name: 'Bangalore', aqi: 89, lat: 12.9, lng: 77.5 },
  { name: 'Kolkata', aqi: 201, lat: 22.5, lng: 88.3 },
  { name: 'Chennai', aqi: 76, lat: 13.0, lng: 80.2 },
  { name: 'Lucknow', aqi: 312, lat: 26.8, lng: 80.9 },
  { name: 'Hyderabad', aqi: 102, lat: 17.3, lng: 78.4 },
  { name: 'Pune', aqi: 95, lat: 18.5, lng: 73.8 },
]

const getAQIColor = (aqi: number) => {
  if (aqi <= 50) return 'bg-green-500'
  if (aqi <= 100) return 'bg-yellow-500'
  if (aqi <= 200) return 'bg-orange-500'
  if (aqi <= 300) return 'bg-red-500'
  return 'bg-purple-700'
}

const getAQILabel = (aqi: number) => {
  if (aqi <= 50) return 'Good'
  if (aqi <= 100) return 'Moderate'
  if (aqi <= 200) return 'Unhealthy'
  if (aqi <= 300) return 'Very Unhealthy'
  return 'Hazardous'
}

const AQIMap: React.FC = () => (
  <div className="bg-cyber-card rounded-xl border border-cyber-border p-4 shadow-card">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-white flex items-center"><Wind className="h-5 w-5 mr-2 text-neon-cyan" />Air Quality Index</h3>
      <div className="flex space-x-1">{['Good','Mod','Poor','Bad','Haz'].map((l,i) => (
        <span key={l} className={`text-[10px] px-1.5 py-0.5 rounded text-white ${['bg-green-500','bg-yellow-500','bg-orange-500','bg-red-500','bg-purple-700'][i]}`}>{l}</span>
      ))}</div>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {cities.map(c => (
        <motion.div key={c.name} whileHover={{ scale: 1.05 }} className="bg-cyber-bg rounded-lg p-3 text-center border border-cyber-border">
          <div className={`inline-block w-3 h-3 rounded-full ${getAQIColor(c.aqi)} mb-1`} />
          <p className="text-sm font-semibold text-gray-200">{c.name}</p>
          <p className="text-2xl font-bold text-white">{c.aqi}</p>
          <p className="text-xs text-gray-500">{getAQILabel(c.aqi)}</p>
        </motion.div>
      ))}
    </div>
  </div>
)
export default AQIMap
