import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Activity, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Home,
  User
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { signOut, user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, current: location.pathname === '/dashboard' },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, current: location.pathname === '/analytics' },
    { name: 'Settings', href: '/settings', icon: Settings, current: location.pathname === '/settings' },
  ]

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Failed to sign out:', error)
    }
  }

  return (
    <div className="h-screen flex bg-deep-navy">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-deep-navy/80 backdrop-blur-xl border-r border-electric-blue/20 transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-electric-blue/20">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-electric-blue" />
              <span className="text-xl font-bold text-white">IndiaMonitor</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`${
                    item.current
                      ? 'bg-electric-blue/10 border-electric-blue text-electric-blue'
                      : 'text-gray-300 hover:bg-electric-blue/5 hover:text-white border-transparent'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md border transition-colors`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User Menu */}
          <div className="border-t border-electric-blue/20 p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-electric-blue/20 rounded-full p-2">
                <User className="h-5 w-5 text-electric-blue" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.email || 'User'}
                </p>
                <p className="text-xs text-gray-400">Analyst</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center px-2 py-2 text-sm text-gray-300 hover:text-white hover:bg-electric-blue/5 rounded-md transition-colors"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-deep-navy/50 backdrop-blur-xl border-b border-electric-blue/20">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-white">
                {location.pathname === '/dashboard' && 'Command Center'}
                {location.pathname === '/analytics' && 'Analytics'}
                {location.pathname === '/settings' && 'Settings'}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-2 text-sm">
                <div className="h-2 w-2 bg-neon-green rounded-full animate-pulse"></div>
                <span className="text-gray-400">Live Data</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-25"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default DashboardLayout