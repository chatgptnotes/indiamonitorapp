import React, { useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../contexts/DataContext'

// India TopoJSON URL
const INDIA_TOPO_JSON = "https://cdn.jsdelivr.net/npm/india-topojson@1.0.0/india.json"

interface TooltipData {
  name: string
  population?: number
  aqi?: number
  alerts: number
  x: number
  y: number
}

const IndiaMap: React.FC = () => {
  const { states, alerts } = useData()
  const [tooltip, setTooltip] = useState<TooltipData | null>(null)
  const [selectedMetric, setSelectedMetric] = useState<'population' | 'aqi' | 'alerts'>('aqi')
  const navigate = useNavigate()

  const getColorByMetric = (stateCode: string) => {
    const state = states.find(s => s.code === stateCode)
    const stateAlerts = alerts.filter(a => a.state_code === stateCode).length

    switch (selectedMetric) {
      case 'population':
        const population = state?.population || 0
        if (population > 50000000) return '#FF3366' // High
        if (population > 20000000) return '#FFB800' // Medium
        return '#00FF88' // Low
      
      case 'aqi':
        const aqi = state?.aqi_avg || 0
        if (aqi > 200) return '#8B0000' // Maroon
        if (aqi > 150) return '#FF3366' // Red
        if (aqi > 100) return '#FFB800' // Orange
        if (aqi > 50) return '#FFA500' // Yellow
        return '#00FF88' // Green
      
      case 'alerts':
        if (stateAlerts > 3) return '#FF3366' // High
        if (stateAlerts > 1) return '#FFB800' // Medium
        return '#00FF88' // Low
      
      default:
        return '#00D4FF'
    }
  }

  const handleStateClick = (geo: any) => {
    const stateCode = geo.properties.ST_NM || geo.properties.NAME_1
    if (stateCode) {
      navigate(`/state/${stateCode}`)
    }
  }

  const handleMouseEnter = (geo: any, event: React.MouseEvent) => {
    const stateName = geo.properties.ST_NM || geo.properties.NAME_1
    const state = states.find(s => s.name === stateName)
    const stateAlerts = alerts.filter(a => a.state_code === stateName).length

    setTooltip({
      name: stateName,
      population: state?.population,
      aqi: state?.aqi_avg,
      alerts: stateAlerts,
      x: event.clientX,
      y: event.clientY
    })
  }

  const handleMouseLeave = () => {
    setTooltip(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-deep-navy/30 backdrop-blur-xl border border-electric-blue/30 rounded-lg p-4 h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">India Intelligence Map</h2>
        
        {/* Metric Selector */}
        <div className="flex space-x-2">
          {[
            { key: 'aqi', label: 'AQI' },
            { key: 'population', label: 'Population' },
            { key: 'alerts', label: 'Alerts' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSelectedMetric(key as any)}
              className={`px-3 py-1 text-xs rounded ${
                selectedMetric === key
                  ? 'bg-electric-blue text-deep-navy'
                  : 'bg-electric-blue/20 text-electric-blue hover:bg-electric-blue/30'
              } transition-colors`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-96 lg:h-full">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: [78.9629, 20.5937],
            scale: 1000
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                const stateCode = geo.properties.ST_NM || geo.properties.NAME_1
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={(event) => handleMouseEnter(geo, event)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleStateClick(geo)}
                    style={{
                      default: {
                        fill: getColorByMetric(stateCode),
                        stroke: '#00D4FF',
                        strokeWidth: 0.5,
                        outline: 'none'
                      },
                      hover: {
                        fill: '#00D4FF',
                        stroke: '#00FF88',
                        strokeWidth: 1,
                        outline: 'none',
                        cursor: 'pointer'
                      },
                      pressed: {
                        fill: '#FF3366',
                        stroke: '#00FF88',
                        strokeWidth: 1,
                        outline: 'none'
                      }
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ComposableMap>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-deep-navy/80 backdrop-blur-xl border border-electric-blue/30 rounded-lg p-3 text-xs text-white">
          <div className="font-semibold mb-2">{selectedMetric.toUpperCase()} Scale</div>
          <div className="space-y-1">
            {selectedMetric === 'aqi' && (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Good (0-50)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3" style={{backgroundColor: '#FFA500'}}></div>
                  <span>Moderate (51-100)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3" style={{backgroundColor: '#FFB800'}}></div>
                  <span>Unhealthy (101-150)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3" style={{backgroundColor: '#FF3366'}}></div>
                  <span>Very Unhealthy (151-200)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3" style={{backgroundColor: '#8B0000'}}></div>
                  <span>Hazardous (200+)</span>
                </div>
              </>
            )}
            {selectedMetric === 'population' && (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Low (&lt;20M)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3" style={{backgroundColor: '#FFB800'}}></div>
                  <span>Medium (20-50M)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3" style={{backgroundColor: '#FF3366'}}></div>
                  <span>High (50M+)</span>
                </div>
              </>
            )}
            {selectedMetric === 'alerts' && (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Low (0-1)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3" style={{backgroundColor: '#FFB800'}}></div>
                  <span>Medium (2-3)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3" style={{backgroundColor: '#FF3366'}}></div>
                  <span>High (3+)</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed bg-deep-navy border border-electric-blue/50 rounded-lg p-3 text-sm text-white z-50 pointer-events-none"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y - 10,
            transform: 'translate(0, -100%)'
          }}
        >
          <div className="font-semibold text-electric-blue">{tooltip.name}</div>
          <div className="space-y-1 mt-1">
            {tooltip.population && (
              <div>Population: {(tooltip.population / 1000000).toFixed(1)}M</div>
            )}
            {tooltip.aqi && (
              <div>AQI: {tooltip.aqi}</div>
            )}
            <div>Active Alerts: {tooltip.alerts}</div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default IndiaMap