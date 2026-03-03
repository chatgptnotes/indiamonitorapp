import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

const data = [
  { age: '0-4', male: -55, female: 50 }, { age: '5-9', male: -58, female: 53 },
  { age: '10-14', male: -62, female: 57 }, { age: '15-19', male: -65, female: 60 },
  { age: '20-24', male: -68, female: 63 }, { age: '25-29', male: -70, female: 65 },
  { age: '30-34', male: -66, female: 62 }, { age: '35-39', male: -58, female: 55 },
  { age: '40-44', male: -50, female: 48 }, { age: '45-49', male: -42, female: 40 },
  { age: '50-54', male: -35, female: 34 }, { age: '55-59', male: -28, female: 27 },
  { age: '60-64', male: -22, female: 22 }, { age: '65-69', male: -16, female: 17 },
  { age: '70-74', male: -10, female: 12 }, { age: '75-79', male: -6, female: 8 },
  { age: '80+', male: -3, female: 5 },
]

const PopulationPyramid: React.FC = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-card">
    <h3 className="text-lg font-semibold mb-2">Population Pyramid (2025 est.)</h3>
    <p className="text-sm text-gray-500 mb-4">Age-gender distribution in millions</p>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} layout="vertical" stackOffset="sign" barGap={0}>
        <CartesianGrid strokeDasharray="3 3" /><XAxis type="number" tickFormatter={(v: number) => `${Math.abs(v)}M`} domain={[-80, 80]} />
        <YAxis dataKey="age" type="category" width={45} tick={{ fontSize: 11 }} /><Tooltip formatter={(v) => [`${Math.abs(v as number)}M`]} />
        <ReferenceLine x={0} stroke="#374151" /><Bar dataKey="male" fill="#3B82F6" name="Male" radius={[4,0,0,4]} /><Bar dataKey="female" fill="#EC4899" name="Female" radius={[0,4,4,0]} />
      </BarChart>
    </ResponsiveContainer>
    <div className="flex justify-center space-x-6 mt-3">
      <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded bg-blue-500" /><span className="text-sm text-gray-600">Male (715M)</span></div>
      <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded bg-pink-500" /><span className="text-sm text-gray-600">Female (713M)</span></div>
    </div>
  </div>
)
export default PopulationPyramid
