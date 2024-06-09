import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Toast } from 'primereact/toast';
import { AuthContext } from '../context/AuthContext';
import api from '../api'; // Import API

const CatImage = ({ incrementCatsViewed }) => {
    const [catImage, setCatImage] = useState('');
    const toast = useRef(null);
    const { user } = useContext(AuthContext); // Pobierz kontekst uwierzytelniania

    const fetchCatImage = async () => {
        try {
            const response = await api.get('https://api.thecatapi.com/v1/images/search', {
                headers: {
                    'x-api-key': 'live_Koi6fG3xYJ9TxZIFJ64NnzcdKSXkJqiii27xsAl7eKHvYt1fBUnNKiyYWaS1eVEA'
                }
            });
            setCatImage(response.data[0].url);
            incrementCatsViewed();
        } catch (error) {
            console.error('Error fetching cat image:', error);
        }
    };

    const showSuccess = () => {
        toast.current.show({ severity: 'success', detail: 'Cat successfully added to Favorites', life: 2500 });
    };

    const handleAddFavorite = async () => {
        if (!user) {
            console.error('User not authenticated');
            return;
        }

        try {
            await api.post('/favorites', { catImageUrl: catImage });
            showSuccess();
        } catch (error) {
            console.error('Error adding favorite:', error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        fetchCatImage();
    }, []); // Dodaj fetchCatImage do zależności, jeśli potrzebne

    return (
        <div className="cat-container">
            <Toast ref={toast} />
            <img src={catImage} alt="Random Cat" className="cat-image" />
            <div className="buttons-container">
                <Button className="primary" onClick={handleAddFavorite}>Add to Favorites</Button>
                <Button className="secondary" onClick={fetchCatImage}>New Cat</Button>
            </div>
        </div>
    );
};

export default CatImage;
