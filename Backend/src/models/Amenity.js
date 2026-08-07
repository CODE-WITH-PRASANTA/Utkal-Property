const mongoose = require("mongoose");

const amenitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 200,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    sortOrder: {
      type: Number,
      default: 0,
    },

    // Emoji icon
    icon: {
      type: String,
      default: "🏊",
    },

    // Optional uploaded icon/image
    image: {
      type: String,
      default: "",
    },

    // Number of properties using amenity
    propertiesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Amenity",
  amenitySchema
);