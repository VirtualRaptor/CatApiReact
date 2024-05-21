// src/components/FavoriteCats.js
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const FavoriteCats = ({ favorites, removeFavorite }) => {
  const [selectedCat, setSelectedCat] = useState(null);

  const handleImageClick = (cat) => {
    setSelectedCat(cat === selectedCat ? null : cat);
  };

  return (
    <div>
      <h2 className="text-center">Favorite Cats</h2>
      <div className="favorite-cats-container">
        {favorites.map((cat, index) => (
          <div
            key={index}
            className="favorite-cat"
            style={{
              margin: selectedCat === cat ? '10px' : '10px'
            }}
          >
            <img
              src={cat}
              alt="Favorite Cat"
              style={{
                width: selectedCat === cat ? '300px' : '100px',
                height: selectedCat === cat ? '300px' : '100px'
              }}
              onClick={() => handleImageClick(cat)}
            />
            <Button className="danger" onClick={() => removeFavorite(index)}>Remove</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteCats;
