const Lead = require("../models/Lead");

/* =====================================================
   CREATE LEAD
===================================================== */

exports.createLead =
  async (req, res) => {
    try {
      const {
        fullName,
        mobile,
        email,
        source,
        lookingFor,
        interestedIn,
        propertyType,
        budgetRange,
        budget,
        location,
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

      /* ================================================
         MOBILE VALIDATION
      ================================================= */

      if (
        !mobile ||
        !String(mobile).trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Mobile number is required",
        });
      }

      const cleanMobile =
        String(mobile).replace(
          /\D/g,
          ""
        );

      if (
        cleanMobile.length !== 10
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid 10 digit mobile number",
        });
      }

      /* ================================================
         FULL NAME
         
         FloatingForm doesn't have
         a name field.
      ================================================= */

      const finalFullName =
        fullName &&
        String(fullName).trim()
          ? String(
              fullName
            ).trim()
          : "Property Enquiry";

      /* ================================================
         PROPERTY TYPE
         
         Admin form:
         interestedIn

         Floating form:
         propertyType
      ================================================= */

      const finalPropertyType =
        interestedIn ||
        propertyType ||
        "";

      /* ================================================
         BUDGET
      ================================================= */

      const finalBudget =
        budgetRange ||
        budget ||
        "";

      /* ================================================
         CREATE LEAD
      ================================================= */

      const lead =
        await Lead.create({
          fullName:
            finalFullName,

          mobile:
            cleanMobile,

          email:
            email
              ? String(
                  email
                )
                  .trim()
                  .toLowerCase()
              : "",

          source:
            source ||
            "Website",

          lookingFor:
            lookingFor ||
            "Rent",

          interestedIn:
            finalPropertyType,

          location:
            location
              ? String(
                  location
                ).trim()
              : "",

          budgetRange:
            finalBudget,

          propertyId:
            propertyId || null,

          propertyName:
            propertyName
              ? String(
                  propertyName
                ).trim()
              : "",

          project:
            project || "",

          agent:
            agent || "",

          status:
            status ||
            "New",

          priority:
            priority ||
            "Medium",

          followUpDate:
            followUpDate ||
            "",

          score:
            Number(score) || 0,

          notes:
            notes || "",

          createdBy:
            req.user?._id ||
            null,
        });

      /* ================================================
         RESPONSE
      ================================================= */

      return res.status(201).json({
        success: true,
        message:
          "Lead created successfully",
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
          "Failed to create lead",
        error:
          error.message,
      });
    }
  };

/* =====================================================
   GET ALL LEADS
===================================================== */

exports.getAllLeads =
  async (req, res) => {
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

      /* ================================================
         SEARCH
      ================================================= */

      if (
        search &&
        search.trim()
      ) {
        const searchText =
          search.trim();

        filter.$or = [
          {
            fullName: {
              $regex:
                searchText,
              $options: "i",
            },
          },
          {
            mobile: {
              $regex:
                searchText,
              $options: "i",
            },
          },
          {
            email: {
              $regex:
                searchText,
              $options: "i",
            },
          },
          {
            location: {
              $regex:
                searchText,
              $options: "i",
            },
          },
          {
            interestedIn: {
              $regex:
                searchText,
              $options: "i",
            },
          },
          {
            propertyName: {
              $regex:
                searchText,
              $options: "i",
            },
          },
        ];
      }

      /* ================================================
         STATUS
      ================================================= */

      if (
        status &&
        status !== "All Status"
      ) {
        filter.status =
          status;
      }

      /* ================================================
         SOURCE
      ================================================= */

      if (
        source &&
        source !==
          "All Sources"
      ) {
        filter.source =
          source;
      }

      /* ================================================
         AGENT
      ================================================= */

      if (
        agent &&
        agent !==
          "All Agents"
      ) {
        filter.agent =
          agent;
      }

      /* ================================================
         PAGINATION
      ================================================= */

      const pageNumber =
        Number(page) || 1;

      const limitNumber =
        Number(limit) || 100;

      const skip =
        (pageNumber - 1) *
        limitNumber;

      const total =
        await Lead.countDocuments(
          filter
        );

      const leads =
        await Lead.find(
          filter
        )
          .populate(
            "propertyId",
            "name title location"
          )
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(
            limitNumber
          );

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
          "Failed to fetch leads",
        error:
          error.message,
      });
    }
  };

