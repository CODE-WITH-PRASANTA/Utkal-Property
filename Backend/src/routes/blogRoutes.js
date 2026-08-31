const express = require("express");
const router = express.Router();

const { upload, processBlogImage } = require("../middleware/multer");

const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// GET ALL BLOGS
router.get("/", getAllBlogs);

// GET SINGLE BLOG
router.get("/:id", getBlogById);

// CREATE BLOG
router.post(
  "/",
  upload.single("blogImage"),
  processBlogImage,
  createBlog
);

// UPDATE BLOG
router.put(
  "/:id",
  upload.single("blogImage"),
  processBlogImage,
  updateBlog
);

// DELETE BLOG
router.delete("/:id", deleteBlog);

module.exports = router;