// src/components/Navbar.js
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import '../index.css'

const Navbar = ({ catsViewed, handleLoginShow, handleRegisterShow, logout }) => {
    const { user } = useContext(AuthContext);

    return (
        <div className="header">
            <div className="header-left">
                <div className="counter">Cats viewed today: {catsViewed}</div>
            </div>
            <div>
                <h1>Cutie Paw</h1>
            </div>
            <div className="header-right">
                {user ? (
                    <>
                        <span>Witaj, {user.username}</span>
                        <Button variant="danger" onClick={logout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button className="secondary" onClick={handleLoginShow}>Login</Button>
                        <Button variant="secondary" onClick={handleRegisterShow}>Register</Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
