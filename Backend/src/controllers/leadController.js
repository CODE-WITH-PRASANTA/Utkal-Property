
const Lead = require("../models/Lead");

/* =====================================================
   CREATE LEAD
===================================================== */

exports.createLead = async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      email,
      source,

      lookingFor,

      interestedIn,
      propertyType,

      location,
      preferredArea,

      budgetRange,
      budget,

      agent,
      status,
      priority,
      followUpDate,

      notes,
      project,
      score,

      propertyId,
      propertyName,
    } = req.body;

    /* =====================================================
       MOBILE VALIDATION
    ===================================================== */

    if (!mobile || !String(mobile).trim()) {
      return res.status(400).json({
        success: false,
        message: "Mobile number is required",
      });
    }

    const cleanMobile = String(mobile).replace(
      /\D/g,
      ""
    );

    if (cleanMobile.length !== 10) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid 10 digit mobile number",
      });
    }

    /* =====================================================
       LOOKING FOR
    ===================================================== */

    const finalLookingFor =
      lookingFor || "Buy";

    if (
      !["Rent", "Buy", "Sell"].includes(
        finalLookingFor
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Looking For must be Buy, Sell or Rent",
      });
    }

    /* =====================================================
       FULL NAME
    ===================================================== */

    const finalFullName =
      fullName &&
      String(fullName).trim()
        ? String(fullName).trim()
        : "Property Enquiry";

    /* =====================================================
       PROPERTY TYPE
    ===================================================== */

    const finalPropertyType =
      interestedIn ||
      propertyType ||
      "";

    /* =====================================================
       BUDGET
    ===================================================== */

    const finalBudget =
      budgetRange ||
      budget ||
      "";

    /* =====================================================
       LOCATION
    ===================================================== */

    const finalLocation =
      location
        ? String(location).trim()
        : "";

    /* =====================================================
       PREFERRED AREA
    ===================================================== */

    const finalPreferredArea =
      preferredArea
        ? String(preferredArea).trim()
        : "";

    /* =====================================================
       NOTES
    ===================================================== */

    const generatedNotes = [
      `Looking For: ${finalLookingFor}`,
      `Property Type: ${finalPropertyType}`,
      `Preferred Location: ${finalLocation}`,
      `Preferred Area: ${finalPreferredArea}`,
      `Budget Range: ${finalBudget}`,
      propertyName
        ? `Property: ${propertyName}`
        : "",
      notes
        ? `Additional Notes: ${notes}`
        : "",
    ]
      .filter(Boolean)
      .join(" | ");

    /* =====================================================
       CREATE LEAD
    ===================================================== */

    const lead = await Lead.create({
      fullName: finalFullName,

      mobile: cleanMobile,

      email: email
        ? String(email)
            .trim()
            .toLowerCase()
        : "",

      source:
        source ||
        "Website Floating Enquiry Form",

      lookingFor:
        finalLookingFor,

      interestedIn:
        finalPropertyType,

      location:
        finalLocation,

      preferredArea:
        finalPreferredArea,

      budgetRange:
        finalBudget,

      propertyId:
        propertyId || null,

      propertyName:
        propertyName
          ? String(propertyName).trim()
          : "",

      project:
        project || "",

      agent:
        agent || "",

      status:
        status || "New",

      priority:
        priority || "Medium",

      followUpDate:
        followUpDate || "",

      score:
        Number(score) || 0,

      notes:
        generatedNotes,

      createdBy:
        req.user?._id || null,
    });

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(201).json({
      success: true,
      message:
        "Enquiry submitted successfully",
      lead,
    });
  } catch (error) {
    console.error(
      "CREATE LEAD ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create enquiry",
      error: error.message,
    });
  }
};

/* =====================================================
   GET ALL LEADS
===================================================== */

exports.getAllLeads = async (req, res) => {
  try {
    const {
      search,
      status,
      source,
      agent,
      page = 1,
      limit = 100,
    } = req.query;

    const filter = {};

    /* =====================================================
       SEARCH
    ===================================================== */

    if (
      search &&
      search.trim()
    ) {
      const searchText =
        search.trim();

      filter.$or = [
        {
          fullName: {
            $regex: searchText,
            $options: "i",
          },
        },
        {
          mobile: {
            $regex: searchText,
            $options: "i",
          },
        },
        {
          email: {
            $regex: searchText,
            $options: "i",
          },
        },
        {
          location: {
            $regex: searchText,
            $options: "i",
          },
        },
        {
          preferredArea: {
            $regex: searchText,
            $options: "i",
          },
        },
        {
          interestedIn: {
            $regex: searchText,
            $options: "i",
          },
        },
        {
          propertyName: {
            $regex: searchText,
            $options: "i",
          },
        },
        {
          budgetRange: {
            $regex: searchText,
            $options: "i",
          },
        },
      ];
    }

    /* =====================================================
       STATUS FILTER
    ===================================================== */

    if (
      status &&
      status !== "All Status" &&
      status !== "All"
    ) {
      filter.status = status;
    }

    /* =====================================================
       SOURCE FILTER
    ===================================================== */

    if (
      source &&
      source !== "All Sources" &&
      source !== "All"
    ) {
      filter.source = source;
    }

    /* =====================================================
       AGENT FILTER
    ===================================================== */

    if (
      agent &&
      agent !== "All Agents" &&
      agent !== "All"
    ) {
      filter.agent = agent;
    }

    /* =====================================================
       PAGINATION
    ===================================================== */

    const pageNumber =
      Math.max(
        Number(page) || 1,
        1
      );

    const limitNumber =
      Math.max(
        Number(limit) || 100,
        1
      );

    const skip =
      (pageNumber - 1) *
      limitNumber;

    const total =
      await Lead.countDocuments(
        filter
      );

    const leads =
      await Lead.find(filter)
        .populate(
          "propertyId",
          "name title location"
        )
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limitNumber);

    return res.status(200).json({
      success: true,

      total,

      currentPage:
        pageNumber,

      totalPages:
        Math.ceil(
          total /
            limitNumber
        ),

      leads,
    });
  } catch (error) {
    console.error(
      "GET LEADS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch enquiries",
      error: error.message,
    });
  }
};

