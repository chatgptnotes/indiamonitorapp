import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Users, Building2, Activity } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import DashboardLayout from '../components/layout/DashboardLayout'

const stateHealth = [
  { state: 'Kerala', beds: 2.5, doctors: 1.2 }, { state: 'TN', beds: 1.8, doctors: 0.9 },
  { state: 'Maharashtra', beds: 1.5, doctors: 0.8 }, { state: 'Karnataka', beds: 1.4, doctors: 0.7 },
  { state: 'UP', beds: 0.5, doctors: 0.3 }, { state: 'Bihar', beds: 0.3, doctors: 0.2 },
]
const diseaseData = [
  { month: 'Jan', dengue: 4200, malaria: 3100, covid: 1200 },
  { month: 'Feb', dengue: 3800, malaria: 2800, covid: 900 },
  { month: 'Mar', dengue: 3200, malaria: 2500, covid: 700 },
  { month: 'Apr', dengue: 5100, malaria: 3500, covid: 500 },
  { month: 'May', dengue: 6800, malaria: 4200, covid: 400 },
  { month: 'Jun', dengue: 8200, malaria: 5800, covid: 350 },
]
const stats = [
  { label: 'Hospital Beds', value: '1.9M', sub: '1.4 per 1000', icon: Building2, color: 'text-neon-cyan' },
  { label: 'Doctors', value: '1.3M', sub: '0.9 per 1000', icon: Users, color: 'text-green-600' },
  { label: 'Life Expectancy', value: '70.2 yrs', sub: '+0.4 YoY', icon: Heart, color: 'text-red-500' },
  { label: 'Health Spend', value: '2.1% GDP', sub: 'Target: 2.5%', icon: Activity, color: 'text-purple-600' },
]

const HealthcareIndicators: React.FC = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center"><Heart className="h-6 w-6 mr-2 text-red-500" />Healthcare Indicators</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => { const Icon = s.icon; return (
          <motion.div key={s.label} whileHover={{ y: -2 }} className="bg-cyber-card rounded-xl border border-cyber-border p-4 shadow-card">
            <Icon className={`h-8 w-8 ${s.color} mb-2`} /><p className="text-2xl font-bold text-white">{s.value}</p><p className="text-sm text-gray-500">{s.label}</p><p className="text-xs text-gray-400">{s.sub}</p>
          </motion.div>
        )})}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-cyber-card rounded-xl border border-cyber-border p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Beds & Doctors per 1000</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stateHealth}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="state" /><YAxis /><Tooltip /><Bar dataKey="beds" fill="#00F0FF" name="Beds/1000" /><Bar dataKey="doctors" fill="#00FF88" name="Doctors/1000" /></BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-cyber-card rounded-xl border border-cyber-border p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Disease Surveillance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={diseaseData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Line type="monotone" dataKey="dengue" stroke="#FF3366" strokeWidth={2} /><Line type="monotone" dataKey="malaria" stroke="#FFB800" strokeWidth={2} /><Line type="monotone" dataKey="covid" stroke="#8B5CF6" strokeWidth={2} /></LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </DashboardLayout>
)
export default HealthcareIndicators
