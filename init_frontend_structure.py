import os

base_dir = r"C:\Users\Dell\Desktop\Adamya\Projects\SYNAPSE\frontend\src"

folders = [
    "api",
    "assets",
    "components/common",
    "components/map",
    "components/widgets",
    "constants",
    "context",
    "features/dashboard",
    "features/traffic",
    "features/sensors",
    "features/incidents",
    "features/predictions",
    "features/analytics",
    "features/alerts",
    "features/ai-models",
    "features/settings",
    "hooks",
    "layouts",
    "pages",
    "routes",
    "services",
    "store",
    "styles",
    "types",
    "utils"
]

for folder in folders:
    os.makedirs(os.path.join(base_dir, folder), exist_ok=True)

tailwind_config = """/** @type {import('tailwindcss').Config} */
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
"""

with open(r"C:\Users\Dell\Desktop\Adamya\Projects\SYNAPSE\frontend\tailwind.config.js", "w") as f:
    f.write(tailwind_config)

index_css = """@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background-dark text-white font-sans antialiased;
  }
}

@layer components {
  .glass-panel {
    @apply bg-panel-glass backdrop-blur-md border border-gray-800/50 shadow-2xl rounded-xl;
  }
}
"""

with open(r"C:\Users\Dell\Desktop\Adamya\Projects\SYNAPSE\frontend\src\index.css", "w") as f:
    f.write(index_css)

print("Frontend structure and tailwind config initialized.")
