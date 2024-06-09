import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../index.css';

const Login = ({ handleClose }) => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
        handleClose();
    };

    return (
        <div className="modal-custom">
            <form onSubmit={handleSubmit} className="modal-content-custom">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                />
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;
