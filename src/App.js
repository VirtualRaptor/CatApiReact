import React, { useState } from 'react';
import CatImage from './components/CatImage';
import FavoriteCats from './components/FavoriteCats';
import 'primereact/resources/themes/lara-light-pink/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


const App = () => {
  const [favorites, setFavorites] = useState([]);
  const [catsViewed, setCatsViewed] = useState(0);

  const addFavorite = (cat) => {
    setFavorites([...favorites, cat]);
  };

  const incrementCatsViewed = () => {
    setCatsViewed(catsViewed + 1);
  };

  const removeFavorite = (index) => {
    setFavorites(favorites.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="counter">Cats viewed today: {catsViewed}</div>
      <h1>Cutie Paw</h1>
      <h2>A cat image generation app</h2>
      <CatImage addFavorite={addFavorite} incrementCatsViewed={incrementCatsViewed} />
      <FavoriteCats favorites={favorites} removeFavorite={removeFavorite} />
    </div>
  );
};

export default App;