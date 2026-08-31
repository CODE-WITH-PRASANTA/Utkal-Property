import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
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

import heroImg from "../../assets/slider-1.png";


const HomeBreadcrum = () => {

  const navigate = useNavigate();

  /* =========================================================
     ACTIVE TAB
  ========================================================= */

  const [activeTab, setActiveTab] =
    useState("Buy");


  /* =========================================================
     SEARCH VALUES
  ========================================================= */

  const [keyword, setKeyword] =
    useState("");

  const [propertyType, setPropertyType] =
    useState("Property type");

  const [location, setLocation] =
    useState("Location");

  const [area, setArea] =
    useState("Area");


  /* =========================================================
     SELECTED PROPERTY
  ========================================================= */

  const [
    selectedProperty,
    setSelectedProperty,
  ] = useState(null);


  /* =========================================================
     DROPDOWNS
  ========================================================= */

  const [
    showPropertyDropdown,
    setShowPropertyDropdown,
  ] = useState(false);

  const [
    showLocationDropdown,
    setShowLocationDropdown,
  ] = useState(false);

  const [
    showAreaDropdown,
    setShowAreaDropdown,
  ] = useState(false);

  const [
    showAdvancedFilters,
    setShowAdvancedFilters,
  ] = useState(false);


  /* =========================================================
     ADVANCED FILTERS
  ========================================================= */

  const [beds, setBeds] =
    useState("Any");

  const [baths, setBaths] =
    useState("Any");

  const [
    selectedAmenities,
    setSelectedAmenities,
  ] = useState([]);


  /* =========================================================
     BACKEND DATA
  ========================================================= */

  const [properties, setProperties] =
    useState([]);

  const [locations, setLocations] =
    useState([]);

  const [
    loadingProperties,
    setLoadingProperties,
  ] = useState(false);

  const [
    loadingLocations,
    setLoadingLocations,
  ] = useState(false);

  const [
    searchLoading,
    setSearchLoading,
  ] = useState(false);


  /* =========================================================
     REF
  ========================================================= */

  const dropdownRef =
    useRef(null);


  /* =========================================================
     STATS
  ========================================================= */

  const statsData = {

    Buy: {
      properties: "3,200+",
      customers: "1,400+",
    },

    Rent: {
      properties: "1,500+",
      customers: "700+",
    },

  };


  /* =========================================================
     AMENITIES
  ========================================================= */

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


  /* =========================================================
     PROPERTY TYPES
  ========================================================= */

const propertyTypeOptions = [
  "Apartment",
  "Villa",
  "Duplex / Independent House",
  "Plot",
  "Commercial Property",
];


  /* =========================================================
     FETCH PROPERTIES
  ========================================================= */

  const fetchProperties = async () => {

    try {

      setLoadingProperties(true);

      const response =
        await API.get("/properties");

      const propertyData =
        response.data?.properties ||
        response.data?.data ||
        response.data?.results ||
        response.data;

      if (
        Array.isArray(propertyData)
      ) {

        setProperties(
          propertyData
        );

      } else {

        setProperties([]);

      }

    } catch (error) {

      console.error(
        "FETCH PROPERTIES ERROR:",
        error.response?.data ||
        error
      );

      setProperties([]);

    } finally {

      setLoadingProperties(false);

    }

  };


  /* =========================================================
     FETCH LOCATIONS
  ========================================================= */

  const fetchLocations = async () => {

    try {

      setLoadingLocations(true);

      const response =
        await API.get("/locations");

      const locationData =
        response.data?.locations ||
        response.data?.data ||
        response.data?.results ||
        response.data;

      if (
        Array.isArray(locationData)
      ) {

        setLocations(
          locationData
        );

      } else {

        setLocations([]);

      }

    } catch (error) {

      console.error(
        "FETCH LOCATIONS ERROR:",
        error.response?.data ||
        error
      );

      setLocations([]);

    } finally {

      setLoadingLocations(false);

    }

  };


  /* =========================================================
     LOAD DATA
  ========================================================= */

  useEffect(() => {

    fetchProperties();

    fetchLocations();

  }, []);


  /* =========================================================
     CLOSE DROPDOWNS
  ========================================================= */

  useEffect(() => {

    const handleClickOutside =
      (event) => {

        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(
            event.target
          )
        ) {

          setShowPropertyDropdown(false);

          setShowLocationDropdown(false);

          setShowAreaDropdown(false);

        }

      };


    document.addEventListener(
      "mousedown",
      handleClickOutside
    );


    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);


  /* =========================================================
     PROPERTY NAME
  ========================================================= */

  const getPropertyName = (
    property
  ) => {

    return String(
      property?.name ||
      property?.title ||
      property?.propertyName ||
      "Unnamed Property"
    ).trim();

  };


  /* =========================================================
     PROPERTY LOCATION
  ========================================================= */

  const getPropertyLocationName = (
    property
  ) => {

    const locationValue =
      property?.location;


    if (
      typeof locationValue ===
      "string"
    ) {

      return locationValue.trim();

    }


    if (
      locationValue &&
      typeof locationValue ===
      "object"
    ) {

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
      ""
    ).trim();

  };


  /* =========================================================
     PROPERTY AREA
  ========================================================= */

  const getPropertyAreaName = (
    property
  ) => {

    const locationValue =
      property?.location;


    if (
      locationValue &&
      typeof locationValue ===
      "object"
    ) {

      return String(
        locationValue?.area ||
        locationValue?.areaName ||
        ""
      ).trim();

    }


    return String(
      property?.area ||
      property?.areaName ||
      property?.preferredArea ||
      ""
    ).trim();

  };


  /* =========================================================
     PROPERTY TYPE
  ========================================================= */

  const getPropertyTypeName = (
    property
  ) => {

    return String(
      property?.type ||
      property?.propertyType ||
      property?.category ||
      ""
    ).trim();

  };


  /* =========================================================
     LOCATION CITY
  ========================================================= */

  const getLocationCity = (
    locationItem
  ) => {

    if (
      typeof locationItem ===
      "string"
    ) {

      return locationItem.trim();

    }


    if (
      !locationItem ||
      typeof locationItem !==
      "object"
    ) {

      return "";

    }


    return String(
      locationItem?.city ||
      locationItem?.name ||
      locationItem?.title ||
      locationItem?.locationName ||
      ""
    ).trim();

  };


  /* =========================================================
     LOCATION AREA
  ========================================================= */

  const getLocationArea = (
    locationItem
  ) => {

    if (
      !locationItem ||
      typeof locationItem !==
      "object"
    ) {

      return "";

    }


    return String(
      locationItem?.area ||
      locationItem?.areaName ||
      ""
    ).trim();

  };


  /* =========================================================
     UNIQUE LOCATION OPTIONS
  ========================================================= */

  const locationOptions =
    useMemo(() => {

      const map =
        new Map();


      locations.forEach(
        (item) => {

          const city =
            getLocationCity(item);


          if (!city) {

            return;

          }


          const key =
            city.toLowerCase();


          if (
            !map.has(key)
          ) {

            map.set(
              key,
              city
            );

          }

        }
      );


      return Array.from(
        map.values()
      );

    }, [locations]);


  /* =========================================================
     AREA OPTIONS
  ========================================================= */

  const areaOptions =
    useMemo(() => {

      if (
        !location ||
        location === "Location"
      ) {

        return [];

      }


      const map =
        new Map();


      locations.forEach(
        (item) => {

          const city =
            getLocationCity(item);

          const itemArea =
            getLocationArea(item);


          if (
            city &&
            itemArea &&
            city.toLowerCase() ===
            location.toLowerCase()
          ) {

            const key =
              itemArea.toLowerCase();


            if (
              !map.has(key)
            ) {

              map.set(
                key,
                itemArea
              );

            }

          }

        }
      );


      return Array.from(
        map.values()
      );

    }, [
      locations,
      location,
    ]);


  /* =========================================================
     CLEAR PROPERTY
  ========================================================= */

  const clearSelectedProperty = () => {

    setSelectedProperty(null);

    setPropertyType(
      "Property type"
    );

    setLocation(
      "Location"
    );

    setArea(
      "Area"
    );

  };


  /* =========================================================
     SELECT PROPERTY TYPE
  ========================================================= */

  const handlePropertyTypeSelect = (
    type
  ) => {

    setPropertyType(type);

    setSelectedProperty(null);

    setShowPropertyDropdown(false);

  };


  /* =========================================================
     SELECT LOCATION
  ========================================================= */

  const handleLocationSelect = (
    loc
  ) => {

    const locationName =
      getLocationCity(loc);


    setLocation(
      locationName
    );

    setArea("Area");

    setSelectedProperty(null);

    setPropertyType(
      "Property type"
    );

    setShowLocationDropdown(false);

    setShowAreaDropdown(false);

    setShowPropertyDropdown(false);

  };


  /* =========================================================
     SELECT AREA
  ========================================================= */

  const handleAreaSelect = (
    selectedArea
  ) => {

    setArea(
      selectedArea
    );

    setSelectedProperty(null);

    setShowAreaDropdown(false);

  };


  /* =========================================================
     AMENITY
  ========================================================= */

  const handleAmenityChange = (
    amenity
  ) => {

    setSelectedAmenities(
      (previous) => {

        if (
          previous.includes(
            amenity
          )
        ) {

          return previous.filter(
            (item) =>
              item !== amenity
          );

        }

        return [
          ...previous,
          amenity,
        ];

      }
    );

  };


  /* =========================================================
     FIND EXACT PROPERTY
     
     If user types an exact property
     name/title, open details directly.
  ========================================================= */

  const findExactProperty = (
    searchText
  ) => {

    const query =
      String(searchText || "")
        .trim()
        .toLowerCase();


    if (!query) {

      return null;

    }


    return (
      properties.find(
        (property) => {

          const name =
            getPropertyName(
              property
            ).toLowerCase();

          return (
            name === query
          );

        }
      ) || null
    );

  };


  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearch = () => {

    try {

      setSearchLoading(true);


      /* =====================================================
         CLOSE DROPDOWNS
      ===================================================== */

      setShowPropertyDropdown(false);

      setShowLocationDropdown(false);

      setShowAreaDropdown(false);

      setShowAdvancedFilters(false);


      /* =====================================================
         1. SELECTED PROPERTY
         
         DIRECT DETAILS PAGE
      ===================================================== */

      if (
        selectedProperty
      ) {

        const propertyId =
          selectedProperty?._id ||
          selectedProperty?.id ||
          selectedProperty?.propertyId;


        if (!propertyId) {

          alert(
            "Property ID not found."
          );

          return;

        }


        navigate(
          `/property-details/${propertyId}`
        );

        return;

      }


      /* =====================================================
         2. EXACT PROPERTY NAME FROM KEYWORD
         
         Example:
         "Green Valley Residency"
         
         → property details
      ===================================================== */

      const exactProperty =
        findExactProperty(
          keyword
        );


      if (
        exactProperty
      ) {

        const propertyId =
          exactProperty?._id ||
          exactProperty?.id ||
          exactProperty?.propertyId;


        if (propertyId) {

          navigate(
            `/property-details/${propertyId}`
          );

          return;

        }

      }


      /* =====================================================
         3. NORMAL PROPERTY LISTING SEARCH
      ===================================================== */

      const params =
        new URLSearchParams();


      /* -----------------------------------------------------
         BUY / RENT
      ----------------------------------------------------- */

      if (
        activeTab
      ) {

        params.set(
          "tab",
          activeTab.toLowerCase()
        );

      }


      /* -----------------------------------------------------
         KEYWORD
      ----------------------------------------------------- */

      if (
        keyword.trim()
      ) {

        params.set(
          "keyword",
          keyword.trim()
        );

      }


      /* -----------------------------------------------------
         PROPERTY TYPE
      ----------------------------------------------------- */

      if (
        propertyType &&
        propertyType !==
        "Property type"
      ) {

        params.set(
          "propertyType",
          propertyType
        );

      }


      /* -----------------------------------------------------
         LOCATION
      ----------------------------------------------------- */

      if (
        location &&
        location !==
        "Location"
      ) {

        params.set(
          "location",
          location
        );

      }


      /* -----------------------------------------------------
         AREA
      ----------------------------------------------------- */

      if (
        area &&
        area !==
        "Area"
      ) {

        params.set(
          "area",
          area
        );

      }


      /* -----------------------------------------------------
         BEDS
      ----------------------------------------------------- */

      if (
        beds &&
        beds !== "Any"
      ) {

        params.set(
          "beds",
          beds
        );

      }


      /* -----------------------------------------------------
         BATHS
      ----------------------------------------------------- */

      if (
        baths &&
        baths !== "Any"
      ) {

        params.set(
          "baths",
          baths
        );

      }


      /* -----------------------------------------------------
         AMENITIES
      ----------------------------------------------------- */

      if (
        selectedAmenities.length
      ) {

        params.set(
          "amenities",
          selectedAmenities.join(",")
        );

      }


      /* =====================================================
         NAVIGATE TO PROPERTY GRID
      ===================================================== */

      const queryString =
        params.toString();


      navigate(
        queryString
          ? `/properties?${queryString}`
          : "/properties"
      );


    } catch (error) {

      console.error(
        "PROPERTY SEARCH ERROR:",
        error
      );

      alert(
        "Unable to search properties."
      );

    } finally {

      setSearchLoading(false);

    }

  };


  /* =========================================================
     RENDER
  ========================================================= */

  return (

    <div className="HomeBreadcrum">

      <div className="HomeBreadcrum-container">


        {/* =================================================
            LEFT
        ================================================= */}

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

            Find a variety of premium
            properties that suit your
            lifestyle effortlessly. Forget
            all difficulties in finding your
            dream residence.

          </p>


          {/* =================================================
              SEARCH CARD
          ================================================= */}

          <div
            className="HomeBreadcrum-searchCardContainer"
            ref={dropdownRef}
          >


            {/* ===============================================
                BUY RENT
            =============================================== */}

            <div className="HomeBreadcrum-tabs">

              <button
                type="button"
                className={`HomeBreadcrum-tab ${
                  activeTab === "Buy"
                    ? "active"
                    : ""
                }`}
                onClick={() => {

                  setActiveTab("Buy");

                  clearSelectedProperty();

                }}
              >
                Buy
              </button>


              <button
                type="button"
                className={`HomeBreadcrum-tab ${
                  activeTab === "Rent"
                    ? "active"
                    : ""
                }`}
                onClick={() => {

                  setActiveTab("Rent");

                  clearSelectedProperty();

                }}
              >
                Rent
              </button>

            </div>


            {/* =================================================
                SEARCH CARD
            ================================================= */}

            <div className="HomeBreadcrum-searchCard">


              {/* =================================================
                  KEYWORD
              ================================================= */}

              <div className="HomeBreadcrum-field HomeBreadcrum-inputField">

                <input
                  type="text"
                  placeholder="Type keyword..."
                  value={keyword}
                  onChange={(event) => {

                    setKeyword(
                      event.target.value
                    );


                    if (
                      selectedProperty
                    ) {

                      setSelectedProperty(
                        null
                      );

                    }

                  }}
                  onKeyDown={(event) => {

                    if (
                      event.key ===
                      "Enter"
                    ) {

                      handleSearch();

                    }

                  }}
                />

              </div>


              {/* =================================================
                  PROPERTY TYPE
              ================================================= */}

              <div className="HomeBreadcrum-field HomeBreadcrum-dropdownField">

                <div
                  className="HomeBreadcrum-dropdownHeader"
                  onClick={() => {

                    setShowPropertyDropdown(
                      !showPropertyDropdown
                    );

                    setShowLocationDropdown(
                      false
                    );

                    setShowAreaDropdown(
                      false
                    );

                  }}
                >

                  <div className="HomeBreadcrum-selectedProperty">

                    <span className="HomeBreadcrum-selectedPropertyName">

                      {propertyType}

                    </span>

                  </div>


                  <FiChevronDown
                    className="HomeBreadcrum-arrowIcon"
                  />

                </div>


                {showPropertyDropdown && (

                  <div className="HomeBreadcrum-dropdownMenu">

                    <div className="HomeBreadcrum-dropdownTitle">
                      Select Property Type
                    </div>


                    <ul>

                      {propertyTypeOptions.map(
                        (
                          type,
                          index
                        ) => (

                          <li
                            key={`${type}-${index}`}
                            className="HomeBreadcrum-propertyItem"
                            onClick={() =>
                              handlePropertyTypeSelect(
                                type
                              )
                            }
                          >

                            <div className="HomeBreadcrum-propertyIcon">
                              <FiMapPin />
                            </div>


                            <div className="HomeBreadcrum-propertyContent">

                              <strong>
                                {type}
                              </strong>

                              <span>
                                Property
                              </span>

                            </div>

                          </li>

                        )
                      )}

                    </ul>

                  </div>

                )}

              </div>


              {/* =================================================
                  LOCATION
              ================================================= */}

              <div className="HomeBreadcrum-field HomeBreadcrum-dropdownField">

                <div
                  className="HomeBreadcrum-dropdownHeader"
                  onClick={() => {

                    setShowLocationDropdown(
                      !showLocationDropdown
                    );

                    setShowPropertyDropdown(
                      false
                    );

                    setShowAreaDropdown(
                      false
                    );

                  }}
                >

                  <span>
                    {location}
                  </span>


                  <FiChevronDown
                    className="HomeBreadcrum-arrowIcon"
                  />

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

                      ) : locationOptions.length > 0 ? (

                        locationOptions.map(
                          (
                            locationName,
                            index
                          ) => (

                            <li
                              key={`${locationName}-${index}`}
                              className={`HomeBreadcrum-locationItem ${
                                location ===
                                locationName
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() =>
                                handleLocationSelect(
                                  {
                                    city:
                                      locationName,
                                  }
                                )
                              }
                            >

                              <FiMapPin />

                              <span>
                                {locationName}
                              </span>

                            </li>

                          )
                        )

                      ) : (

                        <li className="HomeBreadcrum-emptyItem">
                          No locations found
                        </li>

                      )}

                    </ul>

                  </div>

                )}

              </div>


              {/* =================================================
                  AREA
              ================================================= */}

              <div
                className={`HomeBreadcrum-field HomeBreadcrum-dropdownField ${
                  location ===
                  "Location"
                    ? "disabled"
                    : ""
                }`}
              >

                <div
                  className="HomeBreadcrum-dropdownHeader"
                  onClick={() => {

                    if (
                      location ===
                      "Location"
                    ) {

                      return;

                    }


                    setShowAreaDropdown(
                      !showAreaDropdown
                    );

                    setShowLocationDropdown(
                      false
                    );

                    setShowPropertyDropdown(
                      false
                    );

                  }}
                >

                  <span>
                    {area}
                  </span>


                  <FiChevronDown
                    className="HomeBreadcrum-arrowIcon"
                  />

                </div>


                {showAreaDropdown && (

                  <div className="HomeBreadcrum-dropdownMenu">

                    <div className="HomeBreadcrum-dropdownTitle">
                      Select Area
                    </div>


                    <ul>

                      {areaOptions.length > 0 ? (

                        areaOptions.map(
                          (
                            areaName,
                            index
                          ) => (

                            <li
                              key={`${areaName}-${index}`}
                              className={`HomeBreadcrum-locationItem ${
                                area ===
                                areaName
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() =>
                                handleAreaSelect(
                                  areaName
                                )
                              }
                            >

                              <FiMapPin />

                              <span>
                                {areaName}
                              </span>

                            </li>

                          )
                        )

                      ) : (

                        <li className="HomeBreadcrum-emptyItem">
                          No areas found
                        </li>

                      )}

                    </ul>

                  </div>

                )}

              </div>


              {/* =================================================
                  FILTER
              ================================================= */}

              <button
                type="button"
                className={`HomeBreadcrum-filterBtn ${
                  showAdvancedFilters
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setShowAdvancedFilters(
                    !showAdvancedFilters
                  )
                }
                title="Toggle Filters"
              >

                <FiSliders />

              </button>


              {/* =================================================
                  SEARCH
              ================================================= */}

              <button
                type="button"
                className="HomeBreadcrum-searchBtn"
                onClick={
                  handleSearch
                }
                disabled={
                  searchLoading
                }
              >

                <span>

                  {searchLoading
                    ? "Searching..."
                    : "Search Now"}

                </span>


                <FiSearch
                  className="HomeBreadcrum-searchIcon"
                />

              </button>

            </div>


            {/* =================================================
                ADVANCED FILTERS
            ================================================= */}

            {showAdvancedFilters && (

              <div className="HomeBreadcrum-filterPanel">


                <div className="HomeBreadcrum-filterTop">


                  <div className="HomeBreadcrum-filterSelectGroup">


                    {/* BATHS */}

                    <div className="HomeBreadcrum-filterSelect">

                      <select
                        value={baths}
                        onChange={(event) =>
                          setBaths(
                            event.target.value
                          )
                        }
                      >

                        <option value="Any">
                          Baths: Any
                        </option>

                        <option value="1">
                          Baths: 1+
                        </option>

                        <option value="2">
                          Baths: 2+
                        </option>

                        <option value="3">
                          Baths: 3+
                        </option>

                      </select>


                      <FiChevronDown
                        className="HomeBreadcrum-selectArrow"
                      />

                    </div>


                    {/* BEDS */}

                    <div className="HomeBreadcrum-filterSelect">

                      <select
                        value={beds}
                        onChange={(event) =>
                          setBeds(
                            event.target.value
                          )
                        }
                      >

                        <option value="Any">
                          Beds: Any
                        </option>

                        <option value="1">
                          Beds: 1+
                        </option>

                        <option value="2">
                          Beds: 2+
                        </option>

                        <option value="3">
                          Beds: 3+
                        </option>

                      </select>


                      <FiChevronDown
                        className="HomeBreadcrum-selectArrow"
                      />

                    </div>

                  </div>


                  <div className="HomeBreadcrum-filterHeaderLabel">
                    <span>
                      Form —
                    </span>
                  </div>


                  <div className="HomeBreadcrum-filterHeaderLabel">
                    <span>
                      Size —
                    </span>
                  </div>


                </div>


                <div className="HomeBreadcrum-divider" />


                <div className="HomeBreadcrum-amenitiesGrid">

                  {amenitiesList.map(
                    (
                      amenity,
                      index
                    ) => (

                      <label
                        key={index}
                        className="HomeBreadcrum-checkboxLabel"
                      >

                        <input
                          type="checkbox"
                          checked={
                            selectedAmenities.includes(
                              amenity
                            )
                          }
                          onChange={() =>
                            handleAmenityChange(
                              amenity
                            )
                          }
                        />

                        <span className="HomeBreadcrum-customCheckbox"></span>

                        <span className="HomeBreadcrum-amenityText">
                          {amenity}
                        </span>

                      </label>

                    )
                  )}

                </div>

              </div>

            )}

          </div>


          {/* =================================================
              STATS
          ================================================= */}

          <div className="HomeBreadcrum-stats">


            <div className="HomeBreadcrum-statItem">

              <h3>
                {
                  statsData[
                    activeTab
                  ].properties
                }
              </h3>

              <p>
                Properties Ready
              </p>

            </div>


            <div className="HomeBreadcrum-statItem">

              <h3>
                {
                  statsData[
                    activeTab
                  ].customers
                }
              </h3>

              <p>
                Happy Customers
              </p>

            </div>


          </div>

        </div>


        {/* =================================================
            RIGHT HERO
        ================================================= */}

        <div className="HomeBreadcrum-right">


          <div className="HomeBreadcrum-badgeWrapper">

            <div className="HomeBreadcrum-badgeTextContainer">

              <svg
                viewBox="0 0 100 100"
                className="HomeBreadcrum-rotatingSvg"
              >

                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="transparent"
                />

                <text className="HomeBreadcrum-svgText">

                  <textPath
                    href="#circlePath"
                    startOffset="0%"
                  >

                    find your dream property here •

                  </textPath>

                </text>

              </svg>

            </div>


            <div className="HomeBreadcrum-badgeArrow">

              <FiArrowUpRight />

            </div>

          </div>


          <div className="HomeBreadcrum-imageArch">

            <img
              src={heroImg}
              alt="Real Estate Architecture"
              className="HomeBreadcrum-heroImage"
            />

          </div>


        </div>

      </div>

    </div>

  );

};


export default HomeBreadcrum;