import { useState, useEffect, useRef } from 'react'
import { Search, X, MapPin, BarChart3, Activity } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const allItems = [
  // States
  ...['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'].map(name => ({
    type: 'state' as const, name, icon: MapPin, path: `/state/${name}`
  })),
  // Sections
  { type: 'section' as const, name: 'Economy & GDP', icon: BarChart3, path: '/dashboard' },
  { type: 'section' as const, name: 'Healthcare Indicators', icon: Activity, path: '/healthcare' },
  { type: 'section' as const, name: 'Education Scorecard', icon: BarChart3, path: '/education' },
  { type: 'section' as const, name: 'Crime Statistics', icon: BarChart3, path: '/crime' },
  { type: 'section' as const, name: 'Agriculture', icon: BarChart3, path: '/agriculture' },
  { type: 'section' as const, name: 'Elections', icon: BarChart3, path: '/elections' },
  { type: 'section' as const, name: 'Analytics', icon: BarChart3, path: '/analytics' },
  { type: 'section' as const, name: 'Compare States', icon: BarChart3, path: '/compare' },
]

interface Props { isOpen: boolean; onClose: () => void }

const GlobalSearch = ({ isOpen, onClose }: Props) => {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => { if (isOpen) { setQuery(''); setTimeout(() => inputRef.current?.focus(), 100) } }, [isOpen])

  const filtered = query.length > 0 ? allItems.filter(item => item.name.toLowerCase().includes(query.toLowerCase())) : []

  const handleSelect = (path: string) => { navigate(path); onClose() }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh]"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="relative w-full max-w-xl mx-4 bg-cyber-card border border-cyber-border rounded-xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center px-4 border-b border-cyber-border">
              <Search className="h-5 w-5 text-neon-cyan" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search states, metrics, sections..."
                className="flex-1 bg-transparent text-white px-3 py-4 outline-none placeholder-gray-500"
              />
              <button onClick={onClose} className="p-1 text-gray-500 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            {filtered.length > 0 && (
              <div className="max-h-80 overflow-y-auto p-2">
                {filtered.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(item.path)}
                    className="flex items-center space-x-3 w-full px-3 py-2.5 text-left text-gray-300 hover:text-neon-cyan hover:bg-cyber-border/30 rounded-lg transition-colors"
                  >
                    <item.icon className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500 capitalize">{item.type}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {query.length > 0 && filtered.length === 0 && (
              <div className="p-8 text-center text-gray-500 text-sm">No results found</div>
            )}
            <div className="px-4 py-2 border-t border-cyber-border flex items-center justify-between text-xs text-gray-600">
              <span>Press S to open search</span>
              <span>ESC to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default GlobalSearch
