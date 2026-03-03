import React from 'react'
import { Thermometer } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

const tempAnomaly = [
  { year: '2015', anomaly: 0.42 }, { year: '2016', anomaly: 0.71 }, { year: '2017', anomaly: 0.38 },
  { year: '2018', anomaly: 0.45 }, { year: '2019', anomaly: 0.52 }, { year: '2020', anomaly: 0.58 },
  { year: '2021', anomaly: 0.48 }, { year: '2022', anomaly: 0.63 }, { year: '2023', anomaly: 0.78 },
  { year: '2024', anomaly: 0.85 }, { year: '2025', anomaly: 0.92 },
]

const extremeEvents = [
  { type: 'Heat Waves', count: 28, trend: '+40%' },
  { type: 'Heavy Rainfall', count: 45, trend: '+25%' },
  { type: 'Cyclones', count: 6, trend: '+15%' },
  { type: 'Droughts', count: 12, trend: '+10%' },
]

const ClimateTracker: React.FC = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-card">
    <h3 className="text-base font-semibold mb-3 flex items-center"><Thermometer className="h-5 w-5 mr-2 text-red-500" />Climate Tracker</h3>
    <p className="text-xs text-gray-500 mb-2">Temperature Anomaly (C above baseline)</p>
    <ResponsiveContainer width="100%" height={150}>
      <LineChart data={tempAnomaly}><XAxis dataKey="year" tick={{ fontSize: 9 }} /><YAxis tick={{ fontSize: 9 }} domain={[0, 1.2]} /><Tooltip />
        <ReferenceLine y={0.5} stroke="#EF4444" strokeDasharray="3 3" label={{ value: 'Alert', fontSize: 9 }} />
        <Line type="monotone" dataKey="anomaly" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} name="Anomaly (C)" />
      </LineChart>
    </ResponsiveContainer>
    <div className="mt-3 space-y-1.5">
      {extremeEvents.map(e => (
        <div key={e.type} className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{e.type}</span>
          <div className="flex items-center space-x-2"><span className="font-semibold text-gray-900">{e.count}</span><span className="text-xs text-red-500">{e.trend}</span></div>
        </div>
      ))}
    </div>
  </div>
)
export default ClimateTracker
