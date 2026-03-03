import React from 'react'
import { Wheat, CloudRain, IndianRupee, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line } from 'recharts'
import DashboardLayout from '../components/layout/DashboardLayout'

const crops = [
  { crop: 'Rice', production: 130, msp: 2183 }, { crop: 'Wheat', production: 112, msp: 2275 },
  { crop: 'Sugarcane', production: 450, msp: 315 }, { crop: 'Cotton', production: 34, msp: 6620 },
  { crop: 'Pulses', production: 27, msp: 6600 }, { crop: 'Oilseeds', production: 40, msp: 5650 },
]
const rainfall = [
  { month: 'Jun', actual: 165, normal: 170 }, { month: 'Jul', actual: 285, normal: 310 },
  { month: 'Aug', actual: 260, normal: 275 }, { month: 'Sep', actual: 170, normal: 190 },
  { month: 'Oct', actual: 80, normal: 75 },
]
const inflation = [
  { month: 'Sep', food: 9.2, overall: 5.0 }, { month: 'Oct', food: 10.8, overall: 5.5 },
  { month: 'Nov', food: 8.7, overall: 4.8 }, { month: 'Dec', food: 7.6, overall: 4.6 },
  { month: 'Jan', food: 8.3, overall: 4.9 }, { month: 'Feb', food: 7.1, overall: 4.5 },
]

const Agriculture: React.FC = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center"><Wheat className="h-6 w-6 mr-2 text-amber-600" />Agriculture Dashboard</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{ l: 'Foodgrain Output', v: '330 MT', i: Wheat, c: 'text-amber-600' }, { l: 'Monsoon Status', v: '-8% Deficit', i: CloudRain, c: 'text-blue-600' }, { l: 'Food Inflation', v: '7.1%', i: IndianRupee, c: 'text-red-500' }, { l: 'Agri GDP Share', v: '15.2%', i: TrendingUp, c: 'text-green-600' }].map(s => { const Icon = s.i; return (
          <div key={s.l} className="bg-white rounded-xl border border-gray-200 p-4 shadow-card"><Icon className={`h-8 w-8 ${s.c} mb-2`} /><p className="text-2xl font-bold text-gray-900">{s.v}</p><p className="text-sm text-gray-500">{s.l}</p></div>
        )})}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Crop Production (MT)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={crops}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="crop" tick={{ fontSize: 11 }} /><YAxis /><Tooltip /><Bar dataKey="production" fill="#F59E0B" radius={[4,4,0,0]} /></BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Rainfall: Actual vs Normal (mm)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={rainfall}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Area type="monotone" dataKey="normal" fill="#93C5FD" stroke="#3B82F6" fillOpacity={0.3} /><Area type="monotone" dataKey="actual" fill="#10B981" stroke="#059669" fillOpacity={0.3} /></AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Food vs Overall Inflation (%)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={inflation}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Line type="monotone" dataKey="food" stroke="#EF4444" strokeWidth={2} name="Food" /><Line type="monotone" dataKey="overall" stroke="#1E40AF" strokeWidth={2} name="Overall" /></LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </DashboardLayout>
)
export default Agriculture
