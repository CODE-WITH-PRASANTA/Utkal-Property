const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    facebook: {
      type: String,
      default: ''
    },
    twitter: {
      type: String,
      default: ''
    },
    linkedin: {
      type: String,
      default: ''
    },
    displayOrder: {
      type: Number,
      default: 1
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active'
    },
    photo: {
      type: String,
      required: [true, 'Profile photo is required']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('TeamMember', teamMemberSchema);