const SellProperty = require("../models/SellProperty");

const parseJsonField = (value, fallback) => {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  return typeof value === "string" ? JSON.parse(value) : value;
};

const parseBooleanField = (value) =>
  value === true || value === "true";

exports.createSellProperty = async (req, res) => {
  try {
    console.log("======================================");
    console.log("CREATE SELL PROPERTY");
    console.log("BODY:", req.body);
    console.log(
      "PROCESSED IMAGES:",
      req.processedSellPropertyImages
    );
    console.log("======================================");

    const imagePaths = req.processedSellPropertyImages || [];

    const propertyData = {
      ...req.body,
      images: imagePaths,
    };

    const newProperty = new SellProperty(propertyData);
    const savedProperty = await newProperty.save();

    return res.status(201).json({
      success: true,
      message: "Property listed successfully",
      property: savedProperty,
    });
  } catch (error) {
    console.error("======================================");
    console.error("CREATE SELL PROPERTY ERROR");
    console.error(error);
    console.error("======================================");

    const isValidationError = error.name === "ValidationError";

    return res.status(isValidationError ? 400 : 500).json({
      success: false,
      message: isValidationError
        ? "Invalid property details"
        : "Failed to list property",
      error: error.message,
    });
  }
};

exports.updateSellPropertyDetails = async (req, res) => {
  try {
    const property = await SellProperty.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const body = req.body;
    const propertyDetails = parseJsonField(body.propertyDetails, null);

    if (
      !propertyDetails ||
      typeof propertyDetails !== "object" ||
      Array.isArray(propertyDetails)
    ) {
      return res.status(400).json({
        success: false,
        message: "Property details must be a JSON object",
      });
    }

    property.propertyDetails = propertyDetails;

    if (body.name !== undefined) {
      property.propertyTitle = body.name.trim();
    }

    if (body.type !== undefined) {
      property.propertyType = body.type;
    }

    if (body.categoryParent !== undefined) {
      property.categoryParent = body.categoryParent;
      property.category = body.categoryParent;
    }

    if (body.category !== undefined) {
      property.propertyCategory = body.category;
    }

    if (body.price !== undefined) {
      property.expectedPrice = body.price;
    }

    if (body.projectArea !== undefined) {
      property.builtUpArea = body.projectArea;
    }

    if (body.superBuiltUpArea !== undefined) {
      property.superBuiltUpArea = body.superBuiltUpArea;
    } else if (propertyDetails.superBuiltUpArea !== undefined) {
      property.superBuiltUpArea = propertyDetails.superBuiltUpArea;
    }

    if (body.bedrooms !== undefined && body.bedrooms !== "") {
      property.bhk = `${body.bedrooms} BHK`;
    }

    for (const field of ["bathrooms", "balconies", "totalFloors", "parking"]) {
      if (body[field] !== undefined) {
        property[field] = body[field];
      }
    }

    if (body.location !== undefined) {
      property.locality = body.location;
    }

    for (const field of ["city", "state"]) {
      if (body[field] !== undefined) {
        property[field] = body[field];
      }
    }

    if (body.transactionType !== undefined) {
      const transactionType = body.transactionType.toLowerCase();
      property.propertyFor =
        transactionType === "rent"
          ? "Rent"
          : transactionType === "lease"
            ? "Lease"
            : "Sell";
    }

    if (body.highlights !== undefined) {
      property.highlights = parseJsonField(body.highlights, []);
    }

    if (body.amenities !== undefined) {
      property.amenities = parseJsonField(body.amenities, []);
    }

    if (body.nearbyPlaces !== undefined) {
      property.nearbyPlaces = parseJsonField(body.nearbyPlaces, []);
    }

    if (body.featured !== undefined) {
      property.featured = parseBooleanField(body.featured);
    }

    if (body.publishStatus !== undefined) {
      property.publishStatus = parseBooleanField(body.publishStatus);
    }

    if (body.publishDate !== undefined) {
      property.publishDate = body.publishDate || null;
    }

    if (body.promoteProperty !== undefined) {
      property.promoteProperty = parseBooleanField(body.promoteProperty);
    }

    if (body.existingPropertyImages !== undefined) {
      const existingImages = parseJsonField(
        body.existingPropertyImages,
        [],
      );
      const uploadedImages = req.processedPropertyImages || [];

      property.propertyImages = [...existingImages, ...uploadedImages];
      property.images = property.propertyImages;
      property.primaryImage = property.propertyImages[0] || "";
    } else if (
      Array.isArray(req.processedPropertyImages) &&
      req.processedPropertyImages.length > 0
    ) {
      property.propertyImages = [
        ...(property.propertyImages || []),
        ...req.processedPropertyImages,
      ];
      property.images = property.propertyImages;
      property.primaryImage = property.propertyImages[0] || "";
    }

    if (body.existingDocuments !== undefined || req.processedDocuments?.length) {
      const existingDocuments = parseJsonField(
        body.existingDocuments,
        property.documents || [],
      );
      property.documents = [
        ...existingDocuments,
        ...(req.processedDocuments || []),
      ];
    }

    if (body.floorPlans !== undefined) {
      const floorPlans = parseJsonField(body.floorPlans, []);
      const uploadedFloorPlanImages = req.processedFloorPlanImages || [];

      property.floorPlans = floorPlans.map((plan, index) => {
        const uploadIndex = Number.isInteger(Number(plan.floorPlanImageIndex))
          ? Number(plan.floorPlanImageIndex)
          : index;

        return {
          ...plan,
          floorPlanSketch:
            uploadedFloorPlanImages[uploadIndex] ||
            plan.floorPlanSketch ||
            plan.existingFloorPlanSketch ||
            "",
        };
      });
    }

    const savedProperty = await property.save();

    return res.status(200).json({
      success: true,
      message: "Property updated successfully",
      property: savedProperty,
    });
  } catch (error) {
    console.error("UPDATE SELL PROPERTY DETAILS ERROR:", error);

    return res.status(error instanceof SyntaxError ? 400 : 500).json({
      success: false,
      message:
        error instanceof SyntaxError
          ? "Invalid JSON property data"
          : "Failed to update property",
      error: error.message,
    });
  }
};

exports.getAllSellProperties = async (req, res) => {
  try {
    const properties = await SellProperty.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    console.error("GET SELL PROPERTIES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
      error: error.message,
    });
  }
};

exports.getSellPropertyById = async (req, res) => {
  try {
    const property = await SellProperty.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    return res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    console.error("GET SELL PROPERTY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch property",
      error: error.message,
    });
  }
};

exports.updateSellProperty = async (req, res) => {
  try {
    const imagePaths = req.processedSellPropertyImages || [];
    const updateData = { ...req.body };

    if (imagePaths.length > 0) {
      updateData.images = imagePaths;
    } else {
      delete updateData.images;
    }

    const updatedProperty = await SellProperty.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    console.error("UPDATE SELL PROPERTY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update property",
      error: error.message,
    });
  }
};

exports.updateSellPropertyStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const updatedProperty = await SellProperty.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Property status updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    console.error("UPDATE SELL PROPERTY STATUS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update property status",
      error: error.message,
    });
  }
};

exports.deleteSellProperty = async (req, res) => {
  try {
    const property = await SellProperty.findByIdAndDelete(
      req.params.id
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error("DELETE SELL PROPERTY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete property",
      error: error.message,
    });
  }
};