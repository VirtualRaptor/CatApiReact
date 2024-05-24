import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoriteCats from '../components/FavoriteCats';
import { AuthProvider } from '../context/AuthContext';

const mockFavorites = [
  { _id: '1', catImageUrl: 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg' },
  { _id: '2', catImageUrl: 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ2.jpg' }
];

test('displays favorite cats', () => {
  render(
    <AuthProvider>
      <FavoriteCats />
    </AuthProvider>
  );

  mockFavorites.forEach((cat) => {
    expect(screen.getByAltText(/favorite cat/i)).toBeInTheDocument();
  });
});
