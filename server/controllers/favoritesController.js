const Favorite = require('../models/Favorite');

const addFavorite = async (req, res) => {
    const { catImageUrl } = req.body;
    const userId = req.user.id;

    try {
        const existingFavorite = await Favorite.findOne({ userId, catImageUrl });
        if (existingFavorite) {
            return res.status(400).json({ message: 'This cat is already in your favorites' });
        }

        const favorite = new Favorite({ userId, catImageUrl });
        await favorite.save();
        res.status(201).json(favorite);
    } catch (error) {
        res.status(400).json({ message: 'Error adding favorite', error });
    }
};

const getFavorites = async (req, res) => {
    const userId = req.user.id;

    try {
        const favorites = await Favorite.find({ userId });
        res.json(favorites);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching favorites', error });
    }
};

const removeFavorite = async (req, res) => {
    const { id } = req.params;

    try {
        await Favorite.findByIdAndDelete(id);
        res.status(200).json({ message: 'Favorite removed' });
    } catch (error) {
        res.status(400).json({ message: 'Error removing favorite', error });
    }
};

module.exports = { addFavorite, getFavorites, removeFavorite };
