const express = require("express");
const router = express.Router();

const { upload, convertToWebp } = require("../middleware/multer");

const {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");

// Safe optional wrapper for webp converter middleware
const handleWebp = (req, res, next) => {
  if (req.file && typeof convertToWebp === "function") {
    return convertToWebp(req, res, next);
  }
  next();
};

router
  .route("/")
  .get(getAllTestimonials)
  .post(upload.single("photo"), handleWebp, createTestimonial);

router
  .route("/:id")
  .get(getTestimonialById)
  .put(upload.single("photo"), handleWebp, updateTestimonial)
  .delete(deleteTestimonial);

module.exports = router;