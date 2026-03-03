import React from 'react'
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
  { name: 'IT & BPO', size: 220, fill: '#1E40AF' }, { name: 'Finance', size: 180, fill: '#2563EB' },
  { name: 'Trade', size: 160, fill: '#3B82F6' }, { name: 'Real Estate', size: 140, fill: '#60A5FA' },
  { name: 'Transport', size: 100, fill: '#93C5FD' }, { name: 'Manufacturing', size: 170, fill: '#059669' },
  { name: 'Construction', size: 120, fill: '#10B981' }, { name: 'Mining', size: 60, fill: '#34D399' },
  { name: 'Utilities', size: 40, fill: '#6EE7B7' }, { name: 'Crops', size: 100, fill: '#D97706' },
  { name: 'Livestock', size: 50, fill: '#F59E0B' }, { name: 'Forestry', size: 20, fill: '#FBBF24' },
]

const CustomContent = (props: any) => {
  const { x, y, width, height, name, fill } = props
  if (width < 40 || height < 25) return null
  return (
    <g><rect x={x} y={y} width={width} height={height} fill={fill || '#1E40AF'} stroke="#fff" strokeWidth={2} rx={4} />
      <text x={x+width/2} y={y+height/2} textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize={width<80?9:12} fontWeight="600">{name}</text></g>
  )
}

const GDPTreemap: React.FC = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-card">
    <h3 className="text-lg font-semibold mb-4">GDP by Sector (Treemap)</h3>
    <ResponsiveContainer width="100%" height={350}>
      <Treemap data={data} dataKey="size" aspectRatio={4/3} stroke="#fff" content={<CustomContent />}>
        <Tooltip formatter={(v) => [`$${v}B`, 'Value']} />
      </Treemap>
    </ResponsiveContainer>
    <div className="flex space-x-6 mt-4">
      {[['Services (56%)', '#1E40AF'], ['Industry (28%)', '#059669'], ['Agriculture (16%)', '#D97706']].map(([l, c]) => (
        <div key={l as string} className="flex items-center space-x-2"><div className="w-3 h-3 rounded" style={{ backgroundColor: c as string }} /><span className="text-sm text-gray-600">{l}</span></div>
      ))}
    </div>
  </div>
)
export default GDPTreemap
