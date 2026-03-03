import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Newspaper, TrendingUp, Cloud, Shield, Cpu } from 'lucide-react'

const headlines = [
  { text: 'GDP growth revised to 7.2% for Q3 FY25', category: 'Economy', icon: TrendingUp },
  { text: 'Delhi AQI crosses 400 mark, emergency measures activated', category: 'Environment', icon: Cloud },
  { text: 'India launches 5G in 500 more cities', category: 'Technology', icon: Cpu },
  { text: 'Monsoon deficit reaches 12% below normal in central India', category: 'Environment', icon: Cloud },
  { text: 'UPI transactions cross 14 billion in February 2026', category: 'Economy', icon: TrendingUp },
  { text: 'Earthquake of 4.2 magnitude reported near Assam border', category: 'Disaster', icon: Shield },
  { text: 'New education policy reaches 85% implementation across states', category: 'Education', icon: Newspaper },
  { text: 'Indian startup funding rebounds with $2.1B in February', category: 'Economy', icon: TrendingUp },
]

const categoryColors: Record<string, string> = {
  Economy: 'text-primary', Environment: 'text-green-600', Technology: 'text-purple-600',
  Disaster: 'text-danger', Education: 'text-amber-600',
}

const NewsTicker: React.FC = () => {
  const [current, setCurrent] = useState(0)
  useEffect(() => { const t = setInterval(() => setCurrent(i => (i + 1) % headlines.length), 4000); return () => clearInterval(t) }, [])
  const h = headlines[current]; const Icon = h.icon
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center space-x-3 shadow-card overflow-hidden">
      <span className="flex items-center space-x-1 bg-danger text-white text-xs font-bold px-2 py-0.5 rounded"><Newspaper className="h-3 w-3" /><span>LIVE</span></span>
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.3 }} className="flex items-center space-x-2 flex-1 min-w-0">
          <Icon className={`h-4 w-4 flex-shrink-0 ${categoryColors[h.category] || 'text-gray-500'}`} />
          <span className={`text-xs font-semibold ${categoryColors[h.category]}`}>{h.category}</span>
          <span className="text-sm text-gray-700 truncate">{h.text}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
export default NewsTicker
