import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true, // Base64 encoded image data
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Image = mongoose.models.Image || mongoose.model('Image', imageSchema);

export default Image;
