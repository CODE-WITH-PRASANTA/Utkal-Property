const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
      maxLength: [100, 'Title cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    blogImage: {
      type: String,
      required: [true, 'Blog cover image URL is required'],
      default: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Housing', 'Business', 'Apartments', 'Luxury Villa', 'Duplex House', 'Investment', 'Lifestyle'],
      default: 'Housing',
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    author: {
      type: String,
      required: [true, 'Author name is required'],
      default: 'Admin User',
    },
    publishDate: {
      type: String,
      required: [true, 'Publish date is required'],
    },
    publishTime: {
      type: String,
      default: '10:30',
    },
    shortDesc: {
      type: String,
      required: [true, 'Short description is required'],
      maxLength: [200, 'Short description cannot exceed 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Blog content is required'],
    },
    metaTitle: {
      type: String,
      trim: true,
    },
    metaDesc: {
      type: String,
      trim: true,
    },
    metaKeywords: {
      type: String,
      trim: true,
    },
    featuredPost: {
      type: Boolean,
      default: false,
    },
    showOnHomepage: {
      type: Boolean,
      default: false,
    },
    allowComments: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['Published', 'Draft'],
      default: 'Published',
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

module.exports = mongoose.model('Blog', blogSchema);