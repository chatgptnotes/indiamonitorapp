import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  AlertTriangle, 
  Zap, 
  Waves, 
  Wind, 
  Shield, 
  Activity,
  Clock,
  MapPin
} from 'lucide-react'
import { useData } from '../../contexts/DataContext'

interface MockAlert {
  id: string
  title: string
  description: string
  severity: 'critical' | 'warning' | 'info'
  category: string
  location: string
  source: string
  timestamp: string
  icon: React.ComponentType<any>
}

const mockAlerts: MockAlert[] = [
  {
    id: '1',
    title: 'Cyclone Biparjoy Alert',
    description: 'Severe cyclonic storm approaching Gujarat coast. Expected landfall tonight.',
    severity: 'critical',
    category: 'cyclone',
    location: 'Gujarat Coast',
    source: 'IMD',
    timestamp: '2 hours ago',
    icon: Wind
  },
  {
    id: '2',
    title: 'Flash Flood Warning',
    description: 'Heavy rainfall causing flash floods in low-lying areas.',
    severity: 'warning',
    category: 'flood',
    location: 'Mumbai, Maharashtra',
    source: 'Municipal Corp',
    timestamp: '4 hours ago',
    icon: Waves
  },
  {
    id: '3',
    title: 'Power Grid Maintenance',
    description: 'Scheduled maintenance in North Grid. Possible power cuts.',
    severity: 'info',
    category: 'infrastructure',
    location: 'Delhi NCR',
    source: 'Power Grid Corp',
    timestamp: '6 hours ago',
    icon: Zap
  },
  {
    id: '4',
    title: 'Earthquake - 4.2 Magnitude',
    description: 'Moderate earthquake recorded. No damage reported.',
    severity: 'warning',
    category: 'earthquake',
    location: 'Uttarakhand',
    source: 'National Seismology',
    timestamp: '8 hours ago',
    icon: Activity
  },
  {
    id: '5',
    title: 'Security Advisory',
    description: 'Heightened security alert in border areas.',
    severity: 'warning',
    category: 'security',
    location: 'J&K Border',
    source: 'BSF',
    timestamp: '12 hours ago',
    icon: Shield
  },
  {
    id: '6',
    title: 'Air Quality Emergency',
    description: 'AQI exceeds 400. Avoid outdoor activities.',
    severity: 'critical',
    category: 'health',
    location: 'Delhi NCR',
    source: 'CPCB',
    timestamp: '14 hours ago',
    icon: AlertTriangle
  }
]

const AlertsPanel: React.FC = () => {
  const { alerts } = useData()
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(true)
  
  const allAlerts = alerts.length > 0 ? alerts.map(alert => ({
    ...alert,
    severity: alert.severity || 'info' as const,
    timestamp: 'Just now',
    icon: AlertTriangle
  })) : mockAlerts

  // Auto-scroll through alerts
  useEffect(() => {
    if (!isScrolling || allAlerts.length <= 1) return

    const interval = setInterval(() => {
      setCurrentAlertIndex((prev) => (prev + 1) % allAlerts.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [allAlerts.length, isScrolling])

  const getSeverityStyles = (severity: string | undefined) => {
    switch (severity) {
      case 'critical':
        return {
          border: 'border-red-200',
          bg: 'bg-red-50',
          text: 'text-red-700',
          glow: 'shadow-sm'
        }
      case 'warning':
        return {
          border: 'border-orange-200',
          bg: 'bg-orange-50',
          text: 'text-orange-700',
          glow: 'shadow-sm'
        }
      default:
        return {
          border: 'border-blue-200',
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          glow: 'shadow-sm'
        }
    }
  }

  const getSeverityBadge = (severity: string | undefined) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-600 text-white'
      case 'warning':
        return 'bg-orange-500 text-white'
      default:
        return 'bg-blue-600 text-white'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white border border-gray-200 rounded-xl p-6 h-full flex flex-col shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 flex items-center">
          <AlertTriangle className="h-5 w-5 text-danger mr-2" />
          Live Alerts
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsScrolling(!isScrolling)}
            className={`w-2 h-2 rounded-full ${isScrolling ? 'bg-success animate-pulse' : 'bg-gray-400'}`}
            title={isScrolling ? 'Auto-scrolling' : 'Paused'}
          />
          <span className="text-xs text-gray-600 bg-red-50 px-2 py-1 rounded-full">
            {allAlerts.filter(a => a.severity === 'critical').length} Critical
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-hidden">
        {/* Featured Alert - Large Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAlertIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {allAlerts.length > 0 && (
              <div className="relative group">
                {(() => {
                  const alert = allAlerts[currentAlertIndex]
                  const styles = getSeverityStyles(alert.severity)
                  const Icon = alert.icon || AlertTriangle
                  
                  return (
                    <div 
                      className={`${styles.border} ${styles.bg} ${styles.glow} border rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer`}
                      onClick={() => setIsScrolling(!isScrolling)}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon className={`h-6 w-6 ${styles.text} mt-1 flex-shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                              {alert.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityBadge(alert.severity)}`}>
                              {alert.severity.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                            {alert.description}
                          </p>
                          <div className="space-y-1 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{alert.location}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{alert.timestamp || 'Just now'}</span>
                              </div>
                              <span className="text-primary font-medium">
                                {alert.source}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Alert List - Compact View */}
        <div className="flex-1 overflow-y-auto">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Alerts</h3>
          <div className="space-y-2">
            {allAlerts.slice(0, 8).map((alert, index) => {
              if (index === currentAlertIndex) return null // Skip the featured alert
              
              const styles = getSeverityStyles(alert.severity)
              const Icon = alert.icon || AlertTriangle
              
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setCurrentAlertIndex(index)}
                  className={`${styles.border} ${styles.bg} border rounded-lg p-3 hover:border-opacity-60 transition-all cursor-pointer group`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className={`h-4 w-4 ${styles.text} mt-0.5 flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900 text-sm truncate">
                          {alert.title}
                        </h4>
                        <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${getSeverityBadge(alert.severity)}`}>
                          {alert.severity[0].toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                        {alert.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="truncate">{alert.location}</span>
                        <span>{alert.timestamp || 'Now'}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Alert Statistics */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Alert Summary</h4>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-lg font-mono font-bold text-red-600">
                {allAlerts.filter(a => a.severity === 'critical').length}
              </div>
              <p className="text-xs text-gray-500">Critical</p>
            </div>
            <div>
              <div className="text-lg font-mono font-bold text-orange-600">
                {allAlerts.filter(a => a.severity === 'warning').length}
              </div>
              <p className="text-xs text-gray-500">Warning</p>
            </div>
            <div>
              <div className="text-lg font-mono font-bold text-blue-600">
                {allAlerts.filter(a => a.severity === 'info').length}
              </div>
              <p className="text-xs text-gray-500">Info</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center space-x-1 mt-4">
        {allAlerts.slice(0, 5).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentAlertIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentAlertIndex ? 'bg-primary' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default AlertsPanel