import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Pin, GripVertical, Eye, EyeOff } from 'lucide-react'

const defaultWidgets = [
  { id: 'map', name: 'India Map', pinned: true }, { id: 'economy', name: 'Economy Panel', pinned: true },
  { id: 'environment', name: 'Environment Panel', pinned: true }, { id: 'alerts', name: 'Alerts & Disasters', pinned: true },
  { id: 'infrastructure', name: 'Infrastructure', pinned: true }, { id: 'aqi', name: 'AQI Map', pinned: false },
  { id: 'news', name: 'News Ticker', pinned: true }, { id: 'trade', name: 'Trade Heatmap', pinned: false },
  { id: 'startup', name: 'Startup Ecosystem', pinned: false }, { id: 'water', name: 'Water Resources', pinned: false },
  { id: 'climate', name: 'Climate Tracker', pinned: false }, { id: 'railway', name: 'Railway Network', pinned: false },
  { id: 'power', name: 'Power Grid', pinned: false }, { id: 'digital', name: 'Digital India', pinned: false },
]

const CustomDashboard: React.FC = () => {
  const [widgets, setWidgets] = useState(defaultWidgets)
  const toggle = (id: string) => setWidgets(ws => ws.map(w => w.id === id ? { ...w, pinned: !w.pinned } : w))
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-2"><Pin className="h-5 w-5 text-primary" /><h3 className="text-lg font-semibold text-gray-900">Custom Dashboard Layout</h3></div>
      <p className="text-sm text-gray-500">Pin your favorite metrics to the dashboard.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {widgets.map(w => (
          <motion.div key={w.id} whileHover={{ scale: 1.01 }} className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${w.pinned ? 'border-primary bg-blue-50' : 'border-gray-200 bg-white'}`} onClick={() => toggle(w.id)}>
            <GripVertical className="h-4 w-4 text-gray-400" />
            <span className="flex-1 text-sm font-medium text-gray-900">{w.name}</span>
            {w.pinned ? <Eye className="h-4 w-4 text-primary" /> : <EyeOff className="h-4 w-4 text-gray-400" />}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
export default CustomDashboard
