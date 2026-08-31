import React, {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  FiSearch,
  FiChevronDown,
  FiSliders,
  FiArrowUpRight,
  FiMapPin,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import API from "../../api/axios";

import "./HomeBreadcrum.css";

import heroImg from "../../assets/slider-1.webp";

const HomeBreadcrum = () => {
  // =====================================================
  // NAVIGATION
  // =====================================================
  const navigate = useNavigate();

  // =====================================================
  // ACTIVE TAB
  // =====================================================
  const [activeTab, setActiveTab] = useState("Rent");

  // =====================================================
  // SEARCH
  // =====================================================
  const [keyword, setKeyword] = useState("");
  const [propertyType, setPropertyType] = useState("Property type");
  const [location, setLocation] = useState("Location");

  // =====================================================
  // SELECTED PROPERTY
  // =====================================================
  const [selectedProperty, setSelectedProperty] = useState(null);

  // =====================================================
  // DROPDOWNS
  // =====================================================
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // =====================================================
  // ADVANCED FILTERS
  // =====================================================
  const [baths, setBaths] = useState("Any");
  const [beds, setBeds] = useState("Any");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // =====================================================
  // BACKEND DATA
  // =====================================================
  const [properties, setProperties] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(false);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  // =====================================================
  // REF
  // =====================================================
  const dropdownRef = useRef(null);

  // =====================================================
  // STATS
  // =====================================================
  const statsData = {
    Rent: {
      properties: "1,500+",
      customers: "700+",
    },
    Buy: {
      properties: "3,200+",
      customers: "1,400+",
    },
  };

  // =====================================================
  // AMENITIES
  // =====================================================
  const amenitiesList = [
    "Swimming pool",
    "Balcony",
    "Ensuite",
    "Tennis court",
    "Garage",
    "Outdoor area",
    "Built in robes",
    "Study",
    "Alarm system",
    "Broadband",
    "Gym",
    "Outdoor spa",
  ];

  // =====================================================
  // FETCH PROPERTIES
  // =====================================================
  const fetchProperties = async () => {
    try {
      setLoadingProperties(true);
      const response = await API.get("/properties");
      const propertyData =
        response.data?.properties ||
        response.data?.data ||
        response.data?.results ||
        response.data;

      if (Array.isArray(propertyData)) {
        setProperties(propertyData);
      } else {
        setProperties([]);
      }
    } catch (error) {
      console.error("FETCH PROPERTIES ERROR:", error.response?.data || error);
      setProperties([]);
    } finally {
      setLoadingProperties(false);
    }
  };

  // =====================================================
  // FETCH LOCATIONS
  // =====================================================
  const fetchLocations = async () => {
    try {
      setLoadingLocations(true);
      const response = await API.get("/locations");
      const locationData =
        response.data?.locations ||
        response.data?.data ||
        response.data?.results ||
        response.data;

      if (Array.isArray(locationData)) {
        setLocations(locationData);
      } else {
        setLocations([]);
      }
    } catch (error) {
      console.error("FETCH LOCATIONS ERROR:", error.response?.data || error);
      setLocations([]);
    } finally {
      setLoadingLocations(false);
    }
  };

  // =====================================================
  // LOAD DATA
  // =====================================================
  useEffect(() => {
    fetchProperties();
    fetchLocations();
  }, []);

  // =====================================================
  // CLOSE DROPDOWNS
  // =====================================================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowPropertyDropdown(false);
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =====================================================
  // GET PROPERTY NAME
  // =====================================================
  const getPropertyName = (property) => {
    return String(
      property?.name || property?.title || "Unnamed Property"
    ).trim();
  };

  // =====================================================
  // GET LOCATION NAME
  // =====================================================
  const getPropertyLocationName = (property) => {
    const locationValue = property?.location;

    if (typeof locationValue === "string") {
      return locationValue.trim();
    }

    if (locationValue && typeof locationValue === "object") {
      return String(
        locationValue?.name ||
          locationValue?.title ||
          locationValue?.city ||
          locationValue?.locationName ||
          locationValue?.area ||
          locationValue?.address ||
          ""
      ).trim();
    }

    return String(
      property?.city ||
        property?.state ||
        property?.address ||
        "Location not available"
    ).trim();
  };

  const getLocationName = (locationItem) => {
    if (typeof locationItem === "string") {
      return locationItem.trim();
    }

    if (!locationItem || typeof locationItem !== "object") {
      return "";
    }

    return String(
      locationItem?.name ||
        locationItem?.title ||
        locationItem?.locationName ||
        locationItem?.city ||
        locationItem?.area ||
        locationItem?.address ||
        ""
    ).trim();
  };

  const getPropertyId = (property) => {
    return property?._id || property?.id || property?.propertyId;
  };

  // =====================================================
  // AMENITY CHANGE
  // =====================================================
  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  // =====================================================
  // SELECT PROPERTY
  // =====================================================
  const handlePropertySelect = (property) => {
    const propertyId = getPropertyId(property);
    if (!propertyId) {
      alert("Property ID not found.");
      return;
    }

    const propertyName = getPropertyName(property);
    const propertyLocation = getPropertyLocationName(property);

    setSelectedProperty(property);
    setPropertyType(propertyName);
    setLocation(propertyLocation);
    setShowPropertyDropdown(false);
    setShowLocationDropdown(false);
  };

  // =====================================================
  // SELECT LOCATION
  // =====================================================
  const handleLocationSelect = (loc) => {
    const locationName = getLocationName(loc);
    setLocation(locationName);
    setSelectedProperty(null);
    setPropertyType("Property type");
    setShowLocationDropdown(false);
    setShowPropertyDropdown(false);
  };

  const clearSelectedProperty = () => {
    setSelectedProperty(null);
    setPropertyType("Property type");
  };

  // =====================================================
  // SEARCH
  // =====================================================
  const handleSearch = async () => {
    try {
      setSearchLoading(true);

      if (selectedProperty) {
        const propertyId = getPropertyId(selectedProperty);
        if (!propertyId) {
          alert("Property ID not found.");
          return;
        }

        setShowPropertyDropdown(false);
        setShowLocationDropdown(false);
        setShowAdvancedFilters(false);
        navigate(`/property-details/${propertyId}`);
        return;
      }

      const searchKeyword = keyword.trim().toLowerCase();
      const selectedPropertyName =
        propertyType !== "Property type" ? propertyType.trim().toLowerCase() : "";
      const selectedLocation =
        location !== "Location" ? location.trim().toLowerCase() : "";

      let filteredProperties = [...properties];

      if (activeTab === "Rent") {
        filteredProperties = filteredProperties.filter((property) => {
          const categoryParent = String(property?.categoryParent || "").toLowerCase();
          const statusType = String(property?.statusType || "").toLowerCase();
          const transactionType = String(property?.transactionType || "").toLowerCase();

          return (
            categoryParent === "rent" ||
            statusType.includes("rent") ||
            transactionType.includes("rent")
          );
        });
      }

      if (activeTab === "Buy") {
        filteredProperties = filteredProperties.filter((property) => {
          const categoryParent = String(property?.categoryParent || "").toLowerCase();
          const statusType = String(property?.statusType || "").toLowerCase();
          const transactionType = String(property?.transactionType || "").toLowerCase();

          return (
            categoryParent !== "rent" &&
            (statusType.includes("sale") || transactionType.includes("sale"))
          );
        });
      }

      if (searchKeyword) {
        filteredProperties = filteredProperties.filter((property) => {
          const propertyName = getPropertyName(property).toLowerCase();
          const propertyLocation = getPropertyLocationName(property).toLowerCase();
          const city = String(property?.city || "").toLowerCase();
          const state = String(property?.state || "").toLowerCase();
          const category = String(property?.category || "").toLowerCase();
          const type = String(property?.type || "").toLowerCase();

          return (
            propertyName.includes(searchKeyword) ||
            propertyLocation.includes(searchKeyword) ||
            city.includes(searchKeyword) ||
            state.includes(searchKeyword) ||
            category.includes(searchKeyword) ||
            type.includes(searchKeyword)
          );
        });
      }

      if (selectedPropertyName) {
        filteredProperties = filteredProperties.filter((property) => {
          const propertyName = getPropertyName(property).toLowerCase();
          return propertyName.includes(selectedPropertyName);
        });
      }

      if (selectedLocation) {
        filteredProperties = filteredProperties.filter((property) => {
          const propertyLocation = getPropertyLocationName(property).toLowerCase();
          const city = String(property?.city || "").toLowerCase();
          const state = String(property?.state || "").toLowerCase();
          const address = String(property?.address || "").toLowerCase();

          return (
            propertyLocation.includes(selectedLocation) ||
            city.includes(selectedLocation) ||
            state.includes(selectedLocation) ||
            address.includes(selectedLocation)
          );
        });
      }

      if (beds !== "Any") {
        const minimumBeds = Number(beds);
        filteredProperties = filteredProperties.filter((property) => {
          const propertyBeds = Number(property?.bedrooms || property?.beds || 0);
          return propertyBeds >= minimumBeds;
        });
      }

      if (baths !== "Any") {
        const minimumBaths = Number(baths);
        filteredProperties = filteredProperties.filter((property) => {
          const propertyBaths = Number(property?.bathrooms || property?.baths || 0);
          return propertyBaths >= minimumBaths;
        });
      }

      if (selectedAmenities.length > 0) {
        filteredProperties = filteredProperties.filter((property) => {
          const propertyAmenities = Array.isArray(property?.amenities)
            ? property.amenities
            : [];

          return selectedAmenities.every((selectedAmenity) =>
            propertyAmenities.some((propertyAmenity) =>
              String(propertyAmenity)
                .toLowerCase()
                .includes(selectedAmenity.toLowerCase())
            )
          );
        });
      }

      if (filteredProperties.length === 0) {
        alert("No properties found for your search.");
        return;
      }

      const property = filteredProperties[0];
      const propertyId = getPropertyId(property);

      if (!propertyId) {
        alert("Property ID not found.");
        return;
      }

      setSelectedProperty(property);
      setPropertyType(getPropertyName(property));
      setLocation(getPropertyLocationName(property));
      setShowPropertyDropdown(false);
      setShowLocationDropdown(false);
      setShowAdvancedFilters(false);

      navigate(`/property-details/${propertyId}`);
    } catch (error) {
      console.error("PROPERTY SEARCH ERROR:", error);
      alert(error.response?.data?.message || "Unable to search properties.");
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="HomeBreadcrum" role="search" aria-label="Hero Search Section">
      <div className="HomeBreadcrum-container">

        {/* LEFT COLUMN */}
        <div className="HomeBreadcrum-left">
          <div className="HomeBreadcrum-badgeTag">
            Utkal Property Services
          </div>

          <h1 className="HomeBreadcrum-title">
            We will find a{" "}
            <span className="highlight-green">
              perfect home
            </span>{" "}
            for you
          </h1>

          <p className="HomeBreadcrum-subtitle">
            Find a variety of premium properties that suit your lifestyle effortlessly. Forget all difficulties in finding your dream residence.
          </p>

          {/* SEARCH CONTAINER */}
          <div
            className="HomeBreadcrum-searchCardContainer"
            ref={dropdownRef}
          >
            {/* TABS */}
            <div className="HomeBreadcrum-tabs" role="tablist" aria-label="Search Transaction Type">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "Rent"}
                className={`HomeBreadcrum-tab ${
                  activeTab === "Rent" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab("Rent");
                  clearSelectedProperty();
                }}
              >
                Rent
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "Buy"}
                className={`HomeBreadcrum-tab ${
                  activeTab === "Buy" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab("Buy");
                  clearSelectedProperty();
                }}
              >
                Buy
              </button>
            </div>

            {/* SEARCH CARD */}
            <div className="HomeBreadcrum-searchCard">
              {/* KEYWORD */}
              <div className="HomeBreadcrum-field HomeBreadcrum-inputField">
                <input
                  type="text"
                  placeholder="Type keyword..."
                  aria-label="Search keyword"
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    if (selectedProperty) {
                      setSelectedProperty(null);
                      setPropertyType("Property type");
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
              </div>

              {/* PROPERTY DROPDOWN */}
              <div className="HomeBreadcrum-field HomeBreadcrum-dropdownField">
                <div
                  className="HomeBreadcrum-dropdownHeader"
                  role="button"
                  tabIndex={0}
                  aria-label="Select Property"
                  aria-expanded={showPropertyDropdown}
                  onClick={() => {
                    setShowPropertyDropdown(!showPropertyDropdown);
                    setShowLocationDropdown(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setShowPropertyDropdown(!showPropertyDropdown);
                      setShowLocationDropdown(false);
                    }
                  }}
                >
                  <div className="HomeBreadcrum-selectedProperty">
                    <span className="HomeBreadcrum-selectedPropertyName">
                      {selectedProperty
                        ? getPropertyName(selectedProperty)
                        : propertyType}
                    </span>

                    {selectedProperty && (
                      <span className="HomeBreadcrum-selectedPropertyLocation">
                        <FiMapPin aria-hidden="true" />
                        {getPropertyLocationName(selectedProperty)}
                      </span>
                    )}
                  </div>
                  <FiChevronDown className="HomeBreadcrum-arrowIcon" aria-hidden="true" />
                </div>

                {showPropertyDropdown && (
                  <div className="HomeBreadcrum-dropdownMenu">
                    <div className="HomeBreadcrum-dropdownTitle">
                      Select Property
                    </div>

                    <ul>
                      {loadingProperties ? (
                        <li className="HomeBreadcrum-loadingItem">
                          Loading properties...
                        </li>
                      ) : properties.length > 0 ? (
                        properties.map((property, index) => {
                          const propertyName = getPropertyName(property);
                          const propertyLocation = getPropertyLocationName(property);
                          const propertyId = getPropertyId(property);

                          return (
                            <li
                              key={propertyId || index}
                              className={`HomeBreadcrum-propertyItem ${
                                selectedProperty &&
                                getPropertyId(selectedProperty) === propertyId
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() => handlePropertySelect(property)}
                            >
                              <div className="HomeBreadcrum-propertyIcon" aria-hidden="true">
                                <FiMapPin />
                              </div>

                              <div className="HomeBreadcrum-propertyContent">
                                <strong>{propertyName}</strong>
                                <span>{propertyLocation}</span>
                              </div>
                            </li>
                          );
                        })
                      ) : (
                        <li className="HomeBreadcrum-emptyItem">
                          No properties found
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* LOCATION DROPDOWN */}
              <div className="HomeBreadcrum-field HomeBreadcrum-dropdownField">
                <div
                  className="HomeBreadcrum-dropdownHeader"
                  role="button"
                  tabIndex={0}
                  aria-label="Select Location"
                  aria-expanded={showLocationDropdown}
                  onClick={() => {
                    setShowLocationDropdown(!showLocationDropdown);
                    setShowPropertyDropdown(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setShowLocationDropdown(!showLocationDropdown);
                      setShowPropertyDropdown(false);
                    }
                  }}
                >
                  <span>{location}</span>
                  <FiChevronDown className="HomeBreadcrum-arrowIcon" aria-hidden="true" />
                </div>

                {showLocationDropdown && (
                  <div className="HomeBreadcrum-dropdownMenu">
                    <div className="HomeBreadcrum-dropdownTitle">
                      Select Location
                    </div>

                    <ul>
                      {loadingLocations ? (
                        <li className="HomeBreadcrum-loadingItem">
                          Loading locations...
                        </li>
                      ) : locations.length > 0 ? (
                        locations.map((loc, index) => {
                          const locationName = getLocationName(loc);

                          return (
                            <li
                              key={loc?._id || index}
                              className="HomeBreadcrum-locationItem"
                              onClick={() => handleLocationSelect(loc)}
                            >
                              <FiMapPin aria-hidden="true" />
                              <span>{locationName}</span>
                            </li>
                          );
                        })
                      ) : (
                        <li className="HomeBreadcrum-emptyItem">
                          No locations found
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* FILTER TOGGLE BUTTON */}
              <button
                type="button"
                className={`HomeBreadcrum-filterBtn ${
                  showAdvancedFilters ? "active" : ""
                }`}
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                aria-label={showAdvancedFilters ? "Collapse advanced search filters" : "Expand advanced search filters"}
                aria-expanded={showAdvancedFilters}
              >
                <FiSliders aria-hidden="true" />
              </button>

              {/* SEARCH BUTTON */}
              <button
                type="button"
                className="HomeBreadcrum-searchBtn"
                onClick={handleSearch}
                disabled={searchLoading}
                aria-label="Search properties now"
              >
                <span>
                  {searchLoading ? "Searching..." : "Search Now"}
                </span>
                <FiSearch className="HomeBreadcrum-searchIcon" aria-hidden="true" />
              </button>
            </div>

            {/* ADVANCED FILTER PANEL */}
            {showAdvancedFilters && (
              <div className="HomeBreadcrum-filterPanel" aria-label="Advanced filter panel">
                <div className="HomeBreadcrum-filterTop">
                  <div className="HomeBreadcrum-filterSelectGroup">
                    <div className="HomeBreadcrum-filterSelect">
                      <select
                        value={baths}
                        aria-label="Filter minimum bathrooms"
                        onChange={(e) => setBaths(e.target.value)}
                      >
                        <option value="Any">Baths: Any</option>
                        <option value="1">Baths: 1+</option>
                        <option value="2">Baths: 2+</option>
                        <option value="3">Baths: 3+</option>
                      </select>
                      <FiChevronDown className="HomeBreadcrum-selectArrow" aria-hidden="true" />
                    </div>

                    <div className="HomeBreadcrum-filterSelect">
                      <select
                        value={beds}
                        aria-label="Filter minimum bedrooms"
                        onChange={(e) => setBeds(e.target.value)}
                      >
                        <option value="Any">Beds: Any</option>
                        <option value="1">Beds: 1+</option>
                        <option value="2">Beds: 2+</option>
                        <option value="3">Beds: 3+</option>
                      </select>
                      <FiChevronDown className="HomeBreadcrum-selectArrow" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="HomeBreadcrum-filterHeaderLabel">
                    <span>Form —</span>
                  </div>

                  <div className="HomeBreadcrum-filterHeaderLabel">
                    <span>Size —</span>
                  </div>
                </div>

                <div className="HomeBreadcrum-divider" role="separator" />

                <div className="HomeBreadcrum-amenitiesGrid" aria-label="Filter amenities">
                  {amenitiesList.map((amenity, index) => (
                    <label key={index} className="HomeBreadcrum-checkboxLabel">
                      <input
                        type="checkbox"
                        aria-label={`Include amenity: ${amenity}`}
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                      />
                      <span className="HomeBreadcrum-customCheckbox" aria-hidden="true"></span>
                      <span className="HomeBreadcrum-amenityText">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* STATS */}
          <div className="HomeBreadcrum-stats">
            <div className="HomeBreadcrum-statItem">
              <h3>{statsData[activeTab].properties}</h3>
              <p>Properties Ready</p>
            </div>

            <div className="HomeBreadcrum-statItem">
              <h3>{statsData[activeTab].customers}</h3>
              <p>Happy Customers</p>
            </div>
          </div>
        </div>

        {/* RIGHT HERO IMAGE (LCP OPTIMIZED) */}
        <div className="HomeBreadcrum-right">
          <div className="HomeBreadcrum-badgeWrapper">
            <div className="HomeBreadcrum-badgeTextContainer">
              <svg viewBox="0 0 100 100" className="HomeBreadcrum-rotatingSvg" aria-hidden="true">
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="transparent"
                />
                <text className="HomeBreadcrum-svgText">
                  <textPath href="#circlePath" startOffset="0%">
                    find your dreams real estate •
                  </textPath>
                </text>
              </svg>
            </div>

            <div className="HomeBreadcrum-badgeArrow" aria-hidden="true">
              <FiArrowUpRight />
            </div>
          </div>

          <div className="HomeBreadcrum-imageArch">
            <img
              src={heroImg}
              alt="Real Estate Architecture"
              className="HomeBreadcrum-heroImage"
              fetchPriority="high"
              loading="eager"
              decoding="async"
              width="500"
              height="570"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomeBreadcrum;