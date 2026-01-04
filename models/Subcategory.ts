import mongoose from 'mongoose';

const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a subcategory name'],
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  slug: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

export default mongoose.models.Subcategory || mongoose.model('Subcategory', SubcategorySchema);
