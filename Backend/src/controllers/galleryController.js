const Gallery = require("../models/Gallery");

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// =====================================================
// GALLERY UPLOAD DIRECTORY
// =====================================================

const galleryUploadDir = path.join(
  process.cwd(),
  "uploads",
  "gallery"
);

// =====================================================
// CREATE DIRECTORY
// =====================================================

if (!fs.existsSync(galleryUploadDir)) {
  fs.mkdirSync(galleryUploadDir, {
    recursive: true,
  });
}

// =====================================================
// GENERATE UNIQUE FILENAME
// =====================================================

const generateGalleryFilename = () => {
  return `gallery-${Date.now()}-${Math.round(
    Math.random() * 1e9
  )}.webp`;
};

// =====================================================
// REMOVE FILE SAFELY
// =====================================================

const removeFile = async (filePath) => {
  try {
    if (!filePath) {
      return;
    }

    let cleanPath = String(filePath).trim();

    // Normalize Windows slash
    cleanPath = cleanPath.replace(/\\/g, "/");

    // Find uploads/
    const uploadsIndex = cleanPath
      .toLowerCase()
      .indexOf("uploads/");

    if (uploadsIndex === -1) {
      console.warn(
        "Invalid upload path:",
        filePath
      );
      return;
    }

    // Extract only uploads/...
    const relativePath = cleanPath.substring(
      uploadsIndex
    );

    const fullPath = path.join(
      process.cwd(),
      relativePath
    );

    try {
      await fs.promises.access(
        fullPath,
        fs.constants.F_OK
      );

      await fs.promises.unlink(fullPath);

      console.log(
        "Gallery file deleted:",
        fullPath
      );
    } catch (error) {
      if (error.code !== "ENOENT") {
        console.error(
          "Error deleting gallery file:",
          error
        );
      }
    }
  } catch (error) {
    console.error(
      "REMOVE GALLERY FILE ERROR:",
      error
    );
  }
};

// =====================================================
// PROCESS GALLERY IMAGE
// =====================================================

const processGalleryImage = async (file) => {
  if (!file || !file.buffer) {
    throw new Error(
      "No image buffer received."
    );
  }

  const filename =
    generateGalleryFilename();

  const outputPath = path.join(
    galleryUploadDir,
    filename
  );

  await sharp(file.buffer)
    .resize({
      width: 1400,
      withoutEnlargement: true,
    })
    .webp({
      quality: 85,
    })
    .toFile(outputPath);

  return {
    filename,
    path: `/uploads/gallery/${filename}`,
    fullPath: outputPath,
  };
};

// =====================================================
// GET ALL GALLERY IMAGES
// @route GET /api/gallery
// =====================================================

exports.getGalleryItems = async (
  req,
  res
) => {
  try {
    const items = await Gallery.find()
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error(
      "GET GALLERY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch gallery images.",
      error: error.message,
    });
  }
};

// =====================================================
// CREATE GALLERY IMAGE
// @route POST /api/gallery
// =====================================================

exports.createGalleryItem = async (
  req,
  res
) => {
  try {
    // ---------------------------------------------------
    // GET TEXT DATA
    // ---------------------------------------------------

    const title = String(
      req.body.title || ""
    ).trim();

    const category = String(
      req.body.category || ""
    ).trim();

    const description = String(
      req.body.description || ""
    ).trim();

    // ---------------------------------------------------
    // VALIDATE TEXT DATA
    // ---------------------------------------------------

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required.",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required.",
      });
    }

    if (!description) {
      return res.status(400).json({
        success: false,
        message:
          "Description is required.",
      });
    }

    // ---------------------------------------------------
    // CHECK FILE
    // ---------------------------------------------------

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Please upload an image file.",
      });
    }

    console.log(
      "GALLERY ORIGINAL FILE:",
      req.file.originalname
    );

    console.log(
      "GALLERY MIME TYPE:",
      req.file.mimetype
    );

    // ---------------------------------------------------
    // PROCESS IMAGE
    // ---------------------------------------------------

    const processed =
      await processGalleryImage(
        req.file
      );

    console.log(
      "GALLERY IMAGE SAVED:",
      processed.path
    );

    // ---------------------------------------------------
    // SAVE DATABASE
    // ---------------------------------------------------

    const newItem =
      await Gallery.create({
        title,
        category,
        description,
        image: processed.path,
      });

    // ---------------------------------------------------
    // RESPONSE
    // ---------------------------------------------------

    return res.status(201).json({
      success: true,
      message:
        "Gallery item uploaded successfully.",
      data: newItem,
    });
  } catch (error) {
    console.error(
      "CREATE GALLERY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to upload gallery image.",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE GALLERY IMAGE
// @route PUT /api/gallery/:id
// =====================================================

exports.updateGalleryItem = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    // ---------------------------------------------------
    // FIND EXISTING
    // ---------------------------------------------------

    const item =
      await Gallery.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message:
          "Gallery item not found.",
      });
    }

    // ---------------------------------------------------
    // GET TEXT DATA
    // ---------------------------------------------------

    const title =
      req.body.title !== undefined
        ? String(req.body.title).trim()
        : item.title;

    const category =
      req.body.category !== undefined
        ? String(req.body.category).trim()
        : item.category;

    const description =
      req.body.description !== undefined
        ? String(req.body.description).trim()
        : item.description;

    // ---------------------------------------------------
    // VALIDATE
    // ---------------------------------------------------

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required.",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required.",
      });
    }

    if (!description) {
      return res.status(400).json({
        success: false,
        message:
          "Description is required.",
      });
    }

    // ---------------------------------------------------
    // UPDATE TEXT DATA
    // ---------------------------------------------------

    item.title = title;
    item.category = category;
    item.description = description;

    // ---------------------------------------------------
    // IF NEW IMAGE EXISTS
    // ---------------------------------------------------

    if (req.file) {
      const processed =
        await processGalleryImage(
          req.file
        );

      console.log(
        "NEW GALLERY IMAGE:",
        processed.path
      );

      const oldImagePath =
        item.image;

      item.image =
        processed.path;

      await item.save();

      // Delete old image
      if (
        oldImagePath &&
        oldImagePath !== processed.path
      ) {
        await removeFile(
          oldImagePath
        );
      }
    } else {
      await item.save();
    }

    // ---------------------------------------------------
    // RESPONSE
    // ---------------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "Gallery item updated successfully.",
      data: item,
    });
  } catch (error) {
    console.error(
      "UPDATE GALLERY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update gallery item.",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE GALLERY IMAGE
// @route DELETE /api/gallery/:id
// =====================================================

exports.deleteGalleryItem = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    // ---------------------------------------------------
    // FIND ITEM
    // ---------------------------------------------------

    const item =
      await Gallery.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message:
          "Gallery item not found.",
      });
    }

    // ---------------------------------------------------
    // DELETE DATABASE
    // ---------------------------------------------------

    await Gallery.findByIdAndDelete(id);

    // ---------------------------------------------------
    // DELETE IMAGE FILE
    // ---------------------------------------------------

    if (item.image) {
      await removeFile(
        item.image
      );
    }

    // ---------------------------------------------------
    // RESPONSE
    // ---------------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "Gallery item deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE GALLERY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete gallery item.",
      error: error.message,
    });
  }
};