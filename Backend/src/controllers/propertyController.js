const mongoose = require("mongoose");
const Property = require("../models/Property");
const Category = require("../models/Category");
const fs = require("fs");
const path = require("path");

// =====================================================
// HELPER FUNCTIONS
// =====================================================

// Parse JSON array coming from FormData
const parseArray = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value;
  }

  try {
    const parsed = JSON.parse(value);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

// Convert FormData boolean
const parseBoolean = (value, defaultValue = false) => {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  return value === true || value === "true";
};

// Convert value to number safely
const numberValue = (value) => {
  if (value === undefined || value === null || value === "") {
    return 0;
  }

  const number = Number(value);

  return Number.isNaN(number) ? 0 : number;
};



// =====================================================
// ESCAPE REGEX
// =====================================================

const escapeRegex = (value = "") => {
  return String(value).replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
};
// =====================================================
// DELETE FILE HELPER
// =====================================================

const deleteUploadedFile = (fileUrl) => {
  try {
    if (!fileUrl) return;

    const relativePath = fileUrl.replace(/^\//, "");

    const filePath = path.join(__dirname, "..", "..", relativePath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error("FILE DELETE ERROR:", error.message);
  }
};

// =====================================================
// NORMALIZE PROPERTY IMAGE
// =====================================================

const normalizePropertyImage = (file) => {
  if (!file) return "";

  if (typeof file === "string" && file.startsWith("/")) {
    return file;
  }

  return `/uploads/property/${file}`;
};

// =====================================================
// NORMALIZE FLOOR PLAN IMAGE
// =====================================================

const normalizeFloorPlanImage = (file) => {
  if (!file) return "";

  if (typeof file === "string" && file.startsWith("/")) {
    return file;
  }

  return `/uploads/property/floor-plans/${file}`;
};

// =====================================================
// PREPARE FLOOR PLANS
// =====================================================

const prepareFloorPlans = (floorPlansValue, uploadedImages = []) => {
  const plans = parseArray(floorPlansValue);

  return plans.map((plan, index) => {
    const uploadedImage = uploadedImages[index];

    return {
      planTitle: plan.planTitle || "",

      planType: plan.planType || "",

      beds: numberValue(plan.beds),

      baths: numberValue(plan.baths),

      balconies: numberValue(plan.balconies),

      pujaRoom: numberValue(plan.pujaRoom),

      servantRoom: numberValue(plan.servantRoom),

      storeRoom: numberValue(plan.storeRoom),

      sbaSqft: numberValue(plan.sbaSqft),

      plotSqft: numberValue(plan.plotSqft),

      floorPlanSketch: uploadedImage
        ? normalizeFloorPlanImage(uploadedImage)
        : plan.floorPlanSketch || "",
    };
  });
};

// =====================================================
// CREATE PROPERTY
// POST /api/properties
// =====================================================

exports.createProperty = async (req, res) => {
  try {
    console.log("================================");
    console.log("CREATE PROPERTY REQUEST");

    console.log("PROPERTY BODY:", req.body);

    console.log(
      "CATEGORY PARENT:",
      req.body.categoryParent
    );

    console.log(
      "CATEGORY:",
      req.body.category
    );

    console.log(
      "PROPERTY FILES:",
      req.files
    );

    console.log(
      "PROCESSED PROPERTY IMAGES:",
      req.processedPropertyImages
    );

    console.log(
      "PROCESSED DOCUMENTS:",
      req.processedDocuments
    );

    console.log(
      "PROCESSED FLOOR PLAN IMAGES:",
      req.processedFloorPlanImages
    );

    console.log("================================");

    // =================================================
    // REQUEST BODY
    // =================================================

    const {
      // BASIC
      name,

      // NEW
      categoryParent,

      category,
      type,
      subType,
      status,
      statusType,
      projectSize,
      completionStatus,
      shortDescription,
      featured,
      highlights,

      // PRICE
      price,
      pricePerSqft,
      rera,

      // LOCATION
      location,
      city,
      state,
      country,

      // OVERVIEW
      projectArea,
      noOfHouseVilla,
      totalFloors,
      facing,
      plotArea,
      bedrooms,
      bathrooms,
      balconies,
      parking,
      transactionType,
      propertyOverlooking,
      maintenancePerMonth,
      expectedRentalReturn,

      // QUICK STATS
      totalUnits,
      availableUnits,
      totalArea,
      launchDate,
      plotSize,

      // OTHER
      amenities,
      nearbyPlaces,
      floorPlans,

      // SEO
      metaTitle,
      metaDescription,
      urlSlug,

      // PUBLISH
      publishStatus,
      publishDate,
      promoteProperty,
    } = req.body;

    // =================================================
    // VALIDATION
    // =================================================

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Property name is required.",
      });
    }

    // =================================================
    // CATEGORY PARENT VALIDATION
    // =================================================

    if (!categoryParent?.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Parent category is required.",
      });
    }

    // Optional but recommended validation
    const allowedParents = [
      "Residential",
      "Commercial",
      "Rent",
    ];

    if (
      !allowedParents.includes(
        categoryParent.trim()
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid parent category.",
      });
    }

    // =================================================
    // CATEGORY VALIDATION
    // =================================================

    if (!category?.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Category is required.",
      });
    }

    // =================================================
    // TYPE VALIDATION
    // =================================================

    if (!type?.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Property type is required.",
      });
    }

    // =================================================
    // LOCATION VALIDATION
    // =================================================

    if (!location?.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Location is required.",
      });
    }

    // =================================================
    // PRICE VALIDATION
    // =================================================

    if (
      price === undefined ||
      price === null ||
      price === ""
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Property price is required.",
      });
    }

    // =================================================
    // PARSE ARRAYS
    // =================================================

    const parsedHighlights =
      parseArray(highlights);

    const parsedAmenities =
      parseArray(amenities);

    const parsedNearbyPlaces =
      parseArray(nearbyPlaces);

    // =================================================
    // PROPERTY IMAGES
    // =================================================

    let propertyImages = [];

    if (
      Array.isArray(
        req.processedPropertyImages
      )
    ) {
      propertyImages =
        req.processedPropertyImages
          .map(
            normalizePropertyImage
          )
          .filter(Boolean);
    }

    // =================================================
    // BACKWARD COMPATIBILITY
    // =================================================

    if (
      propertyImages.length === 0 &&
      req.processedImage
    ) {
      const oldImage =
        normalizePropertyImage(
          req.processedImage
        );

      if (oldImage) {
        propertyImages.push(
          oldImage
        );
      }
    }

    // =================================================
    // DOCUMENTS
    // =================================================

    const documents =
      Array.isArray(
        req.processedDocuments
      )
        ? req.processedDocuments
        : [];

    // =================================================
    // FLOOR PLAN IMAGES
    // =================================================

    const floorPlanImages =
      Array.isArray(
        req.processedFloorPlanImages
      )
        ? req.processedFloorPlanImages
        : [];

    // =================================================
    // FLOOR PLAN DATA
    // =================================================

    const parsedFloorPlans =
      prepareFloorPlans(
        floorPlans,
        floorPlanImages
      );

    // =================================================
    // PARSE PRICE
    // =================================================

    const parsedPrice =
      Number(price);

    const parsedPricePerSqft =
      Number(pricePerSqft || 0);

    // =================================================
    // PROPERTY PRICE VALIDATION
    // =================================================

    if (
      !Number.isFinite(
        parsedPrice
      ) ||
      parsedPrice < 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid property price.",
      });
    }

    // =================================================
    // PRICE PER SQFT VALIDATION
    // =================================================

    if (
      !Number.isFinite(
        parsedPricePerSqft
      ) ||
      parsedPricePerSqft < 0 ||
      parsedPricePerSqft >
        10000000
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid price per sq.ft.",
      });
    }

    // =================================================
    // PRIMARY IMAGE
    // =================================================

    const primaryImage =
      propertyImages[0] || "";

    // =================================================
    // CREATE PROPERTY
    // =================================================

    const property =
      await Property.create({
        // =============================================
        // BASIC
        // =============================================

        name: name.trim(),

        // =============================================
        // PARENT CATEGORY
        // =============================================

        categoryParent:
          categoryParent.trim(),

        // =============================================
        // CHILD CATEGORY
        // =============================================

        category:
          category.trim(),

        type:
          type.trim(),

        subType:
          subType?.trim() ||
          type.trim(),

        status:
          status ||
          "Active",

        statusType:
          statusType ||
          transactionType ||
          "For Sale",

        projectSize:
          numberValue(
            projectSize
          ),

        completionStatus:
          completionStatus ||
          "Under Construction",

        shortDescription:
          shortDescription?.trim() ||
          "",

        featured:
          parseBoolean(
            featured,
            false
          ),

        highlights:
          parsedHighlights,

        // =============================================
        // PRICE
        // =============================================

        price:
          parsedPrice,

        pricePerSqft:
          parsedPricePerSqft,

        rera:
          rera?.trim() ||
          "",

        // =============================================
        // LOCATION
        // =============================================

        location:
          location.trim(),

        city:
          city?.trim() ||
          "",

        state:
          state?.trim() ||
          "",

        country:
          country?.trim() ||
          "",

        // =============================================
        // OVERVIEW
        // =============================================

        projectArea:
          projectArea?.trim() ||
          "",

        noOfHouseVilla:
          numberValue(
            noOfHouseVilla
          ),

        totalFloors:
          numberValue(
            totalFloors
          ),

        facing:
          facing?.trim() ||
          "",

        plotArea:
          plotArea?.trim() ||
          "",

        bedrooms:
          numberValue(
            bedrooms
          ),

        bathrooms:
          numberValue(
            bathrooms
          ),

        balconies:
          balconies ||
          "",

        parking:
          parking ||
          "",

        transactionType:
          transactionType ||
          statusType ||
          "For Sale",

        propertyOverlooking:
          propertyOverlooking ||
          "",

        maintenancePerMonth:
          numberValue(
            maintenancePerMonth
          ),

        expectedRentalReturn:
          numberValue(
            expectedRentalReturn
          ),

        // =============================================
        // QUICK STATS
        // =============================================

        totalUnits:
          numberValue(
            totalUnits
          ),

        availableUnits:
          numberValue(
            availableUnits
          ),

        totalArea:
          totalArea ||
          projectArea ||
          "",

        launchDate:
          launchDate ||
          null,

        plotSize:
          plotSize ||
          plotArea ||
          "",

        // =============================================
        // AMENITIES
        // =============================================

        amenities:
          parsedAmenities,

        // =============================================
        // NEARBY PLACES
        // =============================================

        nearbyPlaces:
          parsedNearbyPlaces,

        // =============================================
        // IMAGES
        // =============================================

        propertyImages,

        primaryImage,

        // Keep compatibility with PropertyCard
        image:
          primaryImage,

        // =============================================
        // DOCUMENTS
        // =============================================

        documents,

        // =============================================
        // FLOOR PLANS
        // =============================================

        floorPlans:
          parsedFloorPlans,

        // =============================================
        // SEO
        // =============================================

        metaTitle:
          metaTitle?.trim() ||
          "",

        metaDescription:
          metaDescription?.trim() ||
          "",

        urlSlug:
          urlSlug?.trim() ||
          "",

        // =============================================
        // PUBLISH
        // =============================================

        publishStatus:
          parseBoolean(
            publishStatus,
            true
          ),

        publishDate:
          publishDate ||
          null,

        promoteProperty:
          parseBoolean(
            promoteProperty,
            false
          ),
      });

    // =================================================
    // SUCCESS DEBUG
    // =================================================

    console.log(
      "================================"
    );

    console.log(
      "PROPERTY CREATED SUCCESSFULLY"
    );

    console.log(
      "PROPERTY ID:",
      property._id
    );

    console.log(
      "CATEGORY PARENT:",
      property.categoryParent
    );

    console.log(
      "CATEGORY:",
      property.category
    );

    console.log(
      "================================"
    );

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(201).json({
      success: true,

      message:
        "Property created successfully.",

      property,
    });
  } catch (error) {
    console.error(
      "CREATE PROPERTY ERROR:",
      error
    );

    // =================================================
    // MONGOOSE VALIDATION
    // =================================================

    if (
      error.name ===
      "ValidationError"
    ) {
      return res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }

    // =================================================
    // SERVER ERROR
    // =================================================

    return res.status(500).json({
      success: false,

      message:
        error.message ||
        "Failed to create property.",
    });
  }
};

