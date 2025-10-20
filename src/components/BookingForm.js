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

  // Validation state
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');
  const [touched, setTouched] = useState({
    date: false,
    guests: false
  });

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

  // Validation functions
  const validateDate = (dateValue) => {
    if (!dateValue) {
      return 'Please select a date for your reservation.';
    }
    const selectedDate = new Date(dateValue);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      return 'Please select a date that is today or in the future.';
    }
    return '';
  };

  const validateGuests = (guestValue) => {
    if (!guestValue || guestValue === '' || guestValue === 0) {
      return 'Please enter the number of guests.';
    }
    const n = Number(guestValue);
    if (Number.isNaN(n) || n < 1) {
      return 'At least 1 guest is required.';
    }
    if (n > 10) {
      return 'Maximum 10 guests allowed.';
    }
    return '';
  };

  const validateTime = () => {
    if (!localTimes || localTimes.length === 0) {
      return 'No times available for this date. Please choose another date.';
    }
    if (!time) {
      return 'Please select a time for your reservation.';
    }
    return '';
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      date &&
      !validateDate(date) &&
      time &&
      localTimes &&
      localTimes.length > 0 &&
      guests >= 1 &&
      guests <= 10 &&
      !validateGuests(guests)
    );
  };

  // UI state for custom pickers
  const [showTimeList, setShowTimeList] = useState(false);
  const [showOccasionList, setShowOccasionList] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const calendarRef = useRef(null);
  const timeRef = useRef(null);
  const occasionRef = useRef(null);
  const abortControllerRef = useRef(null);

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
    
    // Mark all fields as touched
    setTouched({ date: true, guests: true });
    
    // Validate all fields
    const dateValidation = validateDate(date);
    const guestsValidation = validateGuests(guests);
    const timeValidation = validateTime();

    if (dateValidation) {
      setDateError(dateValidation);
      return;
    }

    if (timeValidation) {
      setTimeError(timeValidation);
      return;
    }

    if (guestsValidation) {
      setGuestError(guestsValidation);
      return;
    }

    // Before attempting submit, ensure the selected time is still available
    // locally. This avoids double-booking the same time when it's already
    // been removed.
    if (!localTimes.includes(time)) {
      setTimeError('The selected time is no longer available. Please choose a different time.');
      return;
    }

    // Prepare form data
    const formData = { date, time, guests, occasion };

    // Use the submitForm function passed from Main component
    (async () => {
      setSubmitting(true);
      setSubmitError('');
      abortControllerRef.current = new AbortController();
      
      try {
        // Add a small delay to show loading state (you can remove this in production)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Check if cancelled during delay
        if (abortControllerRef.current?.signal.aborted) {
          return;
        }
        
        // Call submitForm which handles API submission and navigation
        const success = submitForm ? await submitForm(formData) : true;

        // Check if cancelled
        if (abortControllerRef.current?.signal.aborted) {
          return;
        }

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
          setSubmitError('Failed to submit reservation. Please try again.');
        }
      } catch (err) {
        if (abortControllerRef.current?.signal.aborted) {
          return;
        }
        console.error('Error submitting form:', err);
        setSubmitError('Failed to submit reservation. Please try again.');
      } finally {
        if (!abortControllerRef.current?.signal.aborted) {
          setSubmitting(false);
        }
        abortControllerRef.current = null;
      }
    })();
  }

  // Add cancel function
  function handleCancel() {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setSubmitting(false);
      setSubmitError('');
    }
  }

  // Add reset function
  function handleReset() {
    setDate('');
    setTime(localTimes && localTimes.length > 0 ? localTimes[0] : '17:00');
    setGuests(1);
    setOccasion('Birthday');
    setDateError('');
    setTimeError('');
    setGuestError('');
    setSubmitError('');
    setTouched({ date: false, guests: false });
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
    setTouched(prev => ({ ...prev, date: true }));
    
    // Validate the selected date
    const error = validateDate(newDate);
    setDateError(error);
    
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
        <label htmlFor="res-date">Choose date *</label>
        <div className="date-input-wrapper" ref={calendarRef}>
          <input
            type="text"
            id="res-date"
            readOnly
            required
            value={date ? formatDateDisplay(new Date(date)) : ''}
            placeholder="Select date"
            onClick={() => setShowCalendar((s) => !s)}
            onBlur={() => setTouched(prev => ({ ...prev, date: true }))}
            aria-required="true"
            aria-invalid={touched.date && dateError ? "true" : "false"}
            aria-describedby={dateError ? "date-error" : undefined}
          />
          <button type="button" className="calendar-toggle" onClick={() => setShowCalendar((s) => !s)} aria-label="Toggle calendar">📅</button>
          {showCalendar && (
            <div className="calendar-popup" role="dialog" aria-modal="false">
              <div className="calendar-header">
                <button type="button" onClick={prevMonth} className="cal-nav" aria-label="Previous month">◀</button>
                <div className="cal-month">{calendarDate.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
                <button type="button" onClick={nextMonth} className="cal-nav" aria-label="Next month">▶</button>
              </div>
              <div style={{display: 'flex', justifyContent: 'center', padding: '8px 0'}}>
                <button 
                  type="button" 
                  onClick={() => {
                    const today = new Date();
                    handleDateSelect(today);
                  }}
                  style={{
                    padding: '4px 12px',
                    fontSize: '14px',
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                  aria-label="Select today's date"
                >
                  📅 Today
                </button>
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
        {touched.date && dateError && (
          <div id="date-error" className="validation-message" role="alert" aria-live="polite">
            ⚠ {dateError}
          </div>
        )}

        <label htmlFor="res-time">Choose time *</label>
        <div className="select-wrapper" ref={timeRef}>
          <button
            type="button"
            id="res-time"
            className={`select-toggle ${timeError ? 'has-error' : ''}`}
            onClick={() => setShowTimeList((s) => !s)}
            aria-haspopup="listbox"
            aria-describedby={timeError ? "time-error" : undefined}
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
                    onClick={() => { 
                      setTime(t); 
                      setShowTimeList(false);
                      setTimeError('');
                    }}
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
        {timeError && (
          <div id="time-error" className="validation-message" role="alert" aria-live="polite">
            ⚠ {timeError}
          </div>
        )}
        {date && localTimes && localTimes.length === 0 && !timeError && (
          <div className="validation-message" role="alert" aria-live="polite">
            ⚠ All times are booked for this date. Please select another date.
          </div>
        )}

        <label htmlFor="guests">Number of guests *</label>
        <input
          type="number"
          id="guests"
          placeholder="1"
          min="1"
          max="10"
          required
          value={guests}
          onChange={(e) => {
            const raw = e.target.value;
            // parse to number; keep 0 if empty / invalid
            const n = raw === '' ? 0 : Number(raw);
            setGuests(Number.isNaN(n) ? 0 : n);
            
            // Validate on change
            const error = validateGuests(n);
            setGuestError(error);
          }}
          onBlur={() => {
            setTouched(prev => ({ ...prev, guests: true }));
            const error = validateGuests(guests);
            setGuestError(error);
          }}
          aria-required="true"
          aria-invalid={touched.guests && guestError ? "true" : "false"}
          aria-describedby={guestError ? "guests-error" : "guests-help"}
        />
        {guestError && (
          <div id="guests-error" className="validation-message" role="alert" aria-live="polite">
            ⚠ {guestError}
          </div>
        )}
        {!guestError && (
          <div id="guests-help" style={{fontSize: '14px', color: '#666', marginTop: '4px'}}>
            Please enter a number between 1 and 10
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

        <div style={{display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', position: 'relative'}}>
          <div style={{position: 'relative', display: 'inline-block'}}>
            <input 
              type="submit" 
              value={submitting ? "Submitting..." : "Make Your reservation"} 
              disabled={submitting || !isFormValid()} 
              aria-disabled={submitting || !isFormValid()}
              style={{paddingLeft: submitting ? '40px' : '16px'}}
            />
            {submitting && (
              <span style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '16px',
                height: '16px',
                border: '2px solid #ffffff',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }} aria-hidden="true"></span>
            )}
          </div>
          {submitting && (
            <button 
              type="button" 
              onClick={handleCancel}
              style={{
                padding: '12px 20px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600'
              }}
              aria-label="Cancel reservation submission"
            >
              Cancel
            </button>
          )}
          {!isFormValid() && !submitting && (
            <span style={{fontSize: '14px', color: '#856404'}}>
              Please fill in all required fields
            </span>
          )}
          {!submitting && (date || guests !== 1 || occasion !== 'Birthday') && (
            <button 
              type="button" 
              onClick={handleReset}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
              aria-label="Clear form and start over"
            >
              Clear Form
            </button>
          )}
        </div>
        {submitError && (
          <div style={{
            marginTop: '12px',
            padding: '12px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            borderRadius: '4px',
            border: '1px solid #f5c6cb'
          }} role="alert" aria-live="polite">
            ⚠ {submitError}
          </div>
        )}
      </form>
    </div>
  );
}
