const express = require("express");

const router = express.Router();

const {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} = require("../controllers/galleryController");

// =====================================================
// MULTER
// =====================================================

const {
  upload,
} = require("../middleware/multer");

// =====================================================
// GET ALL + CREATE
// =====================================================

router
  .route("/")
  .get(getGalleryItems)
  .post(
    upload.single("image"),
    createGalleryItem
  );

// =====================================================
// UPDATE + DELETE
// =====================================================

router
  .route("/:id")
  .put(
    upload.single("image"),
    updateGalleryItem
  )
  .delete(deleteGalleryItem);

module.exports = router;