// =====================================================
// GET ALL PROPERTIES
// GET /api/properties
// =====================================================

// =====================================================
// GET ALL PROPERTIES
// GET /api/properties
// =====================================================

exports.getProperties = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      search = "",
      status,

      // CATEGORY
      category,
      parent, // ⭐ parent category

      // PROPERTY FILTERS
      type,
      propertyType,
      location,
      transactionType,
      bedrooms,
      bathrooms,
      amenities,

      // OTHER FILTERS
      featured,
      featuredProperty,
      promoteProperty,
    } = req.query;

    // =====================================================
    // PAGINATION
    // =====================================================

    page = Math.max(Number(page) || 1, 1);
    limit = Math.max(Number(limit) || 10, 1);

    const filter = {};

    console.log("======================================");
    console.log("PROPERTY QUERY:", req.query);
    console.log("SELECTED PARENT:", parent);
    console.log("======================================");

    // =====================================================
    // SEARCH
    // =====================================================

    if (search && search.trim()) {
      const searchText = search.trim();

      filter.$or = [
        {
          name: {
            $regex: searchText,
            $options: "i",
          },
        },
        {
          location: {
            $regex: searchText,
            $options: "i",
          },
        },
        {
          city: {
            $regex: searchText,
            $options: "i",
          },
        },
        {
          state: {
            $regex: searchText,
            $options: "i",
          },
        },
        {
          rera: {
            $regex: searchText,
            $options: "i",
          },
        },
      ];
    }

    // =====================================================
    // STATUS
    // =====================================================

    if (status && status !== "All") {
      filter.status = status;
    }

    // =====================================================
    // ⭐ PARENT CATEGORY FILTER
    // =====================================================
    //
    // Example:
    //
    // Residential
    //    ├── Apartment
    //    ├── Villa
    //    └── Plot
    //
    // Property:
    // category = "Apartment"
    //
    // So:
    // parent Residential
    //       ↓
    // find child categories
    //       ↓
    // Apartment, Villa, Plot
    //       ↓
    // find properties having those categories
    // =====================================================

    if (parent && parent !== "All") {
      const cleanParent = parent.trim();

      console.log("SEARCHING CATEGORY PARENT:", cleanParent);

      const childCategories = await Category.find({
        parent: {
          $regex: `^${escapeRegex(cleanParent)}$`,
          $options: "i",
        },

        // If your Category schema uses Active/Inactive
        status: "Active",
      }).select("name parent status");

      console.log(
        "CHILD CATEGORY DOCUMENTS:",
        childCategories
      );

      const childCategoryNames = childCategories
        .map((item) => item.name?.trim())
        .filter(Boolean);

      console.log(
        "CHILD CATEGORY NAMES:",
        childCategoryNames
      );

      if (childCategoryNames.length > 0) {
        filter.category = {
          $in: childCategoryNames.map(
            (name) =>
              new RegExp(
                `^${escapeRegex(name)}$`,
                "i"
              )
          ),
        };
      } else {
        // Parent exists in request but no children found.
        // Return no properties instead of accidentally
        // returning every property.
        filter.category = {
          $in: [],
        };
      }
    }

    // =====================================================
    // DIRECT CATEGORY FILTER
    // =====================================================
    //
    // Only use direct category when parent is NOT selected.
    // Otherwise this would overwrite filter.category created
    // above.
    // =====================================================

    if (
      !parent &&
      category &&
      category !== "All"
    ) {
      filter.category = {
        $regex: category
          .replace(/-/g, " ")
          .trim(),

        $options: "i",
      };
    }

    // =====================================================
    // PROPERTY TYPE
    // =====================================================

    const selectedType = type || propertyType;

    if (
      selectedType &&
      selectedType !== "All"
    ) {
      filter.type = {
        $regex: selectedType
          .replace(/-/g, " ")
          .trim(),

        $options: "i",
      };
    }

    // =====================================================
    // LOCATION
    // =====================================================

    if (
      location &&
      location !== "All"
    ) {
      filter.location = {
        $regex: location
          .replace(/-/g, " ")
          .trim(),

        $options: "i",
      };
    }

    // =====================================================
    // TRANSACTION TYPE
    // =====================================================

    if (
      transactionType &&
      transactionType !== "All"
    ) {
      filter.transactionType = {
        $regex: transactionType.trim(),
        $options: "i",
      };
    }

    // =====================================================
    // BEDROOMS
    // =====================================================

    if (
      bedrooms !== undefined &&
      bedrooms !== null &&
      bedrooms !== ""
    ) {
      const bedroomNumber = Number(bedrooms);

      if (!Number.isNaN(bedroomNumber)) {
        filter.bedrooms = {
          $gte: bedroomNumber,
        };
      }
    }

    // =====================================================
    // BATHROOMS
    // =====================================================

    if (
      bathrooms !== undefined &&
      bathrooms !== null &&
      bathrooms !== ""
    ) {
      const bathroomNumber = Number(bathrooms);

      if (!Number.isNaN(bathroomNumber)) {
        filter.bathrooms = {
          $gte: bathroomNumber,
        };
      }
    }

    // =====================================================
    // AMENITIES
    // =====================================================

    if (amenities) {
      let requestedAmenities = [];

      // Query example:
      // ?amenities=Gym,Garage,Balcony

      if (Array.isArray(amenities)) {
        requestedAmenities = amenities
          .map((item) => String(item).trim())
          .filter(Boolean);
      } else {
        requestedAmenities = String(amenities)
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }

      if (requestedAmenities.length > 0) {
        filter.amenities = {
          $all: requestedAmenities,
        };
      }
    }

    // =====================================================
    // FEATURED
    // =====================================================

    const featuredValue =
      featured !== undefined
        ? featured
        : featuredProperty;

    if (featuredValue !== undefined) {
      filter.featured =
        featuredValue === true ||
        featuredValue === "true";
    }

    // =====================================================
    // PROMOTED PROPERTY
    // =====================================================

    if (promoteProperty !== undefined) {
      filter.promoteProperty =
        promoteProperty === true ||
        promoteProperty === "true";
    }

    // =====================================================
    // DEBUG FINAL FILTER
    // =====================================================

    console.log("======================================");
    console.log(
      "FINAL PROPERTY FILTER:",
      JSON.stringify(filter, null, 2)
    );
    console.log("======================================");

    // =====================================================
    // QUERY DATABASE
    // =====================================================

    const total =
      await Property.countDocuments(filter);

    const properties = await Property.find(filter)
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * limit)
      .limit(limit);

    // =====================================================
    // RESPONSE
    // =====================================================

    return res.status(200).json({
      success: true,

      total,

      currentPage: page,

      totalPages:
        Math.ceil(total / limit),

      properties,
    });
  } catch (error) {
    console.error(
      "GET PROPERTIES ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        error.message ||
        "Failed to fetch properties.",
    });
  }
};

