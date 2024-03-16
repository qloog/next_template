import mongoose from 'mongoose';

// IMAGE SCHEMA
const imageSchema = mongoose.Schema(
  {
    data: {
      type: String,
      required: true, // Base64 encoded image data
    },
    labels: {
      type: [String],
      required: true, // Array of labels assigned by GPT-4 Vision
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the 'Image' model using the schema
const Image = mongoose.model('Image', imageSchema);

export default Image;
