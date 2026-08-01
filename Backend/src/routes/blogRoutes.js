const express = require("express");
const router = express.Router();

const { upload, convertToWebp } = require("../middleware/multer");

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
    convertToWebp,
    createBlog
);

// UPDATE BLOG
router.put(
    "/:id",
    upload.single("blogImage"),
    convertToWebp,
    updateBlog
);

// DELETE BLOG
router.delete("/:id", deleteBlog);

module.exports = router;