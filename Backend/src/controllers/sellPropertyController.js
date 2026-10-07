const SellProperty = require("../models/SellProperty");
const Property = require("../models/Property");

const parseJsonField = (value, fallback) => {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  return typeof value === "string" ? JSON.parse(value) : value;
};

const parseBooleanField = (value) =>
  value === true || value === "true";

const getNumericValue = (value) => {
  const numericValue = Number(String(value ?? "").replace(/[₹,\s]/g, ""));
  return Number.isFinite(numericValue) && numericValue >= 0
    ? numericValue
    : 0;
};

const getCountValue = (value) => {
  const numericValue = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(numericValue) && numericValue >= 0
    ? numericValue
    : 0;
};

const syncApprovedProperty = async (sellProperty) => {
  const isApproved = sellProperty.status === "Approved";
  const categoryParent =
    String(sellProperty.propertyFor || "").toLowerCase() === "rent"
      ? "Rent"
      : String(sellProperty.category || "").toLowerCase() === "commercial"
        ? "Commercial"
        : "Residential";
  const images = sellProperty.images?.length
    ? sellProperty.images
    : sellProperty.propertyImages || [];
  const propertyType = sellProperty.propertyType || sellProperty.category || "Property";
  const location = [sellProperty.locality, sellProperty.city]
    .filter(Boolean)
    .join(", ") || sellProperty.city || sellProperty.state || "Location not specified";
  const transactionType =
    String(sellProperty.propertyFor || "").toLowerCase() === "rent"
      ? "For Rent"
      : String(sellProperty.propertyFor || "").toLowerCase() === "lease"
        ? "For Lease"
        : "For Sale";
  const floorPlans = (sellProperty.floorPlans || []).map((plan, index) => ({
    planTitle: plan.planTitle || `Floor Plan ${index + 1}`,
    planType: plan.planType || propertyType,
    beds: getCountValue(plan.beds),
    baths: getCountValue(plan.baths),
    balconies: getCountValue(plan.balconies),
    pujaRoom: getCountValue(plan.pujaRoom),
    servantRoom: getCountValue(plan.servantRoom),
    storeRoom: getCountValue(plan.storeRoom),
    sbaSqft: getNumericValue(plan.sbaSqft),
    plotSqft: getNumericValue(plan.plotSqft),
    floorPlanSketch: plan.floorPlanSketch || plan.existingFloorPlanSketch || "",
  }));
  const nearbyPlaces = (sellProperty.nearbyPlaces || []).map((place) => ({
    category: place.category || "",
    name: place.name || "",
    distance: place.distance || "",
    distanceValue: getNumericValue(place.distanceValue),
    unit: place.unit === "Meter" ? "Meter" : "Km",
    icon: place.icon || "",
    status: place.status === "Inactive" ? "Inactive" : "Active",
  }));

  const propertyData = {
    sourceSellPropertyId: sellProperty._id,
    name: sellProperty.propertyTitle || "Untitled Property",
    propertyFor: sellProperty.propertyFor || "Sell",
    propertyCategory: sellProperty.propertyCategory || "",
    negotiable: sellProperty.negotiable || "",
    categoryParent,
    category: sellProperty.propertyCategory || propertyType,
    type: propertyType,
    subType: sellProperty.category || propertyType,
    status: isApproved ? "Active" : "Inactive",
    statusType: transactionType,
    transactionType,
    price: getNumericValue(sellProperty.expectedPrice),
    location,
    city: sellProperty.city || "",
    state: sellProperty.state || "",
    projectArea: sellProperty.builtUpArea || "",
    superBuiltUpArea: sellProperty.superBuiltUpArea || "",
    carpetArea: sellProperty.carpetArea || "",
    bedrooms: getCountValue(sellProperty.bhk),
    bathrooms: getCountValue(sellProperty.bathrooms),
    balconies: String(sellProperty.balconies ?? ""),
    floor: sellProperty.floor || "",
    totalFloors: getCountValue(sellProperty.totalFloors),
    furnishingStatus: sellProperty.furnishingStatus || "",
    propertyAge: sellProperty.propertyAge || "",
    parking: sellProperty.parking || "",
    landmark: sellProperty.landmark || "",
    pinCode: sellProperty.pinCode || "",
    phone: sellProperty.phone || "",
    email: sellProperty.email || "",
    submittedBy: sellProperty.submittedBy || "",
    propertyDetails: sellProperty.propertyDetails || {},
    propertyImages: images,
    primaryImage: images[0] || "",
    image: images[0] || "",
    amenities: sellProperty.amenities || [],
    highlights: sellProperty.highlights || [],
    nearbyPlaces,
    floorPlans,
    documents: (sellProperty.documents || [])
      .map((document) => ({
        file:
          typeof document === "string"
            ? document
            : document.file || document.path || document.url || "",
        originalName:
          typeof document === "string"
            ? ""
            : document.originalName || document.name || "",
      }))
      .filter((document) => document.file),
    publishStatus: sellProperty.publishStatus !== false,
    publishDate: sellProperty.publishDate || null,
    featured: sellProperty.featured === true,
  };

  return Property.findOneAndUpdate(
    { sourceSellPropertyId: sellProperty._id },
    { $set: propertyData },
    {
      new: true,
      upsert: isApproved,
      runValidators: true,
      setDefaultsOnInsert: true,
    }
  );
};

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

    if (savedProperty.status === "Approved") {
      const promotedProperty = await syncApprovedProperty(savedProperty);
      if (!promotedProperty) {
        throw new Error("Could not save the approved listing to the Properties collection");
      }
      await savedProperty.deleteOne();
    }

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
    if (savedProperty.status === "Approved") {
      const promotedProperty = await syncApprovedProperty(savedProperty);
      if (!promotedProperty) {
        throw new Error("Could not synchronize the listing to the Properties collection");
      }
      await savedProperty.deleteOne();
    }

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
      { new: true, runValidators: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (updatedProperty.status === "Approved") {
      const promotedProperty = await syncApprovedProperty(updatedProperty);
      if (!promotedProperty) {
        throw new Error("Could not synchronize the listing to the Properties collection");
      }
      await updatedProperty.deleteOne();
    } else {
      await syncApprovedProperty(updatedProperty);
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
    const allowedStatuses = ["Pending", "Approved", "Rejected", "Inactive"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "A valid property status is required",
      });
    }

    const sellProperty = await SellProperty.findById(req.params.id);

    if (!sellProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const previousStatus = sellProperty.status;
    sellProperty.status = status;
    const updatedProperty = await sellProperty.save();

    let promotedProperty;
    try {
      promotedProperty = await syncApprovedProperty(updatedProperty);
      if (status === "Approved" && !promotedProperty) {
        throw new Error("Could not save the approved listing to the Properties collection");
      }
    } catch (syncError) {
      sellProperty.status = previousStatus;
      try {
        await sellProperty.save();
      } catch (rollbackError) {
        console.error("ROLLBACK SELL PROPERTY STATUS ERROR:", rollbackError);
      }
      throw syncError;
    }

    if (status === "Approved") {
      await updatedProperty.deleteOne();
    }

    return res.status(200).json({
      success: true,
      message:
        status === "Approved"
          ? "Property approved and moved to the Properties collection"
          : "Property status updated successfully",
      property: updatedProperty,
      movedProperty: status === "Approved" ? promotedProperty : undefined,
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
    const property = await SellProperty.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    await Property.deleteOne({ sourceSellPropertyId: property._id });
    await property.deleteOne();

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