// src/components/DashboardLayout.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideMenu from './side-menu';
import TopBar from './top-bar';
import AppointmentModal from './AppointmentModal'; // New component for appointment modal

function DashboardLayout() {
  // State for controlling the appointment modal visibility
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  // Handler to open the appointment modal when the user clicks Book
  const handleBookClick = (e) => {
    e.preventDefault();
    setShowAppointmentModal(true);
  };

  // Handler to close the appointment modal
  const handleCloseModal = () => {
    setShowAppointmentModal(false);
  };

  return (
    <div className="dashboard-container">
      <SideMenu />
      <div className="main-content">
        {/* Pass the book click handler to TopBar */}
        <TopBar onBookClick={handleBookClick} />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
      {/* Render the AppointmentModal only when showAppointmentModal is true */}
      {showAppointmentModal && (
        <AppointmentModal onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default DashboardLayout;
