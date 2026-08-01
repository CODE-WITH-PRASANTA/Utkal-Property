const Property = require("../models/Property");
const fs = require("fs");
const path = require("path");

/**
 * ===========================
 * Create Property
 * POST /api/properties
 * ===========================
 */

exports.createProperty = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    console.log("PROCESSED IMAGE:", req.processedImage);
    console.log("PROCESSED DOCUMENTS:", req.processedDocuments);

    const {
      name,
      featured,
      category,
      type,
      subType,
      status,
      statusType,
      projectSize,
      completionStatus,
      shortDescription,
      highlights,

      location,
      city,
      state,
      country,

      totalUnits,
      availableUnits,
      totalArea,
      launchDate,

      totalFloors,
      bedrooms,
      bathrooms,
      plotSize,
      parking,

      amenities,

      price,
      pricePerSqft,
      rera,

      metaTitle,
      metaDescription,
      urlSlug,

      publishStatus,
      publishDate,
      promoteProperty,
    } = req.body;

    // ==========================================
    // REQUIRED VALIDATION
    // ==========================================

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Property name is required.",
      });
    }

    if (!location?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Property location is required.",
      });
    }

    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Property type is required.",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Property category is required.",
      });
    }

    if (
      price === undefined ||
      price === null ||
      price === "" ||
      Number(price) < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid property price is required.",
      });
    }

    // ==========================================
    // PARSE HIGHLIGHTS
    // ==========================================

    let parsedHighlights = [];

    if (highlights) {
      try {
        parsedHighlights =
          typeof highlights === "string"
            ? JSON.parse(highlights)
            : highlights;

        if (!Array.isArray(parsedHighlights)) {
          parsedHighlights = [];
        }

        parsedHighlights = parsedHighlights
          .map((item) => String(item).trim())
          .filter(Boolean);
      } catch (error) {
        console.error(
          "Highlights parse error:",
          error.message
        );

        parsedHighlights = [];
      }
    }

    // ==========================================
    // PARSE AMENITIES
    // ==========================================

    let parsedAmenities = [];

    if (amenities) {
      try {
        parsedAmenities =
          typeof amenities === "string"
            ? JSON.parse(amenities)
            : amenities;

        if (!Array.isArray(parsedAmenities)) {
          parsedAmenities = [];
        }

        parsedAmenities = parsedAmenities
          .map((item) => String(item).trim())
          .filter(Boolean);
      } catch (error) {
        console.error(
          "Amenities parse error:",
          error.message
        );

        parsedAmenities = [];
      }
    }

    // ==========================================
    // BOOLEAN VALUES
    // ==========================================

    const isFeatured =
      featured === true || featured === "true";

    const isPublished =
      publishStatus === true ||
      publishStatus === "true";

    const isPromoted =
      promoteProperty === true ||
      promoteProperty === "true";

    // ==========================================
    // IMAGE
    // ==========================================

    const imagePath = req.processedImage
      ? `/uploads/property/${req.processedImage}`
      : "";

    // ==========================================
    // DOCUMENTS
    // ==========================================

    const propertyDocuments = Array.isArray(
      req.processedDocuments
    )
      ? req.processedDocuments
      : [];

    // ==========================================
    // CREATE PROPERTY
    // ==========================================

    const property = await Property.create({
      // ----------------------------------------
      // BASIC INFORMATION
      // ----------------------------------------

      name: name.trim(),

      featured: isFeatured,

      category,

      type,

      subType: subType || "",

      status: status || "Active",

      statusType: statusType || "For Sale",

      projectSize: Number(projectSize) || 0,

      completionStatus:
        completionStatus || "Under Construction",

      shortDescription:
        shortDescription?.trim() || "",

      highlights: parsedHighlights,

      // ----------------------------------------
      // LOCATION
      // ----------------------------------------

      location: location.trim(),

      city: city?.trim() || "",

      state: state?.trim() || "",

      country: country?.trim() || "",

      // ----------------------------------------
      // QUICK STATS
      // ----------------------------------------

      totalUnits: Number(totalUnits) || 0,

      availableUnits:
        Number(availableUnits) || 0,

      totalArea: Number(totalArea) || 0,

      launchDate:
        launchDate && launchDate !== ""
          ? launchDate
          : null,

      // ----------------------------------------
      // PROPERTY DETAILS
      // ----------------------------------------

      totalFloors:
        Number(totalFloors) || 0,

      bedrooms:
        Number(bedrooms) || 0,

      bathrooms:
        Number(bathrooms) || 0,

      plotSize:
        Number(plotSize) || 0,

      parking:
        parking?.trim() || "",

      // ----------------------------------------
      // AMENITIES
      // ----------------------------------------

      amenities: parsedAmenities,

      // ----------------------------------------
      // PRICE
      // ----------------------------------------

      price: Number(price),

      pricePerSqft:
        Number(pricePerSqft) || 0,

      rera:
        rera?.trim() || "",

      // ----------------------------------------
      // IMAGE
      // ----------------------------------------

      image: imagePath,

      // ----------------------------------------
      // DOCUMENTS
      // ----------------------------------------

      documents: propertyDocuments,

      // ----------------------------------------
      // SEO
      // ----------------------------------------

      metaTitle:
        metaTitle?.trim() || "",

      metaDescription:
        metaDescription?.trim() || "",

      urlSlug:
        urlSlug?.trim() || "",

      // ----------------------------------------
      // PUBLISH SETTINGS
      // ----------------------------------------

      publishStatus: isPublished,

      publishDate:
        publishDate && publishDate !== ""
          ? publishDate
          : null,

      promoteProperty: isPromoted,
    });

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================

    return res.status(201).json({
      success: true,
      message: "Property published successfully.",
      property,
    });
  } catch (error) {
    console.error(
      "CREATE PROPERTY ERROR:",
      error
    );

    // Mongoose validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to create property.",
    });
  }
};

