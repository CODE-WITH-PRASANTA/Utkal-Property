const express = require("express");

const router = express.Router();

const propertyController =
  require("../controllers/propertyController");

const {
  propertyUpload,
  processPropertyFiles,
} = require("../middleware/multer");

// ============================================
// CREATE PROPERTY
// ============================================

router.post(
  "/",

  propertyUpload.fields([
    {
      name: "propertyImages",
      maxCount: 10,
    },
    {
      name: "documents",
      maxCount: 10,
    },
    {
      name: "floorPlanImages",
      maxCount: 10,
    },
  ]),

  processPropertyFiles,

  propertyController.createProperty
);

// ============================================
// GET PROPERTIES
// ============================================

router.get(
  "/",
  propertyController.getProperties
);

// ============================================
// DASHBOARD
// ============================================

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

// ============================================
// GET SINGLE PROPERTY
// ============================================

router.get(
  "/:id",
  propertyController.getProperty
);

// ============================================
// UPDATE PROPERTY
// ============================================

router.put(
  "/:id",

  propertyUpload.fields([
    {
      name: "propertyImages",
      maxCount: 10,
    },
    {
      name: "documents",
      maxCount: 10,
    },
    {
      name: "floorPlanImages",
      maxCount: 10,
    },
  ]),

  processPropertyFiles,

  propertyController.updateProperty
);

// ============================================
// UPDATE STATUS
// ============================================

router.put(
  "/:id/status",
  propertyController.updateStatus
);

// ============================================
// DELETE
// ============================================

router.delete(
  "/:id",
  propertyController.deleteProperty
);

module.exports = router;