const SellProperty = require("../models/SellProperty");

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

    return res.status(500).json({
      success: false,
      message: "Failed to list property",
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