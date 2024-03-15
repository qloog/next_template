// models/Image.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  data: String, // Base64 encoded image data
  labels: [String],
});

module.exports = mongoose.model('Image', imageSchema);
