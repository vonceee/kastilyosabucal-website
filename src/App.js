// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DashboardLayout from './components/DashboardLayout';
import CustomerDashboard from './pages/dashboard/CustomerDashboard';
import Reservations from './pages/dashboard/Reservations';
import Calendar from './pages/dashboard/CalendarPage';
import Profile from './pages/dashboard/Profile';

import './App.css';

function App() {
  return (
    <Router basename="/kastilyosabucal-website">
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
