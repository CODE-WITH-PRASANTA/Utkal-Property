const mongoose = require("mongoose");

const leadSchema =
  new mongoose.Schema(
    {
      /* ================================================
         CUSTOMER
      ================================================= */

      fullName: {
        type: String,
        required: true,
        trim: true,
        default: "Property Enquiry",
      },

      mobile: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        trim: true,
        lowercase: true,
        default: "",
      },

      /* ================================================
         ENQUIRY
      ================================================= */

      lookingFor: {
        type: String,
        enum: [
          "Rent",
          "Buy",
          "Sell",
        ],
        default: "Rent",
      },

      interestedIn: {
        type: String,
        default: "",
        trim: true,
      },

      location: {
        type: String,
        default: "",
        trim: true,
      },

      budgetRange: {
        type: String,
        default: "",
        trim: true,
      },

      /* ================================================
         PROPERTY
      ================================================= */

      propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        default: null,
      },

      propertyName: {
        type: String,
        default: "",
        trim: true,
      },

      project: {
        type: String,
        default: "",
        trim: true,
      },

      /* ================================================
         CRM
      ================================================= */

      source: {
        type: String,
        default: "Website",
        trim: true,
      },

      agent: {
        type: String,
        default: "",
        trim: true,
      },

      status: {
        type: String,
        enum: [
          "New",
          "Follow Up",
          "Site Visit",
          "Converted",
          "Lost Lead",
        ],
        default: "New",
      },

      priority: {
        type: String,
        enum: [
          "Low",
          "Medium",
          "High",
        ],
        default: "Medium",
      },

      followUpDate: {
        type: String,
        default: "",
      },

      score: {
        type: Number,
        default: 0,
      },

      notes: {
        type: String,
        default: "",
      },

      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Lead",
    leadSchema
  );