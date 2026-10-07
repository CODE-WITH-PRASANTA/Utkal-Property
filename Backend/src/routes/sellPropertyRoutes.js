const express = require('express');
const router = express.Router();

const { 
  sellPropertyUpload, 
  processSellPropertyImages,
  propertyUpload,
  processPropertyFiles,
} = require("../middleware/multer"); 

const propertyUploadFields = propertyUpload.fields([
  { name: "propertyImages", maxCount: 10 },
  { name: "documents", maxCount: 10 },
  { name: "floorPlanImages", maxCount: 10 },
]);

const { 
  createSellProperty, 
  getAllSellProperties, 
  getSellPropertyById, 
  updateSellProperty, 
  updateSellPropertyDetails,
  updateSellPropertyStatus,
  deleteSellProperty 
} = require("../controllers/sellPropertyController");

router.get('/', getAllSellProperties);
router.get('/:id', getSellPropertyById);

router.post(
  '/', 
  sellPropertyUpload.array('images', 10), 
  processSellPropertyImages, 
  createSellProperty
);

router.put(
  '/:id/details',
  propertyUploadFields,
  processPropertyFiles,
  updateSellPropertyDetails
);

router.put(
  '/:id/status',
  updateSellPropertyStatus
);

router.patch(
  '/:id', 
  sellPropertyUpload.array('images', 10), 
  processSellPropertyImages, 
  updateSellProperty
);

router.put(
  '/:id', 
  sellPropertyUpload.array('images', 10), 
  processSellPropertyImages, 
  updateSellProperty
);

router.delete('/:id', deleteSellProperty);

module.exports = router;