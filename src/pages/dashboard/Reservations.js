// src/components/Reservations.js
import React from 'react';
import '../../styles/Reservations.css';

function Reservations() {
  // Sample reservations data for a photo venue rental business
  const reservations = [
    {
      id: 1,
      date: '2025-05-01',
      timeSlot: '10:00 AM - 12:00 PM',
      status: 'Pending',
      venue: 'Garden View Venue',
      specialRequests: 'Need extra lighting setup',
    },
    {
      id: 2,
      date: '2025-05-05',
      timeSlot: '2:00 PM - 4:00 PM',
      status: 'Request Cancel',
      venue: 'Riverside Venue',
      specialRequests: 'Include props for photoshoot',
    },
  ];

  return (
    <div className="reservations-page">
      <h1>Your Venue Reservations</h1>
      <div className="reservations-list">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="reservation-card">
            <div className="reservation-info">
              <h3>{reservation.venue}</h3>
              <p>
                <strong>Date:</strong> {reservation.date}
              </p>
              <p>
                <strong>Time Slot:</strong> {reservation.timeSlot}
              </p>
              <p>
                <strong>Special Requests:</strong> {reservation.specialRequests}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <span
                  className={`status ${reservation.status.toLowerCase().replace(' ', '-')}`}
                >
                  {reservation.status}
                </span>
              </p>
            </div>
            <div className="reservation-actions">
              {reservation.status === 'Pending' && (
                <button className="cancel-button">Request Cancel</button>
              )}
              {reservation.status === 'Request Cancel' && (
                <button className="info-button" disabled>
                  Cancellation Requested
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reservations;
