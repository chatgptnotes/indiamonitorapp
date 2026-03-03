# IndiaMonitor.app

🇮🇳 **Real-time Intelligence Dashboard for India**

A comprehensive command center-style dashboard providing real-time insights into India's economy, environment, infrastructure, and emergency alerts.

## 🚀 Live Demo

- **Production:** https://indiamonitorapp.vercel.app
- **GitHub:** https://github.com/chatgptnotes/indiamonitorapp

## 🛠️ Tech Stack

- **Frontend:** React 19 + Vite + TypeScript + Tailwind CSS
- **Backend:** Supabase (Auth, Database, Storage, Real-time)
- **Deployment:** Vercel (Auto-deploy from GitHub)
- **Maps:** react-simple-maps with India TopoJSON
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Icons:** Lucide React

## ✨ Features

### 🎯 Landing Page
- Dark cyberpunk/command center aesthetic
- Animated hero with India silhouette
- Feature highlights and CTAs
- "Powered by drmhope.com | A Bettroi Product" footer

### 🔐 Authentication
- Supabase Auth with Email/Password
- Magic Link authentication
- Dark themed login/signup pages
- Protected routes with session management

### 📊 Main Dashboard (Command Center)
- **Interactive India Map:** All 28 states + 8 UTs with hover tooltips, color-coded metrics
- **Economy Panel:** Live BSE Sensex, NSE Nifty, INR/USD, GDP trends, sector breakdowns
- **Environment Panel:** AQI data for major cities, weather alerts, temperature monitoring
- **Emergency Alerts:** Scrolling alert ticker with critical/warning/info levels
- **Infrastructure Panel:** Power grid, railway, highway status monitoring

### 🗺️ State Detail Pages
- Click any state for detailed demographics, economy, environment data
- Interactive charts and trend analysis
- Recent alerts and statistics specific to each state

### 📈 Analytics Dashboard
- National trends over time (GDP, AQI, Population)
- State comparison charts
- Sector-wise economic breakdown
- Environmental indicators and trends

### ⚙️ Settings
- Profile management with avatar upload
- Notification preferences (alerts, email, push, reports)
- Appearance settings (theme, language, density, animations)
- Privacy & security controls
- Data export functionality

## 🗄️ Database Schema

**Tables:**
- `profiles` - User profile information
- `states` - All Indian states and UTs data (population, GDP, AQI, etc.)
- `alerts` - Emergency and system alerts
- `economic_data` - Market data, indices, economic indicators
- `aqi_data` - Air quality data for major cities

**Features:**
- Row Level Security (RLS) enabled on all tables
- Real-time subscriptions for live data updates
- Comprehensive seed data for all states/UTs

## 🎨 Design System

**Color Palette:**
- Deep Navy: `#0A0E1A` (Background)
- Electric Blue: `#00D4FF` (Primary)
- Neon Green: `#00FF88` (Success)
- Alert Red: `#FF3366` (Critical)
- Amber: `#FFB800` (Warning)

**Design Principles:**
- Dark mode by default
- Glassmorphism panels with subtle borders
- Monospace fonts for data/numbers
- Professional, high-density information display
- Mobile-first responsive design

## 🚀 Deployment

The application is automatically deployed to Vercel on every push to the main branch:

```bash
# Environment Variables (already configured)
VITE_SUPABASE_URL=https://zrayznjcskucudgpayos.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📱 Live Features

✅ **Landing page** with animated hero and feature showcase  
✅ **Authentication system** with email/password and magic links  
✅ **Interactive India map** with 36 states/UTs and real data  
✅ **Real-time economy dashboard** with simulated live market data  
✅ **Environmental monitoring** with AQI data for 20+ cities  
✅ **Emergency alerts system** with scrolling ticker  
✅ **Infrastructure monitoring** for power, railways, highways  
✅ **State detail pages** with comprehensive data and charts  
✅ **Analytics dashboard** with trends and comparisons  
✅ **Settings panel** with full customization options  
✅ **Mobile responsive** design across all components  
✅ **Database** fully seeded with realistic Indian data  

## 🔧 Development

```bash
# Clone the repository
git clone https://github.com/chatgptnotes/indiamonitorapp.git
cd indiamonitorapp

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod
```

## 📊 Data Sources

The application uses realistic mock data based on:
- **Economic:** BSE, NSE, RBI, NSO official data patterns
- **Environmental:** CPCB AQI standards and city data
- **Geographic:** Official Indian states/UTs with accurate capitals
- **Alerts:** Realistic emergency scenarios based on IMD, NDMA patterns

## 🎯 Future Enhancements

- Real API integrations with government data sources
- Advanced data visualization and forecasting
- User role-based access control
- Notification system integration
- Mobile app development
- Multi-language support (Hindi)

---

**Built with ❤️ for India** | Powered by drmhope.com | A Bettroi Product