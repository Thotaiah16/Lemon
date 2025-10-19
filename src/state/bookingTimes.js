// Reducer and initializer for booking times
export function initializeTimes() {
  // Try to use the provided global fetchAPI (from the external script).
  try {
    if (typeof window !== 'undefined' && typeof window.fetchAPI === 'function') {
      // Use today's date
      const today = new Date();
      // fetchAPI returns an array of times
      const times = window.fetchAPI(today);
      if (Array.isArray(times)) {
        return shuffleTimesByDate(times, today);
      }
    }
  } catch (err) {
    // ignore and fall back to default list
  }
  return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
}

export function updateTimes(state, action) {
  switch (action.type) {
    case 'date-changed':
      // Attempt to fetch available times for the selected date using fetchAPI.
      try {
        if (typeof window !== 'undefined' && typeof window.fetchAPI === 'function') {
          // action.date may be an ISO string (yyyy-mm-dd) or a Date object
          const d = typeof action.date === 'string' ? new Date(action.date) : action.date;
          console.log('📅 Fetching available times for:', d.toLocaleDateString());
          const times = window.fetchAPI(d);
          if (Array.isArray(times)) {
            console.log('✓ Available times from API:', times);
            return shuffleTimesByDate(times, d);
          }
        } else {
          console.warn('⚠ fetchAPI not available, using default times');
        }
      } catch (err) {
        console.error('❌ Error fetching times:', err);
        // ignore and fall back
      }
      return initializeTimes();
    case 'book-time': {
      const { time } = action;
      if (!time) return state;
      console.log('🔒 Booking time slot:', time);
      return state.filter((t) => t !== time);
    }
    default:
      return state;
  }
}

// Helpers: deterministic shuffle based on the full date so different dates
// produce different orderings even if the remote API only uses day-of-month.
function seededNumberGenerator(seed) {
  // simple xorshift-ish generator returning 0..1
  let v = seed >>> 0;
  return function() {
    // xorshift32 variant
    v ^= v << 13;
    v ^= v >>> 17;
    v ^= v << 5;
    // normalize to [0,1)
    return (v >>> 0) / 4294967296;
  };
}

function shuffleTimesByDate(arr, date) {
  try {
    const copy = Array.isArray(arr) ? arr.slice() : [];
    // create a seed from full date (year, month, day)
    const seed = (date.getFullYear() * 10000) + ((date.getMonth() + 1) * 100) + date.getDate();
    const rnd = seededNumberGenerator(seed);
    // Fisher-Yates with seeded random
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  } catch (e) {
    return arr;
  }
}
