import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="map" element={<div className="p-6">Live Map Fullscreen View</div>} />
          <Route path="traffic" element={<div className="p-6">Traffic Analysis View</div>} />
          <Route path="sensors" element={<div className="p-6">Sensor Management View</div>} />
          <Route path="predictions" element={<div className="p-6">ML Predictions View</div>} />
          <Route path="analytics" element={<div className="p-6">Historical Analytics View</div>} />
          <Route path="incidents" element={<div className="p-6">Incident Management View</div>} />
          <Route path="reports" element={<div className="p-6">Reports Generation View</div>} />
          <Route path="settings" element={<div className="p-6">System Settings View</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