// =====================================================
// GET SINGLE PROPERTY
// GET /api/properties/:id
// =====================================================

exports.getProperty = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,

        message: "Invalid property ID.",
      });
    }

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        success: false,

        message: "Property not found.",
      });
    }

    // Increase views
    property.views = (property.views || 0) + 1;

    await property.save();

    return res.status(200).json({
      success: true,

      message: "Property fetched successfully.",

      property,
    });
  } catch (error) {
    console.error("GET PROPERTY ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message || "Failed to fetch property.",
    });
  }
};

// =====================================================
// UPDATE PROPERTY
// PUT /api/properties/:id
// =====================================================

exports.updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,

        message: "Invalid property ID.",
      });
    }

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        success: false,

        message: "Property not found.",
      });
    }

    const body = req.body;

    // =================================================
    // BASIC
    // =================================================

    if (body.name !== undefined) {
      property.name = body.name.trim();
    }

    if (body.category !== undefined) {
      property.category = body.category;
    }

    if (body.type !== undefined) {
      property.type = body.type;
    }

    if (body.subType !== undefined) {
      property.subType = body.subType;
    }

    if (body.status !== undefined) {
      property.status = body.status;
    }

    if (body.statusType !== undefined) {
      property.statusType = body.statusType;
    }

    if (body.projectSize !== undefined) {
      property.projectSize = numberValue(body.projectSize);
    }

    if (body.completionStatus !== undefined) {
      property.completionStatus = body.completionStatus;
    }

    if (body.shortDescription !== undefined) {
      property.shortDescription = body.shortDescription.trim();
    }

    if (body.featured !== undefined) {
      property.featured = parseBoolean(body.featured);
    }

    if (body.highlights !== undefined) {
      property.highlights = parseArray(body.highlights);
    }

    // =================================================
    // PRICE
    // =================================================

    if (body.price !== undefined) {
      property.price = numberValue(body.price);
    }

    if (body.pricePerSqft !== undefined) {
      property.pricePerSqft = numberValue(body.pricePerSqft);
    }

    if (body.rera !== undefined) {
      property.rera = body.rera.trim();
    }

    // =================================================
    // LOCATION
    // =================================================

    if (body.location !== undefined) {
      property.location = body.location.trim();
    }

    if (body.city !== undefined) {
      property.city = body.city.trim();
    }

    if (body.state !== undefined) {
      property.state = body.state.trim();
    }

    if (body.country !== undefined) {
      property.country = body.country.trim();
    }

    // =================================================
    // OVERVIEW
    // =================================================

    if (body.projectArea !== undefined) {
      property.projectArea = body.projectArea;
    }

    if (body.noOfHouseVilla !== undefined) {
      property.noOfHouseVilla = numberValue(body.noOfHouseVilla);
    }

    if (body.totalFloors !== undefined) {
      property.totalFloors = numberValue(body.totalFloors);
    }

    if (body.facing !== undefined) {
      property.facing = body.facing;
    }

    if (body.plotArea !== undefined) {
      property.plotArea = body.plotArea;
    }

    if (body.bedrooms !== undefined) {
      property.bedrooms = numberValue(body.bedrooms);
    }

    if (body.bathrooms !== undefined) {
      property.bathrooms = numberValue(body.bathrooms);
    }

    if (body.balconies !== undefined) {
      property.balconies = body.balconies;
    }

    if (body.parking !== undefined) {
      property.parking = body.parking;
    }

    if (body.transactionType !== undefined) {
      property.transactionType = body.transactionType;
    }

    if (body.propertyOverlooking !== undefined) {
      property.propertyOverlooking = body.propertyOverlooking;
    }

    if (body.maintenancePerMonth !== undefined) {
      property.maintenancePerMonth = numberValue(body.maintenancePerMonth);
    }

    if (body.expectedRentalReturn !== undefined) {
      property.expectedRentalReturn = numberValue(body.expectedRentalReturn);
    }

    // =================================================
    // QUICK STATS
    // =================================================

    if (body.totalUnits !== undefined) {
      property.totalUnits = numberValue(body.totalUnits);
    }

    if (body.availableUnits !== undefined) {
      property.availableUnits = numberValue(body.availableUnits);
    }

    if (body.totalArea !== undefined) {
      property.totalArea = body.totalArea;
    }

    if (body.plotSize !== undefined) {
      property.plotSize = body.plotSize;
    }

    if (body.launchDate !== undefined) {
      property.launchDate = body.launchDate ? body.launchDate : null;
    }

    // =================================================
    // AMENITIES
    // =================================================

    if (body.amenities !== undefined) {
      property.amenities = parseArray(body.amenities);
    }

    // =================================================
    // NEARBY PLACES
    // =================================================

    if (body.nearbyPlaces !== undefined) {
      property.nearbyPlaces = parseArray(body.nearbyPlaces);
    }

    // =================================================
    // FLOOR PLANS
    // =================================================

    if (body.floorPlans !== undefined) {
      const uploadedImages = Array.isArray(req.processedFloorPlanImages)
        ? req.processedFloorPlanImages
        : [];

      const incomingPlans = parseArray(body.floorPlans);

      property.floorPlans = incomingPlans.map((plan, index) => {
        const uploaded = uploadedImages[index];

        return {
          planTitle: plan.planTitle || "",

          planType: plan.planType || "",

          beds: numberValue(plan.beds),

          baths: numberValue(plan.baths),

          balconies: numberValue(plan.balconies),

          pujaRoom: numberValue(plan.pujaRoom),

          servantRoom: numberValue(plan.servantRoom),

          storeRoom: numberValue(plan.storeRoom),

          sbaSqft: numberValue(plan.sbaSqft),

          plotSqft: numberValue(plan.plotSqft),

          floorPlanSketch: uploaded
            ? normalizeFloorPlanImage(uploaded)
            : plan.floorPlanSketch || "",
        };
      });
    }

    // =================================================
    // SEO
    // =================================================

    if (body.metaTitle !== undefined) {
      property.metaTitle = body.metaTitle.trim();
    }

    if (body.metaDescription !== undefined) {
      property.metaDescription = body.metaDescription.trim();
    }

    if (body.urlSlug !== undefined) {
      property.urlSlug = body.urlSlug.trim();
    }

    // =================================================
    // PUBLISH
    // =================================================

    if (body.publishStatus !== undefined) {
      property.publishStatus = parseBoolean(body.publishStatus);
    }

    if (body.publishDate !== undefined) {
      property.publishDate = body.publishDate ? body.publishDate : null;
    }

    if (body.promoteProperty !== undefined) {
      property.promoteProperty = parseBoolean(body.promoteProperty);
    }

    // =================================================
    // NEW PROPERTY IMAGES
    // =================================================

    let newImages = [];

    if (
      Array.isArray(req.processedPropertyImages) &&
      req.processedPropertyImages.length > 0
    ) {
      newImages = req.processedPropertyImages
        .map(normalizePropertyImage)
        .filter(Boolean);
    }

    if (newImages.length === 0 && req.processedImage) {
      newImages.push(normalizePropertyImage(req.processedImage));
    }

    if (newImages.length > 0) {
      property.propertyImages = [
        ...(property.propertyImages || []),

        ...newImages,
      ];

      // Keep primary image
      if (!property.primaryImage) {
        property.primaryImage = newImages[0];
      }

      // Backward frontend support
      property.image = property.primaryImage || newImages[0];
    }

    // =================================================
    // DOCUMENTS
    // =================================================

    if (
      Array.isArray(req.processedDocuments) &&
      req.processedDocuments.length > 0
    ) {
      property.documents = [
        ...(property.documents || []),

        ...req.processedDocuments,
      ];
    }

    // =================================================
    // SAVE
    // =================================================

    await property.save();

    return res.status(200).json({
      success: true,

      message: "Property updated successfully.",

      property,
    });
  } catch (error) {
    console.error("UPDATE PROPERTY ERROR:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,

        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,

      message: error.message || "Failed to update property.",
    });
  }
};

