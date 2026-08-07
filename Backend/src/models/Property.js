const mongoose = require("mongoose");

// =====================================================
// NEARBY PLACE SCHEMA
// =====================================================

const nearbyPlaceSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      default: "",
      trim: true,
    },

    name: {
      type: String,
      default: "",
      trim: true,
    },

    // Example: "15 Km"
    distance: {
      type: String,
      default: "",
      trim: true,
    },

    // Example: 15
    distanceValue: {
      type: Number,
      default: 0,
    },

    unit: {
      type: String,
      enum: ["Km", "Meter"],
      default: "Km",
    },

    icon: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    _id: true,
  }
);

// =====================================================
// FLOOR PLAN SCHEMA
// =====================================================

const floorPlanSchema = new mongoose.Schema(
  {
    planTitle: {
      type: String,
      required: true,
      trim: true,
    },

    planType: {
      type: String,
      required: true,
      trim: true,
    },

    beds: {
      type: Number,
      default: 0,
    },

    baths: {
      type: Number,
      default: 0,
    },

    balconies: {
      type: Number,
      default: 0,
    },

    pujaRoom: {
      type: Number,
      default: 0,
    },

    servantRoom: {
      type: Number,
      default: 0,
    },

    storeRoom: {
      type: Number,
      default: 0,
    },

    sbaSqft: {
      type: Number,
      default: 0,
    },

    plotSqft: {
      type: Number,
      default: 0,
    },

    // Uploaded floor-plan image path
    floorPlanSketch: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: true,
    timestamps: true,
  }
);

// =====================================================
// DOCUMENT SCHEMA
// =====================================================

const documentSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      default: "",
      trim: true,
    },

    file: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: true,
  }
);

// =====================================================
// PROPERTY SCHEMA
// =====================================================

const propertySchema = new mongoose.Schema(
  {
    // =================================================
    // BASIC INFORMATION
    // =================================================

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
      trim: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
    },

    subType: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,

      enum: [
        "Active",
        "Inactive",
        "Pending",
        "Under Construction",
        "Sold",
      ],

      default: "Active",
    },

    statusType: {
      type: String,
      default: "For Sale",
      trim: true,
    },

    projectSize: {
      type: Number,
      default: 0,
    },

    completionStatus: {
      type: String,

      enum: [
        "Under Construction",
        "Completed",
        "Ready to Move",
        "Upcoming",
      ],

      default: "Under Construction",
    },

    shortDescription: {
      type: String,
      default: "",
      maxlength: 120,
      trim: true,
    },

    highlights: [
      {
        type: String,
        trim: true,
      },
    ],

    // =================================================
    // PRICE
    // =================================================

    price: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    pricePerSqft: {
      type: Number,
      default: 0,
      min: 0,
    },

    rera: {
      type: String,
      default: "",
      trim: true,
    },

    // =================================================
    // LOCATION
    // =================================================

    location: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      default: "",
      trim: true,
    },

    state: {
      type: String,
      default: "",
      trim: true,
    },

    country: {
      type: String,
      default: "",
      trim: true,
    },

    // =================================================
    // OVERVIEW
    // =================================================

    projectArea: {
      type: String,
      default: "",
      trim: true,
    },

    noOfHouseVilla: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalFloors: {
      type: Number,
      default: 0,
      min: 0,
    },

    facing: {
      type: String,
      default: "",
      trim: true,
    },

    plotArea: {
      type: String,
      default: "",
      trim: true,
    },

    bedrooms: {
      type: Number,
      default: 0,
      min: 0,
    },

    bathrooms: {
      type: Number,
      default: 0,
      min: 0,
    },

    balconies: {
      type: String,
      default: "",
      trim: true,
    },

    parking: {
      type: String,
      default: "",
      trim: true,
    },

    transactionType: {
      type: String,
      default: "For Sale",
      trim: true,
    },

    propertyOverlooking: {
      type: String,
      default: "",
      trim: true,
    },

    maintenancePerMonth: {
      type: Number,
      default: 0,
      min: 0,
    },

    expectedRentalReturn: {
      type: Number,
      default: 0,
      min: 0,
    },

    // =================================================
    // QUICK STATS
    // =================================================

    totalUnits: {
      type: Number,
      default: 0,
      min: 0,
    },

    availableUnits: {
      type: Number,
      default: 0,
      min: 0,
    },

    /*
      Your frontend currently sends:
      totalArea: "2 Acre"

      So String is better than Number here.
    */

    totalArea: {
      type: String,
      default: "",
      trim: true,
    },

    launchDate: {
      type: Date,
      default: null,
    },

    /*
      Frontend currently sends:
      plotSize: "1500 sq.ft"

      Therefore keep this as String.
    */

    plotSize: {
      type: String,
      default: "",
      trim: true,
    },

    // =================================================
    // AMENITIES
    // =================================================

    amenities: [
      {
        type: String,
        trim: true,
      },
    ],

    // =================================================
    // NEARBY PLACES
    // =================================================

    nearbyPlaces: [
      nearbyPlaceSchema
    ],

    // =================================================
    // PROPERTY IMAGES
    // =================================================

    propertyImages: [
      {
        type: String,
        trim: true,
      },
    ],

    // First image / cover image
    primaryImage: {
      type: String,
      default: "",
      trim: true,
    },

    /*
      Keep old "image" field for compatibility.

      Your existing PropertyCard uses:

      property.image

      So this prevents the frontend listing from breaking.
    */

    image: {
      type: String,
      default: "",
      trim: true,
    },

    // =================================================
    // DOCUMENTS
    // =================================================

    documents: [
      documentSchema
    ],

    // =================================================
    // FLOOR PLANS
    // =================================================

    floorPlans: [
      floorPlanSchema
    ],

    // =================================================
    // SEO
    // =================================================

    metaTitle: {
      type: String,
      default: "",
      maxlength: 60,
      trim: true,
    },

    metaDescription: {
      type: String,
      default: "",
      maxlength: 160,
      trim: true,
    },

    urlSlug: {
      type: String,
      default: "",
      trim: true,
    },

    // =================================================
    // PUBLISH SETTINGS
    // =================================================

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

    // =================================================
    // ANALYTICS
    // =================================================

    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    enquiries: {
      type: Number,
      default: 0,
      min: 0,
    },
  },

  {
    timestamps: true,
  }
);

// =====================================================
// INDEXES
// =====================================================

propertySchema.index({
  name: "text",
  location: "text",
  city: "text",
  category: "text",
  type: "text",
});

propertySchema.index({
  status: 1,
});

propertySchema.index({
  category: 1,
});

propertySchema.index({
  location: 1,
});

propertySchema.index({
  publishStatus: 1,
});

propertySchema.index({
  featured: 1,
});

propertySchema.index({
  createdAt: -1,
});

// =====================================================
// MODEL
// =====================================================

module.exports = mongoose.model(
  "Property",
  propertySchema
);