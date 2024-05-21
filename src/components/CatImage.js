// src/components/CatImage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const CatImage = ({ addFavorite }) => {
  const [catImage, setCatImage] = useState('');

  const fetchCatImage = async () => {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
        headers: {
          'x-api-key': 'live_Koi6fG3xYJ9TxZIFJ64NnzcdKSXkJqiii27xsAl7eKHvYt1fBUnNKiyYWaS1eVEA'
        }
      });
      setCatImage(response.data[0].url);
    } catch (error) {
      console.error('Error fetching cat image:', error);
    }
  };

  useEffect(() => {
    fetchCatImage();
  }, []);

  return (
    <div className="cat-container">
      <img src={catImage} alt="Random Cat" className="cat-image" />
      <div className="buttons-container">
        <Button className="primary" onClick={() => addFavorite(catImage)}>Add to Favorites</Button>
        <Button className="secondary" onClick={fetchCatImage}>New Cat</Button>
      </div>
    </div>
  );
};

export default CatImage;
