import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SensorsPage from './pages/SensorsPage';
import SettingsPage from './pages/SettingsPage';
import MissionControlPage from './pages/MissionControlPage';
import TrafficPage from './pages/TrafficPage';
import IncidentsPage from './pages/IncidentsPage';
import PredictionsPage from './pages/PredictionsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ReportsPage from './pages/ReportsPage';
import MapPage from './pages/MapPage';

function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected OS Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Navigate to="/mission-control" replace />} />
              <Route path="mission-control" element={<MissionControlPage />} />
              <Route path="map" element={<MapPage />} />
              <Route path="traffic" element={<TrafficPage />} />
              <Route path="sensors" element={<SensorsPage />} />
              <Route path="predictions" element={<PredictionsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="incidents" element={<IncidentsPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
