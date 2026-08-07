const express = require("express");

const router = express.Router();

const propertyController =
  require("../controllers/propertyController");

const {
  propertyUpload,
  processPropertyFiles,
} = require("../middleware/multer");

// =====================================================
// MULTER PROPERTY FIELDS
// =====================================================

const propertyUploadFields = propertyUpload.fields([
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
]);

// =====================================================
// CREATE PROPERTY
// POST /api/properties
// =====================================================

router.post(
  "/",
  propertyUploadFields,
  processPropertyFiles,
  propertyController.createProperty
);

// =====================================================
// GET ALL PROPERTIES
// GET /api/properties
// =====================================================

router.get(
  "/",
  propertyController.getProperties
);

// =====================================================
// DASHBOARD STATS
// IMPORTANT: STATIC ROUTES BEFORE /:id
// =====================================================

// GET /api/properties/dashboard/stats
router.get(
  "/dashboard/stats",
  propertyController.dashboardStats
);

// GET /api/properties/top-locations
router.get(
  "/top-locations",
  propertyController.topLocations
);

// GET /api/properties/property-types
router.get(
  "/property-types",
  propertyController.propertyTypes
);

// GET /api/properties/price-range
router.get(
  "/price-range",
  propertyController.priceRangeAnalytics
);

// =====================================================
// UPDATE PROPERTY STATUS
// PUT /api/properties/:id/status
// =====================================================

router.put(
  "/:id/status",
  propertyController.updateStatus
);

// =====================================================
// GET SINGLE PROPERTY BY ID
// GET /api/properties/:id
// =====================================================

router.get(
  "/:id",
  propertyController.getProperty
);

// =====================================================
// UPDATE PROPERTY BY ID
// PUT /api/properties/:id
// =====================================================

router.put(
  "/:id",
  propertyUploadFields,
  processPropertyFiles,
  propertyController.updateProperty
);

// =====================================================
// DELETE PROPERTY BY ID
// DELETE /api/properties/:id
// =====================================================

router.delete(
  "/:id",
  propertyController.deleteProperty
);

// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;