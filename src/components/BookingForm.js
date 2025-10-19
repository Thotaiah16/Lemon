import React, { useState, useRef, useEffect } from 'react';
import './BookingForm.css';

export default function BookingForm({ 
  availableTimes = ['17:00','18:00','19:00','20:00','21:00','22:00'], 
  dispatch = () => {},
  submitForm 
}) {
  // Controlled form state
  const [date, setDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState(() => new Date());
  const [time, setTime] = useState('17:00');
  const [guests, setGuests] = useState(1);
  const [guestError, setGuestError] = useState('');
  const [occasion, setOccasion] = useState('Birthday');

  // Keep a local copy of available times so we can optimistically remove a
  // booked time immediately, preventing immediate duplicate bookings while
  // the parent reducer also updates.
  const [localTimes, setLocalTimes] = useState(availableTimes);

  // Keep localTimes in sync when the parent provides new availableTimes.
  useEffect(() => {
    const at = availableTimes || [];
    setLocalTimes(at);
    // update selected time to first available when the parent updates
    // Only check if time is invalid when availableTimes changes
    setTime(prevTime => {
      if (at.length && !at.includes(prevTime)) {
        return at[0];
      }
      return prevTime;
    });
  }, [availableTimes]);

  // availableTimes is now provided via props (lifted to Main)

  // UI state for custom pickers
  const [showTimeList, setShowTimeList] = useState(false);
  const [showOccasionList, setShowOccasionList] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const calendarRef = useRef(null);
  const timeRef = useRef(null);
  const occasionRef = useRef(null);

  useEffect(() => {
    function handleDocClick(e) {
      if (timeRef.current && !timeRef.current.contains(e.target)) {
        setShowTimeList(false);
      }
      if (occasionRef.current && !occasionRef.current.contains(e.target)) {
        setShowOccasionList(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(e.target) && e.target.id !== 'res-date') {
        setShowCalendar(false);
      }
    }
    document.addEventListener('click', handleDocClick);
    return () => document.removeEventListener('click', handleDocClick);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    
    // Validate required fields
    if (!date) {
      alert('Please choose a date for your reservation.');
      return;
    }

    // Before attempting submit, ensure the selected time is still available
    // locally. This avoids double-booking the same time when it's already
    // been removed.
    if (!localTimes.includes(time)) {
      alert('The selected time is no longer available. Please choose a different time.');
      return;
    }

    // Prepare form data
    const formData = { date, time, guests, occasion };

    // Use the submitForm function passed from Main component
    (async () => {
      setSubmitting(true);
      
      try {
        // Call submitForm which handles API submission and navigation
        const success = submitForm ? await submitForm(formData) : true;
        
        if (success) {
          console.log('Reservation submitted:', formData);
          
          // Inform parent that a time has been booked so shared availableTimes can update
          try {
            dispatch({ type: 'book-time', date, time });
            // Also remove it optimistically from the localTimes used by this form
            setLocalTimes((prev) => prev.filter((t) => t !== time));
          } catch (err) {
            // ignore if dispatch not provided
          }
          
          // Reset form (form will be reset before navigation, but this handles cases where navigation fails)
          setDate('');
          setTime((localTimes && localTimes.length) ? localTimes[0] : '');
          setGuests(1);
          setOccasion('Birthday');
        } else {
          alert('Failed to submit reservation. Please try again.');
        }
      } catch (err) {
        console.error('Error submitting form:', err);
        alert('Failed to submit reservation. Please try again.');
      } finally {
        setSubmitting(false);
      }
    })();
  }

  // Helpers for custom calendar popup
  function formatDateForInput(d) {
    if (!d) return '';
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  function formatDateDisplay(d) {
    if (!d) return '';
    return d.toLocaleDateString();
  }

  function startOfMonth(d) {
    return new Date(d.getFullYear(), d.getMonth(), 1);
  }

  function getMonthMatrix(d) {
    const start = startOfMonth(d);
    const startDay = start.getDay();
    const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    const weeks = [];
    let week = new Array(7).fill(null);
    let dayCounter = 1;
    for (let i = startDay; i < 7; i++) {
      week[i] = new Date(d.getFullYear(), d.getMonth(), dayCounter++);
    }
    weeks.push(week);
    while (dayCounter <= daysInMonth) {
      week = new Array(7).fill(null);
      for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
        week[i] = new Date(d.getFullYear(), d.getMonth(), dayCounter++);
      }
      weeks.push(week);
    }
    return weeks;
  }

  function handleDateSelect(d) {
    const newDate = formatDateForInput(d);
    setDate(newDate);
    // inform parent reducer about date change so availableTimes can be updated
    try {
      dispatch({ type: 'date-changed', date: newDate });
    } catch (err) {
      // dispatch may not be provided in some contexts; ignore safely
    }
    setShowCalendar(false);
  }

  function prevMonth() {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1));
  }

  function nextMonth() {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1));
  }

  return (
    <div className="booking-form-wrapper">
      <form onSubmit={handleSubmit} className="booking-form" aria-label="Booking form">
        <label htmlFor="res-date">Choose date</label>
        <div className="date-input-wrapper" ref={calendarRef}>
          <input
            type="text"
            id="res-date"
            readOnly
            value={date ? formatDateDisplay(new Date(date)) : ''}
            placeholder="Select date"
            onClick={() => setShowCalendar((s) => !s)}
          />
          <button type="button" className="calendar-toggle" onClick={() => setShowCalendar((s) => !s)} aria-label="Toggle calendar">📅</button>
          {showCalendar && (
            <div className="calendar-popup" role="dialog" aria-modal="false">
              <div className="calendar-header">
                <button type="button" onClick={prevMonth} className="cal-nav">◀</button>
                <div className="cal-month">{calendarDate.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
                <button type="button" onClick={nextMonth} className="cal-nav">▶</button>
              </div>
              <div className="calendar-grid">
                <div className="calendar-weekday">Sun</div>
                <div className="calendar-weekday">Mon</div>
                <div className="calendar-weekday">Tue</div>
                <div className="calendar-weekday">Wed</div>
                <div className="calendar-weekday">Thu</div>
                <div className="calendar-weekday">Fri</div>
                <div className="calendar-weekday">Sat</div>
                {getMonthMatrix(calendarDate).map((week, wi) =>
                  week.map((day, di) => {
                    // Get today's date at midnight for comparison
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    // Check if the day is in the past
                    const isPast = day && day < today;

                    return (
                      <div
                        key={`${wi}-${di}`}
                        className={`calendar-cell ${day ? '' : 'empty'} ${isPast ? 'disabled' : ''}`}
                        onClick={() => day && !isPast && handleDateSelect(day)}
                        role="button"
                        tabIndex={day && !isPast ? 0 : -1}
                        style={isPast ? { cursor: 'not-allowed', opacity: 0.4 } : {}}
                      >
                        {day ? day.getDate() : ''}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        <label htmlFor="res-time">Choose time</label>
        <div className="select-wrapper" ref={timeRef}>
          <button
            type="button"
            className="select-toggle"
            onClick={() => setShowTimeList((s) => !s)}
            aria-haspopup="listbox"
            disabled={!localTimes || localTimes.length === 0}
          >
            {localTimes && localTimes.length > 0 ? time : 'No times available'}
            <span className="select-arrow">▾</span>
          </button>
          {showTimeList && (
            <div className="select-popup" role="listbox">
              {localTimes && localTimes.length > 0 ? (
                localTimes.map((t) => (
                  <div
                    key={t}
                    className="select-option"
                    role="option"
                    aria-selected={time === t}
                    onClick={() => { setTime(t); setShowTimeList(false); }}
                  >
                    {t}
                  </div>
                ))
              ) : (
                <div className="select-option" style={{color: '#999', cursor: 'default'}}>
                  No times available for this date
                </div>
              )}
            </div>
          )}
        </div>
        {date && localTimes && localTimes.length === 0 && (
          <div style={{color: '#d63031', fontSize: '14px', marginTop: '4px'}}>
            ⚠ All times are booked for this date. Please select another date.
          </div>
        )}

        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          id="guests"
          placeholder="1"
          min="1"
          max="10"
          value={guests}
          onChange={(e) => {
            const raw = e.target.value;
            // parse to number; keep 0 if empty / invalid
            const n = raw === '' ? 0 : Number(raw);
            setGuests(Number.isNaN(n) ? 0 : n);
            if (n < 1 || n > 10 || Number.isNaN(n)) {
              setGuestError('Value must be between 1 and 10.');
            } else {
              setGuestError('');
            }
          }}
          aria-describedby="guests-help"
        />
        {guestError && (
          <div id="guests-help" className="validation-message" role="alert" aria-live="assertive">
            {guestError}
          </div>
        )}

        <label htmlFor="occasion">Occasion</label>
        <div className="select-wrapper" ref={occasionRef}>
          <button type="button" className="select-toggle" onClick={() => setShowOccasionList((s) => !s)} aria-haspopup="listbox">
            {occasion}
            <span className="select-arrow">▾</span>
          </button>
          {showOccasionList && (
            <div className="select-popup" role="listbox">
              {['Birthday', 'Anniversary'].map((o) => (
                <div
                  key={o}
                  className="select-option"
                  role="option"
                  aria-selected={occasion === o}
                  onClick={() => { setOccasion(o); setShowOccasionList(false); }}
                >
                  {o}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
          <input 
            type="submit" 
            value={submitting ? "Submitting..." : "Make Your reservation"} 
            disabled={submitting || !date || !localTimes || localTimes.length === 0 || guests < 1 || guests > 10} 
          />
        </div>
      </form>
    </div>
  );
}
