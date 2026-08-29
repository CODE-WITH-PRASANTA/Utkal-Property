const fs = require("fs");
const path = require("path");
const Location = require("../models/Location");

const toBoolean = (value) => (typeof value === "boolean" ? value : value === "true");

const toNumberOrNull = (value) => {
  if (value === undefined || value === null || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const removeImage = (imagePath) => {
  if (!imagePath || !imagePath.startsWith("/uploads/locations/")) return;

  const filePath = path.join(__dirname, "../..", imagePath.slice(1));
  fs.promises.unlink(filePath).catch((error) => {
    if (error.code !== "ENOENT") {
      console.error("Unable to remove location image:", error.message);
    }
  });
};

const sendError = (res, error) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({ success: false, message: error.message });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "This location already exists.",
    });
  }

  return res.status(500).json({ success: false, message: error.message });
};

const getLocationPayload = (body) => {
  const payload = {};

  ["country", "state", "city", "area", "pincode", "status"].forEach((field) => {
    if (body[field] !== undefined) payload[field] = body[field].trim();
  });
  if (body.properties !== undefined) payload.properties = Number(body.properties) || 0;
  if (body.featured !== undefined) payload.featured = toBoolean(body.featured);
  if (body.latitude !== undefined) payload.latitude = toNumberOrNull(body.latitude);
  if (body.longitude !== undefined) payload.longitude = toNumberOrNull(body.longitude);

  return payload;
};

exports.getLocations = async (_req, res) => {
  try {
    const locations = await Location.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: locations.length, data: locations });
  } catch (error) {
    return sendError(res, error);
  }
};

exports.createLocation = async (req, res) => {
  try {
    const location = await Location.create({
      ...getLocationPayload(req.body),
      image: req.processedLocationImage || "",
    });
    return res.status(201).json({ success: true, data: location });
  } catch (error) {
    if (req.processedLocationImage) removeImage(req.processedLocationImage);
    return sendError(res, error);
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      if (req.processedLocationImage) removeImage(req.processedLocationImage);
      return res.status(404).json({ success: false, message: "Location not found." });
    }

    Object.assign(location, getLocationPayload(req.body));
    if (req.processedLocationImage) {
      removeImage(location.image);
      location.image = req.processedLocationImage;
    }

    await location.save();
    return res.status(200).json({ success: true, data: location });
  } catch (error) {
    if (req.processedLocationImage) removeImage(req.processedLocationImage);
    return sendError(res, error);
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ success: false, message: "Location not found." });
    }

    removeImage(location.image);
    await location.deleteOne();
    return res.status(200).json({ success: true, message: "Location deleted successfully." });
  } catch (error) {
    return sendError(res, error);
  }
};
