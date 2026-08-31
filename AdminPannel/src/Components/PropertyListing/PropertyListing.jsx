import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FiHome,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiRefreshCw,
  FiFilter,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiArchive,
  FiPlus,
  FiX,
  FiSave,
  FiMapPin,
  FiPhone,
  FiMail,
  FiCalendar,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import API from "../../api/axios";

import "./PropertyListing.css";


/* =========================================================
   CONSTANTS
========================================================= */

const ITEMS_PER_PAGE = 8;

const PROPERTY_TYPES = [
  "Apartment",
  "Villa (Duplex / Independent House)",
  "Plot",
  "Commercial Property",
];

const PROPERTY_FOR = [
  "Sell",
  "Rent",
];

const CATEGORIES = [
  "Residential",
  "Commercial",
];

const STATUS_OPTIONS = [
  "Pending",
  "Approved",
  "Rejected",
  "Inactive",
];


/* =========================================================
   EMPTY FORM
========================================================= */

const EMPTY_FORM = {
  propertyTitle: "",
  propertyType: "Apartment",
  propertyFor: "Sell",
  category: "Residential",
  city: "",
  locality: "",
  pinCode: "",
  price: "",
  area: "",
  bedrooms: "",
  bathrooms: "",
  phone: "",
  email: "",
  description: "",
  status: "Pending",
};


/* =========================================================
   COMPONENT
========================================================= */

