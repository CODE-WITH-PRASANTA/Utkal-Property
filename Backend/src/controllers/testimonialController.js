const Testimonial = require("../models/Testimonial");

// Helper to format uploaded file path safely
const getPhotoPath = (req) => {
  if (!req.file) return "";
  
  // Handle both req.file.filename (Multer) and converted webp path
  const filename = req.file.filename || (req.file.path ? req.file.path.split("/").pop() : "");
  if (!filename) return "";

  // Fallback gracefully if baseUrl is missing or empty
  const folderName = req.baseUrl ? req.baseUrl.split("/").filter(Boolean).pop() : "testimonials";
  return `/uploads/${folderName || "testimonials"}/${filename}`;
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
        message: "Please fill in all required fields.",
      });
    }

    const photo = getPhotoPath(req) || req.body.photo || "";

    const testimonial = await Testimonial.create({
      name,
      designation,
      location,
      rating: rating ? Number(rating) : 5,
      status: status || "Active",
      description,
      photo,
    });

    return res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error("CREATE TESTIMONIAL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
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
    console.error("GET ALL TESTIMONIALS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
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
        message: "Testimonial not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    console.error("GET TESTIMONIAL BY ID ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Public / Admin
const updateTestimonial = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.photo = getPhotoPath(req);
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

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error("UPDATE TESTIMONIAL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Public / Admin
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("DELETE TESTIMONIAL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
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