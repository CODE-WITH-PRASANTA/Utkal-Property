import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import "./LeadManagement.css";

import API from "../../api/axios";

import {
  FiUsers,
  FiUserPlus,
  FiClock,
  FiMapPin,
  FiCheckCircle,
  FiXCircle,
  FiCalendar,
  FiSliders,
  FiPlus,
  FiDownload,
  FiGrid,
  FiColumns,
  FiSettings,
  FiPhone,
  FiMessageSquare,
  FiMoreVertical,
  FiMoreHorizontal,
  FiX,
  FiMail,
  FiGlobe,
  FiInstagram,
  FiShare2,
  FiUser,
  FiMinimize2,
  FiSearch,
  FiBell,
  FiChevronDown,
  FiMenu,
  FiActivity,
  FiFileText,
  FiFolder,
  FiChevronRight,
  FiArrowLeft,
  FiEdit,
  FiTrash2,
  FiRefreshCw,
} from "react-icons/fi";

import {
  FaFacebook,
  FaGoogle,
} from "react-icons/fa";

/* =====================================================
   CONSTANTS
===================================================== */

const DEFAULT_FORM = {
  fullName: "",
  mobile: "",
  email: "",
  source: "Select source",
  interestedIn: "Select property",
  budgetRange: "Select budget range",
  location: "",
  agent: "Select agent",
  status: "New",
  priority: "Medium",
  followUpDate: "",
  notes: "",
};

/* =====================================================
   MAIN COMPONENT
===================================================== */

