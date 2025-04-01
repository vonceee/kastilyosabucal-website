// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaClipboardList,
  FaCalendarAlt,
  FaUser,
  FaSignOutAlt,
  FaQuestionCircle,
} from 'react-icons/fa';
import '../styles/side-menu.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2 className="brand-name">Kastilyo sa Bucal</h2>
      </div>
      <div className="sidebar-section">
        <h6>Main</h6>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="dashboard">
              <FaTachometerAlt className="sidebar-icon" />
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="reservations">
              <FaClipboardList className="sidebar-icon" />
              Reservations
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="calendar">
              <FaCalendarAlt className="sidebar-icon" />
              Calendar
            </Link>
          </li>
        </ul>
      </div>
      <div className="sidebar-section">
        <h6>Account</h6>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              <FaUser className="sidebar-icon" />
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/logout">
              <FaSignOutAlt className="sidebar-icon" />
              Logout
            </Link>
          </li>
        </ul>
      </div>
      <div className="sidebar-help">
        <Link className="help-link" to="/help">
          <FaQuestionCircle className="sidebar-icon" />
          Help
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
