const mongoose = require("mongoose");

const sellPropertySchema = new mongoose.Schema(
  {
    propertyTitle: {
      type: String,
      required: true,
      trim: true,
    },

    propertyType: {
      type: String,
      required: true,
      trim: true,
    },

    propertyFor: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    expectedPrice: {
      type: String,
      required: true,
      trim: true,
    },

    negotiable: {
      type: String,
      default: "Yes",
    },

    builtUpArea: {
      type: String,
      required: true,
      trim: true,
    },

    carpetArea: {
      type: String,
      default: "",
    },

    bhk: {
      type: String,
      required: true,
      trim: true,
    },

    bathrooms: {
      type: String,
      required: true,
      trim: true,
    },

    balconies: {
      type: String,
      default: "",
    },

    floor: {
      type: String,
      default: "",
    },

    totalFloors: {
      type: String,
      default: "",
    },

    furnishingStatus: {
      type: String,
      required: true,
      trim: true,
    },

    propertyAge: {
      type: String,
      default: "",
    },

    parking: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    locality: {
      type: String,
      required: true,
      trim: true,
    },

    landmark: {
      type: String,
      default: "",
    },

    pinCode: {
      type: String,
      required: true,
      trim: true,
    },

    // Uploaded WebP image paths
    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SellProperty", sellPropertySchema);