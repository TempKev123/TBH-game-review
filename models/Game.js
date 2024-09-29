// File: models/Game.js
import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  genre: { type: String, required: true },
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'Publisher', required: true },
  developer: { type: mongoose.Schema.Types.ObjectId, ref: 'Developer', required: true }, // Developer field is required
  rating: { type: Number, min: 1, max: 5, required: true }, 

});

export default mongoose.models.Game || mongoose.model('Game', GameSchema);