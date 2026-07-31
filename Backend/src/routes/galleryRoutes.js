const express = require("express");
const router = express.Router();
const {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} = require("../controllers/galleryController");

// Import your custom Multer & Sharp middleware setup
const { upload, convertToWebp } = require("../middleware/multer"); // Adjust path if needed

// Router Endpoints
router
  .route("/")
  .get(getGalleryItems)
  .post(upload.single("image"), convertToWebp, createGalleryItem);

router
  .route("/:id")
  .put(upload.single("image"), convertToWebp, updateGalleryItem)
  .delete(deleteGalleryItem);

module.exports = router;