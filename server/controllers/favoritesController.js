const Favorite = require('../models/Favorite');

const addFavorite = async (req, res) => {
    const { catImageUrl } = req.body;

    if (!catImageUrl) {
        return res.status(400).json({ message: 'Cat image URL is required' });
    }

    const favorite = new Favorite({
        userId: req.user.id,
        catImageUrl
    });

    try {
        const savedFavorite = await favorite.save();
        res.status(201).json(savedFavorite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({ userId: req.user.id });
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.findById(req.params.id);

        if (!favorite) {
            return res.status(404).json({ message: 'Favorite not found' });
        }

        if (favorite.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized' });
        }

        await favorite.remove();
        res.status(200).json({ message: 'Favorite removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateFavoriteName = async (req, res) => {
    try {
        const favorite = await Favorite.findById(req.params.id);

        if (!favorite) {
            return res.status(404).json({ message: 'Favorite not found' });
        }

        if (favorite.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized' });
        }

        favorite.name = req.body.name !== undefined ? req.body.name : '';
        const updatedFavorite = await favorite.save();
        res.status(200).json(updatedFavorite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addFavorite,
    getFavorites,
    removeFavorite,
    updateFavoriteName
};
