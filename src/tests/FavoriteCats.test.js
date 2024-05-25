import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import FavoriteCats from '../components/FavoriteCats';
import { AuthContext } from '../context/AuthContext';

jest.mock('axios');

const mockAuthContext = {
  user: { username: 'testuser', token: 'fake-token' },
  login: jest.fn(),
  logout: jest.fn(),
  register: jest.fn()
};

const MockAuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={mockAuthContext}>
      {children}
    </AuthContext.Provider>
  );
};

test('renders FavoriteCats component and fetches favorites', async () => {
  const favoriteCats = [{ _id: '1', catImageUrl: 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg' }];
  axios.get.mockResolvedValue({ data: favoriteCats });

  render(
    <MockAuthProvider>
      <FavoriteCats />
    </MockAuthProvider>
  );

  await waitFor(() => expect(screen.getByAltText('Favorite Cat')).toHaveAttribute('src', favoriteCats[0].catImageUrl));
});

test('displays multiple favorite cats', async () => {
  const favoriteCats = [
    { _id: '1', catImageUrl: 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg' },
    { _id: '2', catImageUrl: 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ2.jpg' }
  ];
  axios.get.mockResolvedValue({ data: favoriteCats });

  render(
    <MockAuthProvider>
      <FavoriteCats />
    </MockAuthProvider>
  );

  await waitFor(() => {
    expect(screen.getByAltText('Favorite Cat').src).toBe(favoriteCats[0].catImageUrl);
    expect(screen.getAllByAltText('Favorite Cat')[1].src).toBe(favoriteCats[1].catImageUrl);
  });
});

test('removes a favorite cat', async () => {
  const favoriteCats = [{ _id: '1', catImageUrl: 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg' }];
  axios.get.mockResolvedValue({ data: favoriteCats });
  axios.delete.mockResolvedValue({});

  render(
    <MockAuthProvider>
      <FavoriteCats />
    </MockAuthProvider>
  );

  fireEvent.click(screen.getByText('Remove'));

  await waitFor(() => expect(screen.queryByAltText('Favorite Cat')).toBeNull());
});
