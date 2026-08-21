const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// =====================================================
// DIRECTORIES
// =====================================================

// Team images
const teamUploadDir = path.join(__dirname, "../../uploads/team");

// Property images
const propertyUploadDir = path.join(__dirname, "../../uploads/property");

// Property documents
const propertyDocumentDir = path.join(
  __dirname,
  "../../uploads/property/documents",
);

// Property floor plan images
const floorPlanUploadDir = path.join(
  __dirname,
  "../../uploads/property/floor-plans",
);

// Category images
const categoryUploadDir = path.join(__dirname, "../../uploads/categories");

// Location images
const locationUploadDir = path.join(__dirname, "../../uploads/locations");

// User images
const userUploadDir = path.join(__dirname, "../../uploads/users");

// Amenity images
const amenityUploadDir = path.join(__dirname, "../../uploads/amenities");

// =====================================================
// CREATE DIRECTORIES
// =====================================================

[
  teamUploadDir,
  propertyUploadDir,
  propertyDocumentDir,
  floorPlanUploadDir,
  categoryUploadDir,
  locationUploadDir,
  userUploadDir,
  amenityUploadDir,
].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {
      recursive: true,
    });
  }
});

// =====================================================
// MEMORY STORAGE
// =====================================================

const storage = multer.memoryStorage();

// =====================================================
// COMMON IMAGE FILTER
// =====================================================

const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    return cb(null, true);
  }

  return cb(new Error("Only image files are allowed!"), false);
};

// =====================================================
// TEAM IMAGE UPLOAD
// =====================================================

const upload = multer({
  storage,

  fileFilter: imageFileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// =====================================================
// TEAM IMAGE PROCESSOR
// =====================================================

const convertToWebp = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const filename = `team-${Date.now()}-${Math.round(
      Math.random() * 1e9,
    )}.webp`;

    const outputPath = path.join(teamUploadDir, filename);

    await sharp(req.file.buffer)
      .resize({
        width: 1000,
        withoutEnlargement: true,
      })
      .webp({
        quality: 80,
      })
      .toFile(outputPath);

    req.file.filename = filename;

    req.processedTeamImage = `/uploads/team/${filename}`;

    return next();
  } catch (error) {
    console.error("TEAM IMAGE PROCESSING ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to process team image.",
      error: error.message,
    });
  }
};

// =====================================================
// PROPERTY FILE FILTER
// =====================================================

