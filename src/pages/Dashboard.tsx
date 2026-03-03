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
import Footer from '../components/shared/Footer'
import CyberSkeleton from '../components/shared/CyberSkeleton'
import { useData } from '../contexts/DataContext'

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

const Dashboard = () => {
  const { loading } = useData()

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          <CyberSkeleton type="card" lines={2} />
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-3"><CyberSkeleton type="card" lines={4} /></div>
            <div className="col-span-12 lg:col-span-6"><CyberSkeleton type="chart" /></div>
            <div className="col-span-12 lg:col-span-3"><CyberSkeleton type="card" lines={4} /></div>
          </div>
        </div>
      </DashboardLayout>
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
      <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-4">
        {/* News Ticker + Presentation Mode */}
        <motion.div variants={fadeUp} className="flex items-center space-x-4">
          <div className="flex-1"><NewsTicker /></div>
          <PresentationMode>{panels}</PresentationMode>
        </motion.div>

        <div className="grid grid-cols-12 gap-4">
          <motion.div variants={fadeUp} className="col-span-12 lg:col-span-3 space-y-4">
            <AlertsPanel />
            <DisasterTracker />
          </motion.div>
          <motion.div variants={fadeUp} className="col-span-12 lg:col-span-6 space-y-4">
            <IndiaMap />
            <AQIMap />
          </motion.div>
          <motion.div variants={fadeUp} className="col-span-12 lg:col-span-3 space-y-4">
            <EconomyPanel />
            <TradeHeatmap />
            <StartupEcosystem />
          </motion.div>
          <motion.div variants={fadeUp} className="col-span-12 lg:col-span-4 space-y-4">
            <EnvironmentPanel />
            <WaterResources />
            <ClimateTracker />
          </motion.div>
          <motion.div variants={fadeUp} className="col-span-12 lg:col-span-4 space-y-4">
            <InfrastructurePanel />
            <RailwayNetwork />
          </motion.div>
          <motion.div variants={fadeUp} className="col-span-12 lg:col-span-4 space-y-4">
            <PowerGrid />
            <DigitalIndia />
          </motion.div>
        </div>

        <Footer />
      </motion.div>
    </DashboardLayout>
  )
}
export default Dashboard
