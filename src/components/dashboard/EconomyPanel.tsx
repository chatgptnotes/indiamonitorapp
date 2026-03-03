import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useData } from '../../contexts/DataContext'

interface MarketData {
  sensex: number
  nifty: number
  inrUsd: number
  gdpGrowth: number
  change: {
    sensex: number
    nifty: number
    inrUsd: number
  }
}

const sectorData = [
  { name: 'IT', value: 28.5, color: '#1E40AF' },
  { name: 'Banking', value: 24.2, color: '#3B82F6' },
  { name: 'Pharma', value: 18.7, color: '#0EA5E9' },
  { name: 'Auto', value: 15.3, color: '#F59E0B' },
  { name: 'Energy', value: 13.3, color: '#16A34A' }
]

const EconomyPanel: React.FC = () => {
  const { } = useData()
  const [marketData, setMarketData] = useState<MarketData>({
    sensex: 73847.35,
    nifty: 22327.85,
    inrUsd: 83.47,
    gdpGrowth: 6.7,
    change: {
      sensex: 0,
      nifty: 0,
      inrUsd: 0
    }
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => ({
        ...prev,
        sensex: prev.sensex + (Math.random() - 0.5) * 100,
        nifty: prev.nifty + (Math.random() - 0.5) * 30,
        inrUsd: prev.inrUsd + (Math.random() - 0.5) * 0.1,
        change: {
          sensex: (Math.random() - 0.5) * 2,
          nifty: (Math.random() - 0.5) * 2,
          inrUsd: (Math.random() - 0.5) * 0.5
        }
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }).format(value)
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600'
    if (change < 0) return 'text-red-600'
    return 'text-gray-500'
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4" />
    if (change < 0) return <TrendingDown className="h-4 w-4" />
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white border border-gray-200 rounded-xl p-6 h-full flex flex-col shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900 flex items-center">
          <BarChart3 className="h-5 w-5 text-primary mr-2" />
          Economy
        </h2>
        <div className="flex items-center space-x-1 text-xs">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-gray-500">Live</span>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto">
        {/* Market Indices */}
        <div className="space-y-3">
          {/* BSE Sensex */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">BSE Sensex</span>
              <div className={`flex items-center space-x-1 text-sm font-medium ${getChangeColor(marketData.change.sensex)}`}>
                {getChangeIcon(marketData.change.sensex)}
                <span>{marketData.change.sensex > 0 ? '+' : ''}{marketData.change.sensex.toFixed(2)}%</span>
              </div>
            </div>
            <div className="text-2xl font-mono font-bold text-gray-900">
              {formatCurrency(marketData.sensex)}
            </div>
          </div>

          {/* NSE Nifty */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">NSE Nifty</span>
              <div className={`flex items-center space-x-1 text-sm font-medium ${getChangeColor(marketData.change.nifty)}`}>
                {getChangeIcon(marketData.change.nifty)}
                <span>{marketData.change.nifty > 0 ? '+' : ''}{marketData.change.nifty.toFixed(2)}%</span>
              </div>
            </div>
            <div className="text-2xl font-mono font-bold text-gray-900">
              {formatCurrency(marketData.nifty)}
            </div>
          </div>

          {/* INR/USD */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">INR/USD</span>
              <div className={`flex items-center space-x-1 text-sm font-medium ${getChangeColor(marketData.change.inrUsd)}`}>
                {getChangeIcon(marketData.change.inrUsd)}
                <span>{marketData.change.inrUsd > 0 ? '+' : ''}{marketData.change.inrUsd.toFixed(2)}%</span>
              </div>
            </div>
            <div className="text-2xl font-mono font-bold text-gray-900">
              ₹{marketData.inrUsd.toFixed(2)}
            </div>
          </div>
        </div>

        {/* GDP Growth */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">GDP Growth Rate</span>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </div>
          <div className="text-2xl font-mono font-bold text-green-600">
            {marketData.gdpGrowth.toFixed(1)}%
          </div>
          <p className="text-xs text-gray-500 mt-1">YoY Growth</p>
        </div>

        {/* Sector Breakdown */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Sector Performance</h3>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#64748B' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#64748B' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#1E40AF"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
            <DollarSign className="h-6 w-6 text-primary mx-auto mb-1" />
            <div className="text-lg font-mono font-bold text-gray-900">₹3.7T</div>
            <p className="text-xs text-gray-500">Market Cap</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
            <BarChart3 className="h-6 w-6 text-green-600 mx-auto mb-1" />
            <div className="text-lg font-mono font-bold text-gray-900">2.4M</div>
            <p className="text-xs text-gray-500">Daily Volume</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default EconomyPanel