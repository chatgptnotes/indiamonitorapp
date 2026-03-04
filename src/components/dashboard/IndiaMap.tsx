import { useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../contexts/DataContext'

const INDIA_TOPO_JSON = "/india-states.json"

interface TooltipData {
  name: string
  population?: number
  aqi?: number
  alerts: number
  x: number
  y: number
}

const IndiaMap = () => {
  const { states, alerts } = useData()
  const [tooltip, setTooltip] = useState<TooltipData | null>(null)
  const [selectedMetric, setSelectedMetric] = useState<'population' | 'aqi' | 'alerts'>('aqi')
  const navigate = useNavigate()

  const getColorByMetric = (stateCode: string) => {
    const state = states.find(s => s.code === stateCode || s.name === stateCode)
    const stateAlerts = alerts.filter(a => a.state_code === stateCode).length
    switch (selectedMetric) {
      case 'population':
        const pop = state?.population || 0
        if (pop > 50000000) return '#FF3366'
        if (pop > 20000000) return '#FFB800'
        return '#00FF88'
      case 'aqi':
        const aqi = state?.aqi_avg || 0
        if (aqi > 200) return '#FF3366'
        if (aqi > 150) return '#FF6B6B'
        if (aqi > 100) return '#FFB800'
        if (aqi > 50) return '#FFE066'
        return '#00FF88'
      case 'alerts':
        if (stateAlerts > 3) return '#FF3366'
        if (stateAlerts > 1) return '#FFB800'
        return '#00FF88'
      default: return '#00F0FF'
    }
  }

  const handleStateClick = (geo: any) => {
    const stateCode = geo.properties.NAME_1 || geo.properties.NAME_1
    if (stateCode) navigate(`/state/${stateCode}`)
  }

  const handleMouseEnter = (geo: any, event: React.MouseEvent) => {
    const stateName = geo.properties.NAME_1 || geo.properties.NAME_1
    const state = states.find(s => s.name === stateName)
    const stateAlerts = alerts.filter(a => a.state_code === stateName).length
    setTooltip({ name: stateName, population: state?.population, aqi: state?.aqi_avg, alerts: stateAlerts, x: event.clientX, y: event.clientY })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="cyber-card p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white font-mono flex items-center space-x-2">
          <span className="h-2 w-2 bg-neon-cyan rounded-full animate-pulse" />
          <span>India Monitor Map</span>
        </h2>
        <div className="flex space-x-1 bg-cyber-border/30 rounded-lg p-0.5">
          {[{ key: 'aqi', label: 'AQI' }, { key: 'population', label: 'Pop' }, { key: 'alerts', label: 'Alerts' }].map(({ key, label }) => (
            <button key={key} onClick={() => setSelectedMetric(key as any)}
              className={`px-3 py-1 text-xs rounded-md transition-all font-mono ${selectedMetric === key ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30' : 'text-gray-500 hover:text-gray-300'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-96 lg:h-full min-h-[300px]">
        <ComposableMap projection="geoMercator" projectionConfig={{ center: [78.9629, 20.5937], scale: 1000 }} style={{ width: "100%", height: "100%" }}>
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) => geographies.map(geo => {
              const sc = geo.properties.NAME_1 || geo.properties.NAME_1
              return (
                <Geography key={geo.rsmKey} geography={geo}
                  onMouseEnter={(e) => handleMouseEnter(geo, e)}
                  onMouseLeave={() => setTooltip(null)}
                  onClick={() => handleStateClick(geo)}
                  style={{
                    default: { fill: getColorByMetric(sc), stroke: '#1A1F2E', strokeWidth: 0.8, outline: 'none', opacity: 0.85 },
                    hover: { fill: '#00F0FF', stroke: '#00F0FF', strokeWidth: 1.5, outline: 'none', cursor: 'pointer', opacity: 1 },
                    pressed: { fill: '#00B8C4', stroke: '#00F0FF', strokeWidth: 1.5, outline: 'none' }
                  }}
                />
              )
            })}
          </Geographies>
        </ComposableMap>

        {/* Legend */}
        <div className="absolute bottom-2 left-2 bg-cyber-card/90 border border-cyber-border rounded-lg p-2.5 text-xs backdrop-blur-sm">
          <div className="font-semibold mb-1.5 text-neon-cyan font-mono text-[10px] uppercase tracking-wider">{selectedMetric} Scale</div>
          <div className="space-y-1">
            {selectedMetric === 'aqi' && [
              { color: 'bg-neon-green', label: 'Good (0-50)' },
              { color: 'bg-yellow-300', label: 'Moderate (51-100)' },
              { color: 'bg-neon-amber', label: 'Unhealthy (101-150)' },
              { color: 'bg-red-400', label: 'V.Unhealthy (151-200)' },
              { color: 'bg-danger', label: 'Hazardous (200+)' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center space-x-2"><div className={`w-2.5 h-2.5 ${color} rounded-full`} /><span className="text-gray-400">{label}</span></div>
            ))}
            {selectedMetric === 'population' && [
              { color: 'bg-neon-green', label: 'Low (<20M)' },
              { color: 'bg-neon-amber', label: 'Medium (20-50M)' },
              { color: 'bg-danger', label: 'High (50M+)' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center space-x-2"><div className={`w-2.5 h-2.5 ${color} rounded-full`} /><span className="text-gray-400">{label}</span></div>
            ))}
            {selectedMetric === 'alerts' && [
              { color: 'bg-neon-green', label: 'Low (0-1)' },
              { color: 'bg-neon-amber', label: 'Medium (2-3)' },
              { color: 'bg-danger', label: 'High (3+)' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center space-x-2"><div className={`w-2.5 h-2.5 ${color} rounded-full`} /><span className="text-gray-400">{label}</span></div>
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div className="fixed bg-cyber-card border border-neon-cyan/30 rounded-lg p-3 text-sm text-white z-50 pointer-events-none shadow-neon-cyan" style={{ left: tooltip.x + 10, top: tooltip.y - 10, transform: 'translate(0, -100%)' }}>
          <div className="font-semibold text-neon-cyan font-mono">{tooltip.name}</div>
          <div className="space-y-0.5 mt-1 text-xs text-gray-300">
            {tooltip.population && <div>Population: {(tooltip.population / 1000000).toFixed(1)}M</div>}
            {tooltip.aqi && <div>AQI: <span className={tooltip.aqi > 150 ? 'text-danger' : tooltip.aqi > 100 ? 'text-neon-amber' : 'text-neon-green'}>{tooltip.aqi}</span></div>}
            <div>Alerts: {tooltip.alerts}</div>
          </div>
          <div className="text-[10px] text-gray-500 mt-1">Click to view details</div>
        </div>
      )}
    </motion.div>
  )
}

export default IndiaMap
