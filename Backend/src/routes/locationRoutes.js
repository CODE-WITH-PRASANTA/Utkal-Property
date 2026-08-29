const express = require("express");
const locationController = require("../controllers/locationController");
const { locationUpload, processLocationImage } = require("../middleware/multer");

const router = express.Router();

router.get("/", locationController.getLocations);
router.post("/", locationUpload.single("image"), processLocationImage, locationController.createLocation);
router.put("/:id", locationUpload.single("image"), processLocationImage, locationController.updateLocation);
router.delete("/:id", locationController.deleteLocation);

module.exports = router;
