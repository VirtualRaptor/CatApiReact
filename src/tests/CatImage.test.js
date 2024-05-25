import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import CatImage from '../components/CatImage';
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

test('renders CatImage component and fetches a cat image', async () => {
  const catImageUrl = 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg';
  axios.get.mockResolvedValue({ data: [{ url: catImageUrl }] });

  render(
    <MockAuthProvider>
      <CatImage addFavorite={jest.fn()} incrementCatsViewed={jest.fn()} />
    </MockAuthProvider>
  );

  await waitFor(() => expect(screen.getByAltText('Random Cat')).toHaveAttribute('src', catImageUrl));
});

test('adds a cat image to favorites', async () => {
  const catImageUrl = 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg';
  axios.get.mockResolvedValue({ data: [{ url: catImageUrl }] });
  axios.post.mockResolvedValue({});

  const addFavorite = jest.fn();

  render(
    <MockAuthProvider>
      <CatImage addFavorite={addFavorite} incrementCatsViewed={jest.fn()} />
    </MockAuthProvider>
  );

  await waitFor(() => expect(screen.getByAltText('Random Cat')).toBeInTheDocument());

  fireEvent.click(screen.getByText('Add to Favorites'));

  await waitFor(() => expect(addFavorite).toHaveBeenCalledWith(catImageUrl));
});

test('increments cats viewed counter', async () => {
  const catImageUrl = 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg';
  axios.get.mockResolvedValue({ data: [{ url: catImageUrl }] });
  
  const incrementCatsViewed = jest.fn();

  render(
    <MockAuthProvider>
      <CatImage addFavorite={jest.fn()} incrementCatsViewed={incrementCatsViewed} />
    </MockAuthProvider>
  );

  await waitFor(() => expect(screen.getByAltText('Random Cat')).toBeInTheDocument());

  fireEvent.click(screen.getByText('New Cat'));

  await waitFor(() => expect(incrementCatsViewed).toHaveBeenCalled());
});

test('displays different cat images on fetch', async () => {
  const catImageUrl1 = 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg';
  const catImageUrl2 = 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ2.jpg';
  axios.get.mockResolvedValueOnce({ data: [{ url: catImageUrl1 }] }).mockResolvedValueOnce({ data: [{ url: catImageUrl2 }] });

  render(
    <MockAuthProvider>
      <CatImage addFavorite={jest.fn()} incrementCatsViewed={jest.fn()} />
    </MockAuthProvider>
  );

  await waitFor(() => expect(screen.getByAltText('Random Cat')).toHaveAttribute('src', catImageUrl1));

  fireEvent.click(screen.getByText('New Cat'));

  await waitFor(() => expect(screen.getByAltText('Random Cat')).toHaveAttribute('src', catImageUrl2));
});
