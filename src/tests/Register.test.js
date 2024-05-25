import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../components/Register';
import { AuthContext } from '../context/AuthContext';

const mockRegister = jest.fn();
const mockHandleClose = jest.fn();

const MockAuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ register: mockRegister }}>
      {children}
    </AuthContext.Provider>
  );
};

test('renders Register component and submits form', async () => {
  render(
    <MockAuthProvider>
      <Register handleClose={mockHandleClose} />
    </MockAuthProvider>
  );

  fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
  fireEvent.click(screen.getByText('Register'));

  await waitFor(() => {
    expect(mockRegister).toHaveBeenCalledWith('testuser', 'password');
  });
}); 