import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../components/Login';
import { AuthProvider } from '../context/AuthContext';

test('renders Login form with username and password inputs', () => {
  render(
    <AuthProvider>
      <Login />
    </AuthProvider>
  );

  expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});
