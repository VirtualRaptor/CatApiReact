import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import FavoriteCats from '../components/FavoriteCats';
import { AuthProvider } from '../context/AuthContext';

jest.mock('axios');

const mockFavorites = [
  { _id: '1', catImageUrl: 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg' }
];

test('removes a favorite cat', async () => {
  axios.get.mockResolvedValue({ data: mockFavorites });
  axios.delete.mockResolvedValue({});

  render(
    <AuthProvider>
      <FavoriteCats />
    </AuthProvider>
  );

  const removeButton = await screen.findByRole('button', { name: /remove/i });
  fireEvent.click(removeButton);

  expect(axios.delete).toHaveBeenCalledWith('http://localhost:5000/api/favorites/1', expect.any(Object));
});
