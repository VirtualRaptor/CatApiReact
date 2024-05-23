const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = new User({ username, password });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error
            return res.status(400).json({ message: 'Username already exists' });
        }
        res.status(400).json({ message: 'Error registering user', error });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: 'Error logging in', error });
    }
};

module.exports = { register, login };
