import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { AuthProvider } from '../context/AuthContext';

test('shows register modal when register button is clicked', () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );

  fireEvent.click(screen.getByRole('button', { name: /register/i }));
  expect(screen.getByText(/register/i, { selector: 'h5' })).toBeInTheDocument();
});
