/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-dark': '#0a0b10',
        'panel-glass': 'rgba(20, 22, 37, 0.65)',
        'sidebar': '#0f111a',
        'cyber-blue': '#00f0ff',
        'neon-purple': '#a020f0',
        'alert-red': '#ff2a2a',
        'warning-orange': '#ff9900',
        'success-green': '#00ff66'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Roboto Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
