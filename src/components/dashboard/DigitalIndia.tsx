import React from 'react'
import { Wifi, Smartphone, CreditCard, GraduationCap } from 'lucide-react'
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts'

const upiData = [
  { month: 'Sep', txns: 11.2 }, { month: 'Oct', txns: 12.1 }, { month: 'Nov', txns: 11.8 },
  { month: 'Dec', txns: 13.5 }, { month: 'Jan', txns: 14.1 }, { month: 'Feb', txns: 14.8 },
]

const DigitalIndia: React.FC = () => (
  <div className="bg-cyber-card rounded-xl border border-cyber-border p-4 shadow-card">
    <h3 className="text-base font-semibold mb-3 flex items-center"><Wifi className="h-5 w-5 mr-2 text-neon-cyan" />Digital India</h3>
    <div className="grid grid-cols-2 gap-2 mb-3">
      {[{ l: 'Broadband', v: '920M', i: Wifi, c: 'text-blue-600 bg-blue-50' }, { l: 'UPI/month', v: '14.8B', i: CreditCard, c: 'text-green-600 bg-green-50' },
        { l: 'Smartphones', v: '750M', i: Smartphone, c: 'text-purple-600 bg-purple-50' }, { l: 'Digital Lit.', v: '48%', i: GraduationCap, c: 'text-amber-600 bg-amber-50' }
      ].map(s => { const Icon = s.i; return (
        <div key={s.l} className={`p-2 rounded-lg ${s.c.split(' ')[1]}`}>
          <Icon className={`h-4 w-4 ${s.c.split(' ')[0]} mb-1`} /><p className="text-lg font-bold text-white">{s.v}</p><p className="text-[10px] text-gray-500">{s.l}</p>
        </div>
      )})}
    </div>
    <p className="text-xs text-gray-500 mb-1">UPI Transactions (Billions)</p>
    <ResponsiveContainer width="100%" height={100}>
      <AreaChart data={upiData}><XAxis dataKey="month" tick={{ fontSize: 9 }} /><Tooltip /><Area type="monotone" dataKey="txns" stroke="#00F0FF" fill="#00F0FF" fillOpacity={0.15} name="Txns (B)" /></AreaChart>
    </ResponsiveContainer>
  </div>
)
export default DigitalIndia
