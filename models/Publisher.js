// File: models/Publisher.js
import mongoose from 'mongoose';

const PublisherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  foundedDate: { type: Date, required: true },
  headquarters: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.models.Publisher || mongoose.model('Publisher', PublisherSchema);