// =====================================================
// DELETE PROPERTY
// DELETE /api/properties/:id
// =====================================================

exports.deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,

        message: "Invalid property ID.",
      });
    }

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        success: false,

        message: "Property not found.",
      });
    }

    // =================================================
    // DELETE PROPERTY IMAGES
    // =================================================

    if (Array.isArray(property.propertyImages)) {
      property.propertyImages.forEach((image) => {
        deleteUploadedFile(image);
      });
    }

    // =================================================
    // DELETE DOCUMENTS
    // =================================================

    if (Array.isArray(property.documents)) {
      property.documents.forEach((document) => {
        if (document?.file) {
          deleteUploadedFile(document.file);
        }
      });
    }

    // =================================================
    // DELETE FLOOR PLAN IMAGES
    // =================================================

    if (Array.isArray(property.floorPlans)) {
      property.floorPlans.forEach((floorPlan) => {
        if (floorPlan?.floorPlanSketch) {
          deleteUploadedFile(floorPlan.floorPlanSketch);
        }
      });
    }

    // =================================================
    // DELETE PROPERTY
    // =================================================

    await Property.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,

      message: "Property deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE PROPERTY ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message || "Failed to delete property.",
    });
  }
};

// =====================================================
// UPDATE PROPERTY STATUS
// PATCH /api/properties/:id/status
// =====================================================

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const { status, statusType, transactionType } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,

        message: "Invalid property ID.",
      });
    }

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        success: false,

        message: "Property not found.",
      });
    }

    if (status !== undefined) {
      property.status = status;
    }

    if (statusType !== undefined) {
      property.statusType = statusType;
    }

    if (transactionType !== undefined) {
      property.transactionType = transactionType;
    }

    await property.save();

    return res.status(200).json({
      success: true,

      message: "Property status updated successfully.",

      property,
    });
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message || "Failed to update status.",
    });
  }
};

