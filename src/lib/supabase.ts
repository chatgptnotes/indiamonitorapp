import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zrayznjcskucudgpayos.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyYXl6bmpjc2t1Y3VkZ3BheW9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NDQ4NDYsImV4cCI6MjA4ODEyMDg0Nn0.xvQsrvNrdAR0mo2C0EsvSwVZQXgPISbPulywLLsvoz0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Profile {
  id: string
  user_id: string
  full_name?: string
  avatar_url?: string
  role?: string
  language_pref?: string
  created_at?: string
}

export interface State {
  id: number
  name: string
  code: string
  capital?: string
  population?: number
  area_sq_km?: number
  gdp_billion_usd?: number
  literacy_rate?: number
  hdi?: number
  aqi_avg?: number
  region?: string
  created_at?: string
}

export interface Alert {
  id: string
  title: string
  description?: string
  severity?: 'critical' | 'warning' | 'info'
  category?: 'earthquake' | 'flood' | 'cyclone' | 'security' | 'infrastructure' | 'economic' | 'health' | 'other'
  state_code?: string
  location?: string
  source?: string
  is_active?: boolean
  created_at?: string
}

export interface EconomicData {
  id: string
  metric_name: string
  value: number
  unit?: string
  period?: string
  state_code?: string
  source?: string
  recorded_at?: string
}

export interface AQIData {
  id: string
  city: string
  state_code: string
  aqi_value: number
  pm25?: number
  pm10?: number
  category?: string
  recorded_at?: string
}