const LeadManagement = () => {
  /* ===================================================
     LEADS
  =================================================== */

  const [leads, setLeads] = useState([]);

  const [loadingLeads, setLoadingLeads] =
    useState(false);

  const [leadError, setLeadError] =
    useState("");

  /* ===================================================
     SELECTION
  =================================================== */

  const [selectedLeads, setSelectedLeads] =
    useState([]);

  const [selectedLead, setSelectedLead] =
    useState(null);

  /* ===================================================
     TABS
  =================================================== */

  const [activeTab, setActiveTab] =
    useState("All Leads");

  const [activeTabDetails, setActiveTabDetails] =
    useState("Overview");

  /* ===================================================
     MODALS
  =================================================== */

  const [isAddLeadModalOpen, setIsAddLeadModalOpen] =
    useState(false);

  /* ===================================================
     ACTION MENU
  =================================================== */

  const [activeActionMenu, setActiveActionMenu] =
    useState(null);

  /* ===================================================
     PAGINATION
  =================================================== */

  const [itemsPerPage, setItemsPerPage] =
    useState(10);

  const [currentPage, setCurrentPage] =
    useState(1);

  /* ===================================================
     MOBILE
  =================================================== */

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] =
    useState(false);

  const [isMobileSearchOpen, setIsMobileSearchOpen] =
    useState(false);

  /* ===================================================
     SEARCH
  =================================================== */

  const [searchQuery, setSearchQuery] =
    useState("");

  /* ===================================================
     FILTERS
  =================================================== */

  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [sourceFilter, setSourceFilter] =
    useState("All Sources");

  const [agentFilter, setAgentFilter] =
    useState("All Agents");

  const [projectFilter, setProjectFilter] =
    useState("All Projects");

  /* ===================================================
     ADD FORM
  =================================================== */

  const [newLeadForm, setNewLeadForm] =
    useState(DEFAULT_FORM);

  const [savingLead, setSavingLead] =
    useState(false);

  /* ===================================================
     UPDATE
  =================================================== */

  const [updatingLead, setUpdatingLead] =
    useState(false);

  /* ===================================================
     DELETE
  =================================================== */

  const [deletingLead, setDeletingLead] =
    useState(false);

  /* ===================================================
     SOURCE ICON
  =================================================== */

  const renderSourceIcon = (iconType) => {
    switch (iconType) {
      case "facebook":
        return (
          <FaFacebook
            style={{
              color: "#1877F2",
            }}
          />
        );

      case "google":
        return (
          <FaGoogle
            style={{
              color: "#EA4335",
            }}
          />
        );

      case "instagram":
        return (
          <FiInstagram
            style={{
              color: "#E4405F",
            }}
          />
        );

      case "website":
        return (
          <FiGlobe
            style={{
              color: "#0284C7",
            }}
          />
        );

      case "referral":
        return (
          <FiShare2
            style={{
              color: "#059669",
            }}
          />
        );

      default:
        return (
          <FiGlobe
            style={{
              color: "#6B7280",
            }}
          />
        );
    }
  };

  /* ===================================================
     SOURCE ICON TYPE
  =================================================== */

  const getSourceIcon = (source) => {
    if (!source) {
      return "website";
    }

    const value =
      String(source).toLowerCase();

    if (value.includes("facebook")) {
      return "facebook";
    }

    if (value.includes("google")) {
      return "google";
    }

    if (value.includes("instagram")) {
      return "instagram";
    }

    if (value.includes("referral")) {
      return "referral";
    }

    return "website";
  };

  /* ===================================================
     STATUS CLASS
  =================================================== */

  const getStatusClass = (status) => {
    if (!status) {
      return "status-new";
    }

    const value =
      String(status)
        .toLowerCase()
        .replace(/\s+/g, "");

    switch (value) {
      case "new":
        return "status-new";

      case "followup":
        return "status-followup";

      case "sitevisit":
        return "status-sitevisit";

      case "converted":
        return "status-converted";

      case "lostlead":
      case "lost":
        return "status-lost";

      default:
        return "status-new";
    }
  };

  /* ===================================================
     FOLLOW UP CLASS
  =================================================== */

  const getFollowUpClass = (date) => {
    if (!date) {
      return "followup-date";
    }

    const today =
      new Date();

    const selectedDate =
      new Date(date);

    if (
      selectedDate.toDateString() ===
      today.toDateString()
    ) {
      return "followup-today";
    }

    const tomorrow =
      new Date(today);

    tomorrow.setDate(
      today.getDate() + 1
    );

    if (
      selectedDate.toDateString() ===
      tomorrow.toDateString()
    ) {
      return "followup-tomorrow";
    }

    return "followup-date";
  };

  /* ===================================================
     FORMAT FOLLOW UP DATE
  =================================================== */

  const formatFollowUp = (date) => {
    if (!date) {
      return "Not scheduled";
    }

    const parsed =
      new Date(date);

    if (
      Number.isNaN(
        parsed.getTime()
      )
    ) {
      return date;
    }

    return parsed.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  /* ===================================================
     FORMAT CREATED DATE
  =================================================== */

  const formatCreatedDate = (
    date
  ) => {
    if (!date) {
      return "";
    }

    const parsed =
      new Date(date);

    if (
      Number.isNaN(
        parsed.getTime()
      )
    ) {
      return "";
    }

    return parsed.toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  /* ===================================================
     CREATE AVATAR
  =================================================== */

  const createAvatar = (name) => {
    if (!name) {
      return "LD";
    }

    return name
      .trim()
      .split(" ")
      .map(
        (item) =>
          item[0]
      )
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  /* ===================================================
     FORMAT LEAD
  =================================================== */

  const formatLead = (lead) => {
    const name =
      lead.fullName ||
      lead.name ||
      "Unknown Lead";

    const status =
      lead.status ||
      "New";

    const source =
      lead.source ||
      "Website";

    const mobile =
      lead.mobile ||
      lead.phone ||
      "";

    const budgetRange =
      lead.budgetRange ||
      "";

    const project =
      lead.project ||
      "";

    const followUpDate =
      lead.followUpDate ||
      "";

    return {
      ...lead,

      id:
        lead._id ||
        lead.id,

      _id:
        lead._id ||
        lead.id,

      name,

      fullName: name,

      avatar:
        lead.avatar ||
        createAvatar(name),

      avatarColor:
        lead.avatarColor ||
        "#e0e7ff",

      textColor:
        lead.textColor ||
        "#3730a3",

      phone: mobile,

      mobile,

      email:
        lead.email ||
        "",

      location:
        lead.location ||
        "",

      interestedIn:
        lead.interestedIn ||
        "Not specified",

      project,

      budget:
        budgetRange
          ? `₹${budgetRange}`
          : "Not specified",

      budgetRange,

      source,

      sourceIcon:
        getSourceIcon(source),

      agent:
        lead.agent ||
        "Unassigned",

      agentAvatar:
        lead.agentAvatar ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",

      status,

      statusClass:
        getStatusClass(status),

      followUp:
        formatFollowUp(
          followUpDate
        ),

      followUpDate,

      followUpClass:
        getFollowUpClass(
          followUpDate
        ),

      score:
        Number(lead.score) || 0,

      priority:
        lead.priority ||
        "Medium",

      notes:
        lead.notes ||
        "",

      createdOn:
        formatCreatedDate(
          lead.createdAt
        ),
    };
  };

  /* ===================================================
     FETCH LEADS
  =================================================== */

  const fetchLeads = async () => {
    try {
      setLoadingLeads(true);
      setLeadError("");

      const response =
        await API.get(
          "/leads",
          {
            params: {
              search:
                searchQuery.trim(),

              status:
                statusFilter,

              source:
                sourceFilter,

              agent:
                agentFilter,

              page: 1,

              limit: 1000,
            },
          }
        );

      console.log(
        "LEADS RESPONSE:",
        response.data
      );

      const backendLeads =
        response.data?.leads ||
        response.data?.data ||
        [];

      const formattedLeads =
        Array.isArray(
          backendLeads
        )
          ? backendLeads.map(
              formatLead
            )
          : [];

      setLeads(
        formattedLeads
      );

      setSelectedLeads([]);

      /*
       * If currently selected lead
       * exists, refresh its data too.
       */
      if (selectedLead?.id) {
        const updatedSelected =
          formattedLeads.find(
            (item) =>
              item.id ===
              selectedLead.id
          );

        if (updatedSelected) {
          setSelectedLead(
            updatedSelected
          );
        }
      }

      /*
       * Keep page valid
       */
      const newTotalPages =
        Math.ceil(
          formattedLeads.length /
            itemsPerPage
        ) || 1;

      if (
        currentPage >
        newTotalPages
      ) {
        setCurrentPage(
          newTotalPages
        );
      }
    } catch (error) {
      console.error(
        "FETCH LEADS ERROR:",
        error.response?.data ||
          error
      );

      setLeadError(
        error.response?.data
          ?.message ||
          "Failed to load leads"
      );

      setLeads([]);
    } finally {
      setLoadingLeads(false);
    }
  };

  /* ===================================================
     INITIAL FETCH
  =================================================== */

  useEffect(() => {
    fetchLeads();
  }, []);

  /* ===================================================
     SEARCH / FILTER FETCH
  =================================================== */

  useEffect(() => {
    const timer =
      setTimeout(() => {
        fetchLeads();
      }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [
    searchQuery,
    statusFilter,
    sourceFilter,
    agentFilter,
  ]);

  /* ===================================================
     RESET PAGE WHEN FILTER CHANGES
  =================================================== */

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    statusFilter,
    sourceFilter,
    agentFilter,
    projectFilter,
  ]);

  /* ===================================================
     STATUS TAB FILTER
  =================================================== */

  const filteredLeads =
    useMemo(() => {
      return leads.filter(
        (item) => {
          /*
           * STATUS TAB
           */

          if (
            activeTab ===
            "New Leads"
          ) {
            if (
              item.status !==
              "New"
            ) {
              return false;
            }
          }

          if (
            activeTab ===
            "Follow Ups"
          ) {
            if (
              item.status !==
              "Follow Up"
            ) {
              return false;
            }
          }

          if (
            activeTab ===
            "Site Visits"
          ) {
            if (
              item.status !==
              "Site Visit"
            ) {
              return false;
            }
          }

          if (
            activeTab ===
            "Converted"
          ) {
            if (
              item.status !==
              "Converted"
            ) {
              return false;
            }
          }

          if (
            activeTab ===
            "Lost Leads"
          ) {
            if (
              item.status !==
                "Lost Lead" &&
              item.status !==
                "Lost"
            ) {
              return false;
            }
          }

          /*
           * PROJECT FILTER
           */

          if (
            projectFilter !==
              "All Projects" &&
            item.project !==
              projectFilter
          ) {
            return false;
          }

          return true;
        }
      );
    }, [
      leads,
      activeTab,
      projectFilter,
    ]);

  /* ===================================================
     SELECT ALL
  =================================================== */

  const handleSelectAll = (
    e
  ) => {
    if (e.target.checked) {
      setSelectedLeads(
        filteredLeads.map(
          (lead) =>
            lead.id
        )
      );
    } else {
      setSelectedLeads([]);
    }
  };

  /* ===================================================
     SELECT ONE
  =================================================== */

  const handleSelectOne = (
    id
  ) => {
    setSelectedLeads(
      (previous) => {
        if (
          previous.includes(id)
        ) {
          return previous.filter(
            (item) =>
              item !== id
          );
        }

        return [
          ...previous,
          id,
        ];
      }
    );
  };

  /* ===================================================
     ADD LEAD
  =================================================== */

  const handleAddLeadSubmit =
    async (e) => {
      e.preventDefault();

      if (savingLead) {
        return;
      }

      try {
        setSavingLead(true);

        const fullName =
          newLeadForm.fullName.trim();

        const mobile =
          newLeadForm.mobile.replace(
            /\D/g,
            ""
          );

        if (!fullName) {
          alert(
            "Full name is required"
          );

          return;
        }

        if (!mobile) {
          alert(
            "Mobile number is required"
          );

          return;
        }

        if (
          mobile.length !== 10
        ) {
          alert(
            "Please enter a valid 10 digit mobile number"
          );

          return;
        }

        const payload = {
          fullName,

          mobile,

          email:
            newLeadForm.email.trim(),

          source:
            newLeadForm.source !==
            "Select source"
              ? newLeadForm.source
              : "Website",

          interestedIn:
            newLeadForm.interestedIn !==
            "Select property"
              ? newLeadForm.interestedIn
              : "",

          budgetRange:
            newLeadForm.budgetRange !==
            "Select budget range"
              ? newLeadForm.budgetRange
              : "",

          location:
            newLeadForm.location.trim(),

          agent:
            newLeadForm.agent !==
            "Select agent"
              ? newLeadForm.agent
              : "",

          status:
            newLeadForm.status ||
            "New",

          priority:
            newLeadForm.priority ||
            "Medium",

          followUpDate:
            newLeadForm.followUpDate ||
            "",

          notes:
            newLeadForm.notes.trim(),

          project: "",

          score: 0,
        };

        console.log(
          "CREATE LEAD:",
          payload
        );

        const response =
          await API.post(
            "/leads",
            payload
          );

        console.log(
          "CREATE LEAD RESPONSE:",
          response.data
        );

        if (
          response.data?.success
        ) {
          setIsAddLeadModalOpen(
            false
          );

          setNewLeadForm(
            DEFAULT_FORM
          );

          await fetchLeads();

          /*
           * Select newly created lead
           */
          const created =
            response.data?.lead;

          if (created) {
            setSelectedLead(
              formatLead(
                created
              )
            );
          }

          alert(
            "Lead added successfully"
          );
        } else {
          alert(
            response.data?.message ||
              "Failed to create lead"
          );
        }
      } catch (error) {
        console.error(
          "CREATE LEAD ERROR:",
          error.response?.data ||
            error
        );

        alert(
          error.response?.data
            ?.message ||
            "Failed to create lead"
        );
      } finally {
        setSavingLead(false);
      }
    };

  /* ===================================================
     UPDATE LEAD
  =================================================== */

  const updateLead = async (
    leadId,
    changes
  ) => {
    if (!leadId) {
      return;
    }

    try {
      setUpdatingLead(true);

      const response =
        await API.put(
          `/leads/${leadId}`,
          changes
        );

      console.log(
        "UPDATE LEAD RESPONSE:",
        response.data
      );

      if (
        response.data?.success
      ) {
        const updated =
          formatLead(
            response.data.lead
          );

        setLeads(
          (previous) =>
            previous.map(
              (lead) =>
                lead.id ===
                leadId
                  ? updated
                  : lead
            )
        );

        setSelectedLead(
          updated
        );

        setActiveActionMenu(
          null
        );

        return updated;
      }

      alert(
        response.data?.message ||
          "Failed to update lead"
      );
    } catch (error) {
      console.error(
        "UPDATE LEAD ERROR:",
        error.response?.data ||
          error
      );

      alert(
        error.response?.data
          ?.message ||
          "Failed to update lead"
      );
    } finally {
      setUpdatingLead(false);
    }
  };

  /* ===================================================
     UPDATE STATUS
  =================================================== */

  const handleStatusChange = async (
    status
  ) => {
    if (!selectedLead?.id) {
      return;
    }

    await updateLead(
      selectedLead.id,
      {
        status,
      }
    );
  };

  /* ===================================================
     UPDATE PRIORITY
  =================================================== */

  const handlePriorityChange =
    async (priority) => {
      if (!selectedLead?.id) {
        return;
      }

      await updateLead(
        selectedLead.id,
        {
          priority,
        }
      );
    };

  /* ===================================================
     DELETE LEAD
  =================================================== */

  const handleDeleteLead = async (
    lead
  ) => {
    if (!lead?.id) {
      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to delete ${lead.name}?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingLead(true);

      const response =
        await API.delete(
          `/leads/${lead.id}`
        );

      console.log(
        "DELETE LEAD RESPONSE:",
        response.data
      );

      if (
        response.data?.success
      ) {
        setLeads(
          (previous) =>
            previous.filter(
              (item) =>
                item.id !==
                lead.id
            )
        );

        setSelectedLeads(
          (previous) =>
            previous.filter(
              (id) =>
                id !== lead.id
            )
        );

        setSelectedLead(
          null
        );

        setActiveActionMenu(
          null
        );

        alert(
          "Lead deleted successfully"
        );
      }
    } catch (error) {
      console.error(
        "DELETE LEAD ERROR:",
        error.response?.data ||
          error
      );

      alert(
        error.response?.data
          ?.message ||
          "Failed to delete lead"
      );
    } finally {
      setDeletingLead(false);
    }
  };

  /* ===================================================
     REFRESH
  =================================================== */

  const handleRefresh = () => {
    fetchLeads();
  };

  /* ===================================================
     PAGINATION
  =================================================== */

  const totalLeads =
    filteredLeads.length;

  const totalPages =
    Math.ceil(
      totalLeads /
        itemsPerPage
    ) || 1;

  const indexOfLastItem =
    currentPage *
    itemsPerPage;

  const indexOfFirstItem =
    indexOfLastItem -
    itemsPerPage;

  const currentLeads =
    filteredLeads.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

  /* ===================================================
     STATS
  =================================================== */

  const totalCount =
    leads.length;

  const newCount =
    leads.filter(
      (lead) =>
        lead.status ===
        "New"
    ).length;

  const followUpCount =
    leads.filter(
      (lead) =>
        lead.status ===
        "Follow Up"
    ).length;

  const siteVisitCount =
    leads.filter(
      (lead) =>
        lead.status ===
        "Site Visit"
    ).length;

  const convertedCount =
    leads.filter(
      (lead) =>
        lead.status ===
        "Converted"
    ).length;

  const lostCount =
    leads.filter(
      (lead) =>
        lead.status ===
          "Lost Lead" ||
        lead.status === "Lost"
    ).length;

  /* ===================================================
     DETAILS TABS
  =================================================== */

  const detailsTabs = [
    {
      key: "Overview",
      icon: <FiFileText />,
    },
    {
      key: "Activity",
      icon: <FiActivity />,
    },
    {
      key: "Notes",
      icon: <FiFolder />,
    },
    {
      key: "Documents",
      icon: <FiFileText />,
    },
    {
      key: "More",
      icon: <FiMoreHorizontal />,
    },
  ];

  /* ===================================================
     RENDER
  =================================================== */

  return (
    <div className="leadmanagement-page">

      {/* =================================================
          TOP APP HEADER
      ================================================= */}

      <div className="leadmanagement-topbar">

        <div className="leadmanagement-topbar-left">

          <button
            className="leadmanagement-mobile-menu-btn"
            aria-label="Menu"
          >
            <FiMenu />
          </button>

          <div>
            <h1 className="leadmanagement-page-title">
              Leads Management
            </h1>

            <div className="leadmanagement-breadcrumb">
              <span>
                Dashboard
              </span>

              <FiChevronRight
                size={12}
              />

              <span>
                Leads
              </span>

              <FiChevronRight
                size={12}
              />

              <span className="crumb-active">
                All Leads
              </span>
            </div>
          </div>
        </div>

        {/* SEARCH */}

        <div
          className={`leadmanagement-topbar-search ${
            isMobileSearchOpen
              ? "search-open"
              : ""
          }`}
        >
          <FiSearch />

          <input
            type="text"
            placeholder="Search leads by name, phone, email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(
                e.target.value
              );
            }}
          />

          <span className="leadmanagement-search-kbd">
            ⌘K
          </span>
        </div>

        {/* RIGHT HEADER */}

        <div className="leadmanagement-topbar-right">

          <button
            className="leadmanagement-topbar-icon-btn leadmanagement-mobile-search-btn"
            aria-label="Search"
            onClick={() =>
              setIsMobileSearchOpen(
                (value) =>
                  !value
              )
            }
          >
            <FiSearch />
          </button>

          <button
            className="leadmanagement-topbar-add-btn"
            onClick={() =>
              setIsAddLeadModalOpen(
                true
              )
            }
            aria-label="Add Lead"
          >
            <FiPlus />
          </button>

          {/* <button className="leadmanagement-topbar-icon-btn">
            <FiBell />

            <span className="leadmanagement-notif-dot">
              12
            </span>
          </button>

          <button className="leadmanagement-topbar-icon-btn">
            <FiMail />

            <span className="leadmanagement-notif-dot dot-blue">
              5
            </span>
          </button> */}

          {/* <div className="leadmanagement-topbar-profile">

            <img
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=100"
              alt="Admin User"
              className="leadmanagement-profile-img"
            />

            <div className="leadmanagement-profile-text">
              <span className="leadmanagement-profile-name-sm">
                Admin User
              </span>

              <span className="leadmanagement-profile-role">
                Super Admin
              </span>
            </div>

            <FiChevronDown className="leadmanagement-profile-caret" />
          </div> */}
        </div>
      </div>

      {/* =================================================
          CONTAINER
      ================================================= */}

      <div className="leadmanagement-container">

        {/* =================================================
            STAT CARDS
        ================================================= */}

        <div className="leadmanagement-stats-grid">

          {/* TOTAL */}

          <div className="leadmanagement-stat-card">

            <div className="leadmanagement-stat-icon icon-blue">
              <FiUsers />
            </div>

            <div className="leadmanagement-stat-content">

              <div className="leadmanagement-stat-title">
                Total Leads
              </div>

              <div className="leadmanagement-stat-value-container">

                <span className="leadmanagement-stat-value">
                  {totalCount}
                </span>

              </div>

              <div className="leadmanagement-stat-sub">
                Current database
              </div>
            </div>
          </div>

          {/* NEW */}

          <div className="leadmanagement-stat-card">

            <div className="leadmanagement-stat-icon icon-orange">
              <FiUserPlus />
            </div>

            <div className="leadmanagement-stat-content">

              <div className="leadmanagement-stat-title">
                New Leads
              </div>

              <div className="leadmanagement-stat-value-container">

                <span className="leadmanagement-stat-value">
                  {newCount}
                </span>

              </div>

              <div className="leadmanagement-stat-sub">
                Current database
              </div>
            </div>
          </div>

          {/* FOLLOW UPS */}

          <div className="leadmanagement-stat-card">

            <div className="leadmanagement-stat-icon icon-purple">
              <FiClock />
            </div>

            <div className="leadmanagement-stat-content">

              <div className="leadmanagement-stat-title">
                Follow Ups
              </div>

              <div className="leadmanagement-stat-value-container">

                <span className="leadmanagement-stat-value">
                  {followUpCount}
                </span>

              </div>

              <div className="leadmanagement-stat-sub">
                Current database
              </div>
            </div>
          </div>

          {/* SITE VISITS */}

          <div className="leadmanagement-stat-card">

            <div className="leadmanagement-stat-icon icon-teal">
              <FiMapPin />
            </div>

            <div className="leadmanagement-stat-content">

              <div className="leadmanagement-stat-title">
                Site Visits
              </div>

              <div className="leadmanagement-stat-value-container">

                <span className="leadmanagement-stat-value">
                  {siteVisitCount}
                </span>

              </div>

              <div className="leadmanagement-stat-sub">
                Current database
              </div>
            </div>
          </div>

          {/* CONVERTED */}

          <div className="leadmanagement-stat-card">

            <div className="leadmanagement-stat-icon icon-green">
              <FiCheckCircle />
            </div>

            <div className="leadmanagement-stat-content">

              <div className="leadmanagement-stat-title">
                Converted
              </div>

              <div className="leadmanagement-stat-value-container">

                <span className="leadmanagement-stat-value">
                  {convertedCount}
                </span>

              </div>

              <div className="leadmanagement-stat-sub">
                Current database
              </div>
            </div>
          </div>

          {/* LOST */}

          <div className="leadmanagement-stat-card">

            <div className="leadmanagement-stat-icon icon-pink">
              <FiXCircle />
            </div>

            <div className="leadmanagement-stat-content">

              <div className="leadmanagement-stat-title">
                Lost Leads
              </div>

              <div className="leadmanagement-stat-value-container">

                <span className="leadmanagement-stat-value">
                  {lostCount}
                </span>

              </div>

              <div className="leadmanagement-stat-sub">
                Current database
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            FILTERS
        ================================================= */}

        <div className="leadmanagement-filters-bar">

          <div
            className={`leadmanagement-filter-inputs ${
              isMobileFiltersOpen
                ? "filters-open"
                : ""
            }`}
          >

            <div className="leadmanagement-date-picker-btn">

              <FiCalendar className="leadmanagement-calendar-icon" />

              <span>
                All Leads
              </span>
            </div>

            {/* STATUS */}

            <select
              className="leadmanagement-select-filter"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
            >
              <option>
                All Status
              </option>

              <option>
                New
              </option>

              <option>
                Follow Up
              </option>

              <option>
                Site Visit
              </option>

              <option>
                Converted
              </option>

              <option>
                Lost Lead
              </option>
            </select>

            {/* SOURCE */}

            <select
              className="leadmanagement-select-filter"
              value={sourceFilter}
              onChange={(e) =>
                setSourceFilter(
                  e.target.value
                )
              }
            >
              <option>
                All Sources
              </option>

              <option>
                Facebook
              </option>

              <option>
                Website
              </option>

              <option>
                Google Ads
              </option>

              <option>
                Instagram
              </option>

              <option>
                Referral
              </option>
            </select>

            {/* AGENT */}

            <select
              className="leadmanagement-select-filter"
              value={agentFilter}
              onChange={(e) =>
                setAgentFilter(
                  e.target.value
                )
              }
            >
              <option>
                All Agents
              </option>

              <option>
                Aman Verma
              </option>

              <option>
                Rohit Singh
              </option>

              <option>
                Ankit Patel
              </option>

              <option>
                Neha Joshi
              </option>
            </select>

            {/* PROJECT */}

            <select
              className="leadmanagement-select-filter"
              value={projectFilter}
              onChange={(e) =>
                setProjectFilter(
                  e.target.value
                )
              }
            >
              <option>
                All Projects
              </option>

              {[
                ...new Set(
                  leads
                    .map(
                      (lead) =>
                        lead.project
                    )
                    .filter(Boolean)
                ),
              ].map(
                (project) => (
                  <option
                    key={project}
                    value={project}
                  >
                    {project}
                  </option>
                )
              )}
            </select>

            <button
              className="leadmanagement-more-filters-btn"
              onClick={
                handleRefresh
              }
            >
              Refresh{" "}
              <FiRefreshCw />
            </button>
          </div>

          <div className="leadmanagement-filter-actions">

            <button
              className="leadmanagement-mobile-filter-toggle"
              onClick={() =>
                setIsMobileFiltersOpen(
                  (value) =>
                    !value
                )
              }
            >
              <FiSliders /> Filters
            </button>

            <button
              className="leadmanagement-add-lead-btn"
              onClick={() =>
                setIsAddLeadModalOpen(
                  true
                )
              }
            >
              <FiPlus /> Add Lead
            </button>
          </div>
        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {leadError && (
          <div
            style={{
              padding:
                "12px 16px",
              marginBottom:
                "12px",
              borderRadius:
                "8px",
              background:
                "#fee2e2",
              color:
                "#991b1b",
            }}
          >
            {leadError}
          </div>
        )}

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="leadmanagement-main-layout">

          {/* =================================================
              LEFT PANEL
          ================================================= */}

          <div
            className={`leadmanagement-left-panel ${
              selectedLead
                ? "panel-split"
                : "panel-full"
            }`}
          >

            {/* TAB HEADER */}

            <div className="leadmanagement-tab-header">

              <div className="leadmanagement-status-tabs">

                {[
                  "All Leads",
                  "New Leads",
                  "Follow Ups",
                  "Site Visits",
                  "Converted",
                  "Lost Leads",
                ].map(
                  (tab) => (
                    <button
                      key={tab}
                      className={`leadmanagement-status-tab-btn ${
                        activeTab ===
                        tab
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {
                        setActiveTab(
                          tab
                        );

                        setCurrentPage(
                          1
                        );
                      }}
                    >
                      {tab}
                    </button>
                  )
                )}
              </div>

              <div className="leadmanagement-table-actions-right">

                <button
                  className="leadmanagement-icon-action-btn leadmanagement-export-btn"
                  onClick={() => {
                    const data =
                      JSON.stringify(
                        leads,
                        null,
                        2
                      );

                    const blob =
                      new Blob(
                        [data],
                        {
                          type: "application/json",
                        }
                      );

                    const url =
                      URL.createObjectURL(
                        blob
                      );

                    const link =
                      document.createElement(
                        "a"
                      );

                    link.href =
                      url;

                    link.download =
                      "leads.json";

                    link.click();

                    URL.revokeObjectURL(
                      url
                    );
                  }}
                >
                  <FiDownload />
                  <span className="btn-label">
                    Export
                  </span>
                </button>

                <button className="leadmanagement-icon-action-btn">
                  <FiGrid />
                </button>

                <button className="leadmanagement-icon-action-btn">
                  <FiSliders />
                </button>

                <button className="leadmanagement-icon-action-btn">
                  <FiColumns />
                </button>

                <button className="leadmanagement-icon-action-btn">
                  <FiSettings />
                </button>
              </div>
            </div>

            {/* =================================================
                TABLE
            ================================================= */}

            <div className="leadmanagement-table-wrapper">

              <table className="leadmanagement-table">

                <thead>
                  <tr>

                    <th
                      style={{
                        width: "38px",
                      }}
                    >
                      <input
                        type="checkbox"
                        className="leadmanagement-checkbox"
                        onChange={
                          handleSelectAll
                        }
                        checked={
                          selectedLeads.length ===
                            filteredLeads.length &&
                          filteredLeads.length >
                            0
                        }
                      />
                    </th>

                    <th>
                      Lead Details
                    </th>

                    <th>
                      Contact
                    </th>

                    <th>
                      Interested In
                    </th>

                    <th>
                      Budget
                    </th>

                    <th>
                      Source
                    </th>

                    <th>
                      Agent
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Follow Up
                    </th>

                    <th>
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {loadingLeads ? (
                    <tr>
                      <td
                        colSpan="10"
                        style={{
                          textAlign:
                            "center",
                          padding:
                            "50px",
                        }}
                      >
                        Loading leads...
                      </td>
                    </tr>
                  ) : currentLeads.length ===
                    0 ? (
                    <tr>
                      <td
                        colSpan="10"
                        style={{
                          textAlign:
                            "center",
                          padding:
                            "50px",
                        }}
                      >
                        No leads found
                      </td>
                    </tr>
                  ) : (
                    currentLeads.map(
                      (lead) => {
                        const isSelected =
                          selectedLead &&
                          selectedLead.id ===
                            lead.id;

                        return (
                          <tr
                            key={
                              lead.id
                            }
                            className={`leadmanagement-table-row ${
                              isSelected
                                ? "row-active"
                                : ""
                            }`}
                            onClick={() =>
                              setSelectedLead(
                                lead
                              )
                            }
                          >

                            {/* CHECKBOX */}

                            <td
                              className="cell-checkbox"
                              data-label=""
                              onClick={(e) =>
                                e.stopPropagation()
                              }
                            >
                              <input
                                type="checkbox"
                                className="leadmanagement-checkbox"
                                checked={selectedLeads.includes(
                                  lead.id
                                )}
                                onChange={() =>
                                  handleSelectOne(
                                    lead.id
                                  )
                                }
                              />
                            </td>

                            {/* LEAD */}

                            <td
                              className="cell-lead-details"
                              data-label="Lead Details"
                            >
                              <div className="leadmanagement-lead-cell">

                                <div
                                  className="leadmanagement-avatar"
                                  style={{
                                    backgroundColor:
                                      lead.avatarColor,
                                    color:
                                      lead.textColor,
                                  }}
                                >
                                  {
                                    lead.avatar
                                  }
                                </div>

                                <div className="leadmanagement-lead-info">

                                  <span className="leadmanagement-lead-name">
                                    {
                                      lead.name
                                    }
                                  </span>

                                  <span className="leadmanagement-lead-id">
                                    {
                                      lead.id
                                    }
                                  </span>

                                </div>
                              </div>
                            </td>

                            {/* CONTACT */}

                            <td data-label="Contact">

                              <div className="leadmanagement-contact-cell">

                                <span className="leadmanagement-phone-text">
                                  {
                                    lead.phone
                                  }
                                </span>

                                <span className="leadmanagement-email-text">
                                  {
                                    lead.email ||
                                    "-"
                                  }
                                </span>

                              </div>

                            </td>

                            {/* INTEREST */}

                            <td data-label="Interested In">

                              <div className="leadmanagement-interest-cell">

                                <span className="leadmanagement-property-text">
                                  {
                                    lead.interestedIn
                                  }
                                </span>

                                <span className="leadmanagement-project-text">
                                  {
                                    lead.project ||
                                    "-"
                                  }
                                </span>

                              </div>

                            </td>

                            {/* BUDGET */}

                            <td data-label="Budget">

                              <div className="leadmanagement-budget-cell">

                                <span className="leadmanagement-budget-main">
                                  {
                                    lead.budget
                                  }
                                </span>

                                <span className="leadmanagement-budget-range">
                                  {
                                    lead.budgetRange ||
                                    "-"
                                  }
                                </span>

                              </div>

                            </td>

                            {/* SOURCE */}

                            <td data-label="Source">

                              <div className="leadmanagement-source-cell">

                                <span className="leadmanagement-source-icon-wrap">
                                  {renderSourceIcon(
                                    lead.sourceIcon
                                  )}
                                </span>

                                <span>
                                  {
                                    lead.source
                                  }
                                </span>

                              </div>

                            </td>

                            {/* AGENT */}

                            <td data-label="Agent">

                              <div className="leadmanagement-agent-cell">

                                <img
                                  src={
                                    lead.agentAvatar
                                  }
                                  alt={
                                    lead.agent
                                  }
                                  className="leadmanagement-agent-img"
                                />

                                <span>
                                  {
                                    lead.agent
                                  }
                                </span>

                              </div>

                            </td>

                            {/* STATUS */}

                            <td data-label="Status">

                              <span
                                className={`leadmanagement-status-badge ${lead.statusClass}`}
                              >
                                {
                                  lead.status
                                }
                              </span>

                            </td>

                            {/* FOLLOW UP */}

                            <td data-label="Follow Up">

                              <div
                                className={`leadmanagement-followup-text ${lead.followUpClass}`}
                              >
                                {
                                  lead.followUp
                                }
                              </div>

                            </td>

                            {/* ACTIONS */}

                            <td
                              className="cell-actions"
                              data-label="Actions"
                              onClick={(e) =>
                                e.stopPropagation()
                              }
                            >

                              <div className="leadmanagement-actions-cell">

                                <button
                                  className="leadmanagement-action-btn icon-call"
                                  onClick={() =>
                                    window.open(
                                      `tel:${lead.phone}`
                                    )
                                  }
                                >
                                  <FiPhone />
                                </button>

                                <button
                                  className="leadmanagement-action-btn icon-chat"
                                  onClick={() =>
                                    window.open(
                                      `https://wa.me/91${lead.phone}`
                                    )
                                  }
                                >
                                  <FiMessageSquare />
                                </button>

                                <div className="leadmanagement-more-popover-container">

                                  <button
                                    className="leadmanagement-action-btn icon-more"
                                    onClick={() =>
                                      setActiveActionMenu(
                                        activeActionMenu ===
                                          lead.id
                                          ? null
                                          : lead.id
                                      )
                                    }
                                  >
                                    <FiMoreVertical />
                                  </button>

                                  {activeActionMenu ===
                                    lead.id && (
                                    <div className="leadmanagement-action-dropdown">

                                      <button
                                        onClick={() => {
                                          window.open(
                                            `tel:${lead.phone}`
                                          );

                                          setActiveActionMenu(
                                            null
                                          );
                                        }}
                                      >
                                        <FiPhone />
                                        Call Lead
                                      </button>

                                      <button
                                        onClick={() => {
                                          window.open(
                                            `https://wa.me/91${lead.phone}`
                                          );

                                          setActiveActionMenu(
                                            null
                                          );
                                        }}
                                      >
                                        <FiMessageSquare />
                                        WhatsApp
                                      </button>

                                      <button
                                        onClick={() => {
                                          window.open(
                                            `mailto:${lead.email}`
                                          );

                                          setActiveActionMenu(
                                            null
                                          );
                                        }}
                                      >
                                        <FiMail />
                                        Send Email
                                      </button>

                                      <button
                                        onClick={() => {
                                          setSelectedLead(
                                            lead
                                          );

                                          setActiveActionMenu(
                                            null
                                          );
                                        }}
                                      >
                                        <FiEdit />
                                        Edit Lead
                                      </button>

                                      <button
                                        onClick={() =>
                                          handleDeleteLead(
                                            lead
                                          )
                                        }
                                      >
                                        <FiTrash2 />
                                        Delete Lead
                                      </button>

                                    </div>
                                  )}

                                </div>
                              </div>
                            </td>

                          </tr>
                        );
                      }
                    )
                  )}

                </tbody>
              </table>
            </div>

            {/* =================================================
                PAGINATION
            ================================================= */}

            <div className="leadmanagement-pagination-footer">

              <div className="leadmanagement-showing-text">
                Showing{" "}
                {totalLeads ===
                0
                  ? 0
                  : indexOfFirstItem +
                    1}{" "}
                to{" "}
                {Math.min(
                  indexOfLastItem,
                  totalLeads
                )}{" "}
                of{" "}
                {totalLeads}{" "}
                leads
              </div>

              <div className="leadmanagement-pagination-controls">

                <button
                  className="leadmanagement-page-nav-btn"
                  disabled={
                    currentPage ===
                    1
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) =>
                        page - 1
                    )
                  }
                >
                  &lt;
                </button>

                {[
                  ...Array(
                    totalPages
                  ),
                ].map(
                  (_, idx) => (
                    <button
                      key={idx}
                      className={`leadmanagement-page-num ${
                        currentPage ===
                        idx + 1
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setCurrentPage(
                          idx + 1
                        )
                      }
                    >
                      {idx + 1}
                    </button>
                  )
                )}

                <button
                  className="leadmanagement-page-nav-btn"
                  disabled={
                    currentPage ===
                      totalPages ||
                    totalPages ===
                      0
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) =>
                        page + 1
                    )
                  }
                >
                  &gt;
                </button>

                <select
                  className="leadmanagement-page-size-select"
                  value={
                    itemsPerPage
                  }
                  onChange={(e) => {
                    setItemsPerPage(
                      Number(
                        e.target
                          .value
                      )
                    );

                    setCurrentPage(
                      1
                    );
                  }}
                >
                  <option value={5}>
                    5 page
                  </option>

                  <option value={10}>
                    10 page
                  </option>

                  <option value={15}>
                    15 page
                  </option>

                  <option value={25}>
                    25 page
                  </option>
                </select>

              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT PANEL
          ================================================= */}

          {selectedLead && (
            <>
              <div
                className="leadmanagement-panel-backdrop"
                onClick={() =>
                  setSelectedLead(
                    null
                  )
                }
              />

              <div className="leadmanagement-right-panel open-anim">

                {/* HEADER */}

                <div className="leadmanagement-details-header">

                  <button
                    className="leadmanagement-mobile-back-btn"
                    onClick={() =>
                      setSelectedLead(
                        null
                      )
                    }
                  >
                    <FiArrowLeft />
                  </button>

                  <h3 className="leadmanagement-details-title">
                    Lead Details
                  </h3>

                  <div className="leadmanagement-details-header-actions">

                    <button
                      className="leadmanagement-close-btn"
                      onClick={() =>
                        setSelectedLead(
                          null
                        )
                      }
                    >
                      <FiMinimize2
                        style={{
                          marginRight:
                            "6px",
                        }}
                        className="desktop-only"
                      />

                      <FiX />
                    </button>

                  </div>
                </div>

                <div className="leadmanagement-details-content">

                  {/* PROFILE */}

                  <div className="leadmanagement-profile-summary">

                    <div
                      className="leadmanagement-avatar-large"
                      style={{
                        backgroundColor:
                          selectedLead.avatarColor,
                        color:
                          selectedLead.textColor,
                      }}
                    >
                      {
                        selectedLead.avatar
                      }
                    </div>

                    <div className="leadmanagement-profile-main-info">

                      <div className="leadmanagement-name-status-row">

                        <span className="leadmanagement-profile-name">
                          {
                            selectedLead.name
                          }
                        </span>

                        <span
                          className={`leadmanagement-mini-badge ${selectedLead.statusClass}`}
                        >
                          {
                            selectedLead.status
                          }
                        </span>
                      </div>

                      <div className="leadmanagement-id-score-row">

                        <span className="leadmanagement-profile-id">
                          Lead ID:{" "}
                          {
                            selectedLead.id
                          }
                        </span>

                        <span className="leadmanagement-score-badge">
                          Score:{" "}
                          {
                            selectedLead.score
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* DETAILS TABS */}

                  <div className="leadmanagement-details-tabs">

                    {detailsTabs.map(
                      ({
                        key,
                        icon,
                      }) => (
                        <button
                          key={key}
                          className={`leadmanagement-details-tab ${
                            activeTabDetails ===
                            key
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            setActiveTabDetails(
                              key
                            )
                          }
                        >
                          <span className="leadmanagement-details-tab-icon">
                            {icon}
                          </span>

                          <span className="leadmanagement-details-tab-label">
                            {key}
                          </span>
                        </button>
                      )
                    )}
                  </div>

                  {/* =================================================
                      OVERVIEW
                  ================================================= */}

                  {activeTabDetails ===
                    "Overview" && (
                    <>
                      {/* CONTACT INFO */}

                      <div className="leadmanagement-info-card">

                        <h4 className="leadmanagement-section-heading">
                          Contact Information
                        </h4>

                        <div className="leadmanagement-info-grid">

                          {/* PHONE */}

                          <div className="leadmanagement-info-row">

                            <span className="leadmanagement-label">
                              Phone
                            </span>

                            <div className="leadmanagement-value-with-icon">

                              <span>
                                {
                                  selectedLead.phone
                                }
                              </span>

                              <button
                                className="leadmanagement-mini-icon-btn"
                                onClick={() =>
                                  window.open(
                                    `tel:${selectedLead.phone}`
                                  )
                                }
                              >
                                <FiPhone />
                              </button>

                            </div>
                          </div>

                          {/* EMAIL */}

                          <div className="leadmanagement-info-row">

                            <span className="leadmanagement-label">
                              Email
                            </span>

                            <div className="leadmanagement-value-with-icon">

                              <span>
                                {
                                  selectedLead.email ||
                                  "-"
                                }
                              </span>

                              <button
                                className="leadmanagement-mini-icon-btn"
                                onClick={() =>
                                  window.open(
                                    `mailto:${selectedLead.email}`
                                  )
                                }
                              >
                                <FiMail />
                              </button>

                            </div>
                          </div>

                          {/* LOCATION */}

                          <div className="leadmanagement-info-row">

                            <span className="leadmanagement-label">
                              Location
                            </span>

                            <div className="leadmanagement-value-with-icon">

                              <span>
                                {
                                  selectedLead.location ||
                                  "-"
                                }
                              </span>

                              <button className="leadmanagement-mini-icon-btn">
                                <FiMapPin />
                              </button>

                            </div>
                          </div>

                        </div>
                      </div>

                      {/* LEAD INFO */}

                      <div className="leadmanagement-info-card">

                        <h4 className="leadmanagement-section-heading">
                          Lead Information
                        </h4>

                        <div className="leadmanagement-info-grid">

                          <div className="leadmanagement-info-row">
                            <span className="leadmanagement-label">
                              Interested In
                            </span>

                            <span className="leadmanagement-value-bold">
                              {
                                selectedLead.interestedIn
                              }
                            </span>
                          </div>

                          <div className="leadmanagement-info-row">
                            <span className="leadmanagement-label">
                              Project
                            </span>

                            <span className="leadmanagement-value-bold">
                              {
                                selectedLead.project ||
                                "-"
                              }
                            </span>
                          </div>

                          <div className="leadmanagement-info-row">
                            <span className="leadmanagement-label">
                              Budget
                            </span>

                            <span className="leadmanagement-value-bold">
                              {
                                selectedLead.budgetRange
                                  ? `₹${selectedLead.budgetRange}`
                                  : "-"
                              }
                            </span>
                          </div>

                          <div className="leadmanagement-info-row">
                            <span className="leadmanagement-label">
                              Source
                            </span>

                            <span className="leadmanagement-value-bold">
                              {
                                selectedLead.source
                              }
                            </span>
                          </div>

                          <div className="leadmanagement-info-row">
                            <span className="leadmanagement-label">
                              Assigned Agent
                            </span>

                            <span className="leadmanagement-value-bold">
                              {
                                selectedLead.agent
                              }
                            </span>
                          </div>

                          {/* STATUS */}

                          <div className="leadmanagement-info-row">

                            <span className="leadmanagement-label">
                              Status
                            </span>

                            <select
                              value={
                                selectedLead.status
                              }
                              onChange={(e) =>
                                handleStatusChange(
                                  e.target
                                    .value
                                )
                              }
                              disabled={
                                updatingLead
                              }
                              style={{
                                border:
                                  "none",
                                background:
                                  "transparent",
                                fontWeight:
                                  600,
                                cursor:
                                  "pointer",
                              }}
                            >
                              <option>
                                New
                              </option>

                              <option>
                                Follow Up
                              </option>

                              <option>
                                Site Visit
                              </option>

                              <option>
                                Converted
                              </option>

                              <option>
                                Lost Lead
                              </option>
                            </select>
                          </div>

                          {/* PRIORITY */}

                          <div className="leadmanagement-info-row">

                            <span className="leadmanagement-label">
                              Priority
                            </span>

                            <select
                              value={
                                selectedLead.priority
                              }
                              onChange={(e) =>
                                handlePriorityChange(
                                  e.target
                                    .value
                                )
                              }
                              disabled={
                                updatingLead
                              }
                              className={`leadmanagement-value-${
                                selectedLead.priority ===
                                "High"
                                  ? "red"
                                  : selectedLead.priority ===
                                    "Medium"
                                  ? "orange"
                                  : "bold"
                              }`}
                              style={{
                                border:
                                  "none",
                                background:
                                  "transparent",
                                fontWeight:
                                  600,
                                cursor:
                                  "pointer",
                              }}
                            >
                              <option>
                                Low
                              </option>

                              <option>
                                Medium
                              </option>

                              <option>
                                High
                              </option>
                            </select>
                          </div>

                          {/* CREATED */}

                          <div className="leadmanagement-info-row">

                            <span className="leadmanagement-label">
                              Created On
                            </span>

                            <span className="leadmanagement-value-bold">
                              {
                                selectedLead.createdOn ||
                                "-"
                              }
                            </span>
                          </div>

                        </div>
                      </div>

                      {/* NOTES */}

                      {selectedLead.notes && (
                        <div className="leadmanagement-info-card">

                          <h4 className="leadmanagement-section-heading">
                            Notes
                          </h4>

                          <p>
                            {
                              selectedLead.notes
                            }
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {/* =================================================
                      ACTIVITY
                  ================================================= */}

                  {activeTabDetails ===
                    "Activity" && (
                    <div className="leadmanagement-info-card">

                      <h4 className="leadmanagement-section-heading">
                        Lead Activity
                      </h4>

                      <p>
                        Lead created on{" "}
                        {
                          selectedLead.createdOn ||
                          "-"
                        }
                      </p>

                      <p>
                        Current status:{" "}
                        {
                          selectedLead.status
                        }
                      </p>

                      <p>
                        Follow up:{" "}
                        {
                          selectedLead.followUp
                        }
                      </p>

                    </div>
                  )}

                  {/* =================================================
                      NOTES
                  ================================================= */}

                  {activeTabDetails ===
                    "Notes" && (
                    <div className="leadmanagement-info-card">

                      <h4 className="leadmanagement-section-heading">
                        Lead Notes
                      </h4>

                      <p>
                        {
                          selectedLead.notes ||
                          "No notes available."
                        }
                      </p>

                    </div>
                  )}

                  {/* =================================================
                      DOCUMENTS
                  ================================================= */}

                  {activeTabDetails ===
                    "Documents" && (
                    <div className="leadmanagement-info-card">

                      <h4 className="leadmanagement-section-heading">
                        Documents
                      </h4>

                      <p>
                        No documents
                        uploaded.
                      </p>

                    </div>
                  )}

                  {/* =================================================
                      MORE
                  ================================================= */}

                  {activeTabDetails ===
                    "More" && (
                    <div className="leadmanagement-info-card">

                      <h4 className="leadmanagement-section-heading">
                        More Information
                      </h4>

                      <p>
                        Lead source:{" "}
                        {
                          selectedLead.source
                        }
                      </p>

                      <p>
                        Priority:{" "}
                        {
                          selectedLead.priority
                        }
                      </p>

                    </div>
                  )}

                  {/* =================================================
                      COMMUNICATION
                  ================================================= */}

                  <div className="leadmanagement-comm-buttons">

                    <button
                      className="leadmanagement-comm-btn comm-call"
                      onClick={() =>
                        window.open(
                          `tel:${selectedLead.phone}`
                        )
                      }
                    >
                      <FiPhone />
                      Call
                    </button>

                    <button
                      className="leadmanagement-comm-btn comm-whatsapp"
                      onClick={() =>
                        window.open(
                          `https://wa.me/91${selectedLead.phone}`
                        )
                      }
                    >
                      <FiMessageSquare />
                      WhatsApp
                    </button>

                    <button
                      className="leadmanagement-comm-btn comm-email"
                      onClick={() =>
                        window.open(
                          `mailto:${selectedLead.email}`
                        )
                      }
                    >
                      <FiMail />
                      Email
                    </button>

                  </div>

                  {/* =================================================
                      BOTTOM ACTIONS
                  ================================================= */}

                  <div className="leadmanagement-bottom-actions">

                    <div className="leadmanagement-btn-row-half">

                      <button
                        className="leadmanagement-secondary-action-btn action-purple"
                        onClick={() =>
                          alert(
                            "Schedule Visit feature can be connected next."
                          )
                        }
                      >
                        <FiCalendar />
                        Schedule Visit
                      </button>

                      <button
                        className="leadmanagement-secondary-action-btn action-orange"
                        onClick={() =>
                          alert(
                            "Assign Agent feature can be connected next."
                          )
                        }
                      >
                        <FiUser />
                        Assign Agent
                      </button>

                    </div>

                    <button
                      className="leadmanagement-primary-convert-btn"
                      disabled={
                        updatingLead ||
                        selectedLead.status ===
                          "Converted"
                      }
                      onClick={() =>
                        handleStatusChange(
                          "Converted"
                        )
                      }
                    >
                      <FiUserPlus />

                      {selectedLead.status ===
                      "Converted"
                        ? "Converted"
                        : "Convert to Customer"}
                    </button>

                    <button
                      className="leadmanagement-secondary-action-btn"
                      style={{
                        marginTop:
                          "8px",
                        color:
                          "#dc2626",
                      }}
                      disabled={
                        deletingLead
                      }
                      onClick={() =>
                        handleDeleteLead(
                          selectedLead
                        )
                      }
                    >
                      <FiTrash2 />

                      {deletingLead
                        ? "Deleting..."
                        : "Delete Lead"}
                    </button>

                  </div>

                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* =====================================================
          ADD LEAD MODAL
      ===================================================== */}

      {isAddLeadModalOpen && (
        <div
          className="leadmanagement-modal-backdrop"
          onClick={() =>
            setIsAddLeadModalOpen(
              false
            )
          }
        >

          <div
            className="leadmanagement-modal-card"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="leadmanagement-modal-header">

              <h3 className="leadmanagement-modal-title">
                Add Lead
              </h3>

              <button
                className="leadmanagement-modal-close-btn"
                onClick={() =>
                  setIsAddLeadModalOpen(
                    false
                  )
                }
              >
                <FiX />
              </button>

            </div>

            <form
              onSubmit={
                handleAddLeadSubmit
              }
              className="leadmanagement-modal-form"
            >

              {/* =================================================
                  NAME + MOBILE
              ================================================= */}

              <div className="leadmanagement-form-row">

                <div className="leadmanagement-form-group">

                  <label>
                    Full Name{" "}
                    <span className="required">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={
                      newLeadForm.fullName
                    }
                    onChange={(e) =>
                      setNewLeadForm(
                        {
                          ...newLeadForm,
                          fullName:
                            e.target
                              .value,
                        }
                      )
                    }
                    required
                  />

                </div>

                <div className="leadmanagement-form-group">

                  <label>
                    Mobile Number{" "}
                    <span className="required">
                      *
                    </span>
                  </label>

                  <div className="leadmanagement-phone-input-wrap">

                    <div className="leadmanagement-country-flag">

                      <span className="flag-code">
                        IN
                      </span>

                      <span className="dial-code">
                        +91
                      </span>

                    </div>

                    <input
                      type="text"
                      placeholder="9876543210"
                      maxLength={10}
                      value={
                        newLeadForm.mobile
                      }
                      onChange={(e) =>
                        setNewLeadForm(
                          {
                            ...newLeadForm,
                            mobile:
                              e.target.value.replace(
                                /\D/g,
                                ""
                              ),
                          }
                        )
                      }
                      required
                    />

                  </div>
                </div>
              </div>

              {/* =================================================
                  EMAIL + SOURCE
              ================================================= */}

              <div className="leadmanagement-form-row">

                <div className="leadmanagement-form-group">

                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={
                      newLeadForm.email
                    }
                    onChange={(e) =>
                      setNewLeadForm(
                        {
                          ...newLeadForm,
                          email:
                            e.target
                              .value,
                        }
                      )
                    }
                  />

                </div>

                <div className="leadmanagement-form-group">

                  <label>
                    Source
                  </label>

                  <select
                    value={
                      newLeadForm.source
                    }
                    onChange={(e) =>
                      setNewLeadForm(
                        {
                          ...newLeadForm,
                          source:
                            e.target
                              .value,
                        }
                      )
                    }
                  >
                    <option>
                      Select source
                    </option>

                    <option>
                      Facebook
                    </option>

                    <option>
                      Website
                    </option>

                    <option>
                      Google Ads
                    </option>

                    <option>
                      Instagram
                    </option>

                    <option>
                      Referral
                    </option>
                  </select>

                </div>
              </div>

              {/* =================================================
                  PROPERTY + BUDGET
              ================================================= */}

              <div className="leadmanagement-form-row">

                <div className="leadmanagement-form-group">

                  <label>
                    Interested In
                  </label>

                  <select
                    value={
                      newLeadForm.interestedIn
                    }
                    onChange={(e) =>
                      setNewLeadForm(
                        {
                          ...newLeadForm,
                          interestedIn:
                            e.target
                              .value,
                        }
                      )
                    }
                  >
                    <option>
                      Select property
                    </option>

                    <option>
                      2BHK Apartment
                    </option>

                    <option>
                      3BHK Apartment
                    </option>

                    <option>
                      4BHK Villa
                    </option>

                    <option>
                      Independent House
                    </option>

                    <option>
                      Plot
                    </option>

                    <option>
                      Commercial Property
                    </option>

                  </select>
                </div>

                <div className="leadmanagement-form-group">

                  <label>
                    Budget Range
                  </label>

                  <select
                    value={
                      newLeadForm.budgetRange
                    }
                    onChange={(e) =>
                      setNewLeadForm(
                        {
                          ...newLeadForm,
                          budgetRange:
                            e.target
                              .value,
                        }
                      )
                    }
                  >
                    <option>
                      Select budget range
                    </option>

                    <option>
                      20 - 40 L
                    </option>

                    <option>
                      40 - 60 L
                    </option>

                    <option>
                      50 - 65 L
                    </option>

                    <option>
                      80 - 90 L
                    </option>

                    <option>
                      1.2 - 1.6 Cr
                    </option>

                    <option>
                      Above 2 Cr
                    </option>
                  </select>

                </div>
              </div>

              {/* =================================================
                  LOCATION + AGENT
              ================================================= */}

              <div className="leadmanagement-form-row">

                <div className="leadmanagement-form-group">

                  <label>
                    Location / Area
                  </label>

                  <input
                    type="text"
                    placeholder="Enter location"
                    value={
                      newLeadForm.location
                    }
                    onChange={(e) =>
                      setNewLeadForm(
                        {
                          ...newLeadForm,
                          location:
                            e.target
                              .value,
                        }
                      )
                    }
                  />

                </div>

                <div className="leadmanagement-form-group">

                  <label>
                    Agent
                  </label>

                  <select
                    value={
                      newLeadForm.agent
                    }
                    onChange={(e) =>
                      setNewLeadForm(
                        {
                          ...newLeadForm,
                          agent:
                            e.target
                              .value,
                        }
                      )
                    }
                  >
                    <option>
                      Select agent
                    </option>

                    <option>
                      Aman Verma
                    </option>

                    <option>
                      Rohit Singh
                    </option>

                    <option>
                      Ankit Patel
                    </option>

                    <option>
                      Neha Joshi
                    </option>
                  </select>

                </div>
              </div>

              {/* =================================================
                  STATUS PRIORITY DATE
              ================================================= */}

              <div className="leadmanagement-form-row-3">

                <div className="leadmanagement-form-group">

                  <label>
                    Status
                  </label>

                  <select
                    value={
                      newLeadForm.status
                    }
                    onChange={(e) =>
                      setNewLeadForm(
                        {
                          ...newLeadForm,
                          status:
                            e.target
                              .value,
                        }
                      )
                    }
                  >
                    <option>
                      New
                    </option>

                    <option>
                      Follow Up
                    </option>

                    <option>
                      Site Visit
                    </option>

                    <option>
                      Converted
                    </option>

                    <option>
                      Lost Lead
                    </option>
                  </select>

                </div>

                <div className="leadmanagement-form-group">

                  <label>
                    Priority
                  </label>

                  <select
                    value={
                      newLeadForm.priority
                    }
                    onChange={(e) =>
                      setNewLeadForm(
                        {
                          ...newLeadForm,
                          priority:
                            e.target
                              .value,
                        }
                      )
                    }
                  >
                    <option>
                      Low
                    </option>

                    <option>
                      Medium
                    </option>

                    <option>
                      High
                    </option>
                  </select>

                </div>

                <div className="leadmanagement-form-group">

                  <label>
                    Follow Up Date
                  </label>

                  <input
                    type="date"
                    value={
                      newLeadForm.followUpDate
                    }
                    onChange={(e) =>
                      setNewLeadForm(
                        {
                          ...newLeadForm,
                          followUpDate:
                            e.target
                              .value,
                        }
                      )
                    }
                  />

                </div>
              </div>

              {/* =================================================
                  NOTES
              ================================================= */}

              <div className="leadmanagement-form-group">

                <label>
                  Notes
                </label>

                <textarea
                  rows="3"
                  placeholder="Enter notes about the lead.."
                  value={
                    newLeadForm.notes
                  }
                  onChange={(e) =>
                    setNewLeadForm(
                      {
                        ...newLeadForm,
                        notes:
                          e.target
                            .value,
                      }
                    )
                  }
                />

              </div>

              {/* =================================================
                  FOOTER
              ================================================= */}

              <div className="leadmanagement-modal-footer">

                <button
                  type="button"
                  className="leadmanagement-cancel-btn"
                  onClick={() => {
                    setIsAddLeadModalOpen(
                      false
                    );

                    setNewLeadForm(
                      DEFAULT_FORM
                    );
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="leadmanagement-save-btn"
                  disabled={
                    savingLead
                  }
                >
                  {savingLead
                    ? "Saving..."
                    : "Save Lead"}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadManagement;