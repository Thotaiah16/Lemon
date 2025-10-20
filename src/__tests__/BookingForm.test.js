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

  test('submit button is disabled when form is invalid', () => {
    render(<BookingForm availableTimes={["17:00", "18:00"]} dispatch={() => {}} />);
    const submitButton = screen.getByDisplayValue('Make Your reservation');
    
    // Initially, the form should be invalid (no date selected)
    expect(submitButton).toBeDisabled();
  });

  test('submit button is enabled when form is valid', async () => {
    const mockDispatch = jest.fn();
    render(<BookingForm availableTimes={["17:00", "18:00"]} dispatch={mockDispatch} />);
    
    // Select a date
    const dateInput = screen.getByPlaceholderText('Select date');
    fireEvent.click(dateInput);

    const dayButtons = screen.getAllByRole('button');
    const today = new Date();
    const currentDay = today.getDate();
    
    const futureDay = dayButtons.find((btn) => {
      const text = btn.textContent;
      const num = parseInt(text, 10);
      return !isNaN(num) && num >= currentDay && !btn.className.includes('disabled');
    });

    expect(futureDay).toBeDefined();
    fireEvent.click(futureDay);

    // Wait for validation to complete
    await waitFor(() => {
      const submitButton = screen.getByDisplayValue('Make Your reservation');
      expect(submitButton).not.toBeDisabled();
    });
  });

  test('shows validation error for invalid guest count', () => {
    render(<BookingForm availableTimes={["17:00"]} dispatch={() => {}} />);
    
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    
    // Enter an invalid value (0)
    fireEvent.change(guestsInput, { target: { value: '0' } });
    fireEvent.blur(guestsInput);

    // Check for validation message (0 triggers "Please enter the number of guests")
    expect(screen.getByText(/Please enter the number of guests/i)).toBeInTheDocument();
  });

  test('shows validation error when guests exceed maximum', () => {
    render(<BookingForm availableTimes={["17:00"]} dispatch={() => {}} />);

    const guestsInput = screen.getByLabelText(/Number of guests/i);

    // Enter an invalid value (11)
    fireEvent.change(guestsInput, { target: { value: '11' } });
    fireEvent.blur(guestsInput);
    
    // Check for validation message
    expect(screen.getByText(/Maximum 10 guests allowed/i)).toBeInTheDocument();
  });

  test('clears validation error when valid value is entered', () => {
    render(<BookingForm availableTimes={["17:00"]} dispatch={() => {}} />);
    
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    
    // Enter an invalid value first
    fireEvent.change(guestsInput, { target: { value: '0' } });
    fireEvent.blur(guestsInput);
    expect(screen.getByText(/Please enter the number of guests/i)).toBeInTheDocument();
    
    // Enter a valid value
    fireEvent.change(guestsInput, { target: { value: '5' } });
    
    // Error should be cleared
    expect(screen.queryByText(/Please enter the number of guests/i)).not.toBeInTheDocument();
  });

  test('HTML5 validation attributes are present', () => {
    render(<BookingForm availableTimes={["17:00"]} dispatch={() => {}} />);
    
    const dateInput = screen.getByPlaceholderText('Select date');
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    
    // Check for required attribute
    expect(dateInput).toHaveAttribute('required');
    expect(guestsInput).toHaveAttribute('required');
    
    // Check for min/max on guests
    expect(guestsInput).toHaveAttribute('min', '1');
    expect(guestsInput).toHaveAttribute('max', '10');
    
    // Check for aria attributes
    expect(dateInput).toHaveAttribute('aria-required', 'true');
    expect(guestsInput).toHaveAttribute('aria-required', 'true');
  });
});

