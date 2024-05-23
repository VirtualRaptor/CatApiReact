import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const FavoriteCats = () => {
    const [favoriteCats, setFavoriteCats] = useState([]);
    const [selectedCat, setSelectedCat] = useState(null);
    const toast = useRef(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (user) {
                try {
                    const response = await axios.get('http://localhost:5000/api/favorites', {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                        }
                    });
                    setFavoriteCats(response.data);
                } catch (error) {
                    console.error('Error fetching favorites:', error);
                }
            }
        };

        fetchFavorites();
    }, [user]);

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
            setFavoriteCats(favoriteCats.filter((cat) => cat._id !== id));
            showError();
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    return (
        <div>
            <Toast ref={toast} />
            <h3 className="text-center">Favorite Cats</h3>
            <div className="favorite-cats-container">
                {favoriteCats.map((cat) => (
                    <div
                        key={cat._id}
                        className={`favorite-cat ${selectedCat === cat.catImageUrl ? 'enlarged-cat' : ''}`}
                        onClick={() => handleImageClick(cat.catImageUrl)}
                    >
                        <img
                            src={cat.catImageUrl}
                            alt="Favorite Cat"
                        />
                        <Button className="danger" onClick={() => handleRemoveFavorite(cat._id)}>Remove</Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoriteCats;
