import mongoose from 'mongoose';
import toJSON from './plugins/toJSON';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true
  },
  image: {
    type: String,
  },
  customerId: {
    type: String,
    validate(value) {
      return value.startsWith('cus_');
    }
  },
  priceId: {
    type: String,
    validate(value) {
      return value.startsWith('price_');
    }
  },
  hasAccess: {
    type: Boolean,
    default: false
  },
  imageCount: {
    type: Number,
    default: 0
  },
  planType: {
    type: String,
    enum: ['beginner', 'veteran', 'premium'],
    default: 'beginner'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

// Add plugin that converts mongoose to json
userSchema.plugin(toJSON);

const User = mongoose.model('User', userSchema);
export default User;
