import { useState, memo } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
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

  const getColorByMetric = (stateName: string) => {
    const state = states.find(s => s.code === stateName || s.name === stateName)
    const stateAlerts = alerts.filter(a => a.state_code === stateName).length
    switch (selectedMetric) {
      case 'population': {
        const pop = state?.population || 0
        if (pop > 100000000) return '#dc2626'
        if (pop > 50000000) return '#f97316'
        if (pop > 20000000) return '#eab308'
        if (pop > 10000000) return '#22c55e'
        return '#3b82f6'
      }
      case 'aqi': {
        const aqi = state?.aqi_avg || 0
        if (aqi > 200) return '#dc2626'
        if (aqi > 150) return '#f97316'
        if (aqi > 100) return '#eab308'
        if (aqi > 50) return '#84cc16'
        return '#22c55e'
      }
      case 'alerts': {
        if (stateAlerts > 3) return '#dc2626'
        if (stateAlerts > 1) return '#f97316'
        if (stateAlerts > 0) return '#eab308'
        return '#22c55e'
      }
      default: return '#3b82f6'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 h-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">India Map</h2>
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-0.5">
          {[
            { key: 'aqi', label: 'AQI' },
            { key: 'population', label: 'Population' },
            { key: 'alerts', label: 'Alerts' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSelectedMetric(key as any)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                selectedMetric === key
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative" style={{ height: '450px' }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [82, 22], scale: 1000 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ZoomableGroup>
            <Geographies geography={INDIA_TOPO_JSON}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo) => {
                  const stateName = geo.properties.NAME_1 || ''
                  const fillColor = getColorByMetric(stateName)
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={(event: React.MouseEvent) => {
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
                      }}
                      onMouseLeave={() => setTooltip(null)}
                      onClick={() => navigate(`/state/${stateName}`)}
                      fill={fillColor}
                      stroke="#ffffff"
                      strokeWidth={0.8}
                      style={{
                        default: { outline: 'none' },
                        hover: { fill: '#2563eb', stroke: '#1d4ed8', strokeWidth: 1.5, outline: 'none', cursor: 'pointer' },
                        pressed: { fill: '#1e40af', outline: 'none' }
                      }}
                    />
                  )
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {/* Legend */}
        <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-600 rounded-lg p-2.5 text-xs backdrop-blur-sm">
          <div className="font-semibold mb-1.5 text-gray-700 dark:text-gray-300 uppercase tracking-wider text-[10px]">
            {selectedMetric === 'aqi' ? 'Air Quality' : selectedMetric === 'population' ? 'Population' : 'Alerts'}
          </div>
          <div className="space-y-1">
            {selectedMetric === 'aqi' && [
              { color: '#22c55e', label: 'Good (0-50)' },
              { color: '#84cc16', label: 'Moderate (51-100)' },
              { color: '#eab308', label: 'Unhealthy (101-150)' },
              { color: '#f97316', label: 'V.Unhealthy (151-200)' },
              { color: '#dc2626', label: 'Hazardous (200+)' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                <span className="text-gray-600 dark:text-gray-400">{label}</span>
              </div>
            ))}
            {selectedMetric === 'population' && [
              { color: '#3b82f6', label: 'Under 10M' },
              { color: '#22c55e', label: '10-20M' },
              { color: '#eab308', label: '20-50M' },
              { color: '#f97316', label: '50-100M' },
              { color: '#dc2626', label: 'Over 100M' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                <span className="text-gray-600 dark:text-gray-400">{label}</span>
              </div>
            ))}
            {selectedMetric === 'alerts' && [
              { color: '#22c55e', label: 'No alerts' },
              { color: '#eab308', label: '1 alert' },
              { color: '#f97316', label: '2-3 alerts' },
              { color: '#dc2626', label: '4+ alerts' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                <span className="text-gray-600 dark:text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {tooltip && (
        <div className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-3 text-sm z-50 pointer-events-none shadow-lg"
          style={{ left: tooltip.x + 12, top: tooltip.y - 12, transform: 'translateY(-100%)' }}>
          <div className="font-bold text-gray-900 dark:text-white">{tooltip.name}</div>
          <div className="space-y-0.5 mt-1 text-xs text-gray-600 dark:text-gray-400">
            {tooltip.population != null && <div>Population: {(tooltip.population / 1000000).toFixed(1)}M</div>}
            {tooltip.aqi != null && (
              <div>AQI: <span className={tooltip.aqi > 150 ? 'text-red-500' : tooltip.aqi > 100 ? 'text-orange-500' : 'text-green-500'}>{tooltip.aqi}</span></div>
            )}
            <div>Alerts: {tooltip.alerts}</div>
          </div>
          <div className="text-[10px] text-gray-400 mt-1">Click for details</div>
        </div>
      )}
    </div>
  )
}

export default memo(IndiaMap)
