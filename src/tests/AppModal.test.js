import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { AuthProvider } from '../context/AuthContext';

test('shows login modal when login button is clicked', () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );

  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByText(/login/i, { selector: 'h5' })).toBeInTheDocument();
});
