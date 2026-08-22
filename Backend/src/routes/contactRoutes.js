const express = require("express");

const {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

const router = express.Router();

// =====================================================
// CREATE
// =====================================================

router.post("/", createContact);

// =====================================================
// GET ALL
// =====================================================

router.get("/", getAllContacts);

// =====================================================
// GET BY ID
// =====================================================

router.get("/:id", getContactById);

// =====================================================
// UPDATE
// =====================================================

router.put("/:id", updateContact);

// =====================================================
// DELETE
// =====================================================

router.delete("/:id", deleteContact);

module.exports = router;