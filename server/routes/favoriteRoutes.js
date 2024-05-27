const express = require('express');
const { addFavorite, getFavorites, removeFavorite, updateFavoriteName } = require('../controllers/favoritesController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, addFavorite);
router.get('/', protect, getFavorites);
router.delete('/:id', protect, removeFavorite);
router.put('/:id', protect, updateFavoriteName);

module.exports = router;
