import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
  data: String,
  labels: [Array],
}, {
  timestamps: true,
});

export default mongoose.models.Image || mongoose.model('Image', imageSchema);
