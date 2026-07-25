import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SensorsPage from './pages/SensorsPage';
import SettingsPage from './pages/SettingsPage';

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
              <Route index element={<DashboardPage />} />
              <Route path="map" element={<div className="p-6 text-white font-mono">Live Map Module Initializing...</div>} />
              <Route path="traffic" element={<div className="p-6 text-white font-mono">Traffic Module Initializing...</div>} />
              <Route path="sensors" element={<SensorsPage />} />
              <Route path="predictions" element={<div className="p-6 text-white font-mono">Predictions Module Initializing...</div>} />
              <Route path="analytics" element={<div className="p-6 text-white font-mono">Analytics Module Initializing...</div>} />
              <Route path="incidents" element={<div className="p-6 text-white font-mono">Incidents Module Initializing...</div>} />
              <Route path="reports" element={<div className="p-6 text-white font-mono">Reports Module Initializing...</div>} />
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
