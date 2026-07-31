const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Ensure destination folder exists
const uploadDir = path.join(__dirname, '../../uploads/team');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

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
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit before conversion
});

// Middleware to process and convert uploaded photo to .webp format
const convertToWebp = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const filename = `team-${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
    const outputPath = path.join(uploadDir, filename);

    // Convert image buffer to WebP with 80% quality compression
    await sharp(req.file.buffer)
      .webp({ quality: 80 })
      .toFile(outputPath);

    // Attach processed filename to req.file for controller usage
    req.file.filename = filename;
    next();
  } catch (error) {
    console.error('Error converting image to WebP:', error);
    res.status(500).json({ success: false, message: 'Failed to process image.' });
  }
};

module.exports = { upload, convertToWebp };