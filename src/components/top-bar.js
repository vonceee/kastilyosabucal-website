// src/components/TopBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBook, FaBell } from 'react-icons/fa';
import sampleProfile from '../assets/profile/sample-profile.jpg';

function TopBar({ onBookClick }) {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <Link to="/dashboard" className="top-nav-link">
          <FaHome className="top-nav-icon" />
          Home
        </Link>
        {/* Use a button to trigger the appointment modal */}
        <button
          className="top-nav-link"
          onClick={onBookClick}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <FaBook className="top-nav-icon" />
          Book
        </button>
      </div>
      <div className="top-bar-right">
        <FaBell className="notification-icon" />
        <img src={sampleProfile} alt="Profile" className="profile-pic" />
      </div>
    </div>
  );
}

export default TopBar;
  