/* =====================================================
   GET LEAD BY ID
===================================================== */

exports.getLeadById =
  async (req, res) => {
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
            "Lead not found",
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
          "Failed to fetch lead",
        error:
          error.message,
      });
    }
  };

/* =====================================================
   UPDATE LEAD
===================================================== */

exports.updateLead =
  async (req, res) => {
    try {
      const lead =
        await Lead.findById(
          req.params.id
        );

      if (!lead) {
        return res.status(404).json({
          success: false,
          message:
            "Lead not found",
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
        budgetRange,
        budget,
        location,
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

      /* ================================================
         NAME
      ================================================= */

      if (
        fullName !== undefined
      ) {
        lead.fullName =
          String(
            fullName
          ).trim();
      }

      /* ================================================
         MOBILE
      ================================================= */

      if (
        mobile !== undefined
      ) {
        const cleanMobile =
          String(
            mobile
          ).replace(
            /\D/g,
            ""
          );

        if (
          cleanMobile.length !==
          10
        ) {
          return res
            .status(400)
            .json({
              success:
                false,
              message:
                "Please enter a valid 10 digit mobile number",
            });
        }

        lead.mobile =
          cleanMobile;
      }

      /* ================================================
         EMAIL
      ================================================= */

      if (
        email !== undefined
      ) {
        lead.email =
          String(
            email
          )
            .trim()
            .toLowerCase();
      }

      /* ================================================
         ENQUIRY
      ================================================= */

      if (
        source !== undefined
      ) {
        lead.source =
          source;
      }

      if (
        lookingFor !==
        undefined
      ) {
        lead.lookingFor =
          lookingFor;
      }

      if (
        interestedIn !==
        undefined
      ) {
        lead.interestedIn =
          interestedIn;
      }

      if (
        propertyType !==
        undefined
      ) {
        lead.interestedIn =
          propertyType;
      }

      if (
        budgetRange !==
        undefined
      ) {
        lead.budgetRange =
          budgetRange;
      }

      if (
        budget !== undefined
      ) {
        lead.budgetRange =
          budget;
      }

      if (
        location !==
        undefined
      ) {
        lead.location =
          String(
            location
          ).trim();
      }

      /* ================================================
         PROPERTY
      ================================================= */

      if (
        propertyId !==
        undefined
      ) {
        lead.propertyId =
          propertyId ||
          null;
      }

      if (
        propertyName !==
        undefined
      ) {
        lead.propertyName =
          propertyName;
      }

      if (
        project !==
        undefined
      ) {
        lead.project =
          project;
      }

      /* ================================================
         CRM
      ================================================= */

      if (
        agent !==
        undefined
      ) {
        lead.agent =
          agent;
      }

      if (
        status !==
        undefined
      ) {
        lead.status =
          status;
      }

      if (
        priority !==
        undefined
      ) {
        lead.priority =
          priority;
      }

      if (
        followUpDate !==
        undefined
      ) {
        lead.followUpDate =
          followUpDate;
      }

      if (
        notes !==
        undefined
      ) {
        lead.notes =
          notes;
      }

      if (
        score !==
        undefined
      ) {
        lead.score =
          Number(score) ||
          0;
      }

      await lead.save();

      return res.status(200).json({
        success: true,
        message:
          "Lead updated successfully",
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
          "Failed to update lead",
        error:
          error.message,
      });
    }
  };

/* =====================================================
   DELETE LEAD
===================================================== */

exports.deleteLead =
  async (req, res) => {
    try {
      const lead =
        await Lead.findByIdAndDelete(
          req.params.id
        );

      if (!lead) {
        return res.status(404).json({
          success: false,
          message:
            "Lead not found",
        });
      }

      return res.status(200).json({
        success: true,
        message:
          "Lead deleted successfully",
      });
    } catch (error) {
      console.error(
        "DELETE LEAD ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to delete lead",
        error:
          error.message,
      });
    }
  };