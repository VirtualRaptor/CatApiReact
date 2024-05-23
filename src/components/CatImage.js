import React, { useState, useEffect, useRef, useContext } from 'react'; // Add useContext
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Toast } from 'primereact/toast';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const CatImage = ({ addFavorite, incrementCatsViewed }) => {
    const [catImage, setCatImage] = useState('');
    const toast = useRef(null);
    const { user } = useContext(AuthContext); // Use AuthContext to get user

    const fetchCatImage = async () => {
        try {
            const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
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
        try {
            await axios.post('http://localhost:5000/api/favorites', { catImageUrl: catImage }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            addFavorite(catImage);
            showSuccess();
        } catch (error) {
            console.error('Error adding favorite:', error);
        }
    };

    useEffect(() => {
        fetchCatImage();
    }, []);

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
