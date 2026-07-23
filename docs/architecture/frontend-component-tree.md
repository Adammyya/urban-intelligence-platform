# SYNAPSE Frontend Component Architecture

The React application is structured using a feature-based architecture to ensure scalability. Below is the primary component hierarchy.

```mermaid
graph TD
    %% Root Application
    App[App.tsx - Root Provider] --> Router[React Router]
    
    %% Providers
    App -.-> QueryClient[React Query Provider]
    App -.-> WebSocketCtx[WebSocket Context]
    App -.-> ThemeCtx[Theme Provider]

    %% Layouts
    Router --> AppLayout[Main Dashboard Layout]
    Router --> AuthLayout[Authentication Layout]

    AuthLayout --> Login[Login Page]

    %% Main Dashboard Structure
    AppLayout --> Sidebar[Sidebar Navigation Component]
    AppLayout --> TopBar[Top Bar Component]
    AppLayout --> MainContent[Main Content Area]

    %% Top Bar Children
    TopBar --> Search[Global Search Widget]
    TopBar --> Weather[Weather Widget]
    TopBar --> Notif[Notification Bell]
    TopBar --> Profile[User Profile Dropdown]

    %% Views/Pages within Main Content
    MainContent --> DashboardView[Command Center View]
    MainContent --> LiveMapView[Full Map View]
    MainContent --> MLResearchView[AI Models / Research View]
    MainContent --> AnalyticsView[Analytics & Reports View]

    %% Command Center Widgets
    DashboardView --> MapWidget[Live Map Component]
    DashboardView --> PredWidget[Prediction Panel]
    DashboardView --> AlertWidget[Live Alert Feed]
    DashboardView --> HealthWidget[System Health Monitor]

    %% Map Interactions
    MapWidget --> MapLayer[Base Vector Map]
    MapWidget --> HeatmapLayer[Traffic Heatmap Overlay]
    MapWidget --> SensorMarkers[Sensor Geo-Markers]
    MapWidget --> IncidentPolygons[Incident Zone Polygons]
```

## State Management Strategy
- **Server State**: Managed by `TanStack React Query` for fetching, caching, and synchronizing REST API data.
- **Real-time State**: Managed by standard React Context bound to a `Socket.io` client instance for live push events.
- **Client/UI State**: Managed by `Zustand` (minimal, fast) for UI interactions like toggling the sidebar, opening modals, or changing the map viewport.
