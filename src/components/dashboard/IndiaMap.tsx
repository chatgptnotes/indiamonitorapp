import React, { useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../contexts/DataContext'

// India TopoJSON URL - using reliable source
const INDIA_TOPO_JSON = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json"

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
        if (population > 50000000) return '#DC2626' // High - Red
        if (population > 20000000) return '#F59E0B' // Medium - Amber
        return '#16A34A' // Low - Green
      
      case 'aqi':
        const aqi = state?.aqi_avg || 0
        if (aqi > 200) return '#7F1D1D' // Hazardous - Dark red
        if (aqi > 150) return '#DC2626' // Very unhealthy - Red
        if (aqi > 100) return '#F59E0B' // Unhealthy - Orange
        if (aqi > 50) return '#FDE047' // Moderate - Yellow
        return '#16A34A' // Good - Green
      
      case 'alerts':
        if (stateAlerts > 3) return '#DC2626' // High - Red
        if (stateAlerts > 1) return '#F59E0B' // Medium - Amber
        return '#16A34A' // Low - Green
      
      default:
        return '#3B82F6'
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
      className="bg-white border border-gray-200 rounded-xl p-6 h-full shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">India Monitor Map</h2>
        
        {/* Metric Selector */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {[
            { key: 'aqi', label: 'AQI' },
            { key: 'population', label: 'Population' },
            { key: 'alerts', label: 'Alerts' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSelectedMetric(key as any)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                selectedMetric === key
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
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
                        stroke: '#E5E7EB',
                        strokeWidth: 1,
                        outline: 'none'
                      },
                      hover: {
                        fill: '#3B82F6',
                        stroke: '#1D4ED8',
                        strokeWidth: 2,
                        outline: 'none',
                        cursor: 'pointer'
                      },
                      pressed: {
                        fill: '#1D4ED8',
                        stroke: '#1E40AF',
                        strokeWidth: 2,
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
        <div className="absolute bottom-4 left-4 bg-white border border-gray-200 rounded-lg p-3 text-xs text-gray-700 shadow-sm">
          <div className="font-semibold mb-2 text-gray-900">{selectedMetric.toUpperCase()} Scale</div>
          <div className="space-y-1">
            {selectedMetric === 'aqi' && (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Good (0-50)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span>Moderate (51-100)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Unhealthy (101-150)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <span>Very Unhealthy (151-200)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-900 rounded-full"></div>
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
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Medium (20-50M)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
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
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Medium (2-3)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
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
          className="fixed bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm text-white z-50 pointer-events-none shadow-lg"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y - 10,
            transform: 'translate(0, -100%)'
          }}
        >
          <div className="font-semibold text-blue-300">{tooltip.name}</div>
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