const propertyFileFilter = (req, file, cb) => {
  // ===================================================
  // PROPERTY IMAGES
  // ===================================================

  if (file.fieldname === "propertyImages") {
    if (file.mimetype.startsWith("image/")) {
      return cb(null, true);
    }

    return cb(new Error("Property image must be an image file."), false);
  }

  // ===================================================
  // FLOOR PLAN IMAGES
  // ===================================================

  if (file.fieldname === "floorPlanImages") {
    if (file.mimetype.startsWith("image/")) {
      return cb(null, true);
    }

    return cb(new Error("Floor plan must be an image file."), false);
  }

  // ===================================================
  // PROPERTY DOCUMENTS
  // ===================================================

  if (file.fieldname === "documents") {
    const allowedTypes = [
      "application/pdf",

      // DOC
      "application/msword",

      // DOCX
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(
      new Error("Only PDF, DOC and DOCX documents are allowed."),
      false,
    );
  }

  // ===================================================
  // UNKNOWN FIELD
  // ===================================================

  return cb(new Error(`Unexpected upload field: ${file.fieldname}`), false);
};

// =====================================================
// PROPERTY UPLOAD
// =====================================================

const propertyUpload = multer({
  storage,

  fileFilter: propertyFileFilter,

  limits: {
    // 10 MB per file
    fileSize: 10 * 1024 * 1024,

    // Maximum total files
    files: 30,
  },
});

// =====================================================
// PROCESS PROPERTY FILES
// =====================================================

const processPropertyFiles = async (req, res, next) => {
  try {
    console.log("======================================");

    console.log("PROCESSING PROPERTY FILES");

    console.log("RECEIVED FILE FIELDS:", Object.keys(req.files || {}));

    console.log("======================================");

    // =================================================
    // PROPERTY IMAGES
    // =================================================

    req.processedPropertyImages = [];

    if (req.files?.propertyImages && req.files.propertyImages.length > 0) {
      for (const image of req.files.propertyImages) {
        const filename = `property-${Date.now()}-${Math.round(
          Math.random() * 1e9,
        )}.webp`;

        const outputPath = path.join(propertyUploadDir, filename);

        await sharp(image.buffer)
          .resize({
            width: 1400,
            withoutEnlargement: true,
          })
          .webp({
            quality: 80,
          })
          .toFile(outputPath);

        const imagePath = `/uploads/property/${filename}`;

        req.processedPropertyImages.push(imagePath);
      }
    }

    // =================================================
    // MAIN / COVER PROPERTY IMAGE
    // =================================================

    req.processedPropertyImage = req.processedPropertyImages[0] || "";

    // Keep compatibility with old controller
    req.processedImage = req.processedPropertyImage;

    // =================================================
    // PROPERTY DOCUMENTS
    // =================================================

    req.processedDocuments = [];

    if (req.files?.documents && req.files.documents.length > 0) {
      for (const document of req.files.documents) {
        const extension = path.extname(document.originalname).toLowerCase();

        const filename = `property-document-${Date.now()}-${Math.round(
          Math.random() * 1e9,
        )}${extension}`;

        const outputPath = path.join(propertyDocumentDir, filename);

        await fs.promises.writeFile(outputPath, document.buffer);

        req.processedDocuments.push({
          originalName: document.originalname,

          file: `/uploads/property/documents/${filename}`,
        });
      }
    }

    // =================================================
    // FLOOR PLAN IMAGES
    // =================================================

    req.processedFloorPlanImages = [];

    if (req.files?.floorPlanImages && req.files.floorPlanImages.length > 0) {
      for (const image of req.files.floorPlanImages) {
        const filename = `floor-plan-${Date.now()}-${Math.round(
          Math.random() * 1e9,
        )}.webp`;

        const outputPath = path.join(floorPlanUploadDir, filename);

        await sharp(image.buffer)
          .resize({
            width: 1600,
            withoutEnlargement: true,
          })
          .webp({
            quality: 85,
          })
          .toFile(outputPath);

        req.processedFloorPlanImages.push(
          `/uploads/property/floor-plans/${filename}`,
        );
      }
    }

    // =================================================
    // DEBUG
    // =================================================

    console.log("PROPERTY IMAGES:", req.processedPropertyImages);

    console.log("MAIN PROPERTY IMAGE:", req.processedPropertyImage);

    console.log("PROPERTY DOCUMENTS:", req.processedDocuments);

    console.log("FLOOR PLAN IMAGES:", req.processedFloorPlanImages);

    console.log("======================================");

    return next();
  } catch (error) {
    console.error("PROPERTY FILE PROCESSING ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to process property files.",

      error: error.message,
    });
  }
};

// =====================================================
// CATEGORY IMAGE UPLOAD
// =====================================================

const categoryUpload = multer({
  storage,

  fileFilter: imageFileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// =====================================================
// CATEGORY IMAGE PROCESSOR
// =====================================================

const processCategoryImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const filename = `category-${Date.now()}-${Math.round(
      Math.random() * 1e9,
    )}.webp`;

    const outputPath = path.join(categoryUploadDir, filename);

    await sharp(req.file.buffer)
      .resize({
        width: 800,
        withoutEnlargement: true,
      })
      .webp({
        quality: 80,
      })
      .toFile(outputPath);

    req.file.filename = filename;

    req.processedCategoryImage = `/uploads/categories/${filename}`;

    console.log("CATEGORY IMAGE:", req.processedCategoryImage);

    return next();
  } catch (error) {
    console.error("CATEGORY IMAGE PROCESSING ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to process category image.",

      error: error.message,
    });
  }
};

// =====================================================
// LOCATION IMAGE UPLOAD
// =====================================================

