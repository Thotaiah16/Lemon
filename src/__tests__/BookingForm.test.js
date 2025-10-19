import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import BookingForm from '../components/BookingForm';

beforeAll(() => {
  // mock window.alert to avoid jsdom not-implemented errors
  window.alert = jest.fn();
});

describe('BookingForm interactions', () => {
  test('dispatch is called on date select and on submit', async () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn(async () => true); // Mock submitForm to return success
    
    render(<BookingForm availableTimes={["17:00","18:00"]} dispatch={mockDispatch} submitForm={mockSubmitForm} />);

    // Open the calendar by clicking the date input
    const dateInput = screen.getByPlaceholderText('Select date');
    fireEvent.click(dateInput);

    // The calendar shows day cells with role="button"
    const dayButtons = screen.getAllByRole('button');
    
    // Find a future date (not disabled, not empty)
    // Skip navigation buttons and find calendar cells with numbers >= today's date
    const today = new Date();
    const currentDay = today.getDate();
    
    const futureDay = dayButtons.find((btn) => {
      const text = btn.textContent;
      const num = parseInt(text, 10);
      // Find a day number that's >= current day (to avoid past dates)
      return !isNaN(num) && num >= currentDay && !btn.className.includes('disabled');
    });
    
    expect(futureDay).toBeDefined();
    fireEvent.click(futureDay);

    // dispatch should be called with date-changed action at least once
    expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'date-changed' }));

    // select time from custom popup
    const timeToggle = screen.getByText('17:00');
    fireEvent.click(timeToggle);
    const option = screen.getByText('18:00');
    fireEvent.click(option);

    // submit the form
    const submit = screen.getByDisplayValue('Make Your reservation');
    fireEvent.click(submit);

    // wait for async submitForm to complete using waitFor
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'book-time', time: '18:00' }));
    });
  });

  test('renders a static label in the BookingForm', () => {
    render(<BookingForm availableTimes={["17:00"]} dispatch={() => {}} />);
    // pick a static label that exists in the form; adapt if your form uses different text
    const label = screen.getByText(/Choose date/i);
    expect(label).toBeInTheDocument();
  });
});
