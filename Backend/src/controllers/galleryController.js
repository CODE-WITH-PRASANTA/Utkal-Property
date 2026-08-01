const Gallery = require('../models/Gallery');
const fs = require('fs');
const path = require('path');

// Helper to safely remove file from server storage
const removeFile = (filePath) => {
  if (!filePath) return;
  const relativePath = filePath.startsWith('/') ? filePath.substring(1) : filePath;
  const fullPath = path.join(process.cwd(), relativePath);

  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (!err) {
      fs.unlink(fullPath, (unlinkErr) => {
        if (unlinkErr) {
          console.error('Error deleting file:', unlinkErr);
        }
      });
    }
  });
};

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
exports.getGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Upload new gallery image
// @route   POST /api/gallery
// @access  Private/Admin
exports.createGalleryItem = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file'
      });
    }

    // FIX: Use req.file.relativePath set by convertToWebp, or construct /uploads/gallery/ explicitly
    const imagePath = req.file.relativePath || `/uploads/gallery/${req.file.filename}`;

    const newItem = await Gallery.create({
      image: imagePath
    });

    return res.status(201).json({
      success: true,
      data: newItem
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update existing gallery image
// @route   PUT /api/gallery/:id
// @access  Private/Admin
exports.updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    let item = await Gallery.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

    if (req.file) {
      removeFile(item.image);
      // FIX: Use req.file.relativePath or construct /uploads/gallery/ explicitly
      item.image = req.file.relativePath || `/uploads/gallery/${req.file.filename}`;
    }

    await item.save();

    return res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
exports.deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Gallery.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

    removeFile(item.image);
    await Gallery.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Gallery item deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};