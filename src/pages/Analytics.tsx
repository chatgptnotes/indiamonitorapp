import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Activity, 
  Download
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts'
import DashboardLayout from '../components/layout/DashboardLayout'
import GDPTreemap from '../components/analytics/GDPTreemap'
import PopulationPyramid from '../components/analytics/PopulationPyramid'

// Mock data for analytics
const nationalTrends = [
  { month: 'Jan 2024', gdp: 6.2, aqi: 168, population: 1428.6 },
  { month: 'Feb 2024', gdp: 6.4, aqi: 156, population: 1429.2 },
  { month: 'Mar 2024', gdp: 6.3, aqi: 142, population: 1429.8 },
  { month: 'Apr 2024', gdp: 6.5, aqi: 138, population: 1430.4 },
  { month: 'May 2024', gdp: 6.7, aqi: 145, population: 1431.0 },
  { month: 'Jun 2024', gdp: 6.8, aqi: 152, population: 1431.6 }
]

const stateComparison = [
  { state: 'Maharashtra', gdp: 32.4, population: 112.4, aqi: 145 },
  { state: 'Gujarat', gdp: 22.1, population: 60.4, aqi: 134 },
  { state: 'Tamil Nadu', gdp: 23.6, population: 72.1, aqi: 89 },
  { state: 'Karnataka', gdp: 24.5, population: 61.1, aqi: 92 },
  { state: 'Uttar Pradesh', gdp: 21.8, population: 199.8, aqi: 187 },
  { state: 'West Bengal', gdp: 15.2, population: 91.3, aqi: 156 }
]

const sectorBreakdown = [
  { name: 'Services', value: 54.3, color: '#00F0FF' },
  { name: 'Industry', value: 25.8, color: '#00F0FF' },
  { name: 'Agriculture', value: 19.9, color: '#0EA5E9' }
]

const environmentalTrends = [
  { month: 'Jan', forestCover: 24.1, renewableEnergy: 42.5, carbonEmissions: 2.88 },
  { month: 'Feb', forestCover: 24.1, renewableEnergy: 43.2, carbonEmissions: 2.85 },
  { month: 'Mar', forestCover: 24.2, renewableEnergy: 44.1, carbonEmissions: 2.82 },
  { month: 'Apr', forestCover: 24.2, renewableEnergy: 45.3, carbonEmissions: 2.79 },
  { month: 'May', forestCover: 24.3, renewableEnergy: 46.8, carbonEmissions: 2.76 },
  { month: 'Jun', forestCover: 24.3, renewableEnergy: 48.2, carbonEmissions: 2.73 }
]

