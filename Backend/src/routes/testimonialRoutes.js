const express = require('express');
const router = express.Router();
const { upload, convertToWebp } = require('../middleware/multer'); // Adjust relative path to your Multer middleware

const {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController');

// Public routes
router.get('/', getAllTestimonials);
router.get('/:id', getTestimonialById);

// Protected / Admin routes using your unchanged Multer & Sharp middleware
router.post(
  '/',
  upload.single('photo'), // Works with frontend input named 'photo'
  convertToWebp,
  createTestimonial
);

router.put(
  '/:id',
  upload.single('photo'),
  convertToWebp,
  updateTestimonial
);

router.delete('/:id', deleteTestimonial);

module.exports = router;