describe('HTML5 Validation Attributes', () => {
  test('date input has correct validation attributes', () => {
    render(<BookingForm availableTimes={["17:00"]} dispatch={() => {}} />);
    const dateInput = screen.getByPlaceholderText('Select date');
    
    expect(dateInput).toHaveAttribute('required');
    expect(dateInput).toHaveAttribute('aria-required', 'true');
    expect(dateInput).toHaveAttribute('type', 'text');
    expect(dateInput).toHaveAttribute('id', 'res-date');
  });

  test('guests input has correct HTML5 validation attributes', () => {
    render(<BookingForm availableTimes={["17:00"]} dispatch={() => {}} />);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    
    expect(guestsInput).toHaveAttribute('type', 'number');
    expect(guestsInput).toHaveAttribute('required');
    expect(guestsInput).toHaveAttribute('min', '1');
    expect(guestsInput).toHaveAttribute('max', '10');
    expect(guestsInput).toHaveAttribute('aria-required', 'true');
    expect(guestsInput).toHaveAttribute('id', 'guests');
  });

  test('time selector has correct ARIA attributes', () => {
    render(<BookingForm availableTimes={["17:00", "18:00"]} dispatch={() => {}} />);
    // The button contains "17:00" plus the arrow, so we need to search differently
    const timeButton = screen.getByRole('button', { name: /Choose time/i });
    
    expect(timeButton).toHaveAttribute('aria-haspopup', 'listbox');
    expect(timeButton).toHaveAttribute('id', 'res-time');
    expect(timeButton).toHaveAttribute('type', 'button');
  });

  test('occasion selector has correct ARIA attributes', () => {
    render(<BookingForm availableTimes={["17:00"]} dispatch={() => {}} />);
    const occasionButton = screen.getByRole('button', { name: /Birthday/i });
    
    expect(occasionButton).toHaveAttribute('aria-haspopup', 'listbox');
    expect(occasionButton).toHaveAttribute('type', 'button');
  });

  test('form labels are correctly associated with inputs', () => {
    render(<BookingForm availableTimes={["17:00"]} dispatch={() => {}} />);
    
    // Check that labels exist and are associated with inputs
    expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of guests/i)).toBeInTheDocument();
    expect(screen.getByText(/Choose time/i)).toBeInTheDocument();
    expect(screen.getByText(/Occasion/i)).toBeInTheDocument();
  });
});

describe('JavaScript Validation Functions - Valid States', () => {
  test('accepts valid guest count within range (1-10)', () => {
    render(<BookingForm availableTimes={["17:00"]} dispatch={() => {}} />);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    
    // Test minimum valid value
    fireEvent.change(guestsInput, { target: { value: '1' } });
    expect(screen.queryByText(/At least 1 guest is required/i)).not.toBeInTheDocument();
    
    // Test middle value
    fireEvent.change(guestsInput, { target: { value: '5' } });
    expect(screen.queryByText(/Maximum 10 guests allowed/i)).not.toBeInTheDocument();
    
    // Test maximum valid value
    fireEvent.change(guestsInput, { target: { value: '10' } });
    expect(screen.queryByText(/Maximum 10 guests allowed/i)).not.toBeInTheDocument();
  });

  test('accepts valid date selection', async () => {
    const mockDispatch = jest.fn();
    render(<BookingForm availableTimes={["17:00"]} dispatch={mockDispatch} />);
    
    const dateInput = screen.getByPlaceholderText('Select date');
    fireEvent.click(dateInput);

    const dayButtons = screen.getAllByRole('button');
    const today = new Date();
    const currentDay = today.getDate();
    
    const validDay = dayButtons.find((btn) => {
      const text = btn.textContent;
      const num = parseInt(text, 10);
      return !isNaN(num) && num >= currentDay && !btn.className.includes('disabled');
    });

    if (validDay) {
      fireEvent.click(validDay);
      
      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'date-changed' }));
      });
      
      // Should not show date error after valid selection
      expect(screen.queryByText(/Please select a date/i)).not.toBeInTheDocument();
    }
  });

  test('form is valid when all required fields are filled correctly', async () => {
    const mockDispatch = jest.fn();
    render(<BookingForm availableTimes={["17:00", "18:00"]} dispatch={mockDispatch} />);
    
    // Fill date
    const dateInput = screen.getByPlaceholderText('Select date');
    fireEvent.click(dateInput);
    const dayButtons = screen.getAllByRole('button');
    const today = new Date();
    const currentDay = today.getDate();
    const validDay = dayButtons.find((btn) => {
      const text = btn.textContent;
      const num = parseInt(text, 10);
      return !isNaN(num) && num >= currentDay && !btn.className.includes('disabled');
    });
    if (validDay) fireEvent.click(validDay);
    
    // Guests default to 1 (valid)
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    expect(guestsInput).toHaveValue(1);
    
    // Time defaults to first available
    // Occasion defaults to Birthday
    
    // Submit button should be enabled
    await waitFor(() => {
      const submitButton = screen.getByDisplayValue('Make Your reservation');
      expect(submitButton).not.toBeDisabled();
    });
  });
});

