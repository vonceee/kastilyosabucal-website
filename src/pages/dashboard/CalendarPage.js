// src/pages/dashboard/CalendarPage.js
import React, { useState } from 'react';
import ReactCalendar from 'react-calendar'; // renamed import to avoid conflicts
import 'react-calendar/dist/Calendar.css';
import '../../styles/Calendar.css';

function CalendarPage() {
  // Local state for the selected date on the calendar
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Sample reservations data for the photo venue rental business
  const reservations = [
    {
      id: 1,
      date: '2025-05-01',
      timeSlot: '10:00 AM - 12:00 PM',
      venue: 'Garden View Venue',
      specialRequests: 'Need extra lighting setup',
    },
    {
      id: 2,
      date: '2025-05-05',
      timeSlot: '2:00 PM - 4:00 PM',
      venue: 'Riverside Venue',
      specialRequests: 'Include props for photoshoot',
    },
  ];

  // Filter reservations for the selected date
  const reservationsForSelectedDate = reservations.filter((reservation) => {
    const resDate = new Date(reservation.date);
    return (
      resDate.getFullYear() === selectedDate.getFullYear() &&
      resDate.getMonth() === selectedDate.getMonth() &&
      resDate.getDate() === selectedDate.getDate()
    );
  });

  return (
    <div className="calendar-page">
      <h1>Calendar</h1>
      <div className="calendar-container">
        <ReactCalendar onChange={setSelectedDate} value={selectedDate} />
      </div>
      <div className="reservations-for-date">
        <h2>Reservations for {selectedDate.toLocaleDateString()}</h2>
        {reservationsForSelectedDate.length > 0 ? (
          reservationsForSelectedDate.map((reservation) => (
            <div key={reservation.id} className="reservation-card">
              <h3>{reservation.venue}</h3>
              <p>
                <strong>Time Slot:</strong> {reservation.timeSlot}
              </p>
              <p>
                <strong>Special Requests:</strong> {reservation.specialRequests}
              </p>
            </div>
          ))
        ) : (
          <p>No reservations for this day.</p>
        )}
      </div>
    </div>
  );
}

export default CalendarPage;
