import React, { useState, useContext } from 'react';
import CatImage from './components/CatImage';
import FavoriteCats from './components/FavoriteCats';
import Login from './components/Login';
import Register from './components/Register';
import { AuthContext } from './context/AuthContext'; // Correct import
import 'primereact/resources/themes/lara-light-pink/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Modal, Button } from 'react-bootstrap';
import './App.css';

const App = () => {
    const { user, logout } = useContext(AuthContext); // Ensure AuthContext is defined
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleLoginClose = () => setShowLogin(false);
    const handleLoginShow = () => setShowLogin(true);

    const handleRegisterClose = () => setShowRegister(false);
    const handleRegisterShow = () => setShowRegister(true);

    return (
        <div>
            <div className="header">
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
            <h1>Cutie Paw</h1>
            <h2>A cat image generation app</h2>
            <CatImage />
            <FavoriteCats />

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
