// src/components/CustomerDashboard.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FaTachometerAlt,
  FaClipboardList,
  FaCalendarAlt,
  FaUser,
  FaSignOutAlt,
  FaBell,
  FaHome,
  FaBook,
  FaQuestionCircle,
} from 'react-icons/fa';
import '../../styles/CustomerDashboard.css';
import sampleProfile from '../../assets/profile/sample-profile.jpg';

function CustomerDashboard() {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Brand Name at the top of the sidebar */}
        <div className="sidebar-logo">
          <h2 className="brand-name">Kastilyo sa Bucal</h2>
        </div>

        <div className="sidebar-section">
          <h6>Main</h6>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">
                <FaTachometerAlt className="sidebar-icon" />
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/reservations">
                <FaClipboardList className="sidebar-icon" />
                Reservations
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/calendar">
                <FaCalendarAlt className="sidebar-icon" />
                Calendar
              </a>
            </li>
          </ul>
        </div>
        <div className="sidebar-section">
          <h6>Account</h6>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link" href="/profile">
                <FaUser className="sidebar-icon" />
                Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/logout">
                <FaSignOutAlt className="sidebar-icon" />
                Logout
              </a>
            </li>
          </ul>
        </div>
        {/* Help Section at the Bottom */}
        <div className="sidebar-help">
          <a className="help-link" href="/help">
            <FaQuestionCircle className="sidebar-icon" />
            Help
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="top-bar-left">
            <a href="/dashboard" className="top-nav-link">
              <FaHome className="top-nav-icon" />
              Home
            </a>
            <a href="/book" className="top-nav-link">
              <FaBook className="top-nav-icon" />
              Book
            </a>
          </div>
          <div className="top-bar-right">
            <FaBell className="notification-icon" />
            <img src={sampleProfile} alt="Profile" className="profile-pic" />
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="breadcrumbs">
          <a href="/dashboard" className="breadcrumb-link">Home</a>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Dashboard</span>
        </div>

        <div className="content-area">
          <h1>Dashboard</h1>
          <p>
            {/* Additional dashboard content goes here */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
