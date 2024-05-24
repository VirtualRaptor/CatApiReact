import React from 'react';
import { render, screen } from '@testing-library/react';
import Register from '../components/Register';
import { AuthProvider } from '../context/AuthContext';

test('renders Register form with username and password inputs', () => {
  render(
    <AuthProvider>
      <Register />
    </AuthProvider>
  );

  expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
});