describe('JavaScript Validation Functions - Invalid States', () => {
  test('rejects guest count of 0', () => {
    render(<BookingForm availableTimes={["17:00"]} dispatch={() => {}} />);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    
    fireEvent.change(guestsInput, { target: { value: '0' } });
    fireEvent.blur(guestsInput);
    
    expect(screen.getByText(/Please enter the number of guests/i)).toBeInTheDocument();
  });

  test('rejects negative guest count', () => {
    render(<BookingForm availableTimes={["17:00"]} dispatch={() => {}} />);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    
    fireEvent.change(guestsInput, { target: { value: '-5' } });
    fireEvent.blur(guestsInput);
    
    expect(screen.getByText(/At least 1 guest is required/i)).toBeInTheDocument();
  });

  test('rejects guest count above maximum (11+)', () => {
    render(<BookingForm availableTimes={["17:00"]} dispatch={() => {}} />);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    
    fireEvent.change(guestsInput, { target: { value: '11' } });
    fireEvent.blur(guestsInput);
    
    expect(screen.getByText(/Maximum 10 guests allowed/i)).toBeInTheDocument();
  });

  test('rejects guest count of 15 (well above maximum)', () => {
    render(<BookingForm availableTimes={["17:00"]} dispatch={() => {}} />);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    
    fireEvent.change(guestsInput, { target: { value: '15' } });
    fireEvent.blur(guestsInput);
    
    expect(screen.getByText(/Maximum 10 guests allowed/i)).toBeInTheDocument();
  });

  test('rejects empty guest field', () => {
    render(<BookingForm availableTimes={["17:00"]} dispatch={() => {}} />);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    
    fireEvent.change(guestsInput, { target: { value: '' } });
    fireEvent.blur(guestsInput);
    
    expect(screen.getByText(/Please enter the number of guests/i)).toBeInTheDocument();
  });

  test('form is invalid without date selection', () => {
    render(<BookingForm availableTimes={["17:00"]} dispatch={() => {}} />);
    const submitButton = screen.getByDisplayValue('Make Your reservation');
    
    // Without selecting a date, submit should be disabled
    expect(submitButton).toBeDisabled();
  });

  test('form is invalid when no times available', () => {
    render(<BookingForm availableTimes={[]} dispatch={() => {}} />);
    const submitButton = screen.getByDisplayValue('Make Your reservation');
    
    expect(submitButton).toBeDisabled();
  });

  test('shows error when all times are booked for selected date', async () => {
    const mockDispatch = jest.fn();
    render(<BookingForm availableTimes={[]} dispatch={mockDispatch} />);
    
    // Try to select a date
    const dateInput = screen.getByPlaceholderText('Select date');
    fireEvent.click(dateInput);
    
    const dayButtons = screen.getAllByRole('button');
    const today = new Date();
    const currentDay = today.getDate();
    const validDay = dayButtons.find((btn) => {
      const text = btn.textContent;
      const num = parseInt(text, 10);
      return !isNaN(num) && num >= currentDay && !btn.className.includes('disabled');
    });
    
    if (validDay) {
      fireEvent.click(validDay);
      
      await waitFor(() => {
        expect(screen.getByText(/All times are booked for this date/i)).toBeInTheDocument();
      });
    }
  });
});

describe('Form Submission Validation', () => {
  test('prevents submission when form is invalid', () => {
    const mockSubmitForm = jest.fn();
    render(<BookingForm availableTimes={["17:00"]} dispatch={() => {}} submitForm={mockSubmitForm} />);
    
    const submitButton = screen.getByDisplayValue('Make Your reservation');
    
    // Try to click disabled button
    fireEvent.click(submitButton);
    
    // submitForm should not be called
    expect(mockSubmitForm).not.toHaveBeenCalled();
  });

  test('allows submission when form is valid', async () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn(async () => true);
    render(<BookingForm availableTimes={["17:00", "18:00"]} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
    
    // Fill in valid data
    const dateInput = screen.getByPlaceholderText('Select date');
    fireEvent.click(dateInput);
    
    const dayButtons = screen.getAllByRole('button');
    const today = new Date();
    const currentDay = today.getDate();
    const validDay = dayButtons.find((btn) => {
      const text = btn.textContent;
      const num = parseInt(text, 10);
      return !isNaN(num) && num >= currentDay && !btn.className.includes('disabled');
    });
    
    if (validDay) fireEvent.click(validDay);
    
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    fireEvent.change(guestsInput, { target: { value: '4' } });
    
    // Wait for validation to complete
    await waitFor(() => {
      const submitButton = screen.getByDisplayValue('Make Your reservation');
      expect(submitButton).not.toBeDisabled();
    });

    const submitButton = screen.getByDisplayValue('Make Your reservation');
    fireEvent.click(submitButton);
    // submitForm should be called
    await waitFor(() => {
      expect(mockSubmitForm).toHaveBeenCalled();
    });
  });

  test('validates all fields on submit attempt', async () => {
    const mockSubmitForm = jest.fn();
    render(<BookingForm availableTimes={["17:00"]} dispatch={() => {}} submitForm={mockSubmitForm} />);

    // Leave form empty/invalid
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    fireEvent.change(guestsInput, { target: { value: '0' } });

    // Try to submit (button will be disabled, but test the validation logic)
    const submitButton = screen.getByDisplayValue('Make Your reservation');
    expect(submitButton).toBeDisabled();

    // Check that validation errors would show
    fireEvent.blur(guestsInput);
    expect(screen.getByText(/Please enter the number of guests/i)).toBeInTheDocument();
  });
});

