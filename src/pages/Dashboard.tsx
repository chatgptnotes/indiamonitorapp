import React from 'react'
import { motion } from 'framer-motion'
import DashboardLayout from '../components/layout/DashboardLayout'
import IndiaMap from '../components/dashboard/IndiaMap'
import EconomyPanel from '../components/dashboard/EconomyPanel'
import EnvironmentPanel from '../components/dashboard/EnvironmentPanel'
import AlertsPanel from '../components/dashboard/AlertsPanel'
import InfrastructurePanel from '../components/dashboard/InfrastructurePanel'
import NewsTicker from '../components/dashboard/NewsTicker'
import AQIMap from '../components/dashboard/AQIMap'
import DisasterTracker from '../components/dashboard/DisasterTracker'
import TradeHeatmap from '../components/dashboard/TradeHeatmap'
import StartupEcosystem from '../components/dashboard/StartupEcosystem'
import WaterResources from '../components/dashboard/WaterResources'
import ClimateTracker from '../components/dashboard/ClimateTracker'
import RailwayNetwork from '../components/dashboard/RailwayNetwork'
import PowerGrid from '../components/dashboard/PowerGrid'
import DigitalIndia from '../components/dashboard/DigitalIndia'
import PresentationMode from '../components/dashboard/PresentationMode'
import { useData } from '../contexts/DataContext'

const Dashboard: React.FC = () => {
  const { loading } = useData()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="rounded-full h-16 w-16 border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  const panels = [
    <div key="map" className="space-y-4"><IndiaMap /><AQIMap /></div>,
    <div key="economy" className="space-y-4"><EconomyPanel /><TradeHeatmap /><StartupEcosystem /></div>,
    <div key="alerts" className="space-y-4"><AlertsPanel /><DisasterTracker /></div>,
    <div key="env" className="space-y-4"><EnvironmentPanel /><WaterResources /><ClimateTracker /></div>,
    <div key="infra" className="space-y-4"><InfrastructurePanel /><RailwayNetwork /><PowerGrid /><DigitalIndia /></div>,
  ]

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* News Ticker + Presentation Mode */}
        <div className="flex items-center space-x-4">
          <div className="flex-1"><NewsTicker /></div>
          <PresentationMode>{panels}</PresentationMode>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Left - Alerts + Disasters */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <AlertsPanel />
            <DisasterTracker />
          </div>

          {/* Center - Map + AQI */}
          <div className="col-span-12 lg:col-span-6 space-y-4">
            <IndiaMap />
            <AQIMap />
          </div>

          {/* Right - Economy + Trade + Startups */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <EconomyPanel />
            <TradeHeatmap />
            <StartupEcosystem />
          </div>

          {/* Bottom Row */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <EnvironmentPanel />
            <WaterResources />
            <ClimateTracker />
          </div>
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <InfrastructurePanel />
            <RailwayNetwork />
          </div>
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <PowerGrid />
            <DigitalIndia />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 py-2">
          drmhope.com | A Bettroi Product | v2.0 | 2026-03-03
        </div>
      </div>
    </DashboardLayout>
  )
}
export default Dashboard
