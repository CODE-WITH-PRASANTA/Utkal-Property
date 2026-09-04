const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [
        true,
        "Image path or URL is required",
      ],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model(
    "Gallery",
    gallerySchema
  );