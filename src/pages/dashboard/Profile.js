// src/components/Profile.js
import React from 'react';
import '../../styles/Profile.css';
import sampleProfile from '../../assets/profile/sample-profile.jpg';

function Profile() {
  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="profile-details">
        <img src={sampleProfile} alt="Profile" className="profile-pic" />
        <div className="profile-info">
          <h2>Your Name</h2>
          <p>Email: your.email@example.com</p>
          <p>Member since: January 2023</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
