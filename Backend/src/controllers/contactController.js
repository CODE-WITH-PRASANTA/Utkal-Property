const PropertyContact = require("../models/contactModel");
const Property = require("../models/Property");

// =====================================================
// CREATE CONTACT
// =====================================================

exports.createContact = async (req, res) => {
  try {
    const {
      propertyId,
      name,
      email,
      mobile,
    } = req.body;

    // =================================================
    // VALIDATION
    // =================================================

    if (!propertyId) {
      return res.status(400).json({
        success: false,
        message: "Property ID is required",
      });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!mobile || !mobile.trim()) {
      return res.status(400).json({
        success: false,
        message: "Mobile number is required",
      });
    }

    // =================================================
    // CHECK PROPERTY
    // =================================================

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // =================================================
    // CREATE CONTACT
    // =================================================

    const contact = await PropertyContact.create({
      propertyId,

      name: name.trim(),

      email: email.trim().toLowerCase(),

      mobile: mobile.trim(),

      status: "New",
    });

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(201).json({
      success: true,

      message:
        "Contact details submitted successfully",

      data: contact,
    });
  } catch (error) {
    console.error(
      "CREATE CONTACT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to submit contact details",

      error: error.message,
    });
  }
};

// =====================================================
// GET ALL CONTACTS
// =====================================================

exports.getAllContacts = async (req, res) => {
  try {
    const contacts =
      await PropertyContact.find()
        .populate(
          "propertyId",
          "name title"
        )
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      success: true,

      count: contacts.length,

      data: contacts,
    });
  } catch (error) {
    console.error(
      "GET CONTACTS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to fetch contact details",

      error: error.message,
    });
  }
};

// =====================================================
// GET CONTACT BY ID
// =====================================================

exports.getContactById = async (req, res) => {
  try {
    const contact =
      await PropertyContact.findById(
        req.params.id
      ).populate(
        "propertyId",
        "name title"
      );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error(
      "GET CONTACT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to fetch contact",

      error: error.message,
    });
  }
};

// =====================================================
// UPDATE CONTACT STATUS
// =====================================================

exports.updateContact = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      status,
    } = req.body;

    const contact =
      await PropertyContact.findById(
        req.params.id
      );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    if (name !== undefined) {
      contact.name = name.trim();
    }

    if (email !== undefined) {
      contact.email =
        email.trim().toLowerCase();
    }

    if (mobile !== undefined) {
      contact.mobile = mobile.trim();
    }

    if (status !== undefined) {
      contact.status = status;
    }

    await contact.save();

    return res.status(200).json({
      success: true,

      message:
        "Contact updated successfully",

      data: contact,
    });
  } catch (error) {
    console.error(
      "UPDATE CONTACT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to update contact",

      error: error.message,
    });
  }
};

// =====================================================
// DELETE CONTACT
// =====================================================

exports.deleteContact = async (req, res) => {
  try {
    const contact =
      await PropertyContact.findByIdAndDelete(
        req.params.id
      );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    return res.status(200).json({
      success: true,

      message:
        "Contact deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE CONTACT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to delete contact",

      error: error.message,
    });
  }
};