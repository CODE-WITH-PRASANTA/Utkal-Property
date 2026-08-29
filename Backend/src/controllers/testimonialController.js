const Testimonial = require('../models/Testimonial');
const fs = require('fs');
const path = require('path');

// Helper function to safely delete file from disk when updated or deleted
const deleteImageFile = (photoPath) => {
  if (!photoPath) return;

  // Strip leading slash if present to get clean relative path
  const cleanPath = photoPath.startsWith('/') ? photoPath.substring(1) : photoPath;
  const fullPath = path.join(process.cwd(), cleanPath);

  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (!err) {
      fs.unlink(fullPath, (unlinkErr) => {
        if (unlinkErr) console.error('Failed to delete image file:', unlinkErr);
      });
    }
  });
};

// Helper to determine photo path attached by Multer/Sharp middleware
const getPhotoPath = (req) => {
  if (!req.file) return '';

  // Priority 1: Use relativePath attached by convertToWebp middleware (/uploads/gallery/gallery-xxx.webp)
  if (req.file.relativePath) {
    return req.file.relativePath;
  }

  // Priority 2: Fallback if only filename is available
  if (req.file.filename) {
    return `/uploads/gallery/${req.file.filename}`;
  }

  return '';
};

// @desc    Create a new testimonial
// @route   POST /api/testimonials
// @access  Public / Admin
const createTestimonial = async (req, res) => {
  try {
    const { name, designation, location, rating, status, description } = req.body;

    if (!name || !designation || !location || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields.',
      });
    }

    // Determine photo path from uploaded file or fallback string body
    const photo = getPhotoPath(req) || (typeof req.body.photo === 'string' ? req.body.photo : '');

    const testimonial = await Testimonial.create({
      name,
      designation,
      location,
      rating: rating ? Number(rating) : 5,
      status: status || 'Active',
      description,
      photo,
    });

    return res.status(201).json({
      success: true,
      message: 'Testimonial created successfully',
      data: testimonial,
    });
  } catch (error) {
    console.error('CREATE TESTIMONIAL ERROR:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    console.error('GET ALL TESTIMONIALS ERROR:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Get single testimonial by ID
// @route   GET /api/testimonials/:id
// @access  Public
const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    console.error('GET TESTIMONIAL BY ID ERROR:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Public / Admin
const updateTestimonial = async (req, res) => {
  try {
    const existingTestimonial = await Testimonial.findById(req.params.id);

    if (!existingTestimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found',
      });
    }

    const updateData = { ...req.body };

    // Handle new file upload
    if (req.file) {
      deleteImageFile(existingTestimonial.photo);
      updateData.photo = getPhotoPath(req);
    } else {
      // Prevent overwriting existing photo field if no new file uploaded
      delete updateData.photo;
      delete updateData.existingPhoto;
    }

    if (updateData.rating) {
      updateData.rating = Number(updateData.rating);
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: 'Testimonial updated successfully',
      data: testimonial,
    });
  } catch (error) {
    console.error('UPDATE TESTIMONIAL ERROR:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Public / Admin
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found',
      });
    }

    // Clean up physical file from uploads folder
    deleteImageFile(testimonial.photo);
    await Testimonial.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully',
    });
  } catch (error) {
    console.error('DELETE TESTIMONIAL ERROR:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};