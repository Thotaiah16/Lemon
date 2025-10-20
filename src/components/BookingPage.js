import React, { useState } from 'react';
import BookingForm from './BookingForm';

export default function BookingPage({ availableTimes, dispatch, submitForm }) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <main className="site-main" role="main" aria-labelledby="booking-heading">
      <h1 id="booking-heading">Reservations</h1>
      <p>Please fill out the form below to make a reservation at Little Lemon.</p>
      
      {/* Help Button - Right aligned, rectangular */}
      <div style={{textAlign: 'right', marginBottom: '20px'}}>
        <button
          type="button"
          onClick={() => setShowHelp(!showHelp)}
          style={{
            backgroundColor: '#495e57',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            borderRadius: '6px'
          }}
          aria-label="Help"
          title="Need help?"
        >
          ? Help
        </button>
      </div>

      {showHelp && (
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          marginBottom: '20px',
          borderRadius: '8px',
          border: '2px solid #495e57',
          position: 'relative'
        }}>
          <button
            onClick={() => setShowHelp(false)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '5px 12px',
              borderRadius: '4px',
              fontWeight: 'bold'
            }}
          >
            ✕
          </button>
          <h2 style={{color: '#495e57', marginTop: 0}}>📖 Booking Help</h2>
          <h3>How to Make a Reservation:</h3>
          <ol>
            <li>Choose Date: Click the calendar to select your date</li>
            <li>Choose Time: Select from available time slots</li>
            <li>Number of Guests: Enter between 1 and 10 guests</li>
            <li>Occasion: Select Birthday or Anniversary</li>
            <li>Submit: Click "Make Your reservation"</li>
          </ol>
          <h3>Why are some times unavailable?</h3>
          <ul>
            <li>They have been previously booked</li>
            <li>The restaurant is closed</li>
            <li>Maximum capacity reached</li>
          </ul>
        </div>
      )}

      <BookingForm availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />
    </main>
  );
}
