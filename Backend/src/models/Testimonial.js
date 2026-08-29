const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
      default: 5,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    description: {
      type: String,
      required: [true, 'Testimonial description is required'],
      trim: true,
    },
    photo: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // Automatically manages createdAt & updatedAt
  }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);