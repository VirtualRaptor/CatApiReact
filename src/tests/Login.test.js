import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/Login';
import { AuthContext } from '../context/AuthContext';

const mockLogin = jest.fn();
const mockHandleClose = jest.fn();

const MockAuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ login: mockLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

test('renders Login component and submits form', async () => {
  render(
    <MockAuthProvider>
      <Login handleClose={mockHandleClose} />
    </MockAuthProvider>
  );

  fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
  fireEvent.click(screen.getByText('Login'));

  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalledWith('testuser', 'password');
  });
});

test('renders Login component and validates form inputs', async () => {
  render(
    <MockAuthProvider>
      <Login handleClose={jest.fn()} />
    </MockAuthProvider>
  );

  fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: '' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '' } });
  fireEvent.click(screen.getByText('Login'));

  await waitFor(() => {
    expect(mockLogin).not.toHaveBeenCalled();
  });
});
