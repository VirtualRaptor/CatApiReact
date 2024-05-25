import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const mockAuthContext = {
  user: { username: 'testuser', token: 'fake-token' },
  logout: jest.fn()
};

const MockAuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={mockAuthContext}>
      {children}
    </AuthContext.Provider>
  );
};

test('renders Navbar component with user logged in', () => {
  render(
    <MockAuthProvider>
      <Navbar catsViewed={10} handleLoginShow={jest.fn()} handleRegisterShow={jest.fn()} logout={mockAuthContext.logout} />
    </MockAuthProvider>
  );

  expect(screen.getByText('Witaj, testuser')).toBeInTheDocument();
  expect(screen.getByText('Cats viewed today: 10')).toBeInTheDocument();
  expect(screen.getByText('Logout')).toBeInTheDocument();
});

test('handles logout in Navbar', () => {
  render(
    <MockAuthProvider>
      <Navbar catsViewed={10} handleLoginShow={jest.fn()} handleRegisterShow={jest.fn()} logout={mockAuthContext.logout} />
    </MockAuthProvider>
  );

  fireEvent.click(screen.getByText('Logout'));

  expect(mockAuthContext.logout).toHaveBeenCalled();
});