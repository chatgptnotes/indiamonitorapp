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
  { name: 'IT', value: 28.5, color: '#00D4FF' },
  { name: 'Banking', value: 24.2, color: '#00FF88' },
  { name: 'Pharma', value: 18.7, color: '#FFB800' },
  { name: 'Auto', value: 15.3, color: '#FF3366' },
  { name: 'Energy', value: 13.3, color: '#9B59B6' }
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
    if (change > 0) return 'text-neon-green'
    if (change < 0) return 'text-alert-red'
    return 'text-gray-400'
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
      className="bg-deep-navy/30 backdrop-blur-xl border border-electric-blue/30 rounded-lg p-4 h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white flex items-center">
          <BarChart3 className="h-5 w-5 text-electric-blue mr-2" />
          Economy
        </h2>
        <div className="flex items-center space-x-1 text-xs">
          <div className="h-2 w-2 bg-neon-green rounded-full animate-pulse"></div>
          <span className="text-gray-400">Live</span>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto">
        {/* Market Indices */}
        <div className="space-y-3">
          {/* BSE Sensex */}
          <div className="bg-electric-blue/5 border border-electric-blue/20 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-300">BSE Sensex</span>
              <div className={`flex items-center space-x-1 text-sm ${getChangeColor(marketData.change.sensex)}`}>
                {getChangeIcon(marketData.change.sensex)}
                <span>{marketData.change.sensex > 0 ? '+' : ''}{marketData.change.sensex.toFixed(2)}%</span>
              </div>
            </div>
            <div className="text-2xl font-mono font-bold text-white">
              {formatCurrency(marketData.sensex)}
            </div>
          </div>

          {/* NSE Nifty */}
          <div className="bg-neon-green/5 border border-neon-green/20 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-300">NSE Nifty</span>
              <div className={`flex items-center space-x-1 text-sm ${getChangeColor(marketData.change.nifty)}`}>
                {getChangeIcon(marketData.change.nifty)}
                <span>{marketData.change.nifty > 0 ? '+' : ''}{marketData.change.nifty.toFixed(2)}%</span>
              </div>
            </div>
            <div className="text-2xl font-mono font-bold text-white">
              {formatCurrency(marketData.nifty)}
            </div>
          </div>

          {/* INR/USD */}
          <div className="bg-amber/5 border border-amber/20 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-300">INR/USD</span>
              <div className={`flex items-center space-x-1 text-sm ${getChangeColor(marketData.change.inrUsd)}`}>
                {getChangeIcon(marketData.change.inrUsd)}
                <span>{marketData.change.inrUsd > 0 ? '+' : ''}{marketData.change.inrUsd.toFixed(2)}%</span>
              </div>
            </div>
            <div className="text-2xl font-mono font-bold text-white">
              ₹{marketData.inrUsd.toFixed(2)}
            </div>
          </div>
        </div>

        {/* GDP Growth */}
        <div className="bg-deep-navy/50 border border-electric-blue/20 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">GDP Growth Rate</span>
            <TrendingUp className="h-4 w-4 text-neon-green" />
          </div>
          <div className="text-2xl font-mono font-bold text-neon-green">
            {marketData.gdpGrowth.toFixed(1)}%
          </div>
          <p className="text-xs text-gray-400 mt-1">YoY Growth</p>
        </div>

        {/* Sector Breakdown */}
        <div className="bg-deep-navy/50 border border-electric-blue/20 rounded-lg p-3">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Sector Performance</h3>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#00D4FF20" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#9CA3AF' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#9CA3AF' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0A0E1A',
                    border: '1px solid #00D4FF',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#00D4FF"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-deep-navy/50 border border-electric-blue/20 rounded-lg p-3 text-center">
            <DollarSign className="h-6 w-6 text-electric-blue mx-auto mb-1" />
            <div className="text-lg font-mono font-bold text-white">₹3.7T</div>
            <p className="text-xs text-gray-400">Market Cap</p>
          </div>
          <div className="bg-deep-navy/50 border border-electric-blue/20 rounded-lg p-3 text-center">
            <BarChart3 className="h-6 w-6 text-neon-green mx-auto mb-1" />
            <div className="text-lg font-mono font-bold text-white">2.4M</div>
            <p className="text-xs text-gray-400">Daily Volume</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default EconomyPanel