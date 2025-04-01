// src/components/Reservations.js
import React, { useEffect, useState } from 'react';
import '../../styles/Reservations.css';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        // Query the 'bookings' collection and order by creation date descending
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
    return (
      <div className="reservations-page">
        <p>Loading reservations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reservations-page">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="reservations-page">
      <h1>Your Reservations</h1>
      <div className="reservations-list">
        {reservations.length === 0 ? (
          <p>No reservations found.</p>
        ) : (
          reservations.map((reservation) => (
            <div key={reservation.id} className="reservation-card">
              <div className="reservation-info">
                {/* Show the reservation date as header */}
                <h3>{reservation.date || "N/A"}</h3>
                <p>
                  <strong>Time Slot:</strong> {reservation.timeSlot || "N/A"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`status ${ (reservation.status || "pending").toLowerCase().replace(' ', '-') }`}>
                    {reservation.status || "Pending"}
                  </span>
                </p>
              </div>
              <div className="reservation-actions">
                {(reservation.status || "Pending") === 'Pending' && (
                  <button className="cancel-button">Request Cancel</button>
                )}
                {(reservation.status || "Pending") === 'Request Cancel' && (
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
