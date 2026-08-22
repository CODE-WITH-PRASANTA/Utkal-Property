const Blog = require('../models/Blog');
const path = require('path');
const fs = require('fs');

// Helper function to safely delete old files from disk
const deleteFileFromDisk = (relativePath) => {
  if (!relativePath || relativePath.startsWith('http')) return;
  
  // Construct absolute path from root
  const absolutePath = path.join(__dirname, '../../', relativePath);
  if (fs.existsSync(absolutePath)) {
    fs.unlink(absolutePath, (err) => {
      if (err) console.error(`Failed to delete file: ${absolutePath}`, err);
    });
  }
};

// @desc    Get all blog posts
// @route   GET /api/blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blogs',
      error: error.message,
    });
  }
};

// @desc    Get single blog post by ID
// @route   GET /api/blogs/:id
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving blog post', error: error.message });
  }
};

// @desc    Create a new blog post
// @route   POST /api/blogs
const createBlog = async (req, res) => {
  try {
    // 1. Determine image path (File upload via Multer OR URL string passed in body)
    let blogImagePath = req.body.blogImage;
    if (req.file && (req.file.relativePath || req.processedBlogImage)) {
      blogImagePath = req.file.relativePath || req.processedBlogImage;
    }

    // 2. Parse Tags if sent as JSON string via FormData
    let tagsList = req.body.tags;
    if (typeof tagsList === 'string') {
      try {
        tagsList = JSON.parse(tagsList);
      } catch (e) {
        tagsList = tagsList.split(',').map((tag) => tag.trim());
      }
    }

    // 3. Check slug uniqueness
    const slug = req.body.slug;
    if (slug) {
      const existingSlug = await Blog.findOne({ slug });
      if (existingSlug) {
        return res.status(400).json({ 
          success: false, 
          message: 'Slug must be unique. A post with this slug already exists.' 
        });
      }
    }

    // 4. Create Blog Record
    const blogData = {
      ...req.body,
      blogImage: blogImagePath,
      tags: tagsList,
      featuredPost: req.body.featuredPost === 'true' || req.body.featuredPost === true,
      showOnHomepage: req.body.showOnHomepage === 'true' || req.body.showOnHomepage === true,
      allowComments: req.body.allowComments === 'true' || req.body.allowComments === true,
    };

    const newBlog = await Blog.create(blogData);

    res.status(201).json({
      success: true,
      message: `Blog post ${newBlog.status === 'Published' ? 'published' : 'saved as draft'} successfully!`,
      data: newBlog,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create blog post',
      error: error.message,
    });
  }
};

// @desc    Update existing blog post
// @route   PUT /api/blogs/:id
const updateBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    // 1. Handle image replacement
    let blogImagePath = blog.blogImage; // default to existing
    if (req.file && (req.file.relativePath || req.processedBlogImage)) {
      // New file uploaded -> remove old image from disk if it was stored locally
      deleteFileFromDisk(blog.blogImage);
      blogImagePath = req.file.relativePath || req.processedBlogImage;
    } else if (req.body.blogImage) {
      blogImagePath = req.body.blogImage;
    }

    // 2. Parse tags if provided
    let tagsList = req.body.tags || blog.tags;
    if (typeof tagsList === 'string') {
      try {
        tagsList = JSON.parse(tagsList);
      } catch (e) {
        tagsList = tagsList.split(',').map((tag) => tag.trim());
      }
    }

    // 3. Assemble update object
    const updateData = {
      ...req.body,
      blogImage: blogImagePath,
      tags: tagsList,
    };

    // Cast booleans if sent via FormData
    if (req.body.featuredPost !== undefined) {
      updateData.featuredPost = req.body.featuredPost === 'true' || req.body.featuredPost === true;
    }
    if (req.body.showOnHomepage !== undefined) {
      updateData.showOnHomepage = req.body.showOnHomepage === 'true' || req.body.showOnHomepage === true;
    }
    if (req.body.allowComments !== undefined) {
      updateData.allowComments = req.body.allowComments === 'true' || req.body.allowComments === true;
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Blog post updated successfully!',
      data: blog,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update blog post',
      error: error.message,
    });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blogs/:id
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    // Delete image file from server if stored locally
    deleteFileFromDisk(blog.blogImage);

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully!',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete blog post',
      error: error.message,
    });
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};