import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a service name'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  priceRange: {
    type: String,
    required: [true, 'Please provide a price range'],
  },
  icon: {
    type: String, // Can be an icon name or URL
    required: true,
  },
  estimatedTime: {
    type: String,
  },
  category: {
    type: String,
    enum: ['Repair', 'Upgrade', 'Maintenance', 'Diagnostics'],
    default: 'Repair',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
