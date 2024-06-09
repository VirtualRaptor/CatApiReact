import React, { useState, useRef, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Toast } from 'primereact/toast';
import { AuthContext } from '../context/AuthContext';
import api from '../api'; // Import API

const FavoriteCats = ({ favorites, fetchFavorites }) => {
    const [selectedCat, setSelectedCat] = useState(null);
    const [nameInputs, setNameInputs] = useState({});
    const toast = useRef(null);
    const { user } = useContext(AuthContext);

    const handleImageClick = (catImageUrl) => {
        setSelectedCat(catImageUrl === selectedCat ? null : catImageUrl);
    };

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Removed', detail: 'Cat is no longer a favorite :(', life: 3000 });
    };

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Cat name updated!', life: 3000 });
    };

    const handleRemoveFavorite = async (id) => {
        try {
            await api.delete(`/favorites/${id}`);
            fetchFavorites(); // Fetch updated favorites after removal
            showError();
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    const handleNameChange = (id, value) => {
        setNameInputs({
            ...nameInputs,
            [id]: value
        });
    };

    const handleSaveName = async (id) => {
        try {
            const name = nameInputs[id] !== undefined ? nameInputs[id] : '';
            await api.put(`/favorites/${id}`, { name });
            fetchFavorites(); // Fetch updated favorites after name change
            showSuccess();
        } catch (error) {
            console.error('Error updating cat name:', error);
        }
    };

    return (
        <div>
            <Toast ref={toast} />
            <h3 className="text-center">Favorite Cats</h3>
            {user && <h5>(Refresh the page if favorite cat isn't showing!)</h5>}
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
                        <input
                            type="text"
                            value={nameInputs[cat._id] !== undefined ? nameInputs[cat._id] : (cat.name || '')}
                            onChange={(e) => handleNameChange(cat._id, e.target.value)}
                            placeholder="Name your cat"
                        />
                        <Button className="primary" onClick={(e) => { e.stopPropagation(); handleSaveName(cat._id); }}>Save</Button>
                        <Button className="danger" onClick={(e) => { e.stopPropagation(); handleRemoveFavorite(cat._id); }}>Remove</Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoriteCats;
