import React, { useState, useRef, useContext, useEffect } from 'react';
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
                const response = await axios.get('http://localhost:5000/api/favorites', {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setFavoriteCats(response.data);
            }
        };

        fetchFavorites();
    }, [user]);

    const handleImageClick = (cat) => {
        setSelectedCat(cat === selectedCat ? null : cat);
    };

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Removed', detail: 'Cat is no longer a favorite :(', life: 3000 });
    };

    const handleRemoveFavorite = async (id) => {
        await axios.delete(`http://localhost:5000/api/favorites/${id}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        setFavoriteCats(favoriteCats.filter((cat) => cat._id !== id));
        showError();
    };

    return (
        <div>
            <Toast ref={toast} />
            <h3 className="text-center">Favorite Cats</h3>
            <div className="favorite-cats-container">
                {favoriteCats.map((cat) => (
                    <div
                        key={cat._id}
                        className="favorite-cat"
                        style={{
                            margin: '10px'
                        }}
                    >
                        <img
                            src={cat.catImageUrl}
                            alt="Favorite Cat"
                            className={selectedCat === cat ? 'enlarged-cat' : 'regular-cat'}
                            onClick={() => handleImageClick(cat)}
                        />
                        <Button className="danger" onClick={() => handleRemoveFavorite(cat._id)}>Remove</Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoriteCats;
