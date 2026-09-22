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
      default: "",
    },

    bathrooms: {
      type: String,
      default: "",
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
      default: "",
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
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    submittedBy: {
      type: String,
      default: "Admin User",
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Inactive"],
      default: "Pending",
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