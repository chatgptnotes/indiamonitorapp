import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity, BarChart3, Settings, LogOut, Menu, X, Home, User, GitCompare, GraduationCap, Heart, Vote, ShieldAlert, Wheat, Search } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import GlobalSearch from '../shared/GlobalSearch'
import KeyboardShortcuts from '../shared/KeyboardShortcuts'
import RefreshIndicator from '../shared/RefreshIndicator'

interface DashboardLayoutProps { children: React.ReactNode }

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { signOut, user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Compare States', href: '/compare', icon: GitCompare },
    { name: 'Education', href: '/education', icon: GraduationCap },
    { name: 'Healthcare', href: '/healthcare', icon: Heart },
    { name: 'Elections', href: '/elections', icon: Vote },
    { name: 'Crime', href: '/crime', icon: ShieldAlert },
    { name: 'Agriculture', href: '/agriculture', icon: Wheat },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  const mobileNav = navigation.slice(0, 5)

  const handleSignOut = async () => { try { await signOut(); navigate('/') } catch (e) { console.error(e) } }

  return (
    <div className="h-screen flex bg-cyber-bg">
      <KeyboardShortcuts onSearchOpen={() => setSearchOpen(true)} />
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Sidebar - Desktop */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-cyber-surface border-r border-cyber-border transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b border-cyber-border">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-neon-cyan" />
              <span className="text-xl font-bold text-white font-mono">IndiaMonitor</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white"><X className="h-6 w-6" /></button>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item, idx) => {
              const Icon = item.icon
              const current = location.pathname === item.href
              return (
                <Link key={item.name} to={item.href} onClick={() => setSidebarOpen(false)}
                  className={`${current ? 'bg-neon-cyan/10 text-neon-cyan border-l-2 border-neon-cyan' : 'text-gray-400 hover:bg-cyber-border/30 hover:text-white border-l-2 border-transparent'} group flex items-center px-3 py-2 text-sm font-medium rounded-r-lg transition-all`}>
                  <Icon className="mr-3 h-5 w-5" />
                  <span>{item.name}</span>
                  <kbd className="ml-auto text-xs text-gray-600 font-mono">{idx + 1}</kbd>
                </Link>
              )
            })}
          </nav>
          <div className="border-t border-cyber-border p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-cyber-border rounded-full p-2"><User className="h-5 w-5 text-neon-cyan" /></div>
              <div className="flex-1 min-w-0"><p className="text-sm font-medium text-white truncate">{user?.email || 'User'}</p><p className="text-xs text-gray-500">Analyst</p></div>
            </div>
            <button onClick={handleSignOut} className="w-full flex items-center px-3 py-2 text-sm text-gray-400 hover:text-danger hover:bg-cyber-border/30 rounded-lg transition-colors">
              <LogOut className="mr-3 h-4 w-4" />Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-cyber-surface border-b border-cyber-border">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white"><Menu className="h-6 w-6" /></button>
              <h1 className="text-lg font-semibold text-white font-mono">
                {navigation.find(n => n.href === location.pathname)?.name || 'IndiaMonitor'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <RefreshIndicator />
              <button onClick={() => setSearchOpen(true)} className="flex items-center space-x-2 px-3 py-1.5 bg-cyber-border/30 border border-cyber-border rounded-lg text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/30 transition-colors text-sm">
                <Search className="h-4 w-4" /><span className="hidden sm:inline">Search</span><kbd className="hidden sm:inline text-xs text-gray-600 font-mono ml-2">S</kbd>
              </button>
              <div className="hidden lg:flex items-center space-x-2 text-sm">
                <div className="h-2 w-2 bg-neon-green rounded-full animate-pulse shadow-neon-green"></div>
                <span className="text-gray-400">Live</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-cyber-bg p-4 lg:p-6 pb-20 lg:pb-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="h-full">
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-cyber-surface border-t border-cyber-border flex">
        {mobileNav.map((item) => {
          const Icon = item.icon
          const current = location.pathname === item.href
          return (
            <Link key={item.name} to={item.href} className={`flex-1 flex flex-col items-center py-2 ${current ? 'text-neon-cyan' : 'text-gray-500'}`}>
              <Icon className="h-5 w-5" />
              <span className="text-[10px] mt-0.5">{item.name.split(' ')[0]}</span>
            </Link>
          )
        })}
      </div>

      {sidebarOpen && <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)} />}
    </div>
  )
}
export default DashboardLayout