const Analytics: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'states' | 'sectors' | 'environment'>('overview')
  const [timeRange, setTimeRange] = useState<'1M' | '3M' | '6M' | '1Y'>('6M')

  const tabs = [
    { key: 'overview', label: 'Overview', icon: Activity },
    { key: 'states', label: 'State Comparison', icon: BarChart3 },
    { key: 'sectors', label: 'Sector Analysis', icon: PieChart },
    { key: 'environment', label: 'Environment', icon: TrendingUp }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
            <p className="text-gray-400">Comprehensive insights and trends</p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 bg-cyber-border/30 rounded-lg p-1">
              {['1M', '3M', '6M', '1Y'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range as any)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    timeRange === range
                      ? 'bg-neon-cyan text-white '
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-neon-cyan text-white rounded-lg hover:bg-neon-cyan-dark transition-colors ">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-cyber-border/30 p-1 rounded-lg">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSelectedTab(key as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                selectedTab === key
                  ? 'bg-neon-cyan text-white '
                  : 'text-gray-400 hover:text-white hover:bg-gray-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Content based on selected tab */}
        <div className="space-y-6">
          {selectedTab === 'overview' && (
            <>
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-cyber-card border border-cyber-border rounded-xl p-6 text-center "
                >
                  <TrendingUp className="h-8 w-8 text-neon-cyan mx-auto mb-3" />
                  <div className="text-3xl font-mono font-bold text-white mb-1">6.8%</div>
                  <p className="text-gray-500">GDP Growth Rate</p>
                  <div className="text-sm text-green-600 mt-1">+0.3% from last quarter</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-cyber-card border border-cyber-border rounded-xl p-6 text-center "
                >
                  <BarChart3 className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                  <div className="text-3xl font-mono font-bold text-white mb-1">152</div>
                  <p className="text-gray-500">National Avg AQI</p>
                  <div className="text-sm text-red-600 mt-1">+8 from last month</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-cyber-card border border-cyber-border rounded-xl p-6 text-center "
                >
                  <Activity className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <div className="text-3xl font-mono font-bold text-white mb-1">1.43B</div>
                  <p className="text-gray-500">Population</p>
                  <div className="text-sm text-neon-cyan mt-1">+0.8M monthly growth</div>
                </motion.div>
              </div>

              {/* National Trends Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-cyber-card border border-cyber-border rounded-xl p-6 "
              >
                <h2 className="text-xl font-bold text-white mb-4">National Trends</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={nationalTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2A2F3E" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#6B7280' }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#6B7280' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1A1F2E',
                          border: '1px solid #2A2F3E',
                          borderRadius: '8px',
                          fontSize: '12px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="gdp" 
                        stroke="#00F0FF" 
                        strokeWidth={3}
                        dot={{ fill: '#00F0FF', strokeWidth: 2, r: 4 }}
                        name="GDP Growth (%)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="aqi" 
                        stroke="#FFB800" 
                        strokeWidth={3}
                        dot={{ fill: '#FFB800', strokeWidth: 2, r: 4 }}
                        name="Average AQI"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </>
          )}

          {selectedTab === 'states' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-cyber-card border border-cyber-border rounded-xl p-6 "
            >
              <h2 className="text-xl font-bold text-white mb-4">Top States by GDP</h2>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stateComparison} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2F3E" />
                    <XAxis 
                      type="number"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                    />
                    <YAxis 
                      type="category"
                      dataKey="state"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                      width={100}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1A1F2E',
                        border: '1px solid #2A2F3E',
                        borderRadius: '8px',
                        fontSize: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar 
                      dataKey="gdp" 
                      fill="#00F0FF"
                      radius={[0, 4, 4, 0]}
                      name="GDP (₹ Trillion)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {selectedTab === 'sectors' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-cyber-card border border-cyber-border rounded-xl p-6 "
              >
                <h2 className="text-xl font-bold text-white mb-4">GDP by Sector</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1A1F2E',
                          border: '1px solid #2A2F3E',
                          borderRadius: '8px',
                          fontSize: '12px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Pie
                        data={sectorBreakdown}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={40}
                        strokeWidth={2}
                        stroke="#FFFFFF"
                      >
                        {sectorBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {sectorBreakdown.map((sector) => (
                    <div key={sector.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: sector.color }}
                        />
                        <span className="text-gray-300 text-sm">{sector.name}</span>
                      </div>
                      <span className="text-white font-mono">{sector.value}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-cyber-card border border-cyber-border rounded-xl p-6 "
              >
                <h2 className="text-xl font-bold text-white mb-4">Sector Growth Trends</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Services</span>
                      <span className="text-green-600 text-sm font-medium">+8.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-neon-cyan h-2 rounded-full transition-all duration-700" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Industry</span>
                      <span className="text-green-600 text-sm font-medium">+6.5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full transition-all duration-700" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Agriculture</span>
                      <span className="text-yellow-600 text-sm font-medium">+3.1%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full transition-all duration-700" style={{ width: '31%' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {selectedTab === 'environment' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-cyber-card border border-cyber-border rounded-xl p-6 "
            >
              <h2 className="text-xl font-bold text-white mb-4">Environmental Indicators</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={environmentalTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2F3E" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1A1F2E',
                        border: '1px solid #2A2F3E',
                        borderRadius: '8px',
                        fontSize: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="renewableEnergy" 
                      stackId="1"
                      stroke="#00FF88" 
                      fill="#00FF88"
                      fillOpacity={0.3}
                      name="Renewable Energy (%)"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="forestCover" 
                      stackId="2"
                      stroke="#00F0FF" 
                      fill="#00F0FF"
                      fillOpacity={0.3}
                      name="Forest Cover (%)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}
        </div>
      </div>
        {/* GDP Treemap & Population Pyramid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <GDPTreemap />
          <PopulationPyramid />
        </div>
    </DashboardLayout>
  )
}

export default Analytics