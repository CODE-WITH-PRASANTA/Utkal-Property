import React, { useState, useEffect } from "react";
import "./AddNewProperty.css";
import API from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
// React Icons Imports
import {
  FiArrowLeft,
  FiEye,
  FiBookmark,
  FiSend,
  FiPlus,
  FiMapPin,
  FiBarChart2,
  FiHome,
  FiUploadCloud,
  FiGrid,
  FiShield,
  FiVideo,
  FiSun,
  FiCalendar,
  FiStar,
  FiX,
} from "react-icons/fi";
import { LuBuilding2, LuFolderArchive, LuSettings } from "react-icons/lu";

// Default Real Estate Placeholder Images
const DEFAULT_PREVIEW_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
];

// Predefined amenities list matching reference format
const DEFAULT_AMENITIES_LIST = [
  "Swimming Pool",
  "Kid Play Area",
  "Gym",
  "Security",
  "CCTV Camera",
  "Park & Garden",
  "Club House",
];

const AddNewProperty = () => {
  // Form State Management
  const [formData, setFormData] = useState({
    propertyName: "",
    category: "",
    propertyType: "",
    status: "Active",

    projectSize: "",
    completionStatus: "Under Construction",
    shortDescription: "",

    location: "",
    city: "",
    state: "",
    country: "",

    totalUnits: "",
    availableUnits: "",
    totalArea: "",
    launchDate: "",

    totalFloors: "",
    bedrooms: "",
    bathrooms: "",
    plotSize: "",
    parking: "",

    // PRICE
    price: "",
    pricePerSqft: "",
    rera: "",

    // SEO
    metaTitle: "",
    metaDescription: "",
    urlSlug: "",

    // PUBLISH
    publishStatus: true,
    featuredProperty: false,
    publishDate: "",
    promoteProperty: false,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);
  // Dynamic Lists State
  const [highlights, setHighlights] = useState([""]);
  const [amenitiesList, setAmenitiesList] = useState(DEFAULT_AMENITIES_LIST);
  const [selectedAmenities, setSelectedAmenities] = useState([
    "Swimming Pool",
    "Kid Play Area",
    "Gym",
    "Security",
    "CCTV Camera",
    "Park & Garden",
    "Club House",
  ]);
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [existingImage, setExistingImage] = useState("");
  const [existingDocuments, setExistingDocuments] = useState([]);
  const [loadingProperty, setLoadingProperty] = useState(false);
  // Modal State for Preview
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  const [loadingCategories, setLoadingCategories] = useState(false);

  const [loadingLocations, setLoadingLocations] = useState(false);

  // Load Saved Draft on initial mount
  // ==========================================
  // LOAD DRAFT - ADD MODE ONLY
  // ==========================================

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        setLoadingCategories(true);
        setLoadingLocations(true);

        const [categoryResponse, locationResponse] = await Promise.all([
          API.get("/categories"),
          API.get("/locations"),
        ]);

        console.log("CATEGORY FULL RESPONSE:", categoryResponse.data);

        console.log("LOCATION FULL RESPONSE:", locationResponse.data);

        // =========================
        // CATEGORIES
        // =========================
        const categoryData =
          categoryResponse.data?.categories ||
          categoryResponse.data?.data ||
          categoryResponse.data ||
          [];

        setCategories(Array.isArray(categoryData) ? categoryData : []);

        // =========================
        // LOCATIONS
        // =========================
        const locationData =
          locationResponse.data?.locations ||
          locationResponse.data?.data ||
          locationResponse.data?.location ||
          locationResponse.data ||
          [];

        console.log("FINAL LOCATION ARRAY:", locationData);

        setLocations(Array.isArray(locationData) ? locationData : []);
      } catch (error) {
        console.error("DROPDOWN FETCH ERROR:", error.response?.data || error);

        setCategories([]);
        setLocations([]);
      } finally {
        setLoadingCategories(false);
        setLoadingLocations(false);
      }
    };

    fetchDropdownData();
  }, []);

  useEffect(() => {
    if (isEditMode) return;

    const savedDraft = localStorage.getItem("property_draft");

    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);

        if (parsed.formData) {
          setFormData(parsed.formData);
        }

        if (parsed.highlights) {
          setHighlights(parsed.highlights);
        }

        if (parsed.selectedAmenities) {
          setSelectedAmenities(parsed.selectedAmenities);
        }
      } catch (error) {
        console.error("Error loading draft:", error);
      }
    }
  }, [isEditMode]);

  // ==========================================
  // LOAD PROPERTY - EDIT MODE
  // ==========================================

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      try {
        setLoadingProperty(true);

        const { data } = await API.get(`/properties/${id}`);

        console.log("EDIT PROPERTY:", data);

        const property = data.property || data.data || data;

        setFormData({
          propertyName: property.name || "",

          category: property.category || "Residential Project",

          propertyType: property.type || "Luxury Villas",

          status: property.status || "Active",

          projectSize: property.projectSize ?? "",

          completionStatus: property.completionStatus || "Under Construction",

          shortDescription: property.shortDescription || "",

          location: property.location || "",

          city: property.city || "",

          state: property.state || "",

          country: property.country || "",

          totalUnits: property.totalUnits ?? "",

          availableUnits: property.availableUnits ?? "",

          totalArea: property.totalArea ?? "",

          launchDate: property.launchDate
            ? property.launchDate.split("T")[0]
            : "",

          totalFloors: property.totalFloors ?? "",

          bedrooms: property.bedrooms ?? "",

          bathrooms: property.bathrooms ?? "",

          plotSize: property.plotSize ?? "",

          parking: property.parking || "",

          price: property.price ?? "",

          pricePerSqft: property.pricePerSqft ?? "",

          rera: property.rera || "",

          metaTitle: property.metaTitle || "",

          metaDescription: property.metaDescription || "",

          urlSlug: property.urlSlug || "",

          publishStatus: property.publishStatus ?? true,

          featuredProperty: property.featured ?? false,

          publishDate: property.publishDate
            ? property.publishDate.split("T")[0]
            : "",

          promoteProperty: property.promoteProperty ?? false,
        });

        // Highlights
        setHighlights(
          Array.isArray(property.highlights) && property.highlights.length
            ? property.highlights
            : [""],
        );

        // Amenities
        setSelectedAmenities(
          Array.isArray(property.amenities) ? property.amenities : [],
        );

        // Add custom amenities from database
        if (Array.isArray(property.amenities)) {
          setAmenitiesList((prev) => [
            ...new Set([...prev, ...property.amenities]),
          ]);
        }

        // Existing image
        setExistingImage(property.image || "");

        // Existing documents
        setExistingDocuments(
          Array.isArray(property.documents) ? property.documents : [],
        );
      } catch (error) {
        console.error("GET PROPERTY ERROR:", error.response?.data || error);

        alert(error.response?.data?.message || "Failed to load property");

        navigate("/properties/all");
      } finally {
        setLoadingProperty(false);
      }
    };

    fetchProperty();
  }, [id, navigate]);

  // Back Navigation Action
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      alert("Navigating back to Properties Dashboard");
    }
  };

  // Input Handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Dynamic Highlight Handlers
  const handleHighlightChange = (index, value) => {
    const updated = [...highlights];
    updated[index] = value;
    setHighlights(updated);
  };

  const addHighlightField = () => {
    setHighlights([...highlights, ""]);
  };

  // Image Upload Handler
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    setImageFiles((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...previews]);
  };

  // Document Upload Handler
  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const validFiles = files.filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        alert(
          `${file.name} is not allowed. Only PDF, DOC and DOCX files are allowed.`,
        );

        return false;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} is larger than 10MB.`);

        return false;
      }

      return true;
    });

    setDocuments((prev) => [...prev, ...validFiles]);

    e.target.value = "";
  };

  // Toggle Amenity Selection
  const toggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(
        selectedAmenities.filter((item) => item !== amenity),
      );
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  // Dynamic Add Custom Amenity
  const handleAddCustomAmenity = () => {
    const customAmenity = prompt("Enter new amenity name:");
    if (customAmenity && customAmenity.trim() !== "") {
      const formatted = customAmenity.trim();
      if (!amenitiesList.includes(formatted)) {
        setAmenitiesList((prev) => [...prev, formatted]);
      }
      if (!selectedAmenities.includes(formatted)) {
        setSelectedAmenities((prev) => [...prev, formatted]);
      }
    }
  };

  // Save as Draft Handler
  const handleSaveDraft = () => {
    const draftData = { formData, highlights, selectedAmenities };
    localStorage.setItem("property_draft", JSON.stringify(draftData));
    alert("Property draft saved successfully!");
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ============================
      // BASIC VALIDATION
      // ============================

      if (!formData.propertyName.trim()) {
        alert("Property name is required");
        return;
      }

      if (!formData.location.trim()) {
        alert("Property location is required");
        return;
      }

      if (!formData.price) {
        alert("Property price is required");
        return;
      }

      if (!isEditMode && imageFiles.length === 0) {
        alert("Please select a property image");
        return;
      }

      // ============================
      // CREATE FORMDATA
      // ============================

      const form = new FormData();

      // Basic Information
      form.append("name", formData.propertyName.trim());

      form.append("featured", String(formData.featuredProperty));

      form.append("category", formData.category);
      form.append("type", formData.propertyType);
      form.append("subType", formData.propertyType);

      form.append("status", formData.status);
      form.append("statusType", "For Sale");

      form.append("projectSize", formData.projectSize || "0");

      form.append("completionStatus", formData.completionStatus);

      form.append("shortDescription", formData.shortDescription);

      // Highlights
      form.append(
        "highlights",
        JSON.stringify(highlights.map((item) => item.trim()).filter(Boolean)),
      );

      // ============================
      // LOCATION
      // ============================

      form.append("location", formData.location.trim());
      form.append("city", formData.city);
      form.append("state", formData.state);
      form.append("country", formData.country);

      // ============================
      // QUICK STATS
      // ============================

      form.append("totalUnits", formData.totalUnits || "0");

      form.append("availableUnits", formData.availableUnits || "0");

      form.append("totalArea", formData.totalArea || "0");

      form.append("launchDate", formData.launchDate || "");

      // ============================
      // PROPERTY DETAILS
      // ============================

      form.append("totalFloors", formData.totalFloors || "0");

      form.append("bedrooms", formData.bedrooms || "0");

      form.append("bathrooms", formData.bathrooms || "0");

      form.append("plotSize", formData.plotSize || "0");

      form.append("parking", formData.parking);

      // ============================
      // AMENITIES
      // ============================

      form.append("amenities", JSON.stringify(selectedAmenities));

      // ============================
      // PRICE
      // ============================

      form.append("price", formData.price);

      form.append("pricePerSqft", formData.pricePerSqft || "0");

      form.append("rera", formData.rera);

      // ============================
      // SEO
      // ============================

      form.append("metaTitle", formData.metaTitle);

      form.append("metaDescription", formData.metaDescription);

      form.append("urlSlug", formData.urlSlug);

      // ============================
      // PUBLISH SETTINGS
      // ============================

      form.append("publishStatus", String(formData.publishStatus));

      form.append("publishDate", formData.publishDate || "");

      form.append("promoteProperty", String(formData.promoteProperty));

      // ============================
      // IMAGE
      // ============================

      if (imageFiles.length > 0) {
        form.append("image", imageFiles[0]);
      }
      // ============================
      // DOCUMENTS
      // ============================

      documents.forEach((document) => {
        form.append("documents", document);
      });

      // ============================
      // DEBUG
      // ============================

      console.log("========== PROPERTY DATA ==========");

      for (const [key, value] of form.entries()) {
        console.log(key, value);
      }

      // ============================
      // API
      // ============================

      let response;

      if (isEditMode) {
        response = await API.put(`/properties/${id}`, form);
      } else {
        response = await API.post("/properties", form);
      }

      const data = response.data;

      console.log(isEditMode ? "Property updated:" : "Property created:", data);

      alert(
        data.message ||
          (isEditMode
            ? "Property updated successfully!"
            : "Property published successfully!"),
      );

      if (!isEditMode) {
        localStorage.removeItem("property_draft");
      }

      navigate("/properties/all");
      console.log("Property response:", data);

      alert(data.message || "Property published successfully!");

      localStorage.removeItem("property_draft");

      navigate("/properties");
    } catch (error) {
      console.error("Publish Property Error:", error.response?.data || error);

      alert(error.response?.data?.message || "Failed to publish property");
    }
  };

  // Active or Default Image Gallery
  const displayImages = images.length > 0 ? images : DEFAULT_PREVIEW_IMAGES;

  return (
    <div className="AddNewProperty">
      {/* Top Header Navigation */}
      <header className="AddNewProperty-header">
        <div className="AddNewProperty-header-left">
          <button
            className="AddNewProperty-back-btn"
            type="button"
            aria-label="Go back"
            onClick={handleGoBack}
          >
            <FiArrowLeft />
          </button>
          <div>
            <h1>
              Add New Property{" "}
              <LuBuilding2 className="AddNewProperty-header-icon" />
            </h1>
            <nav className="AddNewProperty-breadcrumb">
              <span>Dashboard</span> &gt; <span>Properties</span> &gt;{" "}
              <span className="active">Add New Property</span>
            </nav>
          </div>
        </div>

        <div className="AddNewProperty-header-actions">
          <button
            type="button"
            className="AddNewProperty-btn-outline"
            onClick={() => setIsPreviewModalOpen(true)}
          >
            <FiEye /> Preview
          </button>
          <button
            type="button"
            className="AddNewProperty-btn-outline"
            onClick={handleSaveDraft}
          >
            <FiBookmark /> Save as Draft
          </button>
          <button type="submit" className="AddNewProperty-btn-primary">
            <FiSend /> Publish Property
          </button>
        </div>
      </header>

      {/* Main Form Body */}
      <form onSubmit={handleSubmit} className="AddNewProperty-container">
        {/* LEFT / CENTER COLUMN */}
        <div className="AddNewProperty-main-content">
          {/* Basic Information */}
          <section className="AddNewProperty-card">
            <div className="AddNewProperty-card-header">
              <LuBuilding2 className="AddNewProperty-card-icon" />
              <h2>Basic Information</h2>
            </div>

            <div className="AddNewProperty-form-group">
              <label>
                Property Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="propertyName"
                placeholder="Enter property name"
                value={formData.propertyName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="AddNewProperty-grid-2">
              <div className="AddNewProperty-form-group">
                <label>
                  Category <span className="required">*</span>
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    {loadingCategories
                      ? "Loading categories..."
                      : "Select category"}
                  </option>

                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="AddNewProperty-form-group">
                <label>
                  Property Type <span className="required">*</span>
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                >
                  <option value="Luxury Villas">Luxury Villas</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Plot">Plot</option>
                </select>
              </div>
            </div>

            <div className="AddNewProperty-grid-2">
              <div className="AddNewProperty-form-group">
                <label>
                  Status <span className="required">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="AddNewProperty-form-group">
                <label>Project Size (sq ft)</label>
                <input
                  type="text"
                  name="projectSize"
                  placeholder="e.g. 15000"
                  value={formData.projectSize}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="AddNewProperty-form-group">
              <label>Completion Status</label>
              <select
                name="completionStatus"
                value={formData.completionStatus}
                onChange={handleChange}
              >
                <option value="Under Construction">Under Construction</option>
                <option value="Ready to Move">Ready to Move</option>
                <option value="Upcoming">Upcoming</option>
              </select>
            </div>

            <div className="AddNewProperty-form-group">
              <label>Short Description</label>
              <div className="AddNewProperty-textarea-wrapper">
                <textarea
                  name="shortDescription"
                  placeholder="Enter short description"
                  maxLength={120}
                  value={formData.shortDescription}
                  onChange={handleChange}
                />
                <span className="AddNewProperty-char-count">
                  {formData.shortDescription.length}/120
                </span>
              </div>
            </div>

            {/* Property Price */}
            <div className="AddNewProperty-grid-2">
              <div className="AddNewProperty-form-group">
                <label>
                  Property Price <span className="required">*</span>
                </label>

                <input
                  type="number"
                  name="price"
                  placeholder="e.g. 12500000"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              <div className="AddNewProperty-form-group">
                <label>Price Per Sq Ft</label>

                <input
                  type="number"
                  name="pricePerSqft"
                  placeholder="e.g. 8500"
                  value={formData.pricePerSqft}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>

            {/* RERA */}
            <div className="AddNewProperty-form-group">
              <label>RERA Number</label>

              <input
                type="text"
                name="rera"
                placeholder="Enter RERA registration number"
                value={formData.rera}
                onChange={handleChange}
              />
            </div>

            <div className="AddNewProperty-form-group">
              <label>Highlights (Key Features)</label>
              {highlights.map((item, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder="Add key feature"
                  value={item}
                  onChange={(e) => handleHighlightChange(index, e.target.value)}
                  className="AddNewProperty-highlight-input"
                />
              ))}
              <button
                type="button"
                onClick={addHighlightField}
                className="AddNewProperty-add-more-btn"
              >
                <FiPlus /> Add Highlight
              </button>
            </div>
          </section>

          {/* Location & Details */}
          <section className="AddNewProperty-card">
            <div className="AddNewProperty-card-header">
              <FiMapPin className="AddNewProperty-card-icon" />
              <h2>Location & Details</h2>
            </div>

            <div className="AddNewProperty-form-group">
              <label>
                Location <span className="required">*</span>
              </label>

              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                disabled={loadingLocations}
              >
                <option value="">
                  {loadingLocations
                    ? "Loading locations..."
                    : locations.length === 0
                      ? "No locations found"
                      : "Select location"}
                </option>

                {locations.map((item) => {
                  const locationName =
                    item.name ||
                    item.locationName ||
                    item.title ||
                    item.city ||
                    item.area ||
                    "";

                  if (!locationName) {
                    return null;
                  }

                  return (
                    <option key={item._id || locationName} value={locationName}>
                      {locationName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="AddNewProperty-grid-3">
              <div className="AddNewProperty-form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="AddNewProperty-form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
              <div className="AddNewProperty-form-group">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          {/* Quick Stats & Property Details Split */}
          <div className="AddNewProperty-grid-2">
            {/* Quick Stats */}
            <section className="AddNewProperty-card">
              <div className="AddNewProperty-card-header">
                <FiBarChart2 className="AddNewProperty-card-icon" />
                <h2>Quick Stats</h2>
              </div>
              <div className="AddNewProperty-form-group">
                <label>Total Units</label>
                <input
                  type="text"
                  name="totalUnits"
                  value={formData.totalUnits}
                  onChange={handleChange}
                />
              </div>
              <div className="AddNewProperty-form-group">
                <label>Available Units</label>
                <input
                  type="text"
                  name="availableUnits"
                  value={formData.availableUnits}
                  onChange={handleChange}
                />
              </div>
              <div className="AddNewProperty-form-group">
                <label>Total Area (sq ft)</label>
                <input
                  type="text"
                  name="totalArea"
                  value={formData.totalArea}
                  onChange={handleChange}
                />
              </div>
              <div className="AddNewProperty-form-group">
                <label>Launch Date</label>
                <div className="AddNewProperty-date-input">
                  <input
                    type="date"
                    name="launchDate"
                    value={formData.launchDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>

            {/* Property Details */}
            <section className="AddNewProperty-card">
              <div className="AddNewProperty-card-header">
                <FiHome className="AddNewProperty-card-icon" />
                <h2>Property Details</h2>
              </div>
              <div className="AddNewProperty-form-group">
                <label>Total Floors</label>
                <input
                  type="text"
                  name="totalFloors"
                  value={formData.totalFloors}
                  onChange={handleChange}
                />
              </div>
              <div className="AddNewProperty-form-group">
                <label>Bedrooms</label>
                <input
                  type="text"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                />
              </div>
              <div className="AddNewProperty-form-group">
                <label>Bathrooms</label>
                <input
                  type="text"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                />
              </div>
              <div className="AddNewProperty-form-group">
                <label>Plot Size (sq ft)</label>
                <input
                  type="text"
                  name="plotSize"
                  value={formData.plotSize}
                  onChange={handleChange}
                />
              </div>
              <div className="AddNewProperty-form-group">
                <label>Parking</label>
                <input
                  type="text"
                  name="parking"
                  value={formData.parking}
                  onChange={handleChange}
                />
              </div>
            </section>
          </div>

          {/* Amenities Section (Exact Reference Style) */}
          <section className="AddNewProperty-card">
            <div className="AddNewProperty-card-header">
              <FiGrid className="AddNewProperty-card-icon purple-grid" />
              <h2 className="section-title">Amenities</h2>
            </div>
            <label className="AddNewProperty-sublabel">Select Amenities</label>
            <div className="AddNewProperty-amenities-container">
              {amenitiesList.map((amenity, index) => {
                const isSelected = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={index}
                    type="button"
                    className={`AddNewProperty-amenity-chip ${isSelected ? "active" : ""}`}
                    onClick={() => toggleAmenity(amenity)}
                  >
                    <FiGrid className="chip-icon" />
                    <span>{amenity}</span>
                  </button>
                );
              })}
              <button
                type="button"
                className="AddNewProperty-amenity-chip add-more"
                onClick={handleAddCustomAmenity}
              >
                <FiPlus className="chip-icon" />
                <span>Add More</span>
              </button>
            </div>
          </section>

          {/* Documents Upload Section */}
          <section className="AddNewProperty-card">
            <div className="AddNewProperty-card-header">
              <LuFolderArchive className="AddNewProperty-card-icon" />
              <h2>Documents</h2>
            </div>
            <div className="AddNewProperty-upload-zone">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleDocumentUpload}
                id="doc-upload"
                hidden
              />
              <label
                htmlFor="doc-upload"
                className="AddNewProperty-upload-label"
              >
                <FiUploadCloud className="AddNewProperty-upload-icon" />
                <p>
                  <strong>Drag & drop files here</strong> or click to browse
                </p>
                <span>PDF, DOC, DOCX (Max 10MB)</span>
              </label>
            </div>
            {documents.length > 0 && (
              <ul className="AddNewProperty-file-list">
                {documents.map((doc, idx) => (
                  <li key={`${doc.name}-${idx}`}>
                    <div>
                      <strong>{doc.name}</strong>

                      <span>{(doc.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setDocuments((prev) =>
                          prev.filter((_, index) => index !== idx),
                        );
                      }}
                    >
                      <FiX />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="AddNewProperty-side-content">
          {/* Property Images Upload */}
          <section className="AddNewProperty-card">
            <div className="AddNewProperty-card-header space-between">
              <div className="AddNewProperty-card-title">
                <FiUploadCloud className="AddNewProperty-card-icon" />
                <h2>
                  Property Images <span className="required">*</span>
                </h2>
              </div>
              <span className="AddNewProperty-badge">Primary</span>
            </div>
            <div className="AddNewProperty-upload-zone">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                id="img-upload"
                hidden
              />
              <label
                htmlFor="img-upload"
                className="AddNewProperty-upload-label"
              >
                <FiUploadCloud className="AddNewProperty-upload-icon" />
                <p>
                  <strong>Drag & drop images here</strong> or click to browse
                </p>
                <span>Recommended: 1200x800px, JPG/PNG, Max 5MB</span>
              </label>
            </div>

            {/* Thumbnail Strip with Default Fallbacks */}
            <div className="AddNewProperty-image-preview-grid">
              {displayImages.map((img, idx) => (
                <div key={idx} className="AddNewProperty-thumb-wrapper">
                  <img src={img} alt={`Thumbnail ${idx}`} />
                </div>
              ))}
            </div>
          </section>

          {/* Dynamic Live Preview Card */}
          <section className="AddNewProperty-card">
            <div className="AddNewProperty-card-header">
              <FiEye className="AddNewProperty-card-icon" />
              <h2>Live Preview</h2>
            </div>
            <div className="AddNewProperty-preview-card">
              <div className="AddNewProperty-preview-image">
                <img src={displayImages[0]} alt="Property Main Preview" />
                {images.length === 0 && (
                  <span className="AddNewProperty-default-badge">
                    Default Preview
                  </span>
                )}
              </div>
              <div className="AddNewProperty-preview-details">
                <h3>{formData.propertyName || "Luxury Villa Title"}</h3>
                <p className="AddNewProperty-preview-subtext">
                  {formData.propertyType || "Luxury Villa"} in{" "}
                  {formData.city || formData.location || "Location Address"}
                </p>
                <div className="AddNewProperty-preview-rating">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="star-filled" />
                  ))}
                  <span>(4.5)</span>
                </div>
                <div className="AddNewProperty-preview-price">
                  {formData.price ? (
                    <>
                      ₹ {Number(formData.price).toLocaleString("en-IN")}
                      {formData.pricePerSqft && (
                        <small>
                          {" "}
                          (₹
                          {Number(formData.pricePerSqft).toLocaleString(
                            "en-IN",
                          )}
                          /sq ft)
                        </small>
                      )}
                    </>
                  ) : (
                    "₹ --"
                  )}
                </div>
              </div>
              <button
                type="button"
                className="AddNewProperty-preview-btn"
                onClick={() => setIsPreviewModalOpen(true)}
              >
                View Full Preview &rarr;
              </button>
            </div>
          </section>

          {/* SEO Settings */}
          <section className="AddNewProperty-card">
            <div className="AddNewProperty-card-header">
              <LuSettings className="AddNewProperty-card-icon" />
              <h2>SEO Settings</h2>
            </div>
            <div className="AddNewProperty-form-group">
              <label>Meta Title</label>
              <div className="AddNewProperty-textarea-wrapper">
                <input
                  type="text"
                  name="metaTitle"
                  maxLength={60}
                  value={formData.metaTitle}
                  onChange={handleChange}
                />
                <span className="AddNewProperty-char-count">
                  {formData.metaTitle.length}/60
                </span>
              </div>
            </div>
            <div className="AddNewProperty-form-group">
              <label>Meta Description</label>
              <div className="AddNewProperty-textarea-wrapper">
                <textarea
                  name="metaDescription"
                  maxLength={160}
                  value={formData.metaDescription}
                  onChange={handleChange}
                />
                <span className="AddNewProperty-char-count">
                  {formData.metaDescription.length}/160
                </span>
              </div>
            </div>
            <div className="AddNewProperty-form-group">
              <label>URL Slug</label>
              <input
                type="text"
                name="urlSlug"
                value={formData.urlSlug}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* Publish Settings */}
          <section className="AddNewProperty-card">
            <div className="AddNewProperty-card-header">
              <FiSend className="AddNewProperty-card-icon" />
              <h2>Publish Settings</h2>
            </div>

            <div className="AddNewProperty-toggle-row">
              <span>Publish Status</span>
              <label className="AddNewProperty-switch">
                <input
                  type="checkbox"
                  name="publishStatus"
                  checked={formData.publishStatus}
                  onChange={handleChange}
                />
                <span className="slider round"></span>
              </label>
              <span className="AddNewProperty-toggle-label">
                {formData.publishStatus ? "Public" : "Draft"}
              </span>
            </div>

            <div className="AddNewProperty-toggle-row">
              <span>Featured Property</span>
              <label className="AddNewProperty-switch">
                <input
                  type="checkbox"
                  name="featuredProperty"
                  checked={formData.featuredProperty}
                  onChange={handleChange}
                />
                <span className="slider round"></span>
              </label>
              <span className="AddNewProperty-toggle-label">
                {formData.featuredProperty ? "Yes" : "No"}
              </span>
            </div>

            <div className="AddNewProperty-form-group">
              <label>Publish Date</label>
              <div className="AddNewProperty-date-input">
                <input
                  type="date"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleChange}
                />
              </div>
              <span className="AddNewProperty-input-subtext">Now</span>
            </div>

            <div className="AddNewProperty-toggle-row">
              <span>Promote Property</span>
              <label className="AddNewProperty-switch">
                <input
                  type="checkbox"
                  name="promoteProperty"
                  checked={formData.promoteProperty}
                  onChange={handleChange}
                />
                <span className="slider round"></span>
              </label>
              <span className="AddNewProperty-toggle-label">
                {formData.promoteProperty ? "Yes" : "No"}
              </span>
            </div>

            <div className="AddNewProperty-side-actions">
              <button
                type="button"
                className="AddNewProperty-btn-outline-full"
                onClick={handleSaveDraft}
              >
                <FiBookmark /> Save as Draft
              </button>
              <button
                type="submit"
                className="AddNewProperty-btn-primary-gradient"
              >
                <FiSend /> Publish Property
              </button>
            </div>
          </section>
        </div>
      </form>

      {/* FULL PREVIEW POPUP MODAL */}
      {isPreviewModalOpen && (
        <div className="AddNewProperty-modal-overlay">
          <div className="AddNewProperty-modal">
            <div className="AddNewProperty-modal-header">
              <h2>Property Live Preview</h2>
              <button
                className="AddNewProperty-modal-close"
                onClick={() => setIsPreviewModalOpen(false)}
              >
                <FiX />
              </button>
            </div>

            <div className="AddNewProperty-modal-body">
              {/* Image Gallery Preview */}
              <div className="AddNewProperty-modal-gallery">
                {displayImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Property preview ${index + 1}`}
                  />
                ))}
              </div>

              {/* Property Main Header */}
              <div className="AddNewProperty-modal-section">
                <h1>{formData.propertyName || "Untitled Property"}</h1>
                <p className="AddNewProperty-modal-subtitle">
                  <FiMapPin /> {formData.location || "Location Address"},{" "}
                  {formData.city} {formData.state} {formData.country}
                </p>
                <div className="AddNewProperty-modal-tags">
                  <span>Category: {formData.category}</span>
                  <span>Type: {formData.propertyType}</span>
                  <span>Status: {formData.status}</span>
                </div>
              </div>

              {/* Description */}
              <div className="AddNewProperty-modal-section">
                <h3>Description</h3>
                <p>{formData.shortDescription || "No description provided."}</p>
              </div>

              {/* Specifications Grid */}
              <div className="AddNewProperty-modal-grid">
                <div>
                  <strong>Bedrooms:</strong> {formData.bedrooms || "N/A"}
                </div>
                <div>
                  <strong>Bathrooms:</strong> {formData.bathrooms || "N/A"}
                </div>
                <div>
                  <strong>Total Floors:</strong> {formData.totalFloors || "N/A"}
                </div>
                <div>
                  <strong>Total Area:</strong>{" "}
                  {formData.totalArea ? `${formData.totalArea} sq ft` : "N/A"}
                </div>
                <div>
                  <strong>Plot Size:</strong>{" "}
                  {formData.plotSize ? `${formData.plotSize} sq ft` : "N/A"}
                </div>
                <div>
                  <strong>Parking:</strong> {formData.parking || "N/A"}
                </div>
              </div>

              {/* Amenities List */}
              <div className="AddNewProperty-modal-section">
                <h3>Selected Amenities</h3>
                <div className="AddNewProperty-amenities-container">
                  {selectedAmenities.map((amenity, idx) => (
                    <span key={idx} className="AddNewProperty-modal-chip">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewProperty;