// =====================================================
// DASHBOARD STATISTICS
// GET /api/properties/dashboard/stats
// =====================================================

exports.dashboardStats = async (req, res) => {
  try {
    const total = await Property.countDocuments();

    const active = await Property.countDocuments({
      status: "Active",
    });

    const construction = await Property.countDocuments({
      $or: [
        {
          status: "Under Construction",
        },

        {
          completionStatus: "Under Construction",
        },
      ],
    });

    const sold = await Property.countDocuments({
      status: "Sold",
    });

    // ===============================================
    // TOTAL VIEWS
    // ===============================================

    const views = await Property.aggregate([
      {
        $group: {
          _id: null,

          totalViews: {
            $sum: {
              $ifNull: ["$views", 0],
            },
          },
        },
      },
    ]);

    // ===============================================
    // TOTAL ENQUIRIES
    // ===============================================

    const enquiries = await Property.aggregate([
      {
        $group: {
          _id: null,

          totalEnquiries: {
            $sum: {
              $ifNull: ["$enquiries", 0],
            },
          },
        },
      },
    ]);

    return res.status(200).json({
      success: true,

      data: {
        totalProperties: total,

        activeProperties: active,

        underConstruction: construction,

        soldProperties: sold,

        totalViews: views.length > 0 ? views[0].totalViews : 0,

        totalEnquiries: enquiries.length > 0 ? enquiries[0].totalEnquiries : 0,
      },
    });
  } catch (error) {
    console.error("DASHBOARD STATS ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message || "Failed to load dashboard statistics.",
    });
  }
};