const PropertyListing = () => {

  const navigate = useNavigate();


  /* =======================================================
     PROPERTY DATA
  ======================================================= */

  const [
    properties,
    setProperties,
  ] = useState([]);


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    error,
    setError,
  ] = useState("");


  /* =======================================================
     FILTER STATES
  ======================================================= */

  const [
    search,
    setSearch,
  ] = useState("");


  const [
    statusFilter,
    setStatusFilter,
  ] = useState("All Status");


  const [
    typeFilter,
    setTypeFilter,
  ] = useState("All Type");


  const [
    categoryFilter,
    setCategoryFilter,
  ] = useState("All Category");


  const [
    startDate,
    setStartDate,
  ] = useState("");


  const [
    endDate,
    setEndDate,
  ] = useState("");


  /* =======================================================
     PAGINATION
  ======================================================= */

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);


  /* =======================================================
     FORM MODAL
  ======================================================= */

  const [
    showForm,
    setShowForm,
  ] = useState(false);


  const [
    editingProperty,
    setEditingProperty,
  ] = useState(null);


  const [
    formData,
    setFormData,
  ] = useState(
    EMPTY_FORM
  );


  const [
    saving,
    setSaving,
  ] = useState(false);


  /* =======================================================
     VIEW MODAL
  ======================================================= */

  const [
    viewingProperty,
    setViewingProperty,
  ] = useState(null);


  /* =======================================================
     DELETE
  ======================================================= */

  const [
    deletingId,
    setDeletingId,
  ] = useState(null);


  /* =======================================================
     FETCH PROPERTIES
  ======================================================= */

  const fetchProperties = async () => {

    try {

      setLoading(true);

      setError("");


      const response =
        await API.get(
          "/properties"
        );


      const data =
        response.data?.properties ||
        response.data?.data ||
        response.data?.results ||
        response.data;


      if (
        Array.isArray(data)
      ) {

        setProperties(data);

      } else {

        setProperties([]);

      }

    } catch (err) {

      console.error(
        "PROPERTY FETCH ERROR:",
        err
      );


      setError(
        err.response?.data?.message ||
        "Failed to load property listings."
      );


      setProperties([]);

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchProperties();

  }, []);


  /* =======================================================
     HELPERS
  ======================================================= */

  const getId = (
    property
  ) => {

    return (
      property?._id ||
      property?.id ||
      property?.propertyId ||
      ""
    );

  };


  const getTitle = (
    property
  ) => {

    return (
      property?.propertyTitle ||
      property?.title ||
      property?.name ||
      property?.propertyName ||
      "Untitled Property"
    );

  };


  const getType = (
    property
  ) => {

    return (
      property?.propertyType ||
      property?.type ||
      "Apartment"
    );

  };


  const getFor = (
    property
  ) => {

    return (
      property?.propertyFor ||
      property?.for ||
      property?.listingType ||
      property?.purpose ||
      "Sell"
    );

  };


  const getCategory = (
    property
  ) => {

    return (
      property?.category ||
      property?.propertyCategory ||
      "Residential"
    );

  };


  const getCity = (
    property
  ) => {

    if (
      typeof property?.location ===
      "object"
    ) {

      return (
        property?.location?.city ||
        ""
      );

    }


    return (
      property?.city ||
      ""
    );

  };


  const getLocality = (
    property
  ) => {

    if (
      typeof property?.location ===
      "object"
    ) {

      return (
        property?.location?.area ||
        property?.location?.locality ||
        ""
      );

    }


    return (
      property?.locality ||
      property?.area ||
      ""
    );

  };


  const getLocation = (
    property
  ) => {

    const city =
      getCity(property);

    const locality =
      getLocality(property);


    if (
      locality &&
      city
    ) {

      return `${locality}, ${city}`;

    }


    return (
      locality ||
      city ||
      property?.address ||
      property?.location ||
      "Location not available"
    );

  };


  const getPrice = (
    property
  ) => {

    return (
      property?.price ??
      property?.expectedPrice ??
      property?.amount ??
      property?.rent ??
      ""
    );

  };


  const getStatus = (
    property
  ) => {

    return (
      property?.status ||
      property?.approvalStatus ||
      property?.listingStatus ||
      "Pending"
    );

  };


  const normalizeStatus = (
    status
  ) => {

    const value =
      String(
        status || ""
      )
        .trim()
        .toLowerCase();


    if (
      value === "approved" ||
      value === "active"
    ) {

      return "Approved";

    }


    if (
      value === "rejected"
    ) {

      return "Rejected";

    }


    if (
      value === "inactive"
    ) {

      return "Inactive";

    }


    return "Pending";

  };


  const getSubmittedBy = (
    property
  ) => {

    if (
      typeof property?.createdBy ===
      "object" &&
      property?.createdBy
    ) {

      return (
        property.createdBy.name ||
        property.createdBy.fullName ||
        property.createdBy.username ||
        "Admin"
      );

    }


    if (
      typeof property?.user ===
      "object" &&
      property?.user
    ) {

      return (
        property.user.name ||
        property.user.fullName ||
        "Website User"
      );

    }


    return (
      property?.submittedBy ||
      property?.ownerName ||
      property?.fullName ||
      "Website User"
    );

  };


  const getEmail = (
    property
  ) => {

    if (
      typeof property?.createdBy ===
      "object"
    ) {

      return (
        property.createdBy.email ||
        ""
      );

    }


    if (
      typeof property?.user ===
      "object"
    ) {

      return (
        property.user.email ||
        ""
      );

    }


    return (
      property?.email ||
      property?.ownerEmail ||
      ""
    );

  };


  const getPhone = (
    property
  ) => {

    return (
      property?.phone ||
      property?.mobile ||
      property?.contactNumber ||
      ""
    );

  };


  const getDate = (
    property
  ) => {

    return (
      property?.createdAt ||
      property?.submittedOn ||
      property?.date ||
      null
    );

  };


  const getImage = (
    property
  ) => {

    const image =
      property?.images?.[0] ||
      property?.image ||
      property?.imageUrl ||
      property?.thumbnail ||
      property?.coverImage ||
      "";


    if (
      typeof image ===
      "object"
    ) {

      return (
        image?.url ||
        image?.path ||
        image?.secure_url ||
        ""
      );

    }


    return image;

  };


  const getImageUrl = (
    property
  ) => {

    const image =
      getImage(property);


    if (!image) {

      return "";

    }


    if (
      image.startsWith(
        "http://"
      ) ||
      image.startsWith(
        "https://"
      )
    ) {

      return image;

    }


    if (
      image.startsWith(
        "/"
      )
    ) {

      const base =
        API.defaults?.baseURL ||
        "";

      return `${base.replace(
        /\/api\/?$/,
        ""
      )}${image}`;

    }


    const base =
      API.defaults?.baseURL ||
      "";

    return `${base.replace(
      /\/api\/?$/,
      ""
    )}/${image}`;

  };


  const formatPrice = (
    value,
    property
  ) => {

    if (
      value === "" ||
      value === null ||
      value === undefined
    ) {

      return "—";

    }


    const numeric =
      Number(
        String(value)
          .replace(
            /[₹,\s]/g,
            ""
          )
      );


    if (
      Number.isNaN(
        numeric
      )
    ) {

      return String(value);

    }


    if (
      String(
        getFor(property)
      ).toLowerCase() ===
      "rent"
    ) {

      return `₹ ${numeric.toLocaleString(
        "en-IN"
      )} /month`;

    }


    return `₹ ${numeric.toLocaleString(
      "en-IN"
    )}`;

  };


  const formatDate = (
    value
  ) => {

    if (!value) {

      return {
        date: "—",
        time: "",
      };

    }


    const date =
      new Date(value);


    if (
      Number.isNaN(
        date.getTime()
      )
    ) {

      return {
        date: String(value),
        time: "",
      };

    }


    return {

      date:
        date.toLocaleDateString(
          "en-GB",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        ),

      time:
        date.toLocaleTimeString(
          "en-IN",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),

    };

  };


  /* =======================================================
     FILTER OPTIONS
  ======================================================= */

  const propertyTypes =
    useMemo(() => {

      return [
        ...new Set(
          properties
            .map(getType)
            .filter(Boolean)
        ),
      ];

    }, [properties]);


  const categories =
    useMemo(() => {

      return [
        ...new Set(
          properties
            .map(getCategory)
            .filter(Boolean)
        ),
      ];

    }, [properties]);


  /* =======================================================
     FILTER DATA
  ======================================================= */

  const filteredProperties =
    useMemo(() => {

      const searchText =
        search
          .trim()
          .toLowerCase();


      return properties.filter(
        (property) => {

          if (
            searchText
          ) {

            const text =
              [
                getTitle(property),
                getType(property),
                getFor(property),
                getCategory(property),
                getLocation(property),
                getSubmittedBy(property),
                getEmail(property),
              ]
                .join(" ")
                .toLowerCase();


            if (
              !text.includes(
                searchText
              )
            ) {

              return false;

            }

          }


          if (
            statusFilter !==
            "All Status"
          ) {

            if (
              normalizeStatus(
                getStatus(property)
              ) !==
              statusFilter
            ) {

              return false;

            }

          }


          if (
            typeFilter !==
            "All Type"
          ) {

            if (
              getType(property) !==
              typeFilter
            ) {

              return false;

            }

          }


          if (
            categoryFilter !==
            "All Category"
          ) {

            if (
              getCategory(property) !==
              categoryFilter
            ) {

              return false;

            }

          }


          const propertyDate =
            getDate(property);


          if (
            propertyDate
          ) {

            const date =
              new Date(
                propertyDate
              );


            if (
              startDate
            ) {

              const start =
                new Date(
                  `${startDate}T00:00:00`
                );


              if (
                date < start
              ) {

                return false;

              }

            }


            if (
              endDate
            ) {

              const end =
                new Date(
                  `${endDate}T23:59:59`
                );


              if (
                date > end
              ) {

                return false;

              }

            }

          }


          return true;

        }
      );

    }, [
      properties,
      search,
      statusFilter,
      typeFilter,
      categoryFilter,
      startDate,
      endDate,
    ]);


  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredProperties.length /
        ITEMS_PER_PAGE
      )
    );


  const safePage =
    Math.min(
      currentPage,
      totalPages
    );


  const startIndex =
    (
      safePage -
      1
    ) *
    ITEMS_PER_PAGE;


  const pageProperties =
    filteredProperties.slice(
      startIndex,
      startIndex +
      ITEMS_PER_PAGE
    );


  useEffect(() => {

    setCurrentPage(1);

  }, [
    search,
    statusFilter,
    typeFilter,
    categoryFilter,
    startDate,
    endDate,
  ]);


  /* =======================================================
     STATISTICS
  ======================================================= */

  const stats =
    useMemo(() => {

      return {

        total:
          properties.length,

        pending:
          properties.filter(
            (p) =>
              normalizeStatus(
                getStatus(p)
              ) ===
              "Pending"
          ).length,

        approved:
          properties.filter(
            (p) =>
              normalizeStatus(
                getStatus(p)
              ) ===
              "Approved"
          ).length,

        rejected:
          properties.filter(
            (p) =>
              normalizeStatus(
                getStatus(p)
              ) ===
              "Rejected"
          ).length,

        inactive:
          properties.filter(
            (p) =>
              normalizeStatus(
                getStatus(p)
              ) ===
              "Inactive"
          ).length,

      };

    }, [properties]);


  /* =======================================================
     OPEN ADD FORM
  ======================================================= */

  const handleAddProperty = () => {

    setEditingProperty(null);

    setFormData({
      ...EMPTY_FORM,
    });

    setShowForm(true);

  };


  /* =======================================================
     OPEN EDIT FORM
  ======================================================= */

  const handleEdit = (
    property
  ) => {

    setEditingProperty(
      property
    );


    setFormData({

      propertyTitle:
        property?.propertyTitle ||
        property?.title ||
        property?.name ||
        "",

      propertyType:
        property?.propertyType ||
        "Apartment",

      propertyFor:
        property?.propertyFor ||
        property?.for ||
        "Sell",

      category:
        property?.category ||
        "Residential",

      city:
        getCity(property),

      locality:
        getLocality(property),

      pinCode:
        property?.pinCode ||
        property?.pincode ||
        "",

      price:
        property?.price ||
        property?.expectedPrice ||
        property?.amount ||
        "",

      area:
        property?.area ||
        property?.plotArea ||
        property?.builtUpArea ||
        "",

      bedrooms:
        property?.bedrooms ||
        property?.bhk ||
        "",

      bathrooms:
        property?.bathrooms ||
        "",

      phone:
        getPhone(property),

      email:
        getEmail(property),

      description:
        property?.description ||
        "",

      status:
        normalizeStatus(
          getStatus(property)
        ),

    });


    setShowForm(true);

  };


  /* =======================================================
     FORM INPUT
  ======================================================= */

  const handleFormChange = (
    event
  ) => {

    const {
      name,
      value,
    } = event.target;


    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );

  };


  /* =======================================================
     SAVE PROPERTY
  ======================================================= */

  const handleSaveProperty = async (
    event
  ) => {

    event.preventDefault();


    if (
      !formData.propertyTitle.trim()
    ) {

      alert(
        "Please enter property title."
      );

      return;

    }


    if (
      !formData.city.trim()
    ) {

      alert(
        "Please enter city."
      );

      return;

    }


    if (
      !formData.locality.trim()
    ) {

      alert(
        "Please enter locality."
      );

      return;

    }


    if (
      !formData.price
    ) {

      alert(
        "Please enter price."
      );

      return;

    }


    try {

      setSaving(true);


      /*
       * This payload keeps the fields simple
       * and compatible with a typical property API.
       */

      const payload = {

        propertyTitle:
          formData.propertyTitle.trim(),

        propertyType:
          formData.propertyType,

        propertyFor:
          formData.propertyFor,

        category:
          formData.category,

        city:
          formData.city.trim(),

        locality:
          formData.locality.trim(),

        pinCode:
          formData.pinCode.trim(),

        price:
          Number(
            formData.price
          ),

        area:
          formData.area
            ? Number(
                formData.area
              )
            : "",

        bedrooms:
          formData.bedrooms
            ? Number(
                formData.bedrooms
              )
            : "",

        bathrooms:
          formData.bathrooms
            ? Number(
                formData.bathrooms
              )
            : "",

        phone:
          formData.phone.trim(),

        email:
          formData.email.trim(),

        description:
          formData.description.trim(),

        status:
          formData.status,

      };


      let response;


      /* =================================================
         UPDATE
      ================================================= */

      if (
        editingProperty
      ) {

        const id =
          getId(
            editingProperty
          );


        response =
          await API.put(
            `/properties/${id}`,
            payload
          );


        const updated =
          response.data?.property ||
          response.data?.data ||
          response.data;


        setProperties(
          (previous) =>
            previous.map(
              (item) =>
                getId(item) === id
                  ? (
                      updated &&
                      typeof updated ===
                        "object"
                        ? updated
                        : {
                            ...item,
                            ...payload,
                          }
                    )
                  : item
            )
        );


        alert(
          "Property updated successfully."
        );

      }

      /* =================================================
         CREATE
      ================================================= */

      else {

        response =
          await API.post(
            "/properties",
            payload
          );


        const created =
          response.data?.property ||
          response.data?.data ||
          response.data;


        if (
          created &&
          typeof created ===
          "object"
        ) {

          setProperties(
            (previous) => [
              created,
              ...previous,
            ]
          );

        } else {

          await fetchProperties();

        }


        alert(
          "Property added successfully."
        );

      }


      setShowForm(false);

      setEditingProperty(null);

      setFormData({
        ...EMPTY_FORM,
      });


    } catch (err) {

      console.error(
        "SAVE PROPERTY ERROR:",
        err
      );


      alert(
        err.response?.data?.message ||
        "Failed to save property."
      );

    } finally {

      setSaving(false);

    }

  };


  /* =======================================================
     DELETE PROPERTY
  ======================================================= */

  const handleDelete = async (
    property
  ) => {

    const id =
      getId(property);


    if (!id) {

      alert(
        "Property ID not found."
      );

      return;

    }


    const confirmDelete =
      window.confirm(
        `Are you sure you want to delete "${getTitle(
          property
        )}"?`
      );


    if (!confirmDelete) {

      return;

    }


    try {

      setDeletingId(id);


      await API.delete(
        `/properties/${id}`
      );


      setProperties(
        (previous) =>
          previous.filter(
            (item) =>
              getId(item) !== id
          )
      );


      alert(
        "Property deleted successfully."
      );

    } catch (err) {

      console.error(
        "DELETE PROPERTY ERROR:",
        err
      );


      alert(
        err.response?.data?.message ||
        "Failed to delete property."
      );

    } finally {

      setDeletingId(null);

    }

  };


  /* =======================================================
     VIEW
  ======================================================= */

  const handleView = (
    property
  ) => {

    setViewingProperty(
      property
    );

  };


  /* =======================================================
     RESET FILTER
  ======================================================= */

  const handleReset = () => {

    setSearch("");

    setStatusFilter(
      "All Status"
    );

    setTypeFilter(
      "All Type"
    );

    setCategoryFilter(
      "All Category"
    );

    setStartDate("");

    setEndDate("");

    setCurrentPage(1);

  };


  /* =======================================================
     STATUS ICON
  ======================================================= */

  const statusIcon = (
    status
  ) => {

    switch (
      normalizeStatus(status)
    ) {

      case "Approved":
        return <FiCheckCircle />;

      case "Rejected":
        return <FiXCircle />;

      case "Inactive":
        return <FiArchive />;

      default:
        return <FiClock />;

    }

  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <div className="PropertyListing">


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="PropertyListing-main">


        {/* =================================================
            PAGE TITLE + ADD BUTTON
        ================================================= */}

        <section className="PropertyListing-pageHeading">

          <div>

            <h1>
              Property Listings
            </h1>

            <div className="PropertyListing-breadcrumb">

              <span>
                Dashboard
              </span>

              <span>
                ›
              </span>

              <span>
                Property Listings
              </span>

            </div>

          </div>


          {/* ADD PROPERTY */}

          <button
            type="button"
            className="PropertyListing-addButton"
            onClick={
              handleAddProperty
            }
          >

            <FiPlus />

            <span>
              Add Property
            </span>

          </button>

        </section>


        {/* =================================================
            STATISTICS
        ================================================= */}

        <section className="PropertyListing-statistics">


          <div className="PropertyListing-statCard">

            <div className="PropertyListing-statIcon PropertyListing-statIcon-total">
              <FiHome />
            </div>

            <div className="PropertyListing-statContent">

              <span>
                Total Listings
              </span>

              <strong>
                {stats.total}
              </strong>

              <small>
                All Properties
              </small>

            </div>

          </div>


          <div className="PropertyListing-statCard">

            <div className="PropertyListing-statIcon PropertyListing-statIcon-pending">
              <FiEye />
            </div>

            <div className="PropertyListing-statContent">

              <span>
                Pending Review
              </span>

              <strong>
                {stats.pending}
              </strong>

              <small>
                Awaiting Approval
              </small>

            </div>

          </div>


          <div className="PropertyListing-statCard">

            <div className="PropertyListing-statIcon PropertyListing-statIcon-approved">
              <FiCheckCircle />
            </div>

            <div className="PropertyListing-statContent">

              <span>
                Approved
              </span>

              <strong>
                {stats.approved}
              </strong>

              <small>
                Published
              </small>

            </div>

          </div>


          <div className="PropertyListing-statCard">

            <div className="PropertyListing-statIcon PropertyListing-statIcon-rejected">
              <FiXCircle />
            </div>

            <div className="PropertyListing-statContent">

              <span>
                Rejected
              </span>

              <strong>
                {stats.rejected}
              </strong>

              <small>
                Not Approved
              </small>

            </div>

          </div>


          <div className="PropertyListing-statCard">

            <div className="PropertyListing-statIcon PropertyListing-statIcon-inactive">
              <FiArchive />
            </div>

            <div className="PropertyListing-statContent">

              <span>
                Inactive
              </span>

              <strong>
                {stats.inactive}
              </strong>

              <small>
                Not Active
              </small>

            </div>

          </div>

        </section>


        {/* =================================================
            FILTERS
        ================================================= */}

        <section className="PropertyListing-filterCard">


          <div className="PropertyListing-searchWrapper">

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search by title, location, or user..."
            />

            <FiSearch />

          </div>


          <div className="PropertyListing-filterField">

            <label>
              Status
            </label>

            <div className="PropertyListing-select">

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
              >

                <option>
                  All Status
                </option>

                {STATUS_OPTIONS.map(
                  (status) => (
                    <option
                      key={status}
                    >
                      {status}
                    </option>
                  )
                )}

              </select>

              <FiChevronDown />

            </div>

          </div>


          <div className="PropertyListing-filterField">

            <label>
              Property Type
            </label>

            <div className="PropertyListing-select">

              <select
                value={typeFilter}
                onChange={(event) =>
                  setTypeFilter(
                    event.target.value
                  )
                }
              >

                <option>
                  All Type
                </option>

                {propertyTypes.map(
                  (type) => (
                    <option
                      key={type}
                    >
                      {type}
                    </option>
                  )
                )}

              </select>

              <FiChevronDown />

            </div>

          </div>


          <div className="PropertyListing-filterField">

            <label>
              Category
            </label>

            <div className="PropertyListing-select">

              <select
                value={categoryFilter}
                onChange={(event) =>
                  setCategoryFilter(
                    event.target.value
                  )
                }
              >

                <option>
                  All Category
                </option>

                {categories.map(
                  (category) => (
                    <option
                      key={category}
                    >
                      {category}
                    </option>
                  )
                )}

              </select>

              <FiChevronDown />

            </div>

          </div>


          <div className="PropertyListing-filterField">

            <label>
              Date Range
            </label>

            <div className="PropertyListing-dateInputs">

              <input
                type="date"
                value={startDate}
                onChange={(event) =>
                  setStartDate(
                    event.target.value
                  )
                }
              />

              <input
                type="date"
                value={endDate}
                min={
                  startDate ||
                  undefined
                }
                onChange={(event) =>
                  setEndDate(
                    event.target.value
                  )
                }
              />

            </div>

          </div>


          <button
            type="button"
            className="PropertyListing-resetButton"
            onClick={
              handleReset
            }
          >

            <FiRefreshCw />

            Reset

          </button>


          <button
            type="button"
            className="PropertyListing-filterButton"
          >

            <FiFilter />

            Filter

          </button>

        </section>


        {/* =================================================
            TABLE
        ================================================= */}

        <section className="PropertyListing-tableCard">

          <div className="PropertyListing-tableScroll">

            <table>

              <thead>

                <tr>

                  <th>
                    #
                  </th>

                  <th>
                    Property Title
                  </th>

                  <th>
                    Property Type
                  </th>

                  <th>
                    For
                  </th>

                  <th>
                    Category
                  </th>

                  <th>
                    Location
                  </th>

                  <th>
                    Price (₹)
                  </th>

                  <th>
                    Submitted By
                  </th>

                  <th>
                    Submitted On
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan="11"
                      className="PropertyListing-messageCell"
                    >

                      <FiRefreshCw className="PropertyListing-spin" />

                      Loading properties...

                    </td>

                  </tr>

                ) : error ? (

                  <tr>

                    <td
                      colSpan="11"
                      className="PropertyListing-messageCell PropertyListing-errorMessage"
                    >

                      <FiXCircle />

                      {error}

                      <button
                        type="button"
                        onClick={
                          fetchProperties
                        }
                      >
                        Retry
                      </button>

                    </td>

                  </tr>

                ) : pageProperties.length === 0 ? (

                  <tr>

                    <td
                      colSpan="11"
                      className="PropertyListing-messageCell"
                    >

                      <FiHome />

                      No properties found.

                    </td>

                  </tr>

                ) : (

                  pageProperties.map(
                    (
                      property,
                      index
                    ) => {

                      const id =
                        getId(property);

                      const status =
                        normalizeStatus(
                          getStatus(property)
                        );

                      const date =
                        formatDate(
                          getDate(property)
                        );

                      const image =
                        getImageUrl(
                          property
                        );


                      return (

                        <tr
                          key={
                            id ||
                            index
                          }
                        >

                          <td>
                            {startIndex +
                              index +
                              1}
                          </td>


                          <td>

                            <div className="PropertyListing-propertyCell">

                              <div className="PropertyListing-propertyImage">

                                {image ? (

                                  <img
                                    src={image}
                                    alt={
                                      getTitle(
                                        property
                                      )
                                    }
                                  />

                                ) : (

                                  <FiHome />

                                )}

                              </div>

                              <strong>
                                {
                                  getTitle(
                                    property
                                  )
                                }
                              </strong>

                            </div>

                          </td>


                          <td>
                            {getType(
                              property
                            )}
                          </td>


                          <td>
                            {getFor(
                              property
                            )}
                          </td>


                          <td>
                            {getCategory(
                              property
                            )}
                          </td>


                          <td>
                            <span className="PropertyListing-location">
                              {getLocation(
                                property
                              )}
                            </span>
                          </td>


                          <td className="PropertyListing-price">
                            {formatPrice(
                              getPrice(
                                property
                              ),
                              property
                            )}
                          </td>


                          <td>

                            <div className="PropertyListing-submitted">

                              <strong>
                                {getSubmittedBy(
                                  property
                                )}
                              </strong>

                              {getEmail(
                                property
                              ) && (

                                <span>
                                  {getEmail(
                                    property
                                  )}
                                </span>

                              )}

                            </div>

                          </td>


                          <td>

                            <div className="PropertyListing-submitted">

                              <strong>
                                {date.date}
                              </strong>

                              <span>
                                {date.time}
                              </span>

                            </div>

                          </td>


                          <td>

                            <span
                              className={`PropertyListing-status PropertyListing-status-${status.toLowerCase()}`}
                            >

                              {statusIcon(
                                status
                              )}

                              {status}

                            </span>

                          </td>


                          <td>

                            <div className="PropertyListing-actions">

                              <button
                                type="button"
                                title="View"
                                className="PropertyListing-actionView"
                                onClick={() =>
                                  handleView(
                                    property
                                  )
                                }
                              >
                                <FiEye />
                              </button>


                              <button
                                type="button"
                                title="Edit"
                                className="PropertyListing-actionEdit"
                                onClick={() =>
                                  handleEdit(
                                    property
                                  )
                                }
                              >
                                <FiEdit2 />
                              </button>


                              <button
                                type="button"
                                title="Delete"
                                className="PropertyListing-actionDelete"
                                disabled={
                                  deletingId ===
                                  id
                                }
                                onClick={() =>
                                  handleDelete(
                                    property
                                  )
                                }
                              >

                                {deletingId ===
                                id ? (

                                  <FiRefreshCw className="PropertyListing-spin" />

                                ) : (

                                  <FiTrash2 />

                                )}

                              </button>

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
              FOOTER
          ================================================= */}

          <div className="PropertyListing-footer">

            <span>

              {filteredProperties.length ===
              0
                ? "Showing 0 entries"
                : `Showing ${
                    startIndex + 1
                  } to ${Math.min(
                    startIndex +
                      ITEMS_PER_PAGE,
                    filteredProperties.length
                  )} of ${
                    filteredProperties.length
                  } entries`}

            </span>


            {totalPages > 1 && (

              <div className="PropertyListing-pagination">

                <button
                  type="button"
                  disabled={
                    safePage === 1
                  }
                  onClick={() =>
                    setCurrentPage(
                      safePage - 1
                    )
                  }
                >
                  <FiChevronLeft />
                </button>


                {Array.from(
                  {
                    length:
                      totalPages,
                  },
                  (_, index) =>
                    index + 1
                )
                  .filter(
                    (page) =>
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(
                        page -
                          safePage
                      ) <= 1
                  )
                  .map(
                    (page, index, arr) => {

                      const previous =
                        arr[index - 1];


                      return (

                        <React.Fragment
                          key={page}
                        >

                          {previous &&
                            page -
                              previous >
                              1 && (

                              <span>
                                ...
                              </span>

                            )}


                          <button
                            type="button"
                            className={
                              safePage ===
                              page
                                ? "active"
                                : ""
                            }
                            onClick={() =>
                              setCurrentPage(
                                page
                              )
                            }
                          >
                            {page}
                          </button>

                        </React.Fragment>

                      );

                    }
                  )}


                <button
                  type="button"
                  disabled={
                    safePage ===
                    totalPages
                  }
                  onClick={() =>
                    setCurrentPage(
                      safePage + 1
                    )
                  }
                >
                  <FiChevronRight />
                </button>

              </div>

            )}

          </div>

        </section>

      </main>


      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {showForm && (

        <div
          className="PropertyListing-modalOverlay"
          onMouseDown={(event) => {

            if (
              event.target ===
              event.currentTarget
            ) {

              setShowForm(false);

            }

          }}
        >

          <div className="PropertyListing-formModal">


            {/* HEADER */}

            <div className="PropertyListing-modalHeader">

              <div>

                <h2>
                  {editingProperty
                    ? "Edit Property"
                    : "Add Property"}
                </h2>

                <p>
                  {editingProperty
                    ? "Update property information"
                    : "Add a new property listing"}
                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  setShowForm(false)
                }
              >

                <FiX />

              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={
                handleSaveProperty
              }
            >

              <div className="PropertyListing-formBody">


                {/* PROPERTY TITLE */}

                <div className="PropertyListing-formGroup PropertyListing-fullWidth">

                  <label>
                    Property Title *
                  </label>

                  <input
                    type="text"
                    name="propertyTitle"
                    value={
                      formData.propertyTitle
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="Enter property title"
                  />

                </div>


                {/* TYPE */}

                <div className="PropertyListing-formGroup">

                  <label>
                    Property Type *
                  </label>

                  <select
                    name="propertyType"
                    value={
                      formData.propertyType
                    }
                    onChange={
                      handleFormChange
                    }
                  >

                    {PROPERTY_TYPES.map(
                      (type) => (

                        <option
                          key={type}
                          value={type}
                        >
                          {type}
                        </option>

                      )
                    )}

                  </select>

                </div>


                {/* FOR */}

                <div className="PropertyListing-formGroup">

                  <label>
                    Property For *
                  </label>

                  <select
                    name="propertyFor"
                    value={
                      formData.propertyFor
                    }
                    onChange={
                      handleFormChange
                    }
                  >

                    {PROPERTY_FOR.map(
                      (item) => (

                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>

                      )
                    )}

                  </select>

                </div>


                {/* CATEGORY */}

                <div className="PropertyListing-formGroup">

                  <label>
                    Category *
                  </label>

                  <select
                    name="category"
                    value={
                      formData.category
                    }
                    onChange={
                      handleFormChange
                    }
                  >

                    {CATEGORIES.map(
                      (category) => (

                        <option
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>

                      )
                    )}

                  </select>

                </div>


                {/* CITY */}

                <div className="PropertyListing-formGroup">

                  <label>
                    City *
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={
                      formData.city
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="Bhubaneswar"
                  />

                </div>


                {/* LOCALITY */}

                <div className="PropertyListing-formGroup">

                  <label>
                    Locality / Area *
                  </label>

                  <input
                    type="text"
                    name="locality"
                    value={
                      formData.locality
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="Patia"
                  />

                </div>


                {/* PIN */}

                <div className="PropertyListing-formGroup">

                  <label>
                    PIN Code
                  </label>

                  <input
                    type="text"
                    name="pinCode"
                    value={
                      formData.pinCode
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="751024"
                  />

                </div>


                {/* PRICE */}

                <div className="PropertyListing-formGroup">

                  <label>
                    Price *
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={
                      formData.price
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="8500000"
                  />

                </div>


                {/* AREA */}

                <div className="PropertyListing-formGroup">

                  <label>
                    Area
                  </label>

                  <input
                    type="number"
                    name="area"
                    value={
                      formData.area
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="1500"
                  />

                </div>


                {/* BEDROOM */}

                <div className="PropertyListing-formGroup">

                  <label>
                    Bedrooms / BHK
                  </label>

                  <input
                    type="number"
                    name="bedrooms"
                    value={
                      formData.bedrooms
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="3"
                  />

                </div>


                {/* BATHROOM */}

                <div className="PropertyListing-formGroup">

                  <label>
                    Bathrooms
                  </label>

                  <input
                    type="number"
                    name="bathrooms"
                    value={
                      formData.bathrooms
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="2"
                  />

                </div>


                {/* PHONE */}

                <div className="PropertyListing-formGroup">

                  <label>
                    Contact Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={
                      formData.phone
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="9876543210"
                  />

                </div>


                {/* EMAIL */}

                <div className="PropertyListing-formGroup">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={
                      formData.email
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="owner@example.com"
                  />

                </div>


                {/* STATUS */}

                <div className="PropertyListing-formGroup">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={
                      formData.status
                    }
                    onChange={
                      handleFormChange
                    }
                  >

                    {STATUS_OPTIONS.map(
                      (status) => (

                        <option
                          key={status}
                        >
                          {status}
                        </option>

                      )
                    )}

                  </select>

                </div>


                {/* DESCRIPTION */}

                <div className="PropertyListing-formGroup PropertyListing-fullWidth">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={
                      formData.description
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="Enter property description..."
                    rows="4"
                  />

                </div>

              </div>


              {/* FORM FOOTER */}

              <div className="PropertyListing-formFooter">

                <button
                  type="button"
                  className="PropertyListing-cancelButton"
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="PropertyListing-saveButton"
                  disabled={saving}
                >

                  {saving ? (

                    <FiRefreshCw className="PropertyListing-spin" />

                  ) : (

                    <FiSave />

                  )}

                  {saving
                    ? "Saving..."
                    : editingProperty
                    ? "Update Property"
                    : "Save Property"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* =====================================================
          VIEW PROPERTY MODAL
      ===================================================== */}

      {viewingProperty && (

        <div
          className="PropertyListing-modalOverlay"
          onMouseDown={(event) => {

            if (
              event.target ===
              event.currentTarget
            ) {

              setViewingProperty(
                null
              );

            }

          }}
        >

          <div className="PropertyListing-viewModal">


            <div className="PropertyListing-modalHeader">

              <div>

                <h2>
                  Property Details
                </h2>

                <p>
                  Property listing preview
                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  setViewingProperty(
                    null
                  )
                }
              >
                <FiX />
              </button>

            </div>


            <div className="PropertyListing-viewBody">


              <div className="PropertyListing-viewImage">

                {getImageUrl(
                  viewingProperty
                ) ? (

                  <img
                    src={getImageUrl(
                      viewingProperty
                    )}
                    alt={
                      getTitle(
                        viewingProperty
                      )
                    }
                  />

                ) : (

                  <FiHome />

                )}

              </div>


              <div className="PropertyListing-viewContent">

                <h3>
                  {getTitle(
                    viewingProperty
                  )}
                </h3>


                <span
                  className={`PropertyListing-status PropertyListing-status-${normalizeStatus(
                    getStatus(
                      viewingProperty
                    )
                  ).toLowerCase()}`}
                >

                  {statusIcon(
                    getStatus(
                      viewingProperty
                    )
                  )}

                  {normalizeStatus(
                    getStatus(
                      viewingProperty
                    )
                  )}

                </span>


                <div className="PropertyListing-viewGrid">


                  <div>

                    <FiHome />

                    <span>
                      Property Type
                    </span>

                    <strong>
                      {getType(
                        viewingProperty
                      )}
                    </strong>

                  </div>


                  <div>

                    <FiHome />

                    <span>
                      For
                    </span>

                    <strong>
                      {getFor(
                        viewingProperty
                      )}
                    </strong>

                  </div>


                  <div>

                    <FiMapPin />

                    <span>
                      Location
                    </span>

                    <strong>
                      {getLocation(
                        viewingProperty
                      )}
                    </strong>

                  </div>


                  <div>

                    <FiHome />

                    <span>
                      Category
                    </span>

                    <strong>
                      {getCategory(
                        viewingProperty
                      )}
                    </strong>

                  </div>


                  <div>

                    <FiCalendar />

                    <span>
                      Price
                    </span>

                    <strong>
                      {formatPrice(
                        getPrice(
                          viewingProperty
                        ),
                        viewingProperty
                      )}
                    </strong>

                  </div>


                  <div>

                    <FiPhone />

                    <span>
                      Contact
                    </span>

                    <strong>
                      {getPhone(
                        viewingProperty
                      ) ||
                        "Not provided"}
                    </strong>

                  </div>


                  <div>

                    <FiMail />

                    <span>
                      Email
                    </span>

                    <strong>
                      {getEmail(
                        viewingProperty
                      ) ||
                        "Not provided"}
                    </strong>

                  </div>

                </div>


                {viewingProperty?.description && (

                  <div className="PropertyListing-description">

                    <h4>
                      Description
                    </h4>

                    <p>
                      {
                        viewingProperty.description
                      }
                    </p>

                  </div>

                )}

              </div>

            </div>


            <div className="PropertyListing-formFooter">

              <button
                type="button"
                className="PropertyListing-cancelButton"
                onClick={() =>
                  setViewingProperty(
                    null
                  )
                }
              >
                Close
              </button>


              <button
                type="button"
                className="PropertyListing-saveButton"
                onClick={() => {

                  const property =
                    viewingProperty;

                  setViewingProperty(
                    null
                  );

                  handleEdit(
                    property
                  );

                }}
              >

                <FiEdit2 />

                Edit Property

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};


export default PropertyListing;