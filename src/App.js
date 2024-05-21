// src/App.js
import React, { useState } from 'react';
import CatImage from './components/CatImage';
import FavoriteCats from './components/FavoriteCats';

const App = () => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (cat) => {
    setFavorites([...favorites, cat]);
  };

  const removeFavorite = (index) => {
    setFavorites(favorites.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Cat App</h1>
      <CatImage addFavorite={addFavorite} />
      <FavoriteCats favorites={favorites} removeFavorite={removeFavorite} />
    </div>
  );
};

export default App;
