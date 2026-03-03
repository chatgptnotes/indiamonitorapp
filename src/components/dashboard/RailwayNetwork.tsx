import React from 'react'
import { Train } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const zones = [
  { zone: 'Northern', trains: 1850, stations: 892, load: 92 },
  { zone: 'Western', trains: 1620, stations: 756, load: 88 },
  { zone: 'Southern', trains: 1480, stations: 680, load: 82 },
  { zone: 'Eastern', trains: 1350, stations: 620, load: 95 },
  { zone: 'Central', trains: 1200, stations: 580, load: 90 },
  { zone: 'NE Frontier', trains: 680, stations: 420, load: 75 },
]

const RailwayNetwork: React.FC = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-card">
    <h3 className="text-base font-semibold mb-3 flex items-center"><Train className="h-5 w-5 mr-2 text-primary" />Railway Network</h3>
    <div className="grid grid-cols-3 gap-2 mb-3">
      <div className="text-center p-2 bg-blue-50 rounded-lg"><p className="text-lg font-bold text-blue-700">13.5K</p><p className="text-[10px] text-gray-500">Daily Trains</p></div>
      <div className="text-center p-2 bg-green-50 rounded-lg"><p className="text-lg font-bold text-green-700">7,325</p><p className="text-[10px] text-gray-500">Stations</p></div>
      <div className="text-center p-2 bg-amber-50 rounded-lg"><p className="text-lg font-bold text-amber-700">88%</p><p className="text-[10px] text-gray-500">Avg Load</p></div>
    </div>
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={zones}><XAxis dataKey="zone" tick={{ fontSize: 9 }} /><YAxis hide /><Tooltip /><Bar dataKey="trains" fill="#1E40AF" radius={[4,4,0,0]} name="Daily Trains" /></BarChart>
    </ResponsiveContainer>
  </div>
)
export default RailwayNetwork
