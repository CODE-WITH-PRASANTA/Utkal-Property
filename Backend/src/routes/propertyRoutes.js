const express = require("express");
const router = express.Router();

const propertyController = require(
  "../controllers/propertyController"
);

const {
  propertyUpload,
  processPropertyFiles,
} = require("../middleware/multer");

// ========================================
// PROPERTY FILES
// ========================================

const propertyFiles = propertyUpload.fields([
  {
    name: "image",
    maxCount: 1,
  },
  {
    name: "documents",
    maxCount: 10,
  },
]);

// ========================================
// CREATE
// ========================================

router.post(
  "/",
  propertyFiles,
  processPropertyFiles,
  propertyController.createProperty
);

// ========================================
// GET ALL
// ========================================

router.get(
  "/",
  propertyController.getProperties
);

// ========================================
// DASHBOARD
// ========================================

router.get(
  "/dashboard/stats",
  propertyController.dashboardStats
);

router.get(
  "/top-locations",
  propertyController.topLocations
);

router.get(
  "/property-types",
  propertyController.propertyTypes
);

router.get(
  "/price-range",
  propertyController.priceRangeAnalytics
);

// ========================================
// GET ONE
// ========================================

router.get(
  "/:id",
  propertyController.getProperty
);

// ========================================
// UPDATE
// ========================================

router.put(
  "/:id",
  propertyFiles,
  processPropertyFiles,
  propertyController.updateProperty
);

// ========================================
// STATUS
// ========================================

router.put(
  "/:id/status",
  propertyController.updateStatus
);

// ========================================
// DELETE
// ========================================

router.delete(
  "/:id",
  propertyController.deleteProperty
);


module.exports = router;