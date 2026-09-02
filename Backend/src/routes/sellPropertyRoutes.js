const express = require('express');
const router = express.Router();

const { 
  sellPropertyUpload, 
  processSellPropertyImages 
} = require("../middleware/multer"); 

const { 
  createSellProperty, 
  getAllSellProperties, 
  getSellPropertyById, 
  updateSellProperty, 
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
  '/:id', 
  sellPropertyUpload.array('images', 10), 
  processSellPropertyImages, 
  updateSellProperty
);

router.delete('/:id', deleteSellProperty);

module.exports = router;