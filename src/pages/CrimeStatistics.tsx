import React from 'react'
import { ShieldAlert, TrendingDown, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import DashboardLayout from '../components/layout/DashboardLayout'

const stateData = [
  { state: 'UP', rate: 358 }, { state: 'Maharashtra', rate: 312 }, { state: 'MP', rate: 298 },
  { state: 'Kerala', rate: 285 }, { state: 'Rajasthan', rate: 275 }, { state: 'TN', rate: 252 },
  { state: 'Bihar', rate: 198 }, { state: 'Gujarat', rate: 185 },
]
const categories = [
  { name: 'Theft', value: 28 }, { name: 'Assault', value: 22 }, { name: 'Fraud', value: 18 },
  { name: 'Cyber Crime', value: 15 }, { name: 'Domestic', value: 10 }, { name: 'Other', value: 7 },
]
const trends = [
  { year: '2020', total: 66, cyber: 8 }, { year: '2021', total: 61, cyber: 12 },
  { year: '2022', total: 58, cyber: 17 }, { year: '2023', total: 55, cyber: 22 },
  { year: '2024', total: 53, cyber: 28 }, { year: '2025', total: 51, cyber: 34 },
]
const COLORS = ['#1E40AF', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#6B7280']

const CrimeStatistics: React.FC = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center"><ShieldAlert className="h-6 w-6 mr-2 text-danger" />Crime Statistics</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{ l: 'Crime Rate', v: '55.8L', d: 'Total cases 2025', up: false }, { l: 'Cyber Crime', v: '+34%', d: 'YoY increase', up: true }, { l: 'Conviction Rate', v: '52.4%', d: '+2.1% from 2024', up: true }, { l: 'Pending Cases', v: '4.7Cr', d: 'In courts', up: true }].map(s => (
          <div key={s.l} className="bg-white rounded-xl border border-gray-200 p-4 shadow-card">
            <p className="text-2xl font-bold text-gray-900">{s.v}</p><p className="text-sm text-gray-500">{s.l}</p><p className="text-xs text-gray-400 flex items-center">{s.up ? <TrendingUp className="h-3 w-3 mr-1 text-red-500" /> : <TrendingDown className="h-3 w-3 mr-1 text-green-500" />}{s.d}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">By Category (%)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart><Pie data={categories} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
              {categories.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie><Tooltip /></PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">State Crime Rate (per Lakh)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stateData} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis dataKey="state" type="category" width={90} /><Tooltip /><Bar dataKey="rate" fill="#EF4444" radius={[0,4,4,0]} /></BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Crime vs Cyber Crime Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trends}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" /><YAxis /><Tooltip /><Line type="monotone" dataKey="total" stroke="#1E40AF" name="Total (Lakhs)" /><Line type="monotone" dataKey="cyber" stroke="#EF4444" name="Cyber (Lakhs)" /></LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </DashboardLayout>
)
export default CrimeStatistics
