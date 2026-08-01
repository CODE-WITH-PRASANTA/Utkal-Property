const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    // =========================
    // BASIC INFORMATION
    // =========================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    category: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    subType: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Pending", "Under Construction", "Sold"],
      default: "Active",
    },

    statusType: {
      type: String,
      default: "For Sale",
    },

    projectSize: {
      type: Number,
      default: 0,
    },

    completionStatus: {
      type: String,
      enum: ["Under Construction", "Ready to Move", "Upcoming"],
      default: "Under Construction",
    },

    shortDescription: {
      type: String,
      default: "",
      maxlength: 120,
    },

    highlights: [
      {
        type: String,
        trim: true,
      },
    ],

    // =========================
    // LOCATION
    // =========================
    location: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "",
    },

    // =========================
    // QUICK STATS
    // =========================
    totalUnits: {
      type: Number,
      default: 0,
    },

    availableUnits: {
      type: Number,
      default: 0,
    },

    totalArea: {
      type: Number,
      default: 0,
    },

    launchDate: {
      type: Date,
      default: null,
    },

    // =========================
    // PROPERTY DETAILS
    // =========================
    totalFloors: {
      type: Number,
      default: 0,
    },

    bedrooms: {
      type: Number,
      default: 0,
    },

    bathrooms: {
      type: Number,
      default: 0,
    },

    plotSize: {
      type: Number,
      default: 0,
    },

    parking: {
      type: String,
      default: "",
    },

    // =========================
    // AMENITIES
    // =========================
    amenities: [
      {
        type: String,
        trim: true,
      },
    ],

    // =========================
    // PRICE
    // =========================
    price: {
      type: Number,
      required: true,
      default: 0,
    },

    pricePerSqft: {
      type: Number,
      default: 0,
    },

    rera: {
      type: String,
      default: "",
    },

    // =========================
    // IMAGE
    // =========================
    image: {
      type: String,
      default: "",
    },
    documents: [
      {
        originalName: {
          type: String,
          default: "",
        },

        file: {
          type: String,
          required: true,
        },
      },
    ],

    // =========================
    // SEO
    // =========================
    metaTitle: {
      type: String,
      default: "",
      maxlength: 60,
    },

    metaDescription: {
      type: String,
      default: "",
      maxlength: 160,
    },

    urlSlug: {
      type: String,
      default: "",
      trim: true,
    },

    // =========================
    // PUBLISH SETTINGS
    // =========================
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

    // =========================
    // ANALYTICS
    // =========================
    views: {
      type: Number,
      default: 0,
    },

    enquiries: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Property", propertySchema);
