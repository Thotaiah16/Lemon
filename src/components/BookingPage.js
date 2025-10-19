import React from 'react';
import BookingForm from './BookingForm';

export default function BookingPage({ availableTimes, dispatch, submitForm }) {
  return (
    <main className="site-main">
      <h2>Reservations</h2>
      <p>Please fill out the form below to make a reservation.</p>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />
    </main>
  );
}
