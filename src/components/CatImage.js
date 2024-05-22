import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Toast } from 'primereact/toast';

const CatImage = ({ addFavorite, incrementCatsViewed }) => {
  const [catImage, setCatImage] = useState('');
  const toast = useRef(null);

  const fetchCatImage = async () => {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
        headers: {
          'x-api-key': 'live_Koi6fG3xYJ9TxZIFJ64NnzcdKSXkJqiii27xsAl7eKHvYt1fBUnNKiyYWaS1eVEA'
        }
      });
      setCatImage(response.data[0].url);
      incrementCatsViewed(); // Ensure this is called after setting the new image
    } catch (error) {
      console.error('Error fetching cat image:', error);
    }
  };

  const showSuccess = () => {
    toast.current.show({ severity: 'success', detail: 'Cat succesfully added to Favorites', life: 2500 });
  };

  useEffect(() => {
    fetchCatImage();
  }, []);

  const handleAddFavorite = (image) => {
    addFavorite(image);
    showSuccess();
  };
  
  return (
    <div className="cat-container">
      <Toast ref={toast} />
      <img src={catImage} alt="Random Cat" className="cat-image" />
      <div className="buttons-container">
        <Button className="primary" onClick={() => handleAddFavorite(catImage)}>Add to Favorites</Button>
        <Button className="secondary" onClick={fetchCatImage}>New Cat</Button>
      </div>
    </div>
  );
};

export default CatImage;
