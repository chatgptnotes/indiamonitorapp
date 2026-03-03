import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, type State, type Alert, type EconomicData, type AQIData } from '../lib/supabase'

interface DataContextType {
  states: State[]
  alerts: Alert[]
  economicData: EconomicData[]
  aqiData: AQIData[]
  loading: boolean
  refreshData: () => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [states, setStates] = useState<State[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [economicData, setEconomicData] = useState<EconomicData[]>([])
  const [aqiData, setAQIData] = useState<AQIData[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setLoading(true)

      // Fetch all data in parallel
      const [statesRes, alertsRes, economicRes, aqiRes] = await Promise.all([
        supabase.from('states').select('*'),
        supabase.from('alerts').select('*').eq('is_active', true).order('created_at', { ascending: false }),
        supabase.from('economic_data').select('*').order('recorded_at', { ascending: false }),
        supabase.from('aqi_data').select('*').order('recorded_at', { ascending: false })
      ])

      if (statesRes.error) throw statesRes.error
      if (alertsRes.error) throw alertsRes.error
      if (economicRes.error) throw economicRes.error
      if (aqiRes.error) throw aqiRes.error

      setStates(statesRes.data || [])
      setAlerts(alertsRes.data || [])
      setEconomicData(economicRes.data || [])
      setAQIData(aqiRes.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const refreshData = async () => {
    await fetchData()
  }

  useEffect(() => {
    fetchData()
    
    // Set up real-time subscriptions
    const alertsSubscription = supabase
      .channel('alerts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'alerts' }, () => {
        refreshData()
      })
      .subscribe()

    const economicSubscription = supabase
      .channel('economic_data')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'economic_data' }, () => {
        refreshData()
      })
      .subscribe()

    return () => {
      alertsSubscription.unsubscribe()
      economicSubscription.unsubscribe()
    }
  }, [])

  const value = {
    states,
    alerts,
    economicData,
    aqiData,
    loading,
    refreshData,
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}