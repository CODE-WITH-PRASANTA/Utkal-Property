const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    area: {
      type: String,
      required: [true, "Area or locality is required"],
      trim: true,
    },
    pincode: {
      type: String,
      required: [true, "Pincode is required"],
      trim: true,
    },
    latitude: {
      type: Number,
      default: null,
    },
    longitude: {
      type: Number,
      default: null,
    },
    properties: {
      type: Number,
      default: 0,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

locationSchema.index(
  { country: 1, state: 1, city: 1, area: 1, pincode: 1 },
  { unique: true },
);

module.exports = mongoose.model("Location", locationSchema);
