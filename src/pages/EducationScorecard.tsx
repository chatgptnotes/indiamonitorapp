import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, BookOpen, Award, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import DashboardLayout from '../components/layout/DashboardLayout'

const literacyData = [
  { state: 'Kerala', rate: 94 }, { state: 'Delhi', rate: 88 }, { state: 'Maharashtra', rate: 82 },
  { state: 'TN', rate: 80 }, { state: 'Gujarat', rate: 78 }, { state: 'Karnataka', rate: 75 },
  { state: 'WB', rate: 76 }, { state: 'UP', rate: 67 }, { state: 'Bihar', rate: 61 },
]

const universities = [
  { name: 'IISc Bangalore', rank: 1, score: 92 }, { name: 'IIT Bombay', rank: 2, score: 89 },
  { name: 'IIT Delhi', rank: 3, score: 87 }, { name: 'IIT Madras', rank: 4, score: 86 },
  { name: 'IIT Kanpur', rank: 5, score: 83 },
]

const stats = [
  { label: 'National Literacy', value: '77.7%', icon: BookOpen, color: 'text-neon-cyan' },
  { label: 'GER Higher Ed', value: '28.4%', icon: GraduationCap, color: 'text-green-600' },
  { label: 'Universities', value: '1,113', icon: Award, color: 'text-purple-600' },
  { label: 'YoY Improvement', value: '+2.1%', icon: TrendingUp, color: 'text-amber-600' },
]

const EducationScorecard: React.FC = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center"><GraduationCap className="h-6 w-6 mr-2 text-neon-cyan" />Education Scorecard</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => { const Icon = s.icon; return (
          <motion.div key={s.label} whileHover={{ y: -2 }} className="bg-cyber-card rounded-xl border border-cyber-border p-4 shadow-card">
            <Icon className={`h-8 w-8 ${s.color} mb-2`} /><p className="text-2xl font-bold text-white">{s.value}</p><p className="text-sm text-gray-500">{s.label}</p>
          </motion.div>
        )})}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-cyber-card rounded-xl border border-cyber-border p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">State-wise Literacy Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={literacyData} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" domain={[0, 100]} /><YAxis dataKey="state" type="category" width={80} tick={{ fontSize: 12 }} /><Tooltip /><Bar dataKey="rate" fill="#00F0FF" radius={[0,4,4,0]} /></BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-cyber-card rounded-xl border border-cyber-border p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Top Universities (NIRF)</h3>
          <div className="space-y-3">
            {universities.map(u => (
              <div key={u.rank} className="flex items-center space-x-4 p-3 bg-cyber-bg rounded-lg">
                <span className="text-2xl font-bold text-neon-cyan w-8">#{u.rank}</span>
                <div className="flex-1"><p className="font-medium text-white">{u.name}</p><div className="w-full h-2 bg-gray-200 rounded-full mt-1"><div className="h-full bg-neon-cyan rounded-full" style={{ width: `${u.score}%` }} /></div></div>
                <span className="text-sm font-semibold text-gray-300">{u.score}/100</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
)
export default EducationScorecard
