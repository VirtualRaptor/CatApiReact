import React, { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { Toast } from 'primereact/toast';

const FavoriteCats = ({ favorites, removeFavorite }) => {
  const [selectedCat, setSelectedCat] = useState(null);
  const toast = useRef(null);

  const handleImageClick = (cat) => {
    setSelectedCat(cat === selectedCat ? null : cat);
  };

  const showError = () => {
    toast.current.show({ severity: 'error', summary: 'Removed', detail: 'Cat is no longer a favorite :(', life: 3000 });
  };

  const handleRemoveFavorite = (index) => {
    removeFavorite(index);
    showError();
  };

  return (
    <div>
      <Toast ref={toast} />
      <h3 className="text-center">Favorite Cats</h3>
      <div className="favorite-cats-container">
        {favorites.map((cat, index) => (
          <div
            key={index}
            className="favorite-cat"
            style={{
              margin: '10px'
            }}
          >
            <img
              src={cat}
              alt="Favorite Cat"
              className={selectedCat === cat ? 'enlarged-cat' : 'regular-cat'}
              onClick={() => handleImageClick(cat)}
            />
            <Button className="danger" onClick={() => handleRemoveFavorite(index)}>Remove</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteCats;
