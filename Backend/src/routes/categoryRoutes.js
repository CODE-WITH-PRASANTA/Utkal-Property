const express = require("express");
const categoryController = require("../controllers/categoryController");
const { categoryUpload, processCategoryImage } = require("../middleware/multer");

const router = express.Router();

router.get("/", categoryController.getCategories);
router.post("/", categoryUpload.single("image"), processCategoryImage, categoryController.createCategory);
router.put("/:id", categoryUpload.single("image"), processCategoryImage, categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
