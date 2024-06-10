import React, { useState, useContext, useEffect, useCallback } from 'react';
import CatImage from './components/CatImage';
import FavoriteCats from './components/FavoriteCats';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import { AuthContext } from './context/AuthContext';
import 'primereact/resources/themes/lara-light-pink/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Modal } from 'react-bootstrap';
import api from './api';
import './index.css';

const App = () => {
    const { user, logout } = useContext(AuthContext);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [catsViewed, setCatsViewed] = useState(0);

    const fetchFavorites = useCallback(async () => {
        if (user) {
            try {
                const response = await api.get('/favorites');
                setFavorites(response.data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        }
    }, [user]);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites, user]);

    const handleLoginClose = () => setShowLogin(false);
    const handleLoginShow = () => setShowLogin(true);

    const handleRegisterClose = () => setShowRegister(false);
    const handleRegisterShow = () => setShowRegister(true);

    const addFavorite = async (catImage) => {
        if (!favorites.some(fav => fav.catImageUrl === catImage)) {
            try {
                const response = await api.post('/favorites', { catImageUrl: catImage });
                if (response.status === 201) {
                    setFavorites(prevFavorites => [...prevFavorites, response.data]);
                } else {
                    console.error('Error adding favorite:', response.data.message);
                }
            } catch (error) {
                console.error('Error adding favorite:', error.response.data.message);
            }
        }
    };

    const incrementCatsViewed = () => {
        setCatsViewed(catsViewed + 1);
    };

    return (
        <div>
            <Navbar 
                catsViewed={catsViewed}
                handleLoginShow={handleLoginShow}
                handleRegisterShow={handleRegisterShow}
                logout={logout}
            />
            <h2>A cat image generation app</h2>
            <CatImage addFavorite={addFavorite} incrementCatsViewed={incrementCatsViewed} />
            
            {user && favorites.length > 0 && 
                <FavoriteCats favorites={favorites} fetchFavorites={fetchFavorites} />
            }

            <Modal show={showLogin} onHide={handleLoginClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Login handleClose={handleLoginClose} />
                </Modal.Body>
            </Modal>

            <Modal show={showRegister} onHide={handleRegisterClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Register handleClose={handleRegisterClose} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default App;
