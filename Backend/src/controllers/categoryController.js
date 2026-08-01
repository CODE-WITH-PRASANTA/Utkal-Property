const fs = require("fs");
const path = require("path");
const Category = require("../models/Category");

const toBoolean = (value) => {
  if (typeof value === "boolean") return value;
  return value === "true";
};

const removeImage = (imagePath) => {
  if (!imagePath || !imagePath.startsWith("/uploads/categories/")) return;

  const filePath = path.join(__dirname, "../..", imagePath.slice(1));
  fs.promises.unlink(filePath).catch((error) => {
    if (error.code !== "ENOENT") {
      console.error("Unable to remove category image:", error.message);
    }
  });
};

const sendError = (res, error) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({ success: false, message: error.message });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "A category with this slug already exists.",
    });
  }

  return res.status(500).json({ success: false, message: error.message });
};

const getCategoryPayload = (body) => {
  const payload = {};

  if (body.name !== undefined) payload.name = body.name.trim();
  if (body.slug !== undefined) payload.slug = body.slug.trim().toLowerCase();
  if (body.parent !== undefined) payload.parent = body.parent.trim();
  if (body.properties !== undefined) payload.properties = Number(body.properties) || 0;
  if (body.featured !== undefined) payload.featured = toBoolean(body.featured);
  if (body.status !== undefined) payload.status = body.status;
  if (body.icon !== undefined) payload.icon = body.icon;

  return payload;
};

exports.getCategories = async (_req, res) => {
  try {
    const categories = await Category.find().sort({ displayOrder: 1, createdAt: -1 });
    return res.status(200).json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    return sendError(res, error);
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = new Category({
      ...getCategoryPayload(req.body),
      image: req.processedCategoryImage || "",
      displayOrder: await Category.countDocuments(),
    });

    await category.save();
    return res.status(201).json({ success: true, data: category });
  } catch (error) {
    if (req.processedCategoryImage) removeImage(req.processedCategoryImage);
    return sendError(res, error);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      if (req.processedCategoryImage) removeImage(req.processedCategoryImage);
      return res.status(404).json({ success: false, message: "Category not found." });
    }

    Object.assign(category, getCategoryPayload(req.body));

    if (req.body.displayOrder !== undefined) {
      category.displayOrder = Number(req.body.displayOrder) || 0;
    }

    if (req.processedCategoryImage) {
      removeImage(category.image);
      category.image = req.processedCategoryImage;
    }

    await category.save();
    return res.status(200).json({ success: true, data: category });
  } catch (error) {
    if (req.processedCategoryImage) removeImage(req.processedCategoryImage);
    return sendError(res, error);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found." });
    }

    removeImage(category.image);
    await category.deleteOne();
    return res.status(200).json({ success: true, message: "Category deleted successfully." });
  } catch (error) {
    return sendError(res, error);
  }
};