describe('Real-time Validation Feedback', () => {
  test('shows validation error immediately on invalid input', () => {
    render(<BookingForm availableTimes={["17:00"]} dispatch={() => {}} />);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    
    // Enter invalid value
    fireEvent.change(guestsInput, { target: { value: '0' } });
    
    // Error should appear immediately (not just on blur)
    expect(screen.getByText(/Please enter the number of guests/i)).toBeInTheDocument();
  });  test('clears validation error immediately when corrected', () => {
    render(<BookingForm availableTimes={["17:00"]} dispatch={() => {}} />);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    
    // Enter invalid value
    fireEvent.change(guestsInput, { target: { value: '11' } });
    expect(screen.getByText(/Maximum 10 guests allowed/i)).toBeInTheDocument();
    
    // Correct the value
    fireEvent.change(guestsInput, { target: { value: '8' } });
    
    // Error should clear immediately
    expect(screen.queryByText(/Maximum 10 guests allowed/i)).not.toBeInTheDocument();
  });

  test('updates submit button state based on form validity', async () => {
    const mockDispatch = jest.fn();
    render(<BookingForm availableTimes={["17:00"]} dispatch={mockDispatch} />);
    
    const submitButton = screen.getByDisplayValue('Make Your reservation');
    
    // Initially disabled (no date)
    expect(submitButton).toBeDisabled();
    
    // Select a valid date
    const dateInput = screen.getByPlaceholderText('Select date');
    fireEvent.click(dateInput);
    const dayButtons = screen.getAllByRole('button');
    const today = new Date();
    const currentDay = today.getDate();
    const validDay = dayButtons.find((btn) => {
      const text = btn.textContent;
      const num = parseInt(text, 10);
      return !isNaN(num) && num >= currentDay && !btn.className.includes('disabled');
    });
    if (validDay) fireEvent.click(validDay);
    
    // Submit button should now be enabled
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });
});

describe('Accessibility and ARIA Attributes', () => {
  test('error messages have correct ARIA attributes', () => {
    render(<BookingForm availableTimes={["17:00"]} dispatch={() => {}} />);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    
    fireEvent.change(guestsInput, { target: { value: '0' } });
    fireEvent.blur(guestsInput);
    
    const errorMessage = screen.getByText(/Please enter the number of guests/i);
    expect(errorMessage).toHaveAttribute('role', 'alert');
    expect(errorMessage).toHaveAttribute('aria-live', 'polite');
  });

  test('invalid inputs have aria-invalid attribute', () => {
    render(<BookingForm availableTimes={["17:00"]} dispatch={() => {}} />);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    
    fireEvent.change(guestsInput, { target: { value: '0' } });
    fireEvent.blur(guestsInput);
    
    expect(guestsInput).toHaveAttribute('aria-invalid', 'true');
  });

  test('valid inputs have aria-invalid="false"', () => {
    render(<BookingForm availableTimes={["17:00"]} dispatch={() => {}} />);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    
    fireEvent.change(guestsInput, { target: { value: '5' } });
    
    expect(guestsInput).toHaveAttribute('aria-invalid', 'false');
  });

  test('error messages are associated with inputs via aria-describedby', () => {
    render(<BookingForm availableTimes={["17:00"]} dispatch={() => {}} />);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    
    fireEvent.change(guestsInput, { target: { value: '0' } });
    fireEvent.blur(guestsInput);
    
    expect(guestsInput).toHaveAttribute('aria-describedby', 'guests-error');
    expect(screen.getByText(/Please enter the number of guests/i)).toHaveAttribute('id', 'guests-error');
  });
});
