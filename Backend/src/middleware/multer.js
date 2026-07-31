const multer = require("multer");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// 1. Store in memory first for sharp transformation
const storage = multer.memoryStorage();

// 2. File filter for accepted image types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, PNG, and WEBP images are allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

/**
 * Middleware to convert uploaded image to .webp and save to disk
 */
const convertToWebp = async (req, res, next) => {
  if (!req.file) return next();

  try {
    // Extract folder name safely (defaults to "testimonials")
    const folderName = req.baseUrl
      ? req.baseUrl.split("/").filter(Boolean).pop()
      : "testimonials";

    // FIXED: Target your project root 'uploads' directory cleanly
    const uploadDir = path.join(process.cwd(), "uploads", folderName);

    // Create target folder recursively if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate unique filename ending with .webp
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
    const fullDiskPath = path.join(uploadDir, filename);

    // Convert image buffer to webp and save to disk
    await sharp(req.file.buffer)
      .webp({ quality: 80 })
      .toFile(fullDiskPath);

    // Attach path metadata for controller logic
    req.file.filename = filename;
    req.file.path = `/uploads/${folderName}/${filename}`;

    next();
  } catch (error) {
    console.error("SHARP WEBP CONVERSION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Image processing failed.",
      error: error.message,
    });
  }
};

module.exports = { upload, convertToWebp };