// =====================================================
// TOP LOCATIONS
// GET /api/properties/top-locations
// =====================================================

exports.topLocations = async (req, res) => {
  try {
    const locations = await Property.aggregate([
      {
        $match: {
          location: {
            $nin: [null, ""],
          },
        },
      },

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

    return res.status(200).json({
      success: true,

      locations,
    });
  } catch (error) {
    console.error("TOP LOCATIONS ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message || "Failed to load top locations.",
    });
  }
};

// =====================================================
// PROPERTY TYPES ANALYTICS
// GET /api/properties/property-types
// =====================================================

exports.propertyTypes = async (req, res) => {
  try {
    const types = await Property.aggregate([
      {
        $match: {
          type: {
            $nin: [null, ""],
          },
        },
      },

      {
        $group: {
          _id: "$type",

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

    // Calculate total properties
    const totalProperties = types.reduce(
      (total, item) => total + item.total,

      0,
    );

    const result = types.map((item) => ({
      type: item._id,

      total: item.total,

      percentage:
        totalProperties > 0
          ? Number(((item.total / totalProperties) * 100).toFixed(2))
          : 0,
    }));

    return res.status(200).json({
      success: true,

      totalProperties,

      types: result,
    });
  } catch (error) {
    console.error("PROPERTY TYPES ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message || "Failed to load property types.",
    });
  }
};

// =====================================================
// PRICE RANGE ANALYTICS
// GET /api/properties/price-range
// =====================================================

exports.priceRangeAnalytics = async (req, res) => {
  try {
    // Below ₹50 Lakh
    const below50 = await Property.countDocuments({
      price: {
        $lt: 5000000,
      },
    });

    // ₹50 Lakh - ₹1 Crore
    const between50And1Cr = await Property.countDocuments({
      price: {
        $gte: 5000000,

        $lte: 10000000,
      },
    });

    // ₹1 Crore - ₹2 Crore
    const between1And2Cr = await Property.countDocuments({
      price: {
        $gt: 10000000,

        $lte: 20000000,
      },
    });

    // Above ₹2 Crore
    const above2Cr = await Property.countDocuments({
      price: {
        $gt: 20000000,
      },
    });

    const total = below50 + between50And1Cr + between1And2Cr + above2Cr;

    const getPercentage = (value) => {
      if (!total) {
        return 0;
      }

      return Number(((value / total) * 100).toFixed(2));
    };

    return res.status(200).json({
      success: true,

      data: {
        below50Lakh: below50,

        below50LakhPercentage: getPercentage(below50),

        between50LakhAnd1Cr: between50And1Cr,

        between50LakhAnd1CrPercentage: getPercentage(between50And1Cr),

        between1CrAnd2Cr: between1And2Cr,

        between1CrAnd2CrPercentage: getPercentage(between1And2Cr),

        above2Cr: above2Cr,

        above2CrPercentage: getPercentage(above2Cr),

        totalProperties: total,
      },
    });
  } catch (error) {
    console.error("PRICE RANGE ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message || "Failed to load price analytics.",
    });
  }
};
