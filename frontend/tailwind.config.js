/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // OS Backgrounds
        'os-graphite': '#050505',
        'os-panel': 'rgba(10, 10, 10, 0.65)',
        'os-border': 'rgba(255, 255, 255, 0.05)',
        
        // Semantic Palette
        'ai-violet': '#a020f0',
        'traffic-cyan': '#00f0ff',
        'alert-crimson': '#ff2a2a',
        'infra-emerald': '#00ff66',
        'warn-amber': '#ff9900',
        
        // Legacy (keeping for backwards compatibility during migration)
        'background-dark': '#0a0b10',
        'panel-glass': 'rgba(20, 22, 37, 0.65)',
        'sidebar': '#0f111a',
        'cyber-blue': '#00f0ff',
        'neon-purple': '#a020f0',
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