/* =====================================================
   GET LEAD BY ID
===================================================== */

exports.getLeadById = async (
  req,
  res
) => {
  try {
    const lead =
      await Lead.findById(
        req.params.id
      ).populate(
        "propertyId",
        "name title location"
      );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message:
          "Enquiry not found",
      });
    }

    return res.status(200).json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error(
      "GET LEAD ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch enquiry",
      error: error.message,
    });
  }
};

/* =====================================================
   UPDATE LEAD
===================================================== */

exports.updateLead = async (
  req,
  res
) => {
  try {
    const lead =
      await Lead.findById(
        req.params.id
      );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message:
          "Enquiry not found",
      });
    }

    const {
      fullName,
      mobile,
      email,

      source,

      lookingFor,

      interestedIn,
      propertyType,

      location,
      preferredArea,

      budgetRange,
      budget,

      agent,
      status,
      priority,
      followUpDate,

      notes,
      project,
      score,

      propertyId,
      propertyName,
    } = req.body;

    /* =====================================================
       CUSTOMER
    ===================================================== */

    if (
      fullName !== undefined
    ) {
      lead.fullName =
        String(fullName).trim();
    }

    if (
      mobile !== undefined
    ) {
      const cleanMobile =
        String(mobile).replace(
          /\D/g,
          ""
        );

      if (
        cleanMobile.length !==
        10
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid 10 digit mobile number",
        });
      }

      lead.mobile =
        cleanMobile;
    }

    if (
      email !== undefined
    ) {
      lead.email =
        String(email)
          .trim()
          .toLowerCase();
    }

    /* =====================================================
       ENQUIRY
    ===================================================== */

    if (
      source !== undefined
    ) {
      lead.source = source;
    }

    if (
      lookingFor !== undefined
    ) {
      if (
        !["Rent", "Buy", "Sell"].includes(
          lookingFor
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Looking For must be Buy, Sell or Rent",
        });
      }

      lead.lookingFor =
        lookingFor;
    }

    if (
      interestedIn !== undefined
    ) {
      lead.interestedIn =
        interestedIn;
    }

    if (
      propertyType !== undefined
    ) {
      lead.interestedIn =
        propertyType;
    }

    if (
      location !== undefined
    ) {
      lead.location =
        String(location).trim();
    }

    if (
      preferredArea !== undefined
    ) {
      lead.preferredArea =
        String(
          preferredArea
        ).trim();
    }

    if (
      budgetRange !== undefined
    ) {
      lead.budgetRange =
        String(
          budgetRange
        ).trim();
    }

    if (
      budget !== undefined
    ) {
      lead.budgetRange =
        String(
          budget
        ).trim();
    }

    /* =====================================================
       PROPERTY
    ===================================================== */

    if (
      propertyId !== undefined
    ) {
      lead.propertyId =
        propertyId || null;
    }

    if (
      propertyName !== undefined
    ) {
      lead.propertyName =
        String(
          propertyName
        ).trim();
    }

    if (
      project !== undefined
    ) {
      lead.project =
        project;
    }

    /* =====================================================
       CRM
    ===================================================== */

    if (
      agent !== undefined
    ) {
      lead.agent =
        agent;
    }

    if (
      status !== undefined
    ) {
      lead.status =
        status;
    }

    if (
      priority !== undefined
    ) {
      lead.priority =
        priority;
    }

    if (
      followUpDate !== undefined
    ) {
      lead.followUpDate =
        followUpDate;
    }

    if (
      score !== undefined
    ) {
      lead.score =
        Number(score) || 0;
    }

    if (
      notes !== undefined
    ) {
      lead.notes =
        notes;
    }

    /* =====================================================
       SAVE
    ===================================================== */

    await lead.save();

    return res.status(200).json({
      success: true,
      message:
        "Enquiry updated successfully",
      lead,
    });
  } catch (error) {
    console.error(
      "UPDATE LEAD ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update enquiry",
      error: error.message,
    });
  }
};

/* =====================================================
   DELETE LEAD
===================================================== */

exports.deleteLead = async (
  req,
  res
) => {
  try {
    const lead =
      await Lead.findByIdAndDelete(
        req.params.id
      );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message:
          "Enquiry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Enquiry deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE LEAD ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete enquiry",
      error: error.message,
    });
  }
};

