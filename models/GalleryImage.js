// models/GalleryImage.js
import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  url: { type: String, required: true },
  alt: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.GalleryImage || mongoose.model('GalleryImage', galleryImageSchema);
