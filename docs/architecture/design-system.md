# SYNAPSE Design System

The SYNAPSE platform targets an ultra-modern, high-tech aesthetic suitable for a Smart City Command Center. The visual language is inspired by systems like NASA Mission Control and Palantir Gotham.

## Core Aesthetic Principles
1. **Dark Theme Default**: Reduces eye strain for operators monitoring screens 24/7.
2. **Glassmorphism**: Extensive use of translucent panels with background blur (`backdrop-blur-md`) to maintain the context of the underlying live map while reading data.
3. **High Contrast Typography**: Clean, legible, monospaced fonts for numerical data, and modern sans-serif for UI elements.
4. **Micro-animations**: Smooth, subtle transitions (via Framer Motion) to indicate system activity without distracting the operator.

## Color Palette (Tailwind Tokens)

### Backgrounds
- `bg-background-dark`: `#0a0b10` (Deep space black)
- `bg-panel-glass`: `rgba(20, 22, 37, 0.65)` (Translucent navy)
- `bg-sidebar`: `#0f111a`

### Accents (Neon Highlights)
- `text-cyber-blue`: `#00f0ff` (Primary interactive elements, active sensors)
- `text-neon-purple`: `#a020f0` (AI/ML indicators, predictions)
- `text-alert-red`: `#ff2a2a` (Critical incidents)
- `text-warning-orange`: `#ff9900` (Traffic congestion)
- `text-success-green`: `#00ff66` (Healthy systems)

### Typography
- **Primary Font**: `Inter` (Standard UI text)
- **Data/Numerics Font**: `JetBrains Mono` or `Roboto Mono` (For coordinates, telemetry, timestamps)

## UI Component Specifications

### Glassmorphism Panel Class
A standard utility class applied to all hovering widgets and cards over the map:
```css
.glass-panel {
  @apply bg-opacity-60 bg-[#141625] backdrop-blur-md border border-gray-800/50 shadow-2xl rounded-xl;
}
```

### Data Visualizations (Chart.js)
- Charts should use grid lines with 10% opacity.
- Tooltips should utilize the `glass-panel` styling.
- Line charts representing predictions should use gradient strokes transitioning from `cyber-blue` to `neon-purple`.

### Live Map Styling
- **Base Map**: Mapbox Dark or a custom styled Leaflet grid without labels (to reduce clutter).
- **Heatmap**: Gradients running from transparent -> green -> yellow -> red to indicate traffic volume.
