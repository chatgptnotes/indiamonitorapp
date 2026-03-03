import React from 'react'
import { motion } from 'framer-motion'
import DashboardLayout from '../components/layout/DashboardLayout'
import IndiaMap from '../components/dashboard/IndiaMap'
import EconomyPanel from '../components/dashboard/EconomyPanel'
import EnvironmentPanel from '../components/dashboard/EnvironmentPanel'
import AlertsPanel from '../components/dashboard/AlertsPanel'
import InfrastructurePanel from '../components/dashboard/InfrastructurePanel'
import { useData } from '../contexts/DataContext'

const Dashboard: React.FC = () => {
  const { loading } = useData()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-16 w-16 border-4 border-primary border-t-transparent"
        />
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-4 h-full">
        {/* Left Sidebar - Alerts */}
        <div className="col-span-12 lg:col-span-3 order-1 lg:order-1">
          <AlertsPanel />
        </div>

        {/* Center - Map */}
        <div className="col-span-12 lg:col-span-6 order-2 lg:order-2">
          <IndiaMap />
        </div>

        {/* Right Sidebar - Economy */}
        <div className="col-span-12 lg:col-span-3 order-3 lg:order-3">
          <EconomyPanel />
        </div>

        {/* Bottom Left - Environment */}
        <div className="col-span-12 lg:col-span-6 order-4 lg:order-4">
          <EnvironmentPanel />
        </div>

        {/* Bottom Right - Infrastructure */}
        <div className="col-span-12 lg:col-span-6 order-5 lg:order-5">
          <InfrastructurePanel />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard