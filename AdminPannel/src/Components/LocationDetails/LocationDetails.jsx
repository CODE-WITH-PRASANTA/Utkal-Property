import React, {
  useEffect,
  useState,
} from "react";

import "./LocationDetails.css";

import API from "../../api/Axios";

const LocationDetails = ({
  propertyData,
  setPropertyData,
}) => {
  // ============================================
  // STATES
  // ============================================

  const [locations, setLocations] =
    useState([]);

  const [
    loadingLocations,
    setLoadingLocations,
  ] = useState(false);

  // ============================================
  // FETCH LOCATIONS
  // ============================================

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoadingLocations(true);

        const response =
          await API.get("/locations");

        console.log(
          "LOCATION API RESPONSE:",
          response.data
        );

        /*
          Your API response:

          {
            data: [
              {
                _id: "...",
                area: "Madanpur",
                city: "Bhubaneswar",
                state: "Odisha",
                country: "India",
                pincode: "752054",
                status: "Active"
              }
            ]
          }
        */

        const locationData =
          response.data?.data || [];

        console.log(
          "LOCATION DATA:",
          locationData
        );

        // Make sure response is array
        if (Array.isArray(locationData)) {
          setLocations(locationData);
        } else {
          setLocations([]);
        }
      } catch (error) {
        console.error(
          "LOCATION FETCH ERROR:",
          error.response?.data ||
            error.message ||
            error
        );

        setLocations([]);
      } finally {
        setLoadingLocations(false);
      }
    };

    fetchLocations();
  }, []);

  // ============================================
  // NORMAL INPUT CHANGE
  // ============================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setPropertyData((previous) => ({
      ...previous,

      [name]: value,
    }));
  };

  // ============================================
  // LOCATION CHANGE
  // ============================================

  const handleLocationChange = (e) => {
    const selectedArea =
      e.target.value;

    console.log(
      "SELECTED AREA:",
      selectedArea
    );

    // Find complete location object
    const selectedLocation =
      locations.find(
        (location) =>
          location.area ===
          selectedArea
      );

    console.log(
      "SELECTED LOCATION OBJECT:",
      selectedLocation
    );

    // ==========================================
    // IF USER SELECTS EMPTY OPTION
    // ==========================================

    if (!selectedLocation) {
      setPropertyData(
        (previous) => ({
          ...previous,

          location: "",

          city: "",

          state: "",

          country: "",

          pincode: "",
        })
      );

      return;
    }

    // ==========================================
    // UPDATE PROPERTY DATA
    // ==========================================

    setPropertyData(
      (previous) => ({
        ...previous,

        // Save area as property location
        location:
          selectedLocation.area || "",

        // Automatically fill city
        city:
          selectedLocation.city || "",

        // Automatically fill state
        state:
          selectedLocation.state || "",

        // Automatically fill country
        country:
          selectedLocation.country || "",

        // Keep pincode also
        pincode:
          selectedLocation.pincode || "",
      })
    );
  };

  // ============================================
  // UI
  // ============================================

  return (
    <div className="ld-main-container">

      {/* ======================================
          HEADER SECTION
      ====================================== */}

      <div className="ld-header-wrapper">

        <h2 className="ld-main-header">

          <span className="ld-header-icon">

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
              />

              <circle
                cx="12"
                cy="10"
                r="3"
              />
            </svg>

          </span>

          Location & Details

        </h2>

      </div>

      {/* ======================================
          FORM
      ====================================== */}

      <form
        className="ld-form"
        onSubmit={(e) =>
          e.preventDefault()
        }
      >

        {/* ====================================
            LOCATION
        ==================================== */}

        <div className="ld-form-group ld-w-full">

          <label
            htmlFor="location"
            className="ld-label ld-bold-label"
          >
            Location{" "}

            <span className="ld-asterisk">
              *
            </span>

          </label>

          <select
            id="location"
            name="location"
            className="ld-select ld-input-field"
            value={
              propertyData?.location ||
              ""
            }
            onChange={
              handleLocationChange
            }
            required
          >

            {/* DEFAULT OPTION */}

            <option value="">

              {loadingLocations
                ? "Loading locations..."
                : locations.length === 0
                  ? "No locations found"
                  : "Select location"}

            </option>

            {/* LOCATION OPTIONS */}

            {locations.map(
              (location) => (

                <option
                  key={location._id}
                  value={
                    location.area || ""
                  }
                >
                  {location.area ||
                    "Unnamed Location"}
                </option>

              )
            )}

          </select>

        </div>

        {/* ====================================
            CITY / STATE / COUNTRY
        ==================================== */}

        <div className="ld-form-row">

          {/* ==================================
              CITY
          ================================== */}

          <div className="ld-form-group">

            <label
              htmlFor="city"
              className="ld-label ld-bold-label"
            >
              City
            </label>

            <input
              type="text"
              id="city"
              name="city"
              className="ld-text-input ld-input-field"
              placeholder="Enter city"
              value={
                propertyData?.city ||
                ""
              }
              onChange={handleChange}
            />

          </div>

          {/* ==================================
              STATE
          ================================== */}

          <div className="ld-form-group">

            <label
              htmlFor="state"
              className="ld-label ld-bold-label"
            >
              State
            </label>

            <input
              type="text"
              id="state"
              name="state"
              className="ld-text-input ld-input-field"
              placeholder="Enter state"
              value={
                propertyData?.state ||
                ""
              }
              onChange={handleChange}
            />

          </div>

          {/* ==================================
              COUNTRY
          ================================== */}

          <div className="ld-form-group">

            <label
              htmlFor="country"
              className="ld-label ld-bold-label"
            >
              Country
            </label>

            <input
              type="text"
              id="country"
              name="country"
              className="ld-text-input ld-input-field"
              placeholder="Enter country"
              value={
                propertyData?.country ||
                ""
              }
              onChange={handleChange}
            />

          </div>

        </div>

      </form>

    </div>
  );
};

export default LocationDetails;