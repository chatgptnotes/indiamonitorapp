import React from 'react'
import { Droplets } from 'lucide-react'

const reservoirs = [
  { name: 'Bhakra', level: 78, state: 'Punjab' }, { name: 'Koyna', level: 65, state: 'Maharashtra' },
  { name: 'Nagarjuna Sagar', level: 52, state: 'Telangana' }, { name: 'Hirakud', level: 71, state: 'Odisha' },
  { name: 'Mettur', level: 45, state: 'Tamil Nadu' }, { name: 'Sardar Sarovar', level: 82, state: 'Gujarat' },
]

const getLevelColor = (l: number) => l > 70 ? 'bg-blue-500' : l > 50 ? 'bg-blue-400' : l > 30 ? 'bg-amber-500' : 'bg-red-500'

const WaterResources: React.FC = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-card">
    <h3 className="text-base font-semibold mb-3 flex items-center"><Droplets className="h-5 w-5 mr-2 text-blue-500" />Water Resources</h3>
    <div className="grid grid-cols-3 gap-2 mb-3">
      <div className="text-center p-2 bg-blue-50 rounded-lg"><p className="text-lg font-bold text-blue-700">62%</p><p className="text-[10px] text-gray-500">Reservoir Level</p></div>
      <div className="text-center p-2 bg-amber-50 rounded-lg"><p className="text-lg font-bold text-amber-700">-18%</p><p className="text-[10px] text-gray-500">Groundwater</p></div>
      <div className="text-center p-2 bg-red-50 rounded-lg"><p className="text-lg font-bold text-red-700">42</p><p className="text-[10px] text-gray-500">Polluted Rivers</p></div>
    </div>
    <div className="space-y-2">
      {reservoirs.map(r => (
        <div key={r.name} className="flex items-center space-x-2">
          <span className="text-xs text-gray-600 w-24 truncate" title={`${r.name}, ${r.state}`}>{r.name}</span>
          <div className="flex-1 h-3 bg-gray-100 rounded-full"><div className={`h-full rounded-full ${getLevelColor(r.level)}`} style={{ width: `${r.level}%` }} /></div>
          <span className="text-xs font-semibold text-gray-700 w-8">{r.level}%</span>
        </div>
      ))}
    </div>
  </div>
)
export default WaterResources
