const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    catImageUrl: { type: String, required: true },
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