const locationUpload = multer({
  storage,

  fileFilter: imageFileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// =====================================================
// LOCATION IMAGE PROCESSOR
// =====================================================

const processLocationImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const filename = `location-${Date.now()}-${Math.round(
      Math.random() * 1e9,
    )}.webp`;

    const outputPath = path.join(locationUploadDir, filename);

    await sharp(req.file.buffer)
      .resize({
        width: 1200,
        withoutEnlargement: true,
      })
      .webp({
        quality: 80,
      })
      .toFile(outputPath);

    req.file.filename = filename;

    req.processedLocationImage = `/uploads/locations/${filename}`;

    console.log("LOCATION IMAGE:", req.processedLocationImage);

    return next();
  } catch (error) {
    console.error("LOCATION IMAGE PROCESSING ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to process location image.",

      error: error.message,
    });
  }
};

// =====================================================
// USER IMAGE UPLOAD
// =====================================================

const userUpload = multer({
  storage,

  fileFilter: imageFileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// =====================================================
// USER IMAGE PROCESSOR
// =====================================================

const convertUserImageToWebp = async (req, res, next) => {
  // Avatar is optional
  if (!req.file) {
    return next();
  }

  try {
    const filename = `user-${Date.now()}-${Math.round(
      Math.random() * 1e9,
    )}.webp`;

    const outputPath = path.join(userUploadDir, filename);

    await sharp(req.file.buffer)
      .resize({
        width: 500,
        height: 500,
        fit: "cover",
        position: "center",
        withoutEnlargement: true,
      })
      .webp({
        quality: 80,
      })
      .toFile(outputPath);

    req.file.filename = filename;

    req.processedUserImage = `/uploads/users/${filename}`;

    console.log("USER IMAGE:", req.processedUserImage);

    return next();
  } catch (error) {
    console.error("USER IMAGE PROCESSING ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to process user image.",

      error: error.message,
    });
  }
};

// =====================================================
// AMENITY IMAGE FILTER
// =====================================================

const amenityFileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/svg+xml",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  return cb(
    new Error("Only PNG, JPG, JPEG, WEBP and SVG images are allowed!"),
    false,
  );
};

// =====================================================
// AMENITY IMAGE UPLOAD
// =====================================================

const amenityUpload = multer({
  storage,

  fileFilter: amenityFileFilter,

  limits: {
    // Maximum 2 MB
    fileSize: 2 * 1024 * 1024,
  },
});

// =====================================================
// AMENITY IMAGE PROCESSOR
// =====================================================

const processAmenityImage = async (req, res, next) => {
  // Image is optional
  if (!req.file) {
    return next();
  }

  try {
    // =========================================
    // SVG FILE
    // =========================================

    if (req.file.mimetype === "image/svg+xml") {
      const filename = `amenity-${Date.now()}-${Math.round(
        Math.random() * 1e9,
      )}.svg`;

      const outputPath = path.join(amenityUploadDir, filename);

      await fs.promises.writeFile(outputPath, req.file.buffer);

      req.file.filename = filename;

      req.processedAmenityImage = `/uploads/amenities/${filename}`;

      console.log("AMENITY SVG:", req.processedAmenityImage);

      return next();
    }

    // =========================================
    // PNG/JPG/JPEG/WEBP -> WEBP
    // =========================================

    const filename = `amenity-${Date.now()}-${Math.round(
      Math.random() * 1e9,
    )}.webp`;

    const outputPath = path.join(amenityUploadDir, filename);

    await sharp(req.file.buffer)
      .resize({
        width: 500,
        height: 500,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality: 80,
      })
      .toFile(outputPath);

    req.file.filename = filename;

    req.processedAmenityImage = `/uploads/amenities/${filename}`;

    console.log("AMENITY IMAGE:", req.processedAmenityImage);

    return next();
  } catch (error) {
    console.error("AMENITY IMAGE PROCESSING ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to process amenity image.",

      error: error.message,
    });
  }
};

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  // Team
  upload,
  convertToWebp,

  // Property
  propertyUpload,
  processPropertyFiles,

  // Categories
  categoryUpload,
  processCategoryImage,

  // Locations
  locationUpload,
  processLocationImage,

  // Users
  userUpload,
  convertUserImageToWebp,

  // Amenities
  amenityUpload,
  processAmenityImage,
};
