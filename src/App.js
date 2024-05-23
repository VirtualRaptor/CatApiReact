import React, { useState, useContext, useEffect } from 'react';
import CatImage from './components/CatImage';
import FavoriteCats from './components/FavoriteCats';
import Login from './components/Login';
import Register from './components/Register';
import { AuthContext } from './context/AuthContext';
import 'primereact/resources/themes/lara-light-pink/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import './App.css';

const App = () => {
    const { user, logout } = useContext(AuthContext);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [catsViewed, setCatsViewed] = useState(0);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (user) {
                try {
                    const response = await axios.get('http://localhost:5000/api/favorites', {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                        }
                    });
                    setFavorites(response.data);
                } catch (error) {
                    console.error('Error fetching favorites:', error);
                }
            }
        };

        fetchFavorites();
    }, [user]);

    const handleLoginClose = () => setShowLogin(false);
    const handleLoginShow = () => setShowLogin(true);

    const handleRegisterClose = () => setShowRegister(false);
    const handleRegisterShow = () => setShowRegister(true);

    const addFavorite = async (catImage) => {
        try {
            await axios.post('http://localhost:5000/api/favorites', { catImageUrl: catImage }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            // Fetch updated favorites immediately
            const response = await axios.get('http://localhost:5000/api/favorites', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setFavorites(response.data);
        } catch (error) {
            console.error('Error adding favorite:', error);
        }
    };

    const incrementCatsViewed = () => {
        setCatsViewed(catsViewed + 1);
    };

    return (
        <div>
            <div className="header">
                <div className="header-left">
                    <div className="counter">Cats viewed today: {catsViewed}</div>
                </div>
                <div className="header-right">
                    {user ? (
                        <>
                            <span>Witaj, {user.username}</span>
                            <Button variant="danger" onClick={logout}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Button variant="primary" onClick={handleLoginShow}>Login</Button>
                            <Button variant="secondary" onClick={handleRegisterShow}>Register</Button>
                        </>
                    )}
                </div>
            </div>
            <h1>Cutie Paw</h1>
            <h2>A cat image generation app</h2>
            <CatImage addFavorite={addFavorite} incrementCatsViewed={incrementCatsViewed} />
            <FavoriteCats favorites={favorites} />

            <Modal show={showLogin} onHide={handleLoginClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Login />
                </Modal.Body>
            </Modal>

            <Modal show={showRegister} onHide={handleRegisterClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Register />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default App;
