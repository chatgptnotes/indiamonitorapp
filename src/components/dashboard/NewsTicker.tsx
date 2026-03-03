import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Newspaper, TrendingUp, Cloud, Shield, Cpu, ChevronDown, ChevronUp } from 'lucide-react'

const headlines = [
  { text: 'GDP growth revised to 7.2% for Q3 FY25', category: 'Economy', icon: TrendingUp, detail: 'The Ministry of Statistics revised Q3 GDP growth upward, driven by strong manufacturing and services output.' },
  { text: 'Delhi AQI crosses 400 mark, emergency measures activated', category: 'Environment', icon: Cloud, detail: 'GRAP Stage IV restrictions imposed. Schools closed, construction halted, odd-even rule for vehicles.' },
  { text: 'India launches 5G in 500 more cities', category: 'Technology', icon: Cpu, detail: 'Jio and Airtel expand 5G coverage to tier-2 and tier-3 cities, reaching 70% urban population.' },
  { text: 'Monsoon deficit reaches 12% below normal in central India', category: 'Environment', icon: Cloud, detail: 'IMD reports below-normal rainfall in Maharashtra, MP, and Chhattisgarh affecting kharif crop.' },
  { text: 'UPI transactions cross 14 billion in February 2026', category: 'Economy', icon: TrendingUp, detail: 'NPCI reports record UPI volumes with transaction value exceeding Rs 22 lakh crore.' },
  { text: 'Earthquake of 4.2 magnitude near Assam border', category: 'Disaster', icon: Shield, detail: 'No casualties reported. NCS monitoring for aftershocks in the northeast region.' },
  { text: 'New education policy reaches 85% implementation', category: 'Education', icon: Newspaper, detail: 'NEP 2020 milestones achieved across 24 states. Focus shifts to vocational training integration.' },
  { text: 'Indian startup funding rebounds with $2.1B in February', category: 'Economy', icon: TrendingUp, detail: 'AI and deeptech startups lead fundraising. 12 new unicorns minted in 2026 so far.' },
]

const categoryColors: Record<string, string> = {
  Economy: 'text-neon-cyan bg-neon-cyan/10 border-neon-cyan/20',
  Environment: 'text-neon-green bg-neon-green/10 border-neon-green/20',
  Technology: 'text-neon-magenta bg-neon-magenta/10 border-neon-magenta/20',
  Disaster: 'text-danger bg-danger/10 border-danger/20',
  Education: 'text-neon-amber bg-neon-amber/10 border-neon-amber/20',
}

const NewsTicker = () => {
  const [current, setCurrent] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || expanded) return
    const t = setInterval(() => setCurrent(i => (i + 1) % headlines.length), 4000)
    return () => clearInterval(t)
  }, [paused, expanded])

  const h = headlines[current]
  const Icon = h.icon
  const colors = categoryColors[h.category] || 'text-gray-400 bg-gray-800 border-gray-700'

  return (
    <div
      className="cyber-card px-4 py-2 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center space-x-3">
        <span className="flex items-center space-x-1 bg-danger/20 text-danger text-xs font-bold px-2 py-0.5 rounded border border-danger/30 flex-shrink-0">
          <span className="h-1.5 w-1.5 bg-danger rounded-full animate-pulse" />
          <span>LIVE</span>
        </span>
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.3 }} className="flex items-center space-x-2 flex-1 min-w-0">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded border flex-shrink-0 ${colors}`}>{h.category}</span>
            <span className="text-sm text-gray-300 truncate">{h.text}</span>
          </motion.div>
        </AnimatePresence>
        <button onClick={() => setExpanded(!expanded)} className="p-1 text-gray-500 hover:text-neon-cyan transition-colors flex-shrink-0">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="text-xs text-gray-500 mt-2 pl-16">{h.detail}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NewsTicker
