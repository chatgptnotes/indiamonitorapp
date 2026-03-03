/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-navy': '#0A0E1A',
        'electric-blue': '#00D4FF',
        'neon-green': '#00FF88',
        'alert-red': '#FF3366',
        'amber': '#FFB800',
      },
      fontFamily: {
        'mono': ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}