// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('userToken');
        const username = localStorage.getItem('username');
        return token ? { token, username } : null;
    });

    const register = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5217/api/auth/register', { username, password });
            const { token } = response.data;
            localStorage.setItem('userToken', token);
            localStorage.setItem('username', username);
            setUser({ token, username });
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5217/api/auth/login', { username, password });
            const { token } = response.data;
            localStorage.setItem('userToken', token);
            localStorage.setItem('username', username);
            setUser({ token, username });
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('username');
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        const username = localStorage.getItem('username');
        if (token) {
            setUser({ token, username });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
