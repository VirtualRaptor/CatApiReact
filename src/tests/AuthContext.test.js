import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthProvider, AuthContext } from '../context/AuthContext';

test('provides default values', () => {
  const TestComponent = () => {
    const { user } = useContext(AuthContext);
    return <div>{user ? 'Logged in' : 'Logged out'}</div>;
  };

  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

  expect(screen.getByText(/logged out/i)).toBeInTheDocument();
});
