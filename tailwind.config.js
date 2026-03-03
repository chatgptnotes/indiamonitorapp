/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Professional light theme colors
        primary: '#1E40AF',        // Main blue
        'primary-light': '#3B82F6', // Lighter blue
        'primary-dark': '#1E3A8A',  // Darker blue
        secondary: '#64748B',       // Gray-blue
        success: '#10B981',         // Green
        warning: '#F59E0B',         // Orange
        danger: '#EF4444',          // Red
        'gray-50': '#F8FAFC',
        'gray-100': '#F1F5F9',
        'gray-200': '#E2E8F0',
        'gray-300': '#CBD5E1',
        'gray-400': '#94A3B8',
        'gray-500': '#64748B',
        'gray-600': '#475569',
        'gray-700': '#334155',
        'gray-800': '#1E293B',
        'gray-900': '#0F172A',
        // Legacy colors for backward compatibility (will be replaced)
        'deep-navy': '#FFFFFF',      // Now white
        'electric-blue': '#1E40AF',   // Now primary blue
        'neon-green': '#10B981',      // Now success green
        'alert-red': '#EF4444',       // Now danger red
        'amber': '#F59E0B',           // Now warning orange
      },
      fontFamily: {
        'mono': ['Fira Code', 'monospace'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}