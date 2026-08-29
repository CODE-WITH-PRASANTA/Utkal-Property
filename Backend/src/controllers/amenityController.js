const Amenity = require(
  "../models/Amenity"
);

const fs = require("fs");
const path = require("path");

// =====================================================
// GET ALL AMENITIES
// GET /api/amenities
// =====================================================

exports.getAmenities = async (
  req,
  res
) => {
  try {
    const {
      search = "",
      status,
      sort = "name_asc",
    } = req.query;

    const filter = {};

    // Search
    if (search.trim()) {
      filter.name = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    // Status
    if (
      status &&
      status !== "All Status"
    ) {
      filter.status = status;
    }

    // Sorting
    let sortOption = {
      sortOrder: 1,
      name: 1,
    };

    if (sort === "name_asc") {
      sortOption = {
        name: 1,
      };
    }

    if (sort === "name_desc") {
      sortOption = {
        name: -1,
      };
    }

    if (sort === "sort_order") {
      sortOption = {
        sortOrder: 1,
      };
    }

    const amenities =
      await Amenity.find(filter).sort(
        sortOption
      );

    return res.status(200).json({
      success: true,
      count: amenities.length,
      amenities,
    });
  } catch (error) {
    console.error(
      "GET AMENITIES ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch amenities.",
      error: error.message,
    });
  }
};

// =====================================================
// GET SINGLE AMENITY
// GET /api/amenities/:id
// =====================================================

exports.getAmenity = async (
  req,
  res
) => {
  try {
    const amenity =
      await Amenity.findById(
        req.params.id
      );

    if (!amenity) {
      return res.status(404).json({
        success: false,
        message:
          "Amenity not found.",
      });
    }

    return res.status(200).json({
      success: true,
      amenity,
    });
  } catch (error) {
    console.error(
      "GET AMENITY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch amenity.",
    });
  }
};

// =====================================================
// CREATE AMENITY
// POST /api/amenities
// =====================================================

exports.createAmenity = async (
  req,
  res
) => {
  try {
    const {
      name,
      description,
      status,
      sortOrder,
      icon,
    } = req.body;

    // -----------------------------
    // Validation
    // -----------------------------

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Amenity name is required.",
      });
    }

    // -----------------------------
    // Duplicate
    // -----------------------------

    const existing =
      await Amenity.findOne({
        name: {
          $regex:
            `^${name.trim()}$`,
          $options: "i",
        },
      });

    if (existing) {
      return res.status(400).json({
        success: false,
        message:
          "Amenity already exists.",
      });
    }

    // -----------------------------
    // Create
    // -----------------------------

    const amenity =
      await Amenity.create({
        name: name.trim(),

        description:
          description?.trim() || "",

        status:
          status === "Inactive"
            ? "Inactive"
            : "Active",

        sortOrder:
          Number(sortOrder) || 0,

        icon: icon || "🏊",

        image:
          req.processedAmenityImage ||
          "",
      });

    return res.status(201).json({
      success: true,
      message:
        "Amenity created successfully.",
      amenity,
    });
  } catch (error) {
    console.error(
      "CREATE AMENITY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.code === 11000
          ? "Amenity already exists."
          : error.message,
    });
  }
};

// =====================================================
// UPDATE AMENITY
// PUT /api/amenities/:id
// =====================================================

exports.updateAmenity = async (
  req,
  res
) => {
  try {
    const amenity =
      await Amenity.findById(
        req.params.id
      );

    if (!amenity) {
      return res.status(404).json({
        success: false,
        message:
          "Amenity not found.",
      });
    }

    const {
      name,
      description,
      status,
      sortOrder,
      icon,
    } = req.body;

    // -----------------------------
    // Name
    // -----------------------------

    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({
          success: false,
          message:
            "Amenity name cannot be empty.",
        });
      }

      const duplicate =
        await Amenity.findOne({
          _id: {
            $ne: amenity._id,
          },

          name: {
            $regex:
              `^${name.trim()}$`,
            $options: "i",
          },
        });

      if (duplicate) {
        return res.status(400).json({
          success: false,
          message:
            "Amenity already exists.",
        });
      }

      amenity.name = name.trim();
    }

    // -----------------------------
    // Other fields
    // -----------------------------

    if (description !== undefined) {
      amenity.description =
        description.trim();
    }

    if (status !== undefined) {
      amenity.status =
        status === "Inactive"
          ? "Inactive"
          : "Active";
    }

    if (sortOrder !== undefined) {
      amenity.sortOrder =
        Number(sortOrder) || 0;
    }

    if (icon !== undefined) {
      amenity.icon =
        icon || "🏊";
    }

    // -----------------------------
    // New image
    // -----------------------------

    if (
      req.processedAmenityImage
    ) {
      deleteUploadedFile(
        amenity.image
      );

      amenity.image =
        req.processedAmenityImage;
    }

    await amenity.save();

    return res.status(200).json({
      success: true,
      message:
        "Amenity updated successfully.",
      amenity,
    });
  } catch (error) {
    console.error(
      "UPDATE AMENITY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// DELETE AMENITY
// DELETE /api/amenities/:id
// =====================================================

exports.deleteAmenity = async (
  req,
  res
) => {
  try {
    const amenity =
      await Amenity.findById(
        req.params.id
      );

    if (!amenity) {
      return res.status(404).json({
        success: false,
        message:
          "Amenity not found.",
      });
    }

    deleteUploadedFile(
      amenity.image
    );

    await amenity.deleteOne();

    return res.status(200).json({
      success: true,
      message:
        "Amenity deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE AMENITY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete amenity.",
    });
  }
};

// =====================================================
// BULK DELETE
// DELETE /api/amenities/bulk/delete
// =====================================================

exports.bulkDeleteAmenities = async (
  req,
  res
) => {
  try {
    const { ids } = req.body;

    if (
      !Array.isArray(ids) ||
      ids.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please select amenities.",
      });
    }

    const amenities =
      await Amenity.find({
        _id: {
          $in: ids,
        },
      });

    amenities.forEach(
      (amenity) => {
        deleteUploadedFile(
          amenity.image
        );
      }
    );

    await Amenity.deleteMany({
      _id: {
        $in: ids,
      },
    });

    return res.status(200).json({
      success: true,
      message:
        `${amenities.length} amenities deleted successfully.`,
    });
  } catch (error) {
    console.error(
      "BULK DELETE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete amenities.",
    });
  }
};

// =====================================================
// DASHBOARD STATS
// GET /api/amenities/dashboard/stats
// =====================================================

exports.getAmenityStats = async (
  req,
  res
) => {
  try {
    const [
      total,
      active,
      inactive,
    ] = await Promise.all([
      Amenity.countDocuments(),

      Amenity.countDocuments({
        status: "Active",
      }),

      Amenity.countDocuments({
        status: "Inactive",
      }),
    ]);

    return res.status(200).json({
      success: true,

      stats: {
        total,
        active,
        inactive,
      },
    });
  } catch (error) {
    console.error(
      "AMENITY STATS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to load amenity statistics.",
    });
  }
};

// =====================================================
// DELETE FILE HELPER
// =====================================================

const deleteUploadedFile = (
  filePath
) => {
  try {
    if (!filePath) return;

    const relativePath =
      filePath.replace(
        /^\/uploads\//,
        ""
      );

    const absolutePath =
      path.join(
        __dirname,
        "../../uploads",
        relativePath
      );

    if (
      fs.existsSync(absolutePath)
    ) {
      fs.unlinkSync(absolutePath);
    }
  } catch (error) {
    console.error(
      "DELETE AMENITY FILE ERROR:",
      error
    );
  }
};