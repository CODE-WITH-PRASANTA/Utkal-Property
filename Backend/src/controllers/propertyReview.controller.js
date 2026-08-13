const PropertyReview = require("../models/propertyReview.model");
const mongoose = require("mongoose");

/* =====================================================
   CREATE REVIEW
===================================================== */

const createPropertyReview = async (req, res) => {
  try {
    const {
      propertyId,
      name,
      email,
      phone,
      rating,
      review,
    } = req.body;

    /* ---------------------------------------------
       VALIDATION
    --------------------------------------------- */

    if (!propertyId) {
      return res.status(400).json({
        success: false,
        message: "Property ID is required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID.",
      });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required.",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({
        success: false,
        message: "Phone is required.",
      });
    }

    if (!rating) {
      return res.status(400).json({
        success: false,
        message: "Please select a rating.",
      });
    }

    const numericRating = Number(rating);

    if (
      Number.isNaN(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5.",
      });
    }

    if (!review || !review.trim()) {
      return res.status(400).json({
        success: false,
        message: "Review is required.",
      });
    }

    /* ---------------------------------------------
       CREATE REVIEW
    --------------------------------------------- */

    const newReview =
      await PropertyReview.create({
        propertyId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        rating: numericRating,
        review: review.trim(),
      });

    return res.status(201).json({
      success: true,
      message:
        "Review submitted successfully. It is waiting for approval.",
      review: newReview,
    });

  } catch (error) {
    console.error(
      "CREATE PROPERTY REVIEW ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to submit review.",
      error: error.message,
    });
  }
};


/* =====================================================
   GET REVIEWS BY PROPERTY
===================================================== */

const getPropertyReviews = async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!propertyId) {
      return res.status(400).json({
        success: false,
        message: "Property ID is required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID.",
      });
    }

    const reviews =
      await PropertyReview.find({
        propertyId,
        status: "Approved",
      })
        .sort({
          createdAt: -1,
        })
        .lean();

    /* ---------------------------------------------
       RATING SUMMARY
    --------------------------------------------- */

    const totalReviews = reviews.length;

    let totalRating = 0;

    reviews.forEach((item) => {
      totalRating += Number(item.rating || 0);
    });

    const averageRating =
      totalReviews > 0
        ? Number(
            (
              totalRating /
              totalReviews
            ).toFixed(1)
          )
        : 0;

    /* ---------------------------------------------
       RATING DISTRIBUTION
    --------------------------------------------- */

    const ratingDistribution = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    reviews.forEach((item) => {
      const currentRating =
        Number(item.rating);

      if (
        ratingDistribution[
          currentRating
        ] !== undefined
      ) {
        ratingDistribution[
          currentRating
        ]++;
      }
    });

    return res.status(200).json({
      success: true,

      totalReviews,

      averageRating,

      ratingDistribution,

      reviews,
    });

  } catch (error) {
    console.error(
      "GET PROPERTY REVIEWS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch property reviews.",
      error: error.message,
    });
  }
};


/* =====================================================
   GET ALL REVIEWS - ADMIN
===================================================== */

const getAllPropertyReviews = async (
  req,
  res
) => {
  try {
    const {
      status,
      propertyId,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    if (propertyId) {

      if (
        !mongoose.Types.ObjectId.isValid(
          propertyId
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid property ID.",
        });
      }

      query.propertyId = propertyId;
    }

    const pageNumber =
      Math.max(
        Number(page) || 1,
        1
      );

    const limitNumber =
      Math.max(
        Number(limit) || 10,
        1
      );

    const skip =
      (pageNumber - 1) *
      limitNumber;

    const [
      reviews,
      totalReviews,
    ] = await Promise.all([
      PropertyReview.find(query)
        .populate(
          "propertyId"
        )
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limitNumber)
        .lean(),

      PropertyReview.countDocuments(
        query
      ),
    ]);

    return res.status(200).json({
      success: true,

      reviews,

      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total: totalReviews,
        totalPages: Math.ceil(
          totalReviews /
            limitNumber
        ),
      },
    });

  } catch (error) {
    console.error(
      "GET ALL PROPERTY REVIEWS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews.",
      error: error.message,
    });
  }
};


/* =====================================================
   GET SINGLE REVIEW
===================================================== */

const getPropertyReviewById =
  async (req, res) => {
    try {
      const { id } = req.params;

      if (
        !mongoose.Types.ObjectId.isValid(
          id
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid review ID.",
        });
      }

      const review =
        await PropertyReview.findById(
          id
        ).populate("propertyId");

      if (!review) {
        return res.status(404).json({
          success: false,
          message: "Review not found.",
        });
      }

      return res.status(200).json({
        success: true,
        review,
      });

    } catch (error) {
      console.error(
        "GET REVIEW ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to fetch review.",
        error: error.message,
      });
    }
  };


/* =====================================================
   UPDATE REVIEW STATUS
===================================================== */

const updateReviewStatus =
  async (req, res) => {
    try {
      const { id } = req.params;

      const { status } =
        req.body;

      if (
        !mongoose.Types.ObjectId.isValid(
          id
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid review ID.",
        });
      }

      const allowedStatuses = [
        "Pending",
        "Approved",
        "Rejected",
      ];

      if (
        !allowedStatuses.includes(
          status
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid review status.",
        });
      }

      const updatedReview =
        await PropertyReview.findByIdAndUpdate(
          id,
          {
            status,
          },
          {
            new: true,
            runValidators: true,
          }
        );

      if (!updatedReview) {
        return res.status(404).json({
          success: false,
          message: "Review not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message:
          "Review status updated successfully.",
        review: updatedReview,
      });

    } catch (error) {
      console.error(
        "UPDATE REVIEW STATUS ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update review status.",
        error: error.message,
      });
    }
  };


/* =====================================================
   ADMIN REPLY
===================================================== */

const replyToReview =
  async (req, res) => {
    try {
      const { id } = req.params;

      const {
        adminReply,
      } = req.body;

      if (
        !mongoose.Types.ObjectId.isValid(
          id
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid review ID.",
        });
      }

      if (
        !adminReply ||
        !adminReply.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Reply is required.",
        });
      }

      const updatedReview =
        await PropertyReview.findByIdAndUpdate(
          id,
          {
            adminReply:
              adminReply.trim(),

            repliedAt:
              new Date(),
          },
          {
            new: true,
            runValidators: true,
          }
        );

      if (!updatedReview) {
        return res.status(404).json({
          success: false,
          message: "Review not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message:
          "Reply added successfully.",
        review: updatedReview,
      });

    } catch (error) {
      console.error(
        "REPLY REVIEW ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to reply to review.",
        error: error.message,
      });
    }
  };


/* =====================================================
   DELETE REVIEW
===================================================== */

const deletePropertyReview =
  async (req, res) => {
    try {
      const { id } = req.params;

      if (
        !mongoose.Types.ObjectId.isValid(
          id
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid review ID.",
        });
      }

      const deletedReview =
        await PropertyReview.findByIdAndDelete(
          id
        );

      if (!deletedReview) {
        return res.status(404).json({
          success: false,
          message: "Review not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message:
          "Review deleted successfully.",
      });

    } catch (error) {
      console.error(
        "DELETE REVIEW ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to delete review.",
        error: error.message,
      });
    }
  };


module.exports = {
  createPropertyReview,
  getPropertyReviews,
  getAllPropertyReviews,
  getPropertyReviewById,
  updateReviewStatus,
  replyToReview,
  deletePropertyReview,
};