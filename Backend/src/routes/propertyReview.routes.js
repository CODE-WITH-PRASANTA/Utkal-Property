const express = require("express");

const router =
  express.Router();

const {
  createPropertyReview,
  getPropertyReviews,
  getAllPropertyReviews,
  getPropertyReviewById,
  updateReviewStatus,
  replyToReview,
  deletePropertyReview,
} = require("../controllers/propertyReview.controller");


/* =====================================================
   PUBLIC
===================================================== */

/*
   Submit review
*/
router.post(
  "/",
  createPropertyReview
);


/*
   Get approved reviews
   for one property

   GET
   /api/property-reviews/property/:propertyId
*/
router.get(
  "/property/:propertyId",
  getPropertyReviews
);


/* =====================================================
   ADMIN
===================================================== */

/*
   Get all reviews

   Example:

   /api/property-reviews/admin/all

   /api/property-reviews/admin/all?status=Pending

   /api/property-reviews/admin/all?status=Approved

   /api/property-reviews/admin/all?propertyId=XXXX
*/

router.get(
  "/admin/all",
  getAllPropertyReviews
);


/*
   Get one review
*/

router.get(
  "/admin/:id",
  getPropertyReviewById
);


/*
   Approve / Reject / Pending
*/

router.put(
  "/admin/:id/status",
  updateReviewStatus
);


/*
   Admin reply
*/

router.put(
  "/admin/:id/reply",
  replyToReview
);


/*
   Delete
*/

router.delete(
  "/admin/:id",
  deletePropertyReview
);


module.exports = router;