import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders app header', () => {
  render(
    <MemoryRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <App />
    </MemoryRouter>
  );
  // assert logo alt text exists
  const logo = screen.getByAltText(/Little Lemon logo/i);
  expect(logo).toBeInTheDocument();
});
