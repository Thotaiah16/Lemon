import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import BookingForm from '../components/BookingForm';

beforeAll(() => {
  // ensure alert won't throw
  window.alert = jest.fn();
});

describe('submit flow with API stubs', () => {
  afterEach(() => {
    // clean stubs
    delete window.submitAPI;
    delete window.fetchAPI;
    jest.clearAllMocks();
  });

  test('dispatches book-time after successful submitAPI', async () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn(async () => true); // Mock successful submission
    
    // stub fetchAPI to return times
    window.fetchAPI = jest.fn(() => ['17:00', '18:00']);
    // stub submitAPI to succeed
    window.submitAPI = jest.fn(() => true);

    render(<BookingForm availableTimes={["17:00", "18:00"]} dispatch={mockDispatch} submitForm={mockSubmitForm} />);

    // select date via clicking the input and picking a future day
    const dateInput = screen.getByPlaceholderText('Select date');
    fireEvent.click(dateInput);
    const dayButtons = screen.getAllByRole('button');
    
    // Find a future date (not disabled)
    const today = new Date();
    const currentDay = today.getDate();
    const futureDay = dayButtons.find((btn) => {
      const text = btn.textContent;
      const num = parseInt(text, 10);
      return !isNaN(num) && num >= currentDay && !btn.className.includes('disabled');
    });
    
    expect(futureDay).toBeDefined();
    fireEvent.click(futureDay);

    // choose time
    const timeToggle = screen.getByText('17:00');
    fireEvent.click(timeToggle);
    const option = screen.getByText('18:00');
    fireEvent.click(option);

    // submit
    const submit = screen.getByDisplayValue('Make Your reservation');
    fireEvent.click(submit);

    // wait for async state updates to complete
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'book-time' }));
    });
  });

  test('does not dispatch book-time when submitAPI fails', async () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn(async () => false); // Mock failed submission
    
    window.fetchAPI = jest.fn(() => ['17:00']);
    window.submitAPI = jest.fn(() => false);

    render(<BookingForm availableTimes={["17:00"]} dispatch={mockDispatch} submitForm={mockSubmitForm} />);

    const dateInput = screen.getByPlaceholderText('Select date');
    fireEvent.click(dateInput);
    const dayButtons = screen.getAllByRole('button');
    
    // Find a future date (not disabled)
    const today = new Date();
    const currentDay = today.getDate();
    const futureDay = dayButtons.find((btn) => {
      const text = btn.textContent;
      const num = parseInt(text, 10);
      return !isNaN(num) && num >= currentDay && !btn.className.includes('disabled');
    });
    
    fireEvent.click(futureDay);

    const submit = screen.getByDisplayValue('Make Your reservation');
    fireEvent.click(submit);

    // wait for async operations to complete
    await waitFor(() => {
      expect(mockSubmitForm).toHaveBeenCalled();
    });

    // Should NOT dispatch book-time when submission fails
    expect(mockDispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'book-time' }));
  });
});
