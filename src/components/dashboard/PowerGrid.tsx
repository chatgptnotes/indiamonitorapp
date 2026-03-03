import React from 'react'
import { Zap } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const states = [
  { state: 'MH', generation: 145, demand: 138, renewable: 28 },
  { state: 'GJ', generation: 130, demand: 122, renewable: 35 },
  { state: 'TN', generation: 118, demand: 115, renewable: 42 },
  { state: 'KA', generation: 95, demand: 88, renewable: 55 },
  { state: 'RJ', generation: 108, demand: 102, renewable: 62 },
  { state: 'UP', generation: 85, demand: 110, renewable: 12 },
]

const PowerGrid: React.FC = () => (
  <div className="bg-cyber-card rounded-xl border border-cyber-border p-4 shadow-card">
    <h3 className="text-base font-semibold mb-3 flex items-center"><Zap className="h-5 w-5 mr-2 text-amber-500" />Power Grid</h3>
    <div className="grid grid-cols-3 gap-2 mb-3">
      <div className="text-center p-2 bg-yellow-50 rounded-lg"><p className="text-lg font-bold text-yellow-700">412 GW</p><p className="text-[10px] text-gray-500">Capacity</p></div>
      <div className="text-center p-2 bg-green-50 rounded-lg"><p className="text-lg font-bold text-green-700">42%</p><p className="text-[10px] text-gray-500">Renewable</p></div>
      <div className="text-center p-2 bg-red-50 rounded-lg"><p className="text-lg font-bold text-red-700">3.2%</p><p className="text-[10px] text-gray-500">Deficit</p></div>
    </div>
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={states}><XAxis dataKey="state" tick={{ fontSize: 10 }} /><YAxis hide /><Tooltip />
        <Bar dataKey="generation" fill="#00FF88" name="Generation (BU)" radius={[4,4,0,0]} />
        <Bar dataKey="demand" fill="#FF3366" name="Demand (BU)" radius={[4,4,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
)
export default PowerGrid
