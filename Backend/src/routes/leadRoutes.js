
const express = require("express");

const {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");

const router =
  express.Router();

/* =====================================================
   CREATE ENQUIRY
===================================================== */

router.post(
  "/",
  createLead
);

/* =====================================================
   GET ALL ENQUIRIES
===================================================== */

router.get(
  "/",
  getAllLeads
);

/* =====================================================
   GET SINGLE ENQUIRY
===================================================== */

router.get(
  "/:id",
  getLeadById
);

/* =====================================================
   UPDATE ENQUIRY
===================================================== */

router.put(
  "/:id",
  updateLead
);

/* =====================================================
   DELETE ENQUIRY
===================================================== */

router.delete(
  "/:id",
  deleteLead
);

module.exports = router;

