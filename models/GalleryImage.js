// models/GalleryImage.js
import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.GalleryImage || mongoose.model('GalleryImage', galleryImageSchema);
