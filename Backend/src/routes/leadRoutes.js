const express = require("express");

const {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");

const router = express.Router();

// CREATE LEAD
router.post("/", createLead);

// GET ALL LEADS
router.get("/", getAllLeads);

// GET SINGLE LEAD
router.get("/:id", getLeadById);

// UPDATE LEAD
router.put("/:id", updateLead);

// DELETE LEAD
router.delete("/:id", deleteLead);

module.exports = router;