/**
 * ===========================
 * Get All Properties
 * GET /api/properties
 * ===========================
 *
 * Query Params
 *
 * page=1
 * &limit=10
 * &search=
 * &status=
 * &category=
 * &type=
 * &location=
 */

exports.getProperties = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      search = "",
      status,
      category,
      type,
      location,
      statusType,
      bedrooms,
      bathrooms,
      amenities,
      featured,
      promoteProperty,
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    const filter = {};

    // Search
    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          location: {
            $regex: search,
            $options: "i",
          },
        },
        {
          rera: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Filters
    if (status && status !== "All") {
      filter.status = status;
    }

    if (category && category !== "All") {
      filter.category = {
        $regex: category.replace(/-/g, " "),
        $options: "i",
      };
    }

    if (type && type !== "All") {
      filter.type = {
        $regex: type.replace(/-/g, " "),
        $options: "i",
      };
    }

    if (location && location !== "All") {
      filter.location = {
        $regex: location.replace(/-/g, " "),
        $options: "i",
      };
    }

    if (statusType && statusType !== "All") {
      filter.statusType = {
        $regex: statusType,
        $options: "i",
      };
    }

    if (bedrooms) {
      filter.bedrooms = { $gte: Number(bedrooms) };
    }

    if (bathrooms) {
      filter.bathrooms = { $gte: Number(bathrooms) };
    }

    if (amenities) {
      const requestedAmenities = amenities
        .split(",")
        .map((amenity) => amenity.trim())
        .filter(Boolean);

      if (requestedAmenities.length) {
        filter.amenities = { $all: requestedAmenities };
      }
    }

    if (featured !== undefined) {
      filter.featured = featured === "true" || featured === true;
    }

    if (promoteProperty !== undefined) {
      filter.promoteProperty =
        promoteProperty === "true" || promoteProperty === true;
    }

    const total = await Property.countDocuments(filter);

    const properties = await Property.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      success: true,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      properties,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ===========================
 * Get Single Property
 * GET /api/properties/:id
 * ===========================
 */

exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found.",
      });
    }

    // Increase View Count
    property.views += 1;
    await property.save();

    return res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




/**
 * ===========================
 * Update Property
 * PUT /api/properties/:id
 * ===========================
 */

exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found.",
      });
    }

    // =====================================
    // PARSE ARRAY VALUES
    // =====================================

    let parsedHighlights = property.highlights || [];
    let parsedAmenities = property.amenities || [];

    if (req.body.highlights !== undefined) {
      try {
        parsedHighlights =
          typeof req.body.highlights === "string"
            ? JSON.parse(req.body.highlights)
            : req.body.highlights;
      } catch {
        parsedHighlights = [];
      }
    }

    if (req.body.amenities !== undefined) {
      try {
        parsedAmenities =
          typeof req.body.amenities === "string"
            ? JSON.parse(req.body.amenities)
            : req.body.amenities;
      } catch {
        parsedAmenities = [];
      }
    }

    // =====================================
    // DELETE OLD IMAGE
    // =====================================

    if (req.processedImage && property.image) {
      const oldImagePath = path.join(
        __dirname,
        "../..",
        property.image.replace(/^\//, "")
      );

      if (fs.existsSync(oldImagePath)) {
        await fs.promises.unlink(oldImagePath);
      }
    }

    // =====================================
    // BASIC INFORMATION
    // =====================================

    if (req.body.name !== undefined) {
      property.name = req.body.name.trim();
    }

    if (req.body.featured !== undefined) {
      property.featured =
        req.body.featured === "true" ||
        req.body.featured === true;
    }

    if (req.body.category !== undefined) {
      property.category = req.body.category;
    }

    if (req.body.type !== undefined) {
      property.type = req.body.type;
    }

    if (req.body.subType !== undefined) {
      property.subType = req.body.subType;
    }

    if (req.body.status !== undefined) {
      property.status = req.body.status;
    }

    if (req.body.statusType !== undefined) {
      property.statusType = req.body.statusType;
    }

    if (req.body.projectSize !== undefined) {
      property.projectSize =
        Number(req.body.projectSize) || 0;
    }

    if (req.body.completionStatus !== undefined) {
      property.completionStatus =
        req.body.completionStatus;
    }

    if (req.body.shortDescription !== undefined) {
      property.shortDescription =
        req.body.shortDescription;
    }

    property.highlights = parsedHighlights;

    // =====================================
    // LOCATION
    // =====================================

    if (req.body.location !== undefined) {
      property.location = req.body.location.trim();
    }

    if (req.body.city !== undefined) {
      property.city = req.body.city;
    }

    if (req.body.state !== undefined) {
      property.state = req.body.state;
    }

    if (req.body.country !== undefined) {
      property.country = req.body.country;
    }

    // =====================================
    // QUICK STATS
    // =====================================

    if (req.body.totalUnits !== undefined) {
      property.totalUnits =
        Number(req.body.totalUnits) || 0;
    }

    if (req.body.availableUnits !== undefined) {
      property.availableUnits =
        Number(req.body.availableUnits) || 0;
    }

    if (req.body.totalArea !== undefined) {
      property.totalArea =
        Number(req.body.totalArea) || 0;
    }

    if (req.body.launchDate !== undefined) {
      property.launchDate =
        req.body.launchDate &&
        req.body.launchDate !== ""
          ? req.body.launchDate
          : null;
    }

    // =====================================
    // PROPERTY DETAILS
    // =====================================

    if (req.body.totalFloors !== undefined) {
      property.totalFloors =
        Number(req.body.totalFloors) || 0;
    }

    if (req.body.bedrooms !== undefined) {
      property.bedrooms =
        Number(req.body.bedrooms) || 0;
    }

    if (req.body.bathrooms !== undefined) {
      property.bathrooms =
        Number(req.body.bathrooms) || 0;
    }

    if (req.body.plotSize !== undefined) {
      property.plotSize =
        Number(req.body.plotSize) || 0;
    }

    if (req.body.parking !== undefined) {
      property.parking = req.body.parking;
    }

    property.amenities = parsedAmenities;

    // =====================================
    // PRICE
    // =====================================

    if (req.body.price !== undefined) {
      property.price =
        Number(req.body.price) || 0;
    }

    if (req.body.pricePerSqft !== undefined) {
      property.pricePerSqft =
        Number(req.body.pricePerSqft) || 0;
    }

    if (req.body.rera !== undefined) {
      property.rera = req.body.rera;
    }

    // =====================================
    // SEO
    // =====================================

    if (req.body.metaTitle !== undefined) {
      property.metaTitle = req.body.metaTitle;
    }

    if (req.body.metaDescription !== undefined) {
      property.metaDescription =
        req.body.metaDescription;
    }

    if (req.body.urlSlug !== undefined) {
      property.urlSlug = req.body.urlSlug;
    }

    // =====================================
    // PUBLISH SETTINGS
    // =====================================

    if (req.body.publishStatus !== undefined) {
      property.publishStatus =
        req.body.publishStatus === "true" ||
        req.body.publishStatus === true;
    }

    if (req.body.publishDate !== undefined) {
      property.publishDate =
        req.body.publishDate &&
        req.body.publishDate !== ""
          ? req.body.publishDate
          : null;
    }

    if (req.body.promoteProperty !== undefined) {
      property.promoteProperty =
        req.body.promoteProperty === "true" ||
        req.body.promoteProperty === true;
    }

    // =====================================
    // NEW IMAGE
    // =====================================

    if (req.processedImage) {
      property.image =
        `/uploads/property/${req.processedImage}`;
    }

    // =====================================
    // NEW DOCUMENTS
    // =====================================

    if (
      req.processedDocuments &&
      req.processedDocuments.length > 0
    ) {
      property.documents = [
        ...(property.documents || []),
        ...req.processedDocuments,
      ];
    }

    await property.save();

    return res.status(200).json({
      success: true,
      message: "Property updated successfully.",
      property,
    });
  } catch (error) {
    console.error("UPDATE PROPERTY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ===========================
 * Delete Property
 * DELETE /api/properties/:id
 * ===========================
 */

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found.",
      });
    }

    // Delete Image
    if (property.image) {
      const imagePath = path.join(
        __dirname,
        "..",
        property.image.replace(/^\//, "")
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Property.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Property deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




/**
 * =====================================
 * Update Property Status
 * PATCH /api/properties/:id/status
 * =====================================
 */

exports.updateStatus = async (req, res) => {
  try {
    const { status, statusType } = req.body;

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found.",
      });
    }

    if (status) property.status = status;
    if (statusType) property.statusType = statusType;

    await property.save();

    res.status(200).json({
      success: true,
      message: "Property status updated successfully.",
      property,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================
 * Dashboard Statistics
 * GET /api/properties/dashboard/stats
 * =====================================
 */

exports.dashboardStats = async (req, res) => {
  try {
    const total = await Property.countDocuments();

    const active = await Property.countDocuments({
      status: "Active",
    });

    const construction = await Property.countDocuments({
      status: "Under Construction",
    });

    const sold = await Property.countDocuments({
      status: "Sold",
    });

    const views = await Property.aggregate([
      {
        $group: {
          _id: null,
          totalViews: {
            $sum: "$views",
          },
        },
      },
    ]);

    const enquiries = await Property.aggregate([
      {
        $group: {
          _id: null,
          totalEnquiries: {
            $sum: "$enquiries",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalProperties: total,
        activeProperties: active,
        underConstruction: construction,
        soldProperties: sold,
        totalViews: views.length ? views[0].totalViews : 0,
        totalEnquiries: enquiries.length
          ? enquiries[0].totalEnquiries
          : 0,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================
 * Top Locations
 * GET /api/properties/top-locations
 * =====================================
 */

exports.topLocations = async (req, res) => {
  try {
    const locations = await Property.aggregate([
      {
        $group: {
          _id: "$location",
          total: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);

    res.status(200).json({
      success: true,
      locations,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================
 * Property Types Analytics
 * GET /api/properties/property-types
 * =====================================
 */

exports.propertyTypes = async (req, res) => {
  try {
    const types = await Property.aggregate([
      {
        $group: {
          _id: "$category",
          total: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      types,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================
 * Price Range Analytics
 * GET /api/properties/price-range
 * =====================================
 */

exports.priceRangeAnalytics = async (req, res) => {
  try {
    const below50 = await Property.countDocuments({
      price: {
        $lt: 5000000,
      },
    });

    const between50And1Cr = await Property.countDocuments({
      price: {
        $gte: 5000000,
        $lte: 10000000,
      },
    });

    const between1And2Cr = await Property.countDocuments({
      price: {
        $gt: 10000000,
        $lte: 20000000,
      },
    });

    const above2Cr = await Property.countDocuments({
      price: {
        $gt: 20000000,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        below50Lakh: below50,
        between50LakhAnd1Cr: between50And1Cr,
        between1CrAnd2Cr: between1And2Cr,
        above2Cr: above2Cr,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};