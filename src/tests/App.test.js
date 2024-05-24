import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { AuthProvider } from '../context/AuthContext';

test('renders App component without crashing', () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
});
