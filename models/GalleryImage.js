// models/GalleryImage.js
import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema({
  url: String,
  alt: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('GalleryImage', galleryImageSchema);
