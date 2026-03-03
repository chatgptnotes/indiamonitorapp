-- Database initialization script for IndiaMonitor.app

-- Create tables
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'viewer',
  language_pref TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS states (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  code TEXT UNIQUE NOT NULL,
  capital TEXT,
  population BIGINT,
  area_sq_km INTEGER,
  gdp_billion_usd NUMERIC,
  literacy_rate NUMERIC,
  hdi NUMERIC,
  aqi_avg INTEGER,
  region TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  severity TEXT DEFAULT 'info' CHECK (severity IN ('critical','warning','info')),
  category TEXT CHECK (category IN ('earthquake','flood','cyclone','security','infrastructure','economic','health','other')),
  state_code TEXT,
  location TEXT,
  source TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS economic_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL,
  value NUMERIC NOT NULL,
  unit TEXT,
  period TEXT,
  state_code TEXT,
  source TEXT,
  recorded_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS aqi_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  city TEXT NOT NULL,
  state_code TEXT NOT NULL,
  aqi_value INTEGER NOT NULL,
  pm25 NUMERIC,
  pm10 NUMERIC,
  category TEXT,
  recorded_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE states ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE economic_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE aqi_data ENABLE ROW LEVEL SECURITY;

-- Public read for reference data
CREATE POLICY "Public read states" ON states FOR SELECT USING (true);
CREATE POLICY "Public read alerts" ON alerts FOR SELECT USING (true);
CREATE POLICY "Public read economic" ON economic_data FOR SELECT USING (true);
CREATE POLICY "Public read aqi" ON aqi_data FOR SELECT USING (true);
CREATE POLICY "Users manage own profile" ON profiles FOR ALL USING (user_id = auth.uid());

-- Insert states data (28 states + 8 UTs)
INSERT INTO states (name, code, capital, population, area_sq_km, gdp_billion_usd, literacy_rate, hdi, aqi_avg, region) VALUES
('Andhra Pradesh', 'AP', 'Amaravati', 49386799, 160205, 195.5, 67.4, 0.641, 145, 'South'),
('Arunachal Pradesh', 'AR', 'Itanagar', 1383727, 83743, 4.3, 65.4, 0.625, 78, 'Northeast'),
('Assam', 'AS', 'Dispur', 31205576, 78438, 45.2, 72.2, 0.614, 112, 'Northeast'),
('Bihar', 'BR', 'Patna', 104099452, 94163, 78.1, 61.8, 0.566, 187, 'East'),
('Chhattisgarh', 'CG', 'Raipur', 25545198, 135192, 42.7, 70.3, 0.613, 156, 'Central'),
('Goa', 'GA', 'Panaji', 1458545, 3702, 8.5, 88.7, 0.726, 89, 'West'),
('Gujarat', 'GJ', 'Gandhinagar', 60439692, 196244, 198.4, 78.0, 0.665, 134, 'West'),
('Haryana', 'HR', 'Chandigarh', 25351462, 44212, 89.3, 75.6, 0.708, 167, 'North'),
('Himachal Pradesh', 'HP', 'Shimla', 6864602, 55673, 17.9, 82.8, 0.725, 67, 'North'),
('Jharkhand', 'JH', 'Ranchi', 32988134, 79716, 38.5, 66.4, 0.599, 143, 'East'),
('Karnataka', 'KA', 'Bengaluru', 61095297, 191791, 245.6, 75.4, 0.682, 92, 'South'),
('Kerala', 'KL', 'Thiruvananthapuram', 33406061, 38852, 98.1, 94.0, 0.779, 76, 'South'),
('Madhya Pradesh', 'MP', 'Bhopal', 72626809, 308245, 112.5, 69.3, 0.606, 134, 'Central'),
('Maharashtra', 'MH', 'Mumbai', 112374333, 307713, 324.8, 82.3, 0.696, 145, 'West'),
('Manipur', 'MN', 'Imphal', 2855794, 22327, 3.2, 79.2, 0.724, 89, 'Northeast'),
('Meghalaya', 'ML', 'Shillong', 2966889, 22429, 4.1, 74.4, 0.656, 67, 'Northeast'),
('Mizoram', 'MZ', 'Aizawl', 1097206, 21081, 1.8, 91.3, 0.663, 45, 'Northeast'),
('Nagaland', 'NL', 'Kohima', 1978502, 16579, 2.9, 79.6, 0.679, 54, 'Northeast'),
('Odisha', 'OD', 'Bhubaneswar', 42003000, 155707, 68.4, 72.9, 0.606, 132, 'East'),
('Punjab', 'PB', 'Chandigarh', 27743338, 50362, 65.1, 75.8, 0.721, 178, 'North'),
('Rajasthan', 'RJ', 'Jaipur', 68548437, 342239, 134.2, 66.1, 0.629, 203, 'North'),
('Sikkim', 'SK', 'Gangtok', 610577, 7096, 4.6, 81.4, 0.716, 43, 'Northeast'),
('Tamil Nadu', 'TN', 'Chennai', 72147030, 130060, 236.4, 80.1, 0.708, 89, 'South'),
('Telangana', 'TS', 'Hyderabad', 35003674, 112077, 298.5, 66.5, 0.669, 132, 'South'),
('Tripura', 'TR', 'Agartala', 3673917, 10486, 6.2, 87.2, 663, 78, 'Northeast'),
('Uttar Pradesh', 'UP', 'Lucknow', 199812341, 240928, 218.7, 67.7, 0.596, 245, 'North'),
('Uttarakhand', 'UK', 'Dehradun', 10086292, 53483, 25.8, 78.8, 0.684, 89, 'North'),
('West Bengal', 'WB', 'Kolkata', 91276115, 88752, 167.5, 76.3, 0.641, 156, 'East'),
-- Union Territories
('Andaman and Nicobar Islands', 'AN', 'Port Blair', 380581, 8249, 0.8, 86.6, 0.708, 67, 'South'),
('Chandigarh', 'CH', 'Chandigarh', 1055450, 114, 5.8, 86.0, 0.774, 134, 'North'),
('Dadra and Nagar Haveli and Daman and Diu', 'DD', 'Daman', 585764, 603, 2.4, 76.2, 0.665, 98, 'West'),
('Delhi', 'DL', 'New Delhi', 32941309, 1484, 92.1, 86.2, 0.750, 287, 'North'),
('Jammu and Kashmir', 'JK', 'Srinagar', 12267013, 222236, 23.4, 67.2, 0.688, 89, 'North'),
('Ladakh', 'LA', 'Leh', 290492, 166698, 0.6, 66.4, 0.653, 34, 'North'),
('Lakshadweep', 'LD', 'Kavaratti', 64473, 32, 0.1, 91.8, 0.684, 23, 'South'),
('Puducherry', 'PY', 'Puducherry', 1244464, 490, 3.4, 85.8, 0.717, 76, 'South');

-- Insert sample alerts
INSERT INTO alerts (title, description, severity, category, state_code, location, source, is_active) VALUES
('Cyclone Biparjoy Alert', 'Severe cyclonic storm approaching Gujarat coast. Expected landfall tonight.', 'critical', 'cyclone', 'GJ', 'Gujarat Coast', 'IMD', true),
('Flash Flood Warning', 'Heavy rainfall causing flash floods in low-lying areas.', 'warning', 'flood', 'MH', 'Mumbai, Maharashtra', 'Municipal Corp', true),
('Power Grid Maintenance', 'Scheduled maintenance in North Grid. Possible power cuts.', 'info', 'infrastructure', 'DL', 'Delhi NCR', 'Power Grid Corp', true),
('Earthquake - 4.2 Magnitude', 'Moderate earthquake recorded. No damage reported.', 'warning', 'earthquake', 'UK', 'Uttarakhand', 'National Seismology', true),
('Security Advisory', 'Heightened security alert in border areas.', 'warning', 'security', 'JK', 'J&K Border', 'BSF', true),
('Air Quality Emergency', 'AQI exceeds 400. Avoid outdoor activities.', 'critical', 'health', 'DL', 'Delhi NCR', 'CPCB', true),
('Heat Wave Alert', 'Severe heat wave conditions. Temperature above 45°C.', 'critical', 'other', 'RJ', 'Rajasthan', 'IMD', true),
('Railway Disruption', 'Train services delayed due to signal failure.', 'warning', 'infrastructure', 'MH', 'Mumbai Central', 'Railways', true),
('Heavy Rain Warning', 'Very heavy rainfall expected. Stay indoors.', 'warning', 'flood', 'KL', 'Kerala', 'IMD', true),
('Landslide Alert', 'Landslide warning issued for hill stations.', 'warning', 'other', 'HP', 'Himachal Pradesh', 'Disaster Management', true),
('Drought Advisory', 'Severe drought conditions affecting crop yields.', 'warning', 'other', 'MP', 'Madhya Pradesh', 'Agriculture Dept', true),
('Forest Fire Alert', 'Active forest fires detected. Evacuation orders issued.', 'critical', 'other', 'UK', 'Uttarakhand', 'Forest Department', true),
('Tsunami Watch', 'Tsunami watch issued for coastal areas.', 'warning', 'other', 'TN', 'Tamil Nadu Coast', 'INCOIS', true),
('Industrial Accident', 'Chemical leak reported at industrial facility.', 'critical', 'health', 'GJ', 'Ahmedabad, Gujarat', 'Pollution Board', true),
('Transport Strike', 'State-wide transport strike affecting public transport.', 'info', 'infrastructure', 'WB', 'West Bengal', 'Transport Union', true),
('Cyber Security Alert', 'Increased cyber threats detected in government systems.', 'warning', 'security', 'KA', 'Bengaluru, Karnataka', 'CERT-In', true);

-- Insert sample economic data
INSERT INTO economic_data (metric_name, value, unit, period, state_code, source) VALUES
('BSE Sensex', 73847.35, 'Points', '2024-Q2', NULL, 'BSE'),
('NSE Nifty', 22327.85, 'Points', '2024-Q2', NULL, 'NSE'),
('INR/USD', 83.47, 'INR', '2024-Q2', NULL, 'RBI'),
('GDP Growth', 6.8, 'Percent', '2024-Q2', NULL, 'NSO'),
('Inflation Rate', 4.75, 'Percent', '2024-Q2', NULL, 'RBI'),
('Unemployment Rate', 3.2, 'Percent', '2024-Q2', NULL, 'CMIE'),
('FDI Inflows', 18.5, 'Billion USD', '2024-Q2', NULL, 'DPIIT'),
('Exports', 447.5, 'Billion USD', '2024-Q2', NULL, 'DGFT'),
('Imports', 526.8, 'Billion USD', '2024-Q2', NULL, 'DGFT'),
('Forex Reserves', 651.2, 'Billion USD', '2024-Q2', NULL, 'RBI');

-- Insert sample AQI data
INSERT INTO aqi_data (city, state_code, aqi_value, pm25, pm10, category) VALUES
('Delhi', 'DL', 287, 178.5, 245.8, 'Poor'),
('Mumbai', 'MH', 154, 98.2, 134.7, 'Moderate'),
('Kolkata', 'WB', 198, 125.7, 167.4, 'Poor'),
('Chennai', 'TN', 89, 54.3, 78.6, 'Satisfactory'),
('Bengaluru', 'KA', 76, 45.1, 68.2, 'Satisfactory'),
('Hyderabad', 'TS', 132, 83.4, 112.8, 'Moderate'),
('Ahmedabad', 'GJ', 167, 105.2, 145.3, 'Moderate'),
('Pune', 'MH', 118, 72.8, 98.4, 'Moderate'),
('Jaipur', 'RJ', 203, 128.9, 176.7, 'Poor'),
('Lucknow', 'UP', 245, 154.3, 198.2, 'Poor'),
('Kanpur', 'UP', 267, 167.8, 223.1, 'Poor'),
('Nagpur', 'MH', 143, 89.5, 124.6, 'Moderate'),
('Indore', 'MP', 156, 97.3, 138.7, 'Moderate'),
('Thane', 'MH', 134, 82.1, 108.9, 'Moderate'),
('Bhopal', 'MP', 167, 103.8, 145.2, 'Moderate'),
('Visakhapatnam', 'AP', 98, 61.2, 87.4, 'Satisfactory'),
('Pimpri-Chinchwad', 'MH', 128, 78.9, 104.6, 'Moderate'),
('Patna', 'BR', 234, 146.7, 189.3, 'Poor'),
('Vadodara', 'GJ', 145, 91.2, 126.8, 'Moderate'),
('Ludhiana', 'PB', 189, 118.4, 156.7, 'Moderate');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_states_code ON states(code);
CREATE INDEX IF NOT EXISTS idx_alerts_state_code ON alerts(state_code);
CREATE INDEX IF NOT EXISTS idx_alerts_severity ON alerts(severity);
CREATE INDEX IF NOT EXISTS idx_alerts_is_active ON alerts(is_active);
CREATE INDEX IF NOT EXISTS idx_aqi_data_state_code ON aqi_data(state_code);
CREATE INDEX IF NOT EXISTS idx_economic_data_metric ON economic_data(metric_name);
CREATE INDEX IF NOT EXISTS idx_economic_data_state ON economic_data(state_code);