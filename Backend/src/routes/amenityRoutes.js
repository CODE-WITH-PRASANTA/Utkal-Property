const express = require(
  "express"
);

const router = express.Router();

const amenityController =
  require(
    "../controllers/amenityController"
  );

const {
  amenityUpload,
  processAmenityImage,
} = require(
  "../middleware/multer"
);

// ===============================
// GET ALL
// ===============================

router.get(
  "/",
  amenityController.getAmenities
);

// ===============================
// DASHBOARD STATS
// Must stay before /:id
// ===============================

router.get(
  "/dashboard/stats",
  amenityController.getAmenityStats
);

// ===============================
// BULK DELETE
// Must stay before /:id
// ===============================

router.delete(
  "/bulk/delete",
  amenityController.bulkDeleteAmenities
);

// ===============================
// GET ONE
// ===============================

router.get(
  "/:id",
  amenityController.getAmenity
);

// ===============================
// CREATE
// ===============================

router.post(
  "/",
  amenityUpload.single("image"),
  processAmenityImage,
  amenityController.createAmenity
);

// ===============================
// UPDATE
// ===============================

router.put(
  "/:id",
  amenityUpload.single("image"),
  processAmenityImage,
  amenityController.updateAmenity
);

// ===============================
// DELETE
// ===============================

router.delete(
  "/:id",
  amenityController.deleteAmenity
);

module.exports = router;