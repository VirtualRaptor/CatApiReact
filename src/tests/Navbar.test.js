import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { AuthProvider, AuthContext } from '../context/AuthContext';

const mockAuthContext = {
  user: { username: 'testuser', token: 'fake-token' },
  logout: jest.fn()
};

test('displays user info when logged in', () => {
  render(
    <AuthContext.Provider value={mockAuthContext}>
      <Navbar 
        catsViewed={0} 
        handleLoginShow={jest.fn()} 
        handleRegisterShow={jest.fn()} 
        logout={jest.fn()} 
      />
    </AuthContext.Provider>
  );

  expect(screen.getByText(/Witaj, testuser/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
});
