import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Users, BookOpen, TrendingUp, TrendingDown, Leaf, AlertTriangle, Award, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, ReferenceLine } from 'recharts'
import DashboardLayout from '../components/layout/DashboardLayout'
import Footer from '../components/shared/Footer'
import { useData } from '../contexts/DataContext'

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

const customTooltipStyle = {
  backgroundColor: '#1A1F2E',
  border: '1px solid #2A2F3E',
  borderRadius: '8px',
  fontSize: '12px',
  color: '#E2E8F0',
  boxShadow: '0 0 20px rgba(0,240,255,0.1)'
}

const StateDetail = () => {
  const { stateCode } = useParams()
  const navigate = useNavigate()
  const { states, alerts } = useData()

  const state = states.find(s => s.code === stateCode || s.name === stateCode)
  const stateAlerts = alerts.filter(a => a.state_code === stateCode || a.state_code === state?.code)

  // National averages
  const natAvg = {
    population: states.reduce((s, st) => s + (st.population || 0), 0) / (states.length || 1),
    literacy: states.reduce((s, st) => s + (st.literacy_rate || 0), 0) / (states.filter(s => s.literacy_rate).length || 1),
    gdp: states.reduce((s, st) => s + (st.gdp_billion_usd || 0), 0) / (states.filter(s => s.gdp_billion_usd).length || 1),
    aqi: states.reduce((s, st) => s + (st.aqi_avg || 0), 0) / (states.filter(s => s.aqi_avg).length || 1),
  }

  // Ranks
  const litRank = states.filter(s => s.literacy_rate).sort((a, b) => (b.literacy_rate || 0) - (a.literacy_rate || 0)).findIndex(s => s.code === state?.code || s.name === state?.name) + 1
  const gdpRank = states.filter(s => s.gdp_billion_usd).sort((a, b) => (b.gdp_billion_usd || 0) - (a.gdp_billion_usd || 0)).findIndex(s => s.code === state?.code || s.name === state?.name) + 1

  const economicTrends = [
    { month: 'Jan', gdp: 2.1, employment: 94.2, national: 2.0 },
    { month: 'Feb', gdp: 2.3, employment: 94.8, national: 2.1 },
    { month: 'Mar', gdp: 2.5, employment: 95.1, national: 2.2 },
    { month: 'Apr', gdp: 2.4, employment: 94.9, national: 2.3 },
    { month: 'May', gdp: 2.6, employment: 95.3, national: 2.3 },
    { month: 'Jun', gdp: 2.8, employment: 95.7, national: 2.4 }
  ]

  const aqiTrends = [
    { month: 'Jan', aqi: 156, national: 130 },
    { month: 'Feb', aqi: 142, national: 125 },
    { month: 'Mar', aqi: 128, national: 118 },
    { month: 'Apr', aqi: 134, national: 120 },
    { month: 'May', aqi: 145, national: 128 },
    { month: 'Jun', aqi: state?.aqi_avg || 120, national: 122 }
  ]

  const TrendArrow = ({ value, avg, inverse = false }: { value: number; avg: number; inverse?: boolean }) => {
    const better = inverse ? value < avg : value > avg
    const equal = Math.abs(value - avg) < avg * 0.05
    if (equal) return <Minus className="h-4 w-4 text-gray-500" />
    return better ? <ArrowUpRight className="h-4 w-4 text-neon-green" /> : <ArrowDownRight className="h-4 w-4 text-danger" />
  }

  if (!state) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">State Not Found</h1>
            <p className="text-gray-400 mb-6">The requested state could not be found.</p>
            <button onClick={() => navigate('/dashboard')} className="px-6 py-2 bg-neon-cyan text-cyber-bg rounded-lg hover:shadow-neon-cyan transition-all font-bold">Back to Dashboard</button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
        {/* Header */}
        <motion.div variants={fadeUp} className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-cyber-border/30 rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5 text-gray-400" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white font-mono">{state.name}</h1>
              <p className="text-gray-400">Capital: {state.capital}</p>
            </div>
          </div>
          <div className="text-right flex items-center space-x-3">
            {gdpRank > 0 && gdpRank <= 5 && (
              <div className="flex items-center space-x-1 px-3 py-1 bg-neon-amber/10 border border-neon-amber/20 rounded-full">
                <Award className="h-4 w-4 text-neon-amber" />
                <span className="text-neon-amber text-sm font-mono">Top {gdpRank} GDP</span>
              </div>
            )}
            <div className="text-2xl font-mono font-bold text-neon-cyan neon-text">{state.code}</div>
          </div>
        </motion.div>

        {/* Key Stats with national comparison */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Users, label: 'Population', value: state.population ? (state.population / 1e6).toFixed(1) + 'M' : 'N/A', avg: (natAvg.population / 1e6).toFixed(1) + 'M', raw: state.population || 0, avgRaw: natAvg.population, color: 'neon-cyan', inverse: false },
            { icon: BookOpen, label: 'Literacy Rate', value: state.literacy_rate ? state.literacy_rate.toFixed(1) + '%' : 'N/A', avg: natAvg.literacy.toFixed(1) + '%', raw: state.literacy_rate || 0, avgRaw: natAvg.literacy, color: 'neon-green', inverse: false },
            { icon: TrendingUp, label: 'GDP', value: state.gdp_billion_usd ? '$' + state.gdp_billion_usd.toFixed(1) + 'B' : 'N/A', avg: '$' + natAvg.gdp.toFixed(1) + 'B', raw: state.gdp_billion_usd || 0, avgRaw: natAvg.gdp, color: 'neon-amber', inverse: false },
            { icon: Leaf, label: 'Average AQI', value: state.aqi_avg?.toString() || 'N/A', avg: natAvg.aqi.toFixed(0), raw: state.aqi_avg || 0, avgRaw: natAvg.aqi, color: 'danger', inverse: true },
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeUp} className="cyber-card p-6 text-center">
              <stat.icon className={`h-8 w-8 text-${stat.color} mx-auto mb-3`} />
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl font-mono font-bold text-white">{stat.value}</span>
                {stat.raw > 0 && <TrendArrow value={stat.raw} avg={stat.avgRaw} inverse={stat.inverse} />}
              </div>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              <p className="text-xs text-gray-600 mt-0.5">Nat. avg: {stat.avg}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={fadeUp} className="cyber-card p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center font-mono">
              <TrendingUp className="h-5 w-5 text-neon-cyan mr-2" />Economic Trends
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={economicTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2F3E" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <Tooltip contentStyle={customTooltipStyle} />
                  <Legend />
                  <Line type="monotone" dataKey="gdp" stroke="#00F0FF" strokeWidth={2} dot={{ fill: '#00F0FF', strokeWidth: 2 }} name="State GDP %" />
                  <Line type="monotone" dataKey="national" stroke="#6B7280" strokeWidth={1} strokeDasharray="5 5" dot={false} name="National Avg" />
                  <Line type="monotone" dataKey="employment" stroke="#00FF88" strokeWidth={2} dot={{ fill: '#00FF88', strokeWidth: 2 }} name="Employment %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="cyber-card p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center font-mono">
              <Leaf className="h-5 w-5 text-neon-green mr-2" />Air Quality Trends
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={aqiTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2F3E" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <Tooltip contentStyle={customTooltipStyle} />
                  <Legend />
                  <Bar dataKey="aqi" fill="#FFB800" radius={[4, 4, 0, 0]} name="State AQI" />
                  <Bar dataKey="national" fill="#2A2F3E" radius={[4, 4, 0, 0]} name="National Avg" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Alerts */}
        <motion.div variants={fadeUp} className="cyber-card p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center font-mono">
            <AlertTriangle className="h-5 w-5 text-danger mr-2" />Recent Alerts ({stateAlerts.length})
          </h2>
          {stateAlerts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stateAlerts.slice(0, 4).map((alert) => (
                <div key={alert.id} className={`p-4 rounded-lg border ${alert.severity === 'critical' ? 'border-danger/30 bg-danger/5' : alert.severity === 'warning' ? 'border-neon-amber/30 bg-neon-amber/5' : 'border-neon-cyan/30 bg-neon-cyan/5'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white text-sm">{alert.title}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-mono ${alert.severity === 'critical' ? 'bg-danger/20 text-danger' : alert.severity === 'warning' ? 'bg-neon-amber/20 text-neon-amber' : 'bg-neon-cyan/20 text-neon-cyan'}`}>{alert.severity?.toUpperCase()}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{alert.description}</p>
                  <span className="text-xs text-gray-500">Source: {alert.source || 'Unknown'}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8"><p className="text-gray-500">No recent alerts for this state</p></div>
          )}
        </motion.div>

        {/* Info Cards */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="cyber-card p-6">
            <h3 className="font-semibold text-neon-cyan font-mono mb-3">Geography</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Area:</span><span className="text-gray-300">{state.area_sq_km?.toLocaleString()} km2</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Density:</span><span className="text-gray-300">{state.population && state.area_sq_km ? Math.round(state.population / state.area_sq_km).toLocaleString() + '/km2' : 'N/A'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Region:</span><span className="text-gray-300">{state.region || 'N/A'}</span></div>
            </div>
          </div>
          <div className="cyber-card p-6">
            <h3 className="font-semibold text-neon-cyan font-mono mb-3">Development</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">HDI:</span><span className="text-gray-300">{state.hdi?.toFixed(3) || 'N/A'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Per Capita GDP:</span><span className="text-gray-300">{state.gdp_billion_usd && state.population ? '$' + Math.round((state.gdp_billion_usd * 1e9) / state.population).toLocaleString() : 'N/A'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Literacy Rank:</span><span className="text-gray-300 font-mono">#{litRank || 'N/A'} of {states.length}</span></div>
            </div>
          </div>
          <div className="cyber-card p-6">
            <h3 className="font-semibold text-neon-cyan font-mono mb-3">Key Sectors</h3>
            <div className="space-y-2 text-sm text-gray-400">
              {['Agriculture & Allied', 'Manufacturing', 'Services & IT', 'Tourism', 'Mining & Energy'].map(s => (
                <div key={s} className="flex items-center space-x-2"><span className="h-1.5 w-1.5 bg-neon-cyan rounded-full" /><span>{s}</span></div>
              ))}
            </div>
          </div>
        </motion.div>

        <Footer />
      </motion.div>
    </DashboardLayout>
  )
}

export default StateDetail
