import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { GitCompare } from 'lucide-react'
import DashboardLayout from '../components/layout/DashboardLayout'

const states = ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'Gujarat', 'Rajasthan', 'Kerala', 'West Bengal', 'Telangana', 'Andhra Pradesh']

const stateData: Record<string, Record<string, number>> = {
  Maharashtra: { GDP: 92, Literacy: 82, Healthcare: 74, AQI: 55, Infrastructure: 85, Employment: 78 },
  Karnataka: { GDP: 78, Literacy: 75, Healthcare: 71, AQI: 72, Infrastructure: 80, Employment: 75 },
  'Tamil Nadu': { GDP: 80, Literacy: 80, Healthcare: 82, AQI: 68, Infrastructure: 78, Employment: 72 },
  'Uttar Pradesh': { GDP: 65, Literacy: 67, Healthcare: 45, AQI: 30, Infrastructure: 55, Employment: 52 },
  Gujarat: { GDP: 82, Literacy: 78, Healthcare: 68, AQI: 60, Infrastructure: 82, Employment: 76 },
  Rajasthan: { GDP: 58, Literacy: 66, Healthcare: 52, AQI: 58, Infrastructure: 60, Employment: 55 },
  Kerala: { GDP: 62, Literacy: 94, Healthcare: 90, AQI: 80, Infrastructure: 75, Employment: 65 },
  'West Bengal': { GDP: 60, Literacy: 76, Healthcare: 62, AQI: 45, Infrastructure: 58, Employment: 58 },
  Telangana: { GDP: 75, Literacy: 72, Healthcare: 70, AQI: 65, Infrastructure: 78, Employment: 74 },
  'Andhra Pradesh': { GDP: 68, Literacy: 67, Healthcare: 65, AQI: 70, Infrastructure: 68, Employment: 62 },
}

const COLORS = ['#1E40AF', '#10B981', '#F59E0B']

const StateComparison: React.FC = () => {
  const [selected, setSelected] = useState<string[]>(['Maharashtra', 'Karnataka', 'Tamil Nadu'])

  const toggle = (s: string) => {
    if (selected.includes(s)) setSelected(selected.filter(x => x !== s))
    else if (selected.length < 3) setSelected([...selected, s])
  }

  const metrics = ['GDP', 'Literacy', 'Healthcare', 'AQI', 'Infrastructure', 'Employment']
  const barData = metrics.map(m => ({ metric: m, ...Object.fromEntries(selected.map(s => [s, stateData[s]?.[m] || 0])) }))
  const radarData = metrics.map(m => ({ metric: m, ...Object.fromEntries(selected.map(s => [s, stateData[s]?.[m] || 0])) }))

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <GitCompare className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-gray-900">State Comparison</h2>
          <span className="text-sm text-gray-500">Select up to 3 states</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {states.map(s => (
            <button key={s} onClick={() => toggle(s)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${selected.includes(s) ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{s}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl border border-gray-200 p-6 shadow-card">
            <h3 className="text-lg font-semibold mb-4">Metrics Comparison</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={barData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="metric" tick={{ fontSize: 12 }} /><YAxis /><Tooltip />
                {selected.map((s, i) => <Bar key={s} dataKey={s} fill={COLORS[i]} radius={[4,4,0,0]} />)}
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl border border-gray-200 p-6 shadow-card">
            <h3 className="text-lg font-semibold mb-4">Radar Overview</h3>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={radarData}><PolarGrid /><PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} /><PolarRadiusAxis angle={30} domain={[0, 100]} />
                {selected.map((s, i) => <Radar key={s} name={s} dataKey={s} stroke={COLORS[i]} fill={COLORS[i]} fillOpacity={0.15} />)}
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {selected.map((s, i) => (
            <div key={s} className="bg-white rounded-xl border-2 p-4 shadow-card" style={{ borderColor: COLORS[i] }}>
              <h4 className="font-semibold text-lg mb-3" style={{ color: COLORS[i] }}>{s}</h4>
              {metrics.map(m => (
                <div key={m} className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-600">{m}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-100 rounded-full"><div className="h-full rounded-full" style={{ width: `${stateData[s][m]}%`, backgroundColor: COLORS[i] }} /></div>
                    <span className="text-sm font-semibold text-gray-900 w-8 text-right">{stateData[s][m]}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
export default StateComparison
