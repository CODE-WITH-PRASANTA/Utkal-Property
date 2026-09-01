import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  FiArrowUpRight,
  FiChevronDown,
  FiMapPin,
  FiSearch,
  FiSliders,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import API from "../../api/axios";

import "./HomeBreadcrum.css";

import heroImg from "../../assets/slider-1.webp";


const HomeBreadcrum = () => {
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  /* =========================================================
     BASIC SEARCH
  ========================================================= */

  const [activeTab, setActiveTab] = useState("Buy");

  const [keyword, setKeyword] = useState("");

  const [propertyType, setPropertyType] =
    useState("Property type");

  const [location, setLocation] =
    useState("Location");

  const [area, setArea] =
    useState("Area");


  /* =========================================================
     BACKEND DATA
  ========================================================= */

  const [properties, setProperties] =
    useState([]);

  const [locations, setLocations] =
    useState([]);

  const [propertiesError, setPropertiesError] =
    useState("");

  const [locationsError, setLocationsError] =
    useState("");

  const [loadingProperties, setLoadingProperties] =
    useState(false);

  const [loadingLocations, setLoadingLocations] =
    useState(false);


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


  const [searchLoading, setSearchLoading] =
    useState(false);


  /* =========================================================
     OPTIONS
  ========================================================= */

  const propertyTypeOptions = [
    "Apartment",
    "Villa",
    "Duplex / Independent House",
    "Plot",
    "Commercial Property",
  ];


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
     SAFE ID
  ========================================================= */

  const getPropertyId = (property) => {
    return (
      property?._id ||
      property?.id ||
      property?.propertyId ||
      ""
    );
  };


  /* =========================================================
     SAFE PROPERTY NAME
  ========================================================= */

  const getPropertyName = (property) => {
    return String(
      property?.propertyTitle ||
        property?.propertyName ||
        property?.title ||
        property?.name ||
        ""
    ).trim();
  };


  /* =========================================================
     SAFE PROPERTY TYPE
  ========================================================= */

  const getPropertyType = (property) => {
    return String(
      property?.propertyType ||
        property?.type ||
        property?.propertyCategory ||
        ""
    ).trim();
  };


  /* =========================================================
     SAFE PROPERTY CITY
  ========================================================= */

  const getPropertyCity = (property) => {
    const locationValue =
      property?.location;


    if (
      locationValue &&
      typeof locationValue === "object"
    ) {
      return String(
        locationValue?.city ||
          locationValue?.name ||
          locationValue?.locationName ||
          ""
      ).trim();
    }


    return String(
      property?.city ||
        property?.location ||
        ""
    ).trim();
  };


  /* =========================================================
     SAFE PROPERTY AREA
  ========================================================= */

  const getPropertyArea = (property) => {
    const locationValue =
      property?.location;


    if (
      locationValue &&
      typeof locationValue === "object"
    ) {
      return String(
        locationValue?.area ||
          locationValue?.areaName ||
          locationValue?.locality ||
          ""
      ).trim();
    }


    return String(
      property?.area ||
        property?.areaName ||
        property?.locality ||
        property?.preferredArea ||
        ""
    ).trim();
  };


  /* =========================================================
     LOCATION CITY
  ========================================================= */

  const getLocationCity = (item) => {
    if (typeof item === "string") {
      return item.trim();
    }


    if (
      !item ||
      typeof item !== "object"
    ) {
      return "";
    }


    return String(
      item?.city ||
        item?.name ||
        item?.title ||
        item?.locationName ||
        ""
    ).trim();
  };


  /* =========================================================
     LOCATION AREA
  ========================================================= */

  const getLocationArea = (item) => {
    if (
      !item ||
      typeof item !== "object"
    ) {
      return "";
    }


    return String(
      item?.area ||
        item?.areaName ||
        item?.locality ||
        ""
    ).trim();
  };


  /* =========================================================
     FETCH PROPERTIES
  ========================================================= */

  const fetchProperties = async () => {
    try {
      setLoadingProperties(true);

      setPropertiesError("");

      const response =
        await API.get("/properties");

<<<<<<< HEAD
     

      const propertyData =
        response.data?.properties ||
        response.data?.data ||
        response.data?.results ||
        response.data;

      if (Array.isArray(propertyData)) {
        setProperties(propertyData);

        
=======
      const data =
        response?.data?.properties ||
        response?.data?.data ||
        response?.data?.results ||
        response?.data;

      if (Array.isArray(data)) {
        setProperties(data);
>>>>>>> 33dc575c48257ed0367008a23664dd650efa1e77
      } else {
        setProperties([]);
      }
    } catch (error) {
      console.error(
        "FETCH PROPERTIES ERROR:",
        error?.response?.data || error
      );

      setProperties([]);

      setPropertiesError(
        error?.response?.data?.message ||
          "Unable to load properties."
      );
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

      setLocationsError("");

      const response =
        await API.get("/locations");

<<<<<<< HEAD
     
=======
      const data =
        response?.data?.locations ||
        response?.data?.data ||
        response?.data?.results ||
        response?.data;
>>>>>>> 33dc575c48257ed0367008a23664dd650efa1e77

      if (Array.isArray(data)) {
        setLocations(data);
      } else {
        setLocations([]);
      }
    } catch (error) {
      console.error(
        "FETCH LOCATIONS ERROR:",
        error?.response?.data || error
      );

      setLocations([]);

      setLocationsError(
        error?.response?.data?.message ||
          "Unable to load locations."
      );
    } finally {
      setLoadingLocations(false);
    }
  };


  /* =========================================================
     INITIAL API CALL
  ========================================================= */

  useEffect(() => {
    fetchProperties();
    fetchLocations();
  }, []);


  /* =========================================================
     CLOSE DROPDOWNS
  ========================================================= */

  useEffect(() => {
    const handleOutsideClick = (event) => {
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
      handleOutsideClick
    );


    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);


  /* =========================================================
     LOCATION OPTIONS
  ========================================================= */

  const locationOptions = useMemo(() => {
    const uniqueLocations =
      new Map();


    locations.forEach((item) => {
      const city =
        getLocationCity(item);


      if (!city) {
        return;
      }


      const key =
        city.toLowerCase();


      if (!uniqueLocations.has(key)) {
        uniqueLocations.set(
          key,
          city
        );
      }
    });


    /*
      If location API returns no usable
      records, use property data.
    */

    if (
      uniqueLocations.size === 0
    ) {
      properties.forEach(
        (property) => {
          const city =
            getPropertyCity(
              property
            );


          if (!city) {
            return;
          }


          const key =
            city.toLowerCase();


          if (
            !uniqueLocations.has(
              key
            )
          ) {
            uniqueLocations.set(
              key,
              city
            );
          }
        }
      );
    }


    return Array.from(
      uniqueLocations.values()
    ).sort();
  }, [
    locations,
    properties,
  ]);


  /* =========================================================
     AREA OPTIONS
  ========================================================= */

  const areaOptions = useMemo(() => {
    if (
      !location ||
      location === "Location"
    ) {
      return [];
    }


    const uniqueAreas =
      new Map();


    /*
      First use location API.
    */

    locations.forEach((item) => {
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
          !uniqueAreas.has(key)
        ) {
          uniqueAreas.set(
            key,
            itemArea
          );
        }
      }
    });


    /*
      Fallback to properties.
    */

    if (
      uniqueAreas.size === 0
    ) {
      properties.forEach(
        (property) => {
          const city =
            getPropertyCity(
              property
            );

          const itemArea =
            getPropertyArea(
              property
            );


          if (
            city &&
            itemArea &&
            city
              .toLowerCase()
              .includes(
                location.toLowerCase()
              )
          ) {
            const key =
              itemArea.toLowerCase();


            if (
              !uniqueAreas.has(
                key
              )
            ) {
              uniqueAreas.set(
                key,
                itemArea
              );
            }
          }
        }
      );
    }


    return Array.from(
      uniqueAreas.values()
    ).sort();
  }, [
    locations,
    properties,
    location,
  ]);


  /* =========================================================
     RESET SELECTED PROPERTY
  ========================================================= */

  const clearSelectedProperty = () => {
    setPropertyType(
      "Property type"
    );
  };


  /* =========================================================
     SELECT PROPERTY TYPE
  ========================================================= */

  const handlePropertyTypeSelect = (
    type
  ) => {
    setPropertyType(type);

    setKeyword("");

    setShowPropertyDropdown(false);
  };


  /* =========================================================
     SELECT PROPERTY
  ========================================================= */

  const handlePropertySelect = (
    property
  ) => {
    const id =
      getPropertyId(property);


    if (!id) {
      alert(
        "Property ID not found."
      );

      return;
    }


<<<<<<< HEAD
    const propertyLocation =
      getPropertyLocationName(
        property
      );

    

   


    setSelectedProperty(
      property
    );
=======
    setKeyword(
      getPropertyName(property)
    );

>>>>>>> 33dc575c48257ed0367008a23664dd650efa1e77

    setPropertyType(
      getPropertyType(property) ||
        "Property type"
    );


    setLocation(
      getPropertyCity(property) ||
        "Location"
    );


    setArea(
      getPropertyArea(property) ||
        "Area"
    );


    setShowPropertyDropdown(false);
    setShowLocationDropdown(false);
    setShowAreaDropdown(false);
  };


  /* =========================================================
     SELECT LOCATION
  ========================================================= */

  const handleLocationSelect = (
    item
  ) => {
    const city =
      getLocationCity(item);


    if (!city) {
      return;
    }


    setLocation(city);

    /*
      Important:
      Area is reset whenever a new
      location is selected.
    */

    setArea("Area");

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
    setArea(selectedArea);

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
  ========================================================= */

  const findExactProperty = (
    value
  ) => {
    const searchValue =
      String(value || "")
        .trim()
        .toLowerCase();


    if (!searchValue) {
      return null;
    }


    return (
      properties.find(
        (property) =>
          getPropertyName(
            property
          ).toLowerCase() ===
          searchValue
      ) || null
    );
  };


  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearch = async () => {
    try {
      setSearchLoading(true);


      setShowPropertyDropdown(false);
      setShowLocationDropdown(false);
      setShowAreaDropdown(false);


      /*
        -------------------------------------------------------
        DIRECT PROPERTY DETAILS
        -------------------------------------------------------
      */

      const exactProperty =
        findExactProperty(
          keyword
        );


      if (exactProperty) {
        const id =
          getPropertyId(
            exactProperty
          );

<<<<<<< HEAD
    

       

        if (!propertyId) {
          alert(
            "Property ID not found."
=======

        if (id) {
          navigate(
            `/property-details/${id}`
>>>>>>> 33dc575c48257ed0367008a23664dd650efa1e77
          );

          return;
        }
      }


      /*
        -------------------------------------------------------
        NORMAL PROPERTY SEARCH
        -------------------------------------------------------
      */

      const params =
        new URLSearchParams();


      if (activeTab) {
        params.set(
          "lookingFor",
          activeTab
        );
      }


      if (
        keyword.trim()
      ) {
        params.set(
          "keyword",
          keyword.trim()
        );
      }


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


      if (
        location &&
        location !== "Location"
<<<<<<< HEAD
          ? location
              .trim()
              .toLowerCase()
          : "";

    

      // =================================================
      // START WITH ALL PROPERTIES
      // =================================================

      let filteredProperties = [
        ...properties,
      ];

      // =================================================
      // RENT
      // =================================================

      if (
        activeTab === "Rent"
=======
>>>>>>> 33dc575c48257ed0367008a23664dd650efa1e77
      ) {
        params.set(
          "location",
          location
        );
      }


      if (
        area &&
        area !== "Area"
      ) {
        params.set(
          "area",
          area
        );
      }


      if (
        beds &&
        beds !== "Any"
      ) {
        params.set(
          "beds",
          beds
        );
      }


      if (
        baths &&
        baths !== "Any"
      ) {
        params.set(
          "baths",
          baths
        );
      }


      if (
        selectedAmenities.length
      ) {
<<<<<<< HEAD
        filteredProperties =
          filteredProperties.filter(
            (property) => {
              const propertyAmenities =
                Array.isArray(
                  property?.amenities
                )
                  ? property.amenities
                  : [];

              return selectedAmenities.every(
                (selectedAmenity) =>
                  propertyAmenities.some(
                    (propertyAmenity) =>
                      String(
                        propertyAmenity
                      )
                        .toLowerCase()
                        .includes(
                          selectedAmenity.toLowerCase()
                        )
                  )
              );
            }
          );
      }

     
      // =================================================
      // NO PROPERTY
      // =================================================

      if (
        filteredProperties.length ===
        0
      ) {
        alert(
          "No properties found for your search."
=======
        params.set(
          "amenities",
          selectedAmenities.join(
            ","
          )
>>>>>>> 33dc575c48257ed0367008a23664dd650efa1e77
        );
      }


      const query =
        params.toString();


      navigate(
        query
          ? `/properties?${query}`
          : "/properties"
      );
    } catch (error) {
      console.error(
        "SEARCH ERROR:",
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
     ENTER KEY
  ========================================================= */

  const handleKeywordKeyDown = (
    event
  ) => {
    if (
      event.key === "Enter"
    ) {
      event.preventDefault();

      handleSearch();
    }
  };


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section
      className="HomeBreadcrum"
      ref={dropdownRef}
    >
      <div className="HomeBreadcrum-container">

        {/* ===================================================
            LEFT CONTENT
        =================================================== */}

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
            Find a variety of premium properties
            that suit your lifestyle effortlessly.
            Forget all difficulties in finding your
            dream residence.
          </p>


          {/* =================================================
              SEARCH BOX
          ================================================= */}

          <div className="HomeBreadcrum-searchCardContainer">

            {/* =================================================
                TABS
            ================================================= */}

            <div className="HomeBreadcrum-tabs">

              {/* BUY FIRST */}

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


              {/* RENT SECOND */}

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
                  value={keyword}
                  onChange={(event) => {
                    setKeyword(
                      event.target.value
                    );

                    setPropertyType(
                      "Property type"
                    );
                  }}
                  onKeyDown={
                    handleKeywordKeyDown
                  }
                  placeholder="Type keyword..."
                  aria-label="Property keyword"
                />

              </div>


              {/* =================================================
                  PROPERTY TYPE
              ================================================= */}

              <div className="HomeBreadcrum-field HomeBreadcrum-dropdownField">

                <button
                  type="button"
                  className="HomeBreadcrum-dropdownHeader"
                  onClick={() => {
                    setShowPropertyDropdown(
                      (previous) =>
                        !previous
                    );

                    setShowLocationDropdown(
                      false
                    );

                    setShowAreaDropdown(
                      false
                    );
                  }}
                >

                  <span>
                    {propertyType}
                  </span>

                  <FiChevronDown />

                </button>


                {showPropertyDropdown && (
                  <div className="HomeBreadcrum-dropdownMenu">

                    <div className="HomeBreadcrum-dropdownTitle">
                      Select Property Type
                    </div>


                    <ul>

                      {propertyTypeOptions.map(
                        (type) => (
                          <li
                            key={type}
                            className={
                              propertyType ===
                              type
                                ? "selected"
                                : ""
                            }
                            onClick={() =>
                              handlePropertyTypeSelect(
                                type
                              )
                            }
                          >

                            <span>
                              {type}
                            </span>

                          </li>
                        )
                      )}


                      {properties.length >
                        0 && (
                        <>
                          <li className="HomeBreadcrum-dropdownSeparator">
                            Properties
                          </li>


                          {properties
                            .slice(
                              0,
                              10
                            )
                            .map(
                              (
                                property,
                                index
                              ) => (
                                <li
                                  key={
                                    getPropertyId(
                                      property
                                    ) ||
                                    index
                                  }
                                  className="HomeBreadcrum-propertyItem"
                                  onClick={() =>
                                    handlePropertySelect(
                                      property
                                    )
                                  }
                                >

                                  <div className="HomeBreadcrum-propertyIcon">
                                    <FiMapPin />
                                  </div>


                                  <div className="HomeBreadcrum-propertyContent">

                                    <strong>
                                      {
                                        getPropertyName(
                                          property
                                        ) ||
                                          "Property"
                                      }
                                    </strong>

                                    <span>
                                      {
                                        getPropertyCity(
                                          property
                                        ) ||
                                          getPropertyType(
                                            property
                                          ) ||
                                          "Property"
                                      }
                                    </span>

                                  </div>

                                </li>
                              )
                            )}
                        </>
                      )}

                    </ul>

                  </div>
                )}

              </div>


              {/* =================================================
                  LOCATION
              ================================================= */}

              <div className="HomeBreadcrum-field HomeBreadcrum-dropdownField">

                <button
                  type="button"
                  className="HomeBreadcrum-dropdownHeader"
                  onClick={() => {
                    setShowLocationDropdown(
                      (previous) =>
                        !previous
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

                  <FiChevronDown />

                </button>


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
                      ) : locationOptions.length >
                        0 ? (
                        locationOptions.map(
                          (
                            city,
                            index
                          ) => (
                            <li
                              key={`${city}-${index}`}
                              className={`HomeBreadcrum-locationItem ${
                                location ===
                                city
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() =>
                                handleLocationSelect(
                                  {
                                    city,
                                  }
                                )
                              }
                            >

                              <FiMapPin />

                              <span>
                                {city}
                              </span>

                            </li>
                          )
                        )
                      ) : (
                        <li className="HomeBreadcrum-emptyItem">
                          {locationsError ||
                            "No locations found"}
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
                  location === "Location"
                    ? "disabled"
                    : ""
                }`}
              >

                <button
                  type="button"
                  className="HomeBreadcrum-dropdownHeader"
                  disabled={
                    location ===
                    "Location"
                  }
                  onClick={() => {
                    if (
                      location ===
                      "Location"
                    ) {
                      return;
                    }


                    setShowAreaDropdown(
                      (previous) =>
                        !previous
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

                  <FiChevronDown />

                </button>


                {showAreaDropdown &&
                  location !==
                    "Location" && (
                    <div className="HomeBreadcrum-dropdownMenu">

                      <div className="HomeBreadcrum-dropdownTitle">
                        Select Area
                      </div>


                      <ul>

                        {areaOptions.length >
                        0 ? (
                          areaOptions.map(
                            (
                              itemArea,
                              index
                            ) => (
                              <li
                                key={`${itemArea}-${index}`}
                                className={`HomeBreadcrum-locationItem ${
                                  area ===
                                  itemArea
                                    ? "selected"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleAreaSelect(
                                    itemArea
                                  )
                                }
                              >

                                <FiMapPin />

                                <span>
                                  {itemArea}
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
                  FILTER BUTTON
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
                    (previous) =>
                      !previous
                  )
                }
                aria-label="Advanced filters"
              >
                <FiSliders />
              </button>


              {/* =================================================
                  SEARCH BUTTON
              ================================================= */}

              <button
                type="button"
                className="HomeBreadcrum-searchBtn"
                disabled={
                  searchLoading
                }
                onClick={
                  handleSearch
                }
              >

                <span>
                  {searchLoading
                    ? "Searching..."
                    : "Search Now"}
                </span>

                <FiSearch />

              </button>

            </div>


            {/* =================================================
                ADVANCED FILTERS
            ================================================= */}

            {showAdvancedFilters && (
              <div className="HomeBreadcrum-filterPanel">

                <div className="HomeBreadcrum-filterTop">

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

                    <FiChevronDown />

                  </div>


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

                    <FiChevronDown />

                  </div>

                </div>


                <div className="HomeBreadcrum-divider" />


                <div className="HomeBreadcrum-amenitiesGrid">

                  {amenitiesList.map(
                    (amenity) => (
                      <label
                        key={amenity}
                        className="HomeBreadcrum-checkboxLabel"
                      >

                        <input
                          type="checkbox"
                          checked={selectedAmenities.includes(
                            amenity
                          )}
                          onChange={() =>
                            handleAmenityChange(
                              amenity
                            )
                          }
                        />

                        <span className="HomeBreadcrum-customCheckbox" />

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


        {/* ===================================================
            RIGHT IMAGE
        =================================================== */}

        <div className="HomeBreadcrum-right">

          <div className="HomeBreadcrum-badgeWrapper">

            <div className="HomeBreadcrum-badgeTextContainer">

              <svg
                viewBox="0 0 100 100"
                className="HomeBreadcrum-rotatingSvg"
                aria-hidden="true"
              >

                <path
                  id="HomeBreadcrum-circlePath"
                  d="
                    M 50,50
                    m -37,0
                    a 37,37 0 1,1 74,0
                    a 37,37 0 1,1 -74,0
                  "
                  fill="transparent"
                />

                <text className="HomeBreadcrum-svgText">

                  <textPath
                    href="#HomeBreadcrum-circlePath"
                    startOffset="0%"
                  >
                    find your dream property here •
                  </textPath>

                </text>

              </svg>

            </div>


            <div
              className="HomeBreadcrum-badgeArrow"
              aria-hidden="true"
            >
              <FiArrowUpRight />
            </div>

          </div>


          <div className="HomeBreadcrum-imageArch">

            <img
              src={heroImg}
              alt="Premium real estate property"
              className="HomeBreadcrum-heroImage"
              width="500"
              height="570"
              fetchPriority="high"
              decoding="async"
            />

          </div>

        </div>

      </div>
    </section>
  );
};


export default HomeBreadcrum;