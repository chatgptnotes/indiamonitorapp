import React from 'react'
import { motion } from 'framer-motion'
import { Vote, Calendar } from 'lucide-react'
import DashboardLayout from '../components/layout/DashboardLayout'

const partyColors: Record<string, string> = { BJP: 'bg-orange-500', INC: 'bg-blue-500', AAP: 'bg-teal-500', TMC: 'bg-green-600', DMK: 'bg-red-600', BRS: 'bg-pink-500', BJD: 'bg-emerald-500', YSRCP: 'bg-blue-700', LDF: 'bg-red-500', JDU: 'bg-green-500' }
const stateParties = [
  { state: 'Uttar Pradesh', party: 'BJP', seats: 403, won: 255 },
  { state: 'Maharashtra', party: 'BJP', seats: 288, won: 132 },
  { state: 'West Bengal', party: 'TMC', seats: 294, won: 215 },
  { state: 'Tamil Nadu', party: 'DMK', seats: 234, won: 133 },
  { state: 'Karnataka', party: 'INC', seats: 224, won: 135 },
  { state: 'Kerala', party: 'LDF', seats: 140, won: 99 },
  { state: 'Telangana', party: 'INC', seats: 119, won: 64 },
  { state: 'Bihar', party: 'JDU', seats: 243, won: 115 },
  { state: 'Gujarat', party: 'BJP', seats: 182, won: 156 },
  { state: 'Rajasthan', party: 'BJP', seats: 200, won: 115 },
]
const upcoming = [
  { state: 'Delhi', date: 'Feb 2025', type: 'Assembly' },
  { state: 'Bihar', date: 'Oct 2025', type: 'Assembly' },
  { state: 'West Bengal', date: '2026', type: 'Assembly' },
]

const ElectionMap: React.FC = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center"><Vote className="h-6 w-6 mr-2 text-primary" />Election Map</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">State Ruling Parties</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {stateParties.map(s => (
              <motion.div key={s.state} whileHover={{ scale: 1.02 }} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className={`w-4 h-4 rounded-full ${partyColors[s.party] || 'bg-gray-400'}`} />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{s.state}</p>
                  <p className="text-xs text-gray-500">{s.party} - {s.won}/{s.seats} seats</p>
                </div>
                <div className="w-16 h-2 bg-gray-200 rounded-full"><div className={`h-full rounded-full ${partyColors[s.party] || 'bg-gray-400'}`} style={{ width: `${(s.won/s.seats)*100}%` }} /></div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center"><Calendar className="h-5 w-5 mr-2 text-primary" />Upcoming Elections</h3>
            {upcoming.map(u => (
              <div key={u.state} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0">
                <div><p className="font-medium text-gray-900">{u.state}</p><p className="text-xs text-gray-500">{u.type}</p></div>
                <span className="text-sm font-semibold text-primary">{u.date}</span>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-card">
            <h3 className="text-lg font-semibold mb-3">Party Legend</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(partyColors).map(([p, c]) => (
                <div key={p} className="flex items-center space-x-2"><div className={`w-3 h-3 rounded-full ${c}`} /><span className="text-sm text-gray-700">{p}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
)
export default ElectionMap
