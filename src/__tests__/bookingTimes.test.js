import { initializeTimes, updateTimes } from '../state/bookingTimes';

describe('bookingTimes reducer', () => {
  // Mock fetchAPI before each test
  beforeEach(() => {
    // Mock the fetchAPI function that the reducer uses
    global.window = global.window || {};
    global.window.fetchAPI = jest.fn((date) => {
      // Return a non-empty array of available booking times
      return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
    });
  });

  afterEach(() => {
    // Clean up mock
    if (global.window && global.window.fetchAPI) {
      delete global.window.fetchAPI;
    }
  });

  // Step 1: Updated test for initializeTimes
  test('initializeTimes returns non-empty array from fetchAPI', () => {
    const times = initializeTimes();
    
    // Verify fetchAPI was called
    expect(window.fetchAPI).toHaveBeenCalled();
    
    // Verify it returns a non-empty array
    expect(times).toBeDefined();
    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBeGreaterThan(0);
    
    // Verify it contains expected times
    expect(times).toContain('17:00');
    expect(times).toContain('18:00');
  });

  // Step 2: Updated test for updateTimes with date-changed action
  test('updateTimes returns available times from fetchAPI when date is changed', () => {
    const state = ['17:00', '18:00', '19:00'];
    
    // Dispatch date-changed action with a pre-selected date
    const selectedDate = '2025-10-20';
    const action = { type: 'date-changed', date: selectedDate };
    const next = updateTimes(state, action);
    
    // Verify fetchAPI was called
    expect(window.fetchAPI).toHaveBeenCalled();
    
    // Verify it returns a non-empty array
    expect(next).toBeDefined();
    expect(Array.isArray(next)).toBe(true);
    expect(next.length).toBeGreaterThan(0);
    
    // Verify it contains expected times
    expect(next).toContain('17:00');
  });

  test('updateTimes removes booked time on book-time action', () => {
    const state = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
    const action = { type: 'book-time', date: '2025-10-20', time: '19:00' };
    const next = updateTimes(state, action);
    
    // Verify the booked time is removed
    expect(next).not.toContain('19:00');
    expect(next.length).toBe(state.length - 1);
    
    // Verify other times are still present
    expect(next).toContain('17:00');
    expect(next).toContain('18:00');
    expect(next).toContain('20:00');
  });

  test('updateTimes returns same state for unknown action', () => {
    const state = ['17:00', '18:00', '19:00'];
    const action = { type: 'unknown-action' };
    const next = updateTimes(state, action);
    
    expect(next).toEqual(state);
  });
});
