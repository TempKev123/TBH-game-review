// File: models/Developer.js
import mongoose from 'mongoose';

const DeveloperSchema = new mongoose.Schema({
  name: { type: String, required: true },
  foundedDate: { type: Date, required: true },
  headquarters: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.models.Developer || mongoose.model('Developer', DeveloperSchema);