const express = require('express');
const { addFavorite, getFavorites, removeFavorite } = require('../controllers/favoritesController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, addFavorite);
router.get('/', protect, getFavorites);
router.delete('/:id', protect, removeFavorite);

module.exports = router;
