import { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const register = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { username, password });
            setUser({ ...response.data, username });
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            setUser({ ...response.data, username });
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
