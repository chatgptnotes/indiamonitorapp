import React from 'react'
import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'

const partners = [
  { country: 'USA', exports: 78, imports: 42, total: 120, flag: '🇺🇸' },
  { country: 'China', exports: 16, imports: 94, total: 110, flag: '🇨🇳' },
  { country: 'UAE', exports: 35, imports: 48, total: 83, flag: '🇦🇪' },
  { country: 'Saudi Arabia', exports: 8, imports: 42, total: 50, flag: '🇸🇦' },
  { country: 'Germany', exports: 12, imports: 15, total: 27, flag: '🇩🇪' },
  { country: 'Singapore', exports: 14, imports: 18, total: 32, flag: '🇸🇬' },
  { country: 'Japan', exports: 6, imports: 16, total: 22, flag: '🇯🇵' },
  { country: 'UK', exports: 12, imports: 8, total: 20, flag: '🇬🇧' },
]

const TradeHeatmap: React.FC = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-card">
    <h3 className="text-lg font-semibold mb-3 flex items-center"><Globe className="h-5 w-5 mr-2 text-primary" />Trade Partners ($B)</h3>
    <div className="space-y-2">
      {partners.map(p => (
        <motion.div key={p.country} whileHover={{ x: 4 }} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
          <span className="text-lg">{p.flag}</span>
          <span className="text-sm font-medium text-gray-900 w-24 truncate">{p.country}</span>
          <div className="flex-1 flex space-x-1">
            <div className="h-5 bg-green-400 rounded-l" style={{ width: `${(p.exports/120)*100}%` }} title={`Export: $${p.exports}B`} />
            <div className="h-5 bg-red-400 rounded-r" style={{ width: `${(p.imports/120)*100}%` }} title={`Import: $${p.imports}B`} />
          </div>
          <span className="text-xs text-gray-500 w-12 text-right">${p.total}B</span>
        </motion.div>
      ))}
    </div>
    <div className="flex space-x-4 mt-3 text-xs text-gray-500">
      <span className="flex items-center"><div className="w-3 h-3 bg-green-400 rounded mr-1" />Exports</span>
      <span className="flex items-center"><div className="w-3 h-3 bg-red-400 rounded mr-1" />Imports</span>
    </div>
  </div>
)
export default TradeHeatmap
