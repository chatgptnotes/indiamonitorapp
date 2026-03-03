import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Bell, 
  Palette, 
  Globe, 
  Shield, 
  Download,
  Mail,
  Phone,
  Camera,
  Save,
  Check
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import DashboardLayout from '../components/layout/DashboardLayout'
import toast from 'react-hot-toast'

const Settings: React.FC = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'appearance' | 'privacy' | 'data'>('profile')
  const [saved, setSaved] = useState(false)
  
  // Profile settings
  const [profile, setProfile] = useState({
    fullName: '',
    email: user?.email || '',
    phone: '',
    role: 'Analyst',
    bio: ''
  })

  // Notification settings
  const [notifications, setNotifications] = useState({
    alerts: true,
    email: true,
    push: false,
    weeklyReport: true,
    criticalOnly: false
  })

  // Appearance settings
  const [appearance, setAppearance] = useState({
    theme: 'dark',
    language: 'en',
    density: 'comfortable',
    animations: true
  })

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    analytics: true,
    location: false,
    dataSharing: false,
    twoFactor: false
  })

  const tabs = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'appearance', label: 'Appearance', icon: Palette },
    { key: 'privacy', label: 'Privacy & Security', icon: Shield },
    { key: 'data', label: 'Data & Export', icon: Download }
  ]

  const handleSave = () => {
    // Simulate saving
    setSaved(true)
    toast.success('Settings saved successfully')
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="text-gray-400">Manage your preferences and account settings</p>
          </div>
          
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-6 py-2 bg-electric-blue text-deep-navy rounded-lg hover:bg-electric-blue/90 transition-colors"
          >
            {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            <span>{saved ? 'Saved' : 'Save Changes'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-deep-navy/30 backdrop-blur-xl border border-electric-blue/30 rounded-lg p-4">
              <nav className="space-y-2">
                {tabs.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key as any)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === key
                        ? 'bg-electric-blue/20 text-electric-blue border border-electric-blue/30'
                        : 'text-gray-300 hover:text-white hover:bg-electric-blue/5'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-deep-navy/30 backdrop-blur-xl border border-electric-blue/30 rounded-lg p-6"
            >
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <User className="h-5 w-5 text-electric-blue mr-2" />
                    Profile Information
                  </h2>

                  {/* Avatar Section */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-20 h-20 bg-electric-blue/20 rounded-full flex items-center justify-center">
                        <User className="h-10 w-10 text-electric-blue" />
                      </div>
                      <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-electric-blue rounded-full flex items-center justify-center hover:bg-electric-blue/90 transition-colors">
                        <Camera className="h-3 w-3 text-deep-navy" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{profile.fullName || 'User'}</h3>
                      <p className="text-gray-400 text-sm">{profile.role}</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profile.fullName}
                        onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                        className="w-full px-3 py-2 bg-deep-navy border border-electric-blue/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-electric-blue"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full pl-10 pr-3 py-2 bg-deep-navy border border-electric-blue/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-electric-blue"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full pl-10 pr-3 py-2 bg-deep-navy border border-electric-blue/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-electric-blue"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                      <select
                        value={profile.role}
                        onChange={(e) => setProfile(prev => ({ ...prev, role: e.target.value }))}
                        className="w-full px-3 py-2 bg-deep-navy border border-electric-blue/30 rounded-lg text-white focus:outline-none focus:border-electric-blue"
                      >
                        <option>Analyst</option>
                        <option>Administrator</option>
                        <option>Viewer</option>
                        <option>Manager</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 bg-deep-navy border border-electric-blue/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-electric-blue resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <Bell className="h-5 w-5 text-electric-blue mr-2" />
                    Notification Preferences
                  </h2>

                  <div className="space-y-4">
                    {[
                      { key: 'alerts', label: 'Emergency Alerts', description: 'Get notified about critical alerts and emergencies' },
                      { key: 'email', label: 'Email Notifications', description: 'Receive updates via email' },
                      { key: 'push', label: 'Push Notifications', description: 'Browser push notifications for real-time updates' },
                      { key: 'weeklyReport', label: 'Weekly Reports', description: 'Weekly summary of key metrics and insights' },
                      { key: 'criticalOnly', label: 'Critical Only', description: 'Only receive notifications for critical events' }
                    ].map(({ key, label, description }) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-deep-navy/50 border border-electric-blue/20 rounded-lg">
                        <div>
                          <h3 className="font-medium text-white">{label}</h3>
                          <p className="text-sm text-gray-400">{description}</p>
                        </div>
                        <button
                          onClick={() => setNotifications(prev => ({ 
                            ...prev, 
                            [key]: !prev[key as keyof typeof notifications] 
                          }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications[key as keyof typeof notifications] 
                              ? 'bg-electric-blue' 
                              : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications[key as keyof typeof notifications] 
                                ? 'translate-x-6' 
                                : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <Palette className="h-5 w-5 text-electric-blue mr-2" />
                    Appearance & Language
                  </h2>

                  <div className="space-y-6">
                    {/* Theme */}
                    <div>
                      <h3 className="font-medium text-white mb-3">Theme</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { key: 'dark', label: 'Dark', preview: 'bg-deep-navy' },
                          { key: 'light', label: 'Light', preview: 'bg-gray-100' },
                          { key: 'auto', label: 'Auto', preview: 'bg-gradient-to-r from-deep-navy to-gray-100' }
                        ].map(({ key, label, preview }) => (
                          <button
                            key={key}
                            onClick={() => setAppearance(prev => ({ ...prev, theme: key }))}
                            className={`p-4 rounded-lg border transition-colors ${
                              appearance.theme === key
                                ? 'border-electric-blue bg-electric-blue/10'
                                : 'border-electric-blue/30 hover:border-electric-blue/50'
                            }`}
                          >
                            <div className={`w-full h-8 ${preview} rounded mb-2`}></div>
                            <span className="text-white text-sm">{label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Language */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                      <select
                        value={appearance.language}
                        onChange={(e) => setAppearance(prev => ({ ...prev, language: e.target.value }))}
                        className="w-full max-w-xs px-3 py-2 bg-deep-navy border border-electric-blue/30 rounded-lg text-white focus:outline-none focus:border-electric-blue"
                      >
                        <option value="en">English</option>
                        <option value="hi">हिंदी (Hindi)</option>
                      </select>
                    </div>

                    {/* Density */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Display Density</label>
                      <select
                        value={appearance.density}
                        onChange={(e) => setAppearance(prev => ({ ...prev, density: e.target.value }))}
                        className="w-full max-w-xs px-3 py-2 bg-deep-navy border border-electric-blue/30 rounded-lg text-white focus:outline-none focus:border-electric-blue"
                      >
                        <option value="compact">Compact</option>
                        <option value="comfortable">Comfortable</option>
                        <option value="spacious">Spacious</option>
                      </select>
                    </div>

                    {/* Animations */}
                    <div className="flex items-center justify-between p-4 bg-deep-navy/50 border border-electric-blue/20 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">Animations</h3>
                        <p className="text-sm text-gray-400">Enable smooth animations and transitions</p>
                      </div>
                      <button
                        onClick={() => setAppearance(prev => ({ ...prev, animations: !prev.animations }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          appearance.animations ? 'bg-electric-blue' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            appearance.animations ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <Shield className="h-5 w-5 text-electric-blue mr-2" />
                    Privacy & Security
                  </h2>

                  <div className="space-y-4">
                    {[
                      { key: 'analytics', label: 'Analytics', description: 'Help improve our service with usage analytics' },
                      { key: 'location', label: 'Location Services', description: 'Use your location for relevant local data' },
                      { key: 'dataSharing', label: 'Data Sharing', description: 'Share anonymized data for research purposes' },
                      { key: 'twoFactor', label: 'Two-Factor Authentication', description: 'Add an extra layer of security to your account' }
                    ].map(({ key, label, description }) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-deep-navy/50 border border-electric-blue/20 rounded-lg">
                        <div>
                          <h3 className="font-medium text-white">{label}</h3>
                          <p className="text-sm text-gray-400">{description}</p>
                        </div>
                        <button
                          onClick={() => setPrivacy(prev => ({ 
                            ...prev, 
                            [key]: !prev[key as keyof typeof privacy] 
                          }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            privacy[key as keyof typeof privacy] 
                              ? 'bg-electric-blue' 
                              : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              privacy[key as keyof typeof privacy] 
                                ? 'translate-x-6' 
                                : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-alert-red/5 border border-alert-red/20 rounded-lg">
                    <h3 className="font-medium text-alert-red mb-2">Danger Zone</h3>
                    <p className="text-sm text-gray-400 mb-4">Once you delete your account, there is no going back.</p>
                    <button className="px-4 py-2 bg-alert-red/20 text-alert-red border border-alert-red/30 rounded-lg hover:bg-alert-red/30 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'data' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <Download className="h-5 w-5 text-electric-blue mr-2" />
                    Data & Export
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-deep-navy/50 border border-electric-blue/20 rounded-lg text-center">
                      <Download className="h-8 w-8 text-electric-blue mx-auto mb-3" />
                      <h3 className="font-medium text-white mb-2">Export Data</h3>
                      <p className="text-sm text-gray-400 mb-4">Download all your data in JSON format</p>
                      <button className="px-4 py-2 bg-electric-blue text-deep-navy rounded-lg hover:bg-electric-blue/90 transition-colors">
                        Download Data
                      </button>
                    </div>

                    <div className="p-6 bg-deep-navy/50 border border-electric-blue/20 rounded-lg text-center">
                      <Globe className="h-8 w-8 text-neon-green mx-auto mb-3" />
                      <h3 className="font-medium text-white mb-2">Data Usage</h3>
                      <p className="text-sm text-gray-400 mb-4">View how your data is being used</p>
                      <button className="px-4 py-2 bg-neon-green/20 text-neon-green border border-neon-green/30 rounded-lg hover:bg-neon-green/30 transition-colors">
                        View Usage
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-white">Data Retention</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-deep-navy/30 rounded-lg">
                        <div className="text-2xl font-mono font-bold text-electric-blue mb-1">30 days</div>
                        <p className="text-sm text-gray-400">Activity Logs</p>
                      </div>
                      <div className="text-center p-4 bg-deep-navy/30 rounded-lg">
                        <div className="text-2xl font-mono font-bold text-neon-green mb-1">1 year</div>
                        <p className="text-sm text-gray-400">Analytics Data</p>
                      </div>
                      <div className="text-center p-4 bg-deep-navy/30 rounded-lg">
                        <div className="text-2xl font-mono font-bold text-amber mb-1">Forever</div>
                        <p className="text-sm text-gray-400">Account Data</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Settings