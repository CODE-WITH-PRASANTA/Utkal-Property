const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Function to ensure destination folder exists dynamically
const ensureDirExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Default directories setup
const galleryDir = path.join(__dirname, '../../uploads/gallery');
const blogDir = path.join(__dirname, '../../uploads/blogs');

ensureDirExists(galleryDir);
ensureDirExists(blogDir);

// Memory storage to process buffer with Sharp
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Middleware to convert image to WebP and set clean relative path dynamically
const convertToWebp = async (req, res, next) => {
  if (!req.file) return next();

  try {
    // Determine whether this upload is for blogs or gallery based on URL
    const isBlog = req.originalUrl.includes('blog') || req.baseUrl.includes('blog');
    
    const targetFolder = isBlog ? 'blogs' : 'gallery';
    const prefix = isBlog ? 'blog' : 'gallery';

    const targetDir = path.join(__dirname, `../../uploads/${targetFolder}`);
    ensureDirExists(targetDir);

    const filename = `${prefix}-${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
    const outputPath = path.join(targetDir, filename);

    // Process image buffer with Sharp
    await sharp(req.file.buffer)
      .webp({ quality: 80 })
      .toFile(outputPath);

    // Attach filename AND correct relative database path
    req.file.filename = filename;
    req.file.relativePath = `/uploads/${targetFolder}/${filename}`;

    next();
  } catch (error) {
    console.error('Error converting image to WebP:', error);
    res.status(500).json({ success: false, message: 'Failed to process image.' });
  }
};

module.exports = { upload, convertToWebp };