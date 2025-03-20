import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CustomerDashboard from './pages/dashboard/CustomerDashboard';

import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <Router basename="/kastilyosabucal-website">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages/dashboard/customer-dashboard" element={<CustomerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
