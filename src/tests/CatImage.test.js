import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import CatImage from '../components/CatImage';

jest.mock('axios');

const mockCatImageUrl = 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg';

test('fetches and displays a cat image', async () => {
  axios.get.mockResolvedValue({ data: [{ url: mockCatImageUrl }] });

  render(<CatImage addFavorite={jest.fn()} incrementCatsViewed={jest.fn()} />);

  const img = await waitFor(() => screen.getByAltText(/random cat/i));
  expect(img).toHaveAttribute('src', mockCatImageUrl);
});
