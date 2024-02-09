// models/GalleryImage.js
import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  // Include other fields as necessary, for example, a reference to the user who uploaded the image
});

export default mongoose.models.GalleryImage || mongoose.model('GalleryImage', galleryImageSchema);
