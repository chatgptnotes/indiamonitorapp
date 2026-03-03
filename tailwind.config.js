/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00F0FF',
        'primary-light': '#67F7FF',
        'primary-dark': '#00B8C4',
        secondary: '#A855F7',
        success: '#00FF88',
        warning: '#FFB800',
        danger: '#FF3366',
        'cyber-bg': '#0A0E1A',
        'cyber-surface': '#111827',
        'cyber-card': '#1A1F2E',
        'cyber-border': '#2A2F3E',
        'neon-cyan': '#00F0FF',
        'neon-magenta': '#FF00FF',
        'neon-green': '#00FF88',
        'neon-amber': '#FFB800',
        'deep-navy': '#0A0E1A',
        'electric-blue': '#00F0FF',
        'alert-red': '#FF3366',
        'amber': '#FFB800',
      },
      fontFamily: {
        'mono': ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'card': '0 0 15px rgba(0, 240, 255, 0.05)',
        'card-hover': '0 0 25px rgba(0, 240, 255, 0.15)',
        'card-lg': '0 0 40px rgba(0, 240, 255, 0.1)',
        'neon-cyan': '0 0 20px rgba(0, 240, 255, 0.3)',
        'neon-magenta': '0 0 20px rgba(255, 0, 255, 0.3)',
        'neon-green': '0 0 20px rgba(0, 255, 136, 0.3)',
      },
    },
  },
  plugins: [],
}
