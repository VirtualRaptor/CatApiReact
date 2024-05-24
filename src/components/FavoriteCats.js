// src/components/FavoriteCats.js
import React, { useState, useRef, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Toast } from 'primereact/toast';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const FavoriteCats = ({ favorites, fetchFavorites }) => {
    const [selectedCat, setSelectedCat] = useState(null);
    const toast = useRef(null);
    const { user } = useContext(AuthContext);

    const handleImageClick = (catImageUrl) => {
        setSelectedCat(catImageUrl === selectedCat ? null : catImageUrl);
    };

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Removed', detail: 'Cat is no longer a favorite :(', life: 3000 });
    };

    const handleRemoveFavorite = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/favorites/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            fetchFavorites(); // Fetch updated favorites after removal
            showError();
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    return (
        <div>
            <Toast ref={toast} />
            <h3 className="text-center">Favorite Cats</h3>
            {!user && <h4>Log in to see favorites!</h4>} {/* Conditionally render this text */}
            <div className="favorite-cats-container">
                {favorites.map((cat) => (
                    <div
                        key={cat._id}
                        className={`favorite-cat ${selectedCat === cat.catImageUrl ? 'enlarged-cat' : ''}`}
                        onClick={() => handleImageClick(cat.catImageUrl)}
                    >
                        <img
                            src={cat.catImageUrl}
                            alt="Favorite Cat"
                        />
                        <Button className="danger" onClick={(e) => { e.stopPropagation(); handleRemoveFavorite(cat._id); }}>Remove</Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoriteCats;
