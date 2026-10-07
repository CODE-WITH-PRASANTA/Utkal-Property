const mongoose = require("mongoose");

const sellPropertySchema = new mongoose.Schema(
  {
    propertyTitle: {
      type: String,
      trim: true,
      default: "",
    },

    propertyType: {
      type: String,
      trim: true,
      default: "",
    },

    propertyFor: {
      type: String,
      trim: true,
      default: "Sell",
    },

    category: {
      type: String,
      trim: true,
      default: "Residential",
    },

    categoryParent: {
      type: String,
      default: "",
      trim: true,
    },

    propertyCategory: {
      type: String,
      default: "",
      trim: true,
    },

    expectedPrice: {
      type: String,
      trim: true,
      default: "",
    },

    negotiable: {
      type: String,
      default: "Yes",
    },

    builtUpArea: {
      type: String,
      trim: true,
      default: "",
    },

    superBuiltUpArea: {
      type: String,
      trim: true,
      default: "",
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
      trim: true,
      default: "",
    },

    city: {
      type: String,
      trim: true,
      default: "",
    },

    locality: {
      type: String,
      trim: true,
      default: "",
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

    propertyImages: {
      type: [String],
      default: [],
    },
    

    primaryImage: {
      type: String,
      default: "",
      trim: true,
    },

    propertyDetails: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({}),
    },

    amenities: {
      type: [String],
      default: [],
    },

    nearbyPlaces: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },

    highlights: {
      type: [String],
      default: [],
    },

    documents: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },

    floorPlans: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    publishStatus: {
      type: Boolean,
      default: true,
    },

    publishDate: {
      type: Date,
      default: null,
    },

    promoteProperty: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SellProperty", sellPropertySchema);