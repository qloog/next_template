import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    data: {
      type: String,
      required: true, // Base64 encoded image data
    },
    labels: [String], // Array of labels
    userEmail: {
      // Adding a field for the user's email
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Creating an index on the createdAt field in descending order
// This will ensure that when you sort by this field, MongoDB can do it efficiently
imageSchema.index({ createdAt: -1 });
imageSchema.index({ userEmail: 1 });
const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);

export default Image;
