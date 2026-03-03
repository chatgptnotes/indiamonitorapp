import React from 'react'
import { Rocket } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const fundingTrends = [
  { quarter: 'Q1\'24', amount: 3.2 }, { quarter: 'Q2\'24', amount: 4.1 },
  { quarter: 'Q3\'24', amount: 3.8 }, { quarter: 'Q4\'24', amount: 5.2 },
  { quarter: 'Q1\'25', amount: 4.5 }, { quarter: 'Q2\'25', amount: 6.1 },
]
const unicorns = [
  { city: 'Bangalore', count: 52 }, { city: 'Delhi NCR', count: 28 },
  { city: 'Mumbai', count: 22 }, { city: 'Pune', count: 8 }, { city: 'Chennai', count: 6 },
]
const maxCount = 52

const StartupEcosystem: React.FC = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-card">
    <h3 className="text-lg font-semibold mb-3 flex items-center"><Rocket className="h-5 w-5 mr-2 text-purple-600" />Startup Ecosystem</h3>
    <div className="grid grid-cols-3 gap-2 mb-4">
      <div className="text-center p-2 bg-purple-50 rounded-lg"><p className="text-xl font-bold text-purple-700">116</p><p className="text-xs text-gray-500">Unicorns</p></div>
      <div className="text-center p-2 bg-green-50 rounded-lg"><p className="text-xl font-bold text-green-700">$6.1B</p><p className="text-xs text-gray-500">Q2 Funding</p></div>
      <div className="text-center p-2 bg-blue-50 rounded-lg"><p className="text-xl font-bold text-blue-700">99K+</p><p className="text-xs text-gray-500">Startups</p></div>
    </div>
    <ResponsiveContainer width="100%" height={120}>
      <AreaChart data={fundingTrends}><XAxis dataKey="quarter" tick={{ fontSize: 10 }} /><YAxis hide /><Tooltip /><Area type="monotone" dataKey="amount" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} name="Funding ($B)" /></AreaChart>
    </ResponsiveContainer>
    <div className="mt-3 space-y-1.5">
      {unicorns.map(u => (
        <div key={u.city} className="flex items-center space-x-2">
          <span className="text-xs text-gray-600 w-20">{u.city}</span>
          <div className="flex-1 h-3 bg-gray-100 rounded-full"><div className="h-full bg-purple-500 rounded-full" style={{ width: `${(u.count/maxCount)*100}%` }} /></div>
          <span className="text-xs font-semibold text-gray-700 w-6">{u.count}</span>
        </div>
      ))}
    </div>
  </div>
)
export default StartupEcosystem
