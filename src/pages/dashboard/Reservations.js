// src/components/Reservations.js
import React, { useEffect, useState } from 'react';
import '../../styles/Reservations.css';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch reservations from Firestore
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        // Create a query to get all bookings; you can add filters (e.g., by user) if needed
        const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const reservationsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReservations(reservationsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching reservations:", err);
        setError("Error fetching reservations. Please try again later.");
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return <div className="reservations-page"><p>Loading reservations...</p></div>;
  }

  if (error) {
    return <div className="reservations-page"><p className="error-message">{error}</p></div>;
  }

  return (
    <div className="reservations-page">
      <h1>Your Venue Reservations</h1>
      <div className="reservations-list">
        {reservations.length === 0 ? (
          <p>No reservations found.</p>
        ) : (
          reservations.map((reservation) => (
            <div key={reservation.id} className="reservation-card">
              <div className="reservation-info">
                <h3>{reservation.venue || "N/A"}</h3>
                <p>
                  <strong>Date:</strong> {reservation.date || "N/A"}
                </p>
                <p>
                  <strong>Time Slot:</strong> {reservation.timeSlot || "N/A"}
                </p>
                <p>
                  <strong>Special Requests:</strong> {reservation.specialRequests || "None"}
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span
                    className={`status ${reservation.status?.toLowerCase().replace(' ', '-') || ''}`}
                  >
                    {reservation.status || "N/A"}
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
          ))
        )}
      </div>
    </div>
  );
}

export default Reservations;
