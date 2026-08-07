import React, {
  useEffect,
  useState,
} from "react";

import "./BasicInformation.css";

import API from "../../api/Axios";

const BasicInformation = ({
  propertyData,
  setPropertyData,
}) => {
  // ============================================
  // STATES
  // ============================================

  const [
    highlightInput,
    setHighlightInput,
  ] = useState("");

  const [
    categories,
    setCategories,
  ] = useState([]);

  const [
    loadingCategories,
    setLoadingCategories,
  ] = useState(false);

  // ============================================
  // FETCH CATEGORIES
  // ============================================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);

        const response =
          await API.get("/categories");

        console.log(
          "CATEGORY API RESPONSE:",
          response.data
        );

        const result = response.data;

        let categoryData = [];

        // ----------------------------------------
        // CASE 1
        // Backend directly returns array
        // ----------------------------------------

        if (Array.isArray(result)) {
          categoryData = result;
        }

        // ----------------------------------------
        // CASE 2
        // { data: [...] }
        // ----------------------------------------

        else if (
          Array.isArray(result?.data)
        ) {
          categoryData = result.data;
        }

        // ----------------------------------------
        // CASE 3
        // { categories: [...] }
        // ----------------------------------------

        else if (
          Array.isArray(
            result?.categories
          )
        ) {
          categoryData =
            result.categories;
        }

        // ----------------------------------------
        // CASE 4
        // { data: { categories: [...] } }
        // ----------------------------------------

        else if (
          Array.isArray(
            result?.data?.categories
          )
        ) {
          categoryData =
            result.data.categories;
        }

        console.log(
          "CATEGORY DATA:",
          categoryData
        );

        setCategories(
          Array.isArray(categoryData)
            ? categoryData
            : []
        );
      } catch (error) {
        console.error(
          "CATEGORY FETCH ERROR:",
          error.response?.data ||
            error.message ||
            error
        );

        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // ============================================
  // INPUT CHANGE
  // ============================================

  const handleInputChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    // Short description maximum 120 characters

    if (
      name === "shortDescription" &&
      value.length > 120
    ) {
      return;
    }

    setPropertyData((previous) => ({
      ...previous,

      [name]: value,
    }));
  };

  // ============================================
  // ADD HIGHLIGHT
  // ============================================

  const addHighlight = () => {
    const value =
      highlightInput.trim();

    if (!value) {
      return;
    }

    setPropertyData((previous) => ({
      ...previous,

      highlights: [
        ...(previous.highlights ||
          []),

        value,
      ],
    }));

    setHighlightInput("");
  };

  // ============================================
  // UI
  // ============================================

  return (
    <div className="basic-information-container">

      <div className="basic-information-card">

        {/* ======================================
            SECTION HEADER
        ====================================== */}

        <div className="basic-information-header">

          <svg
            className="basic-information-header-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>

          <h2 className="basic-information-header-title">
            Basic Information
          </h2>

        </div>

        {/* ======================================
            FORM
        ====================================== */}

        <form
          className="basic-information-form"
          onSubmit={(e) =>
            e.preventDefault()
          }
        >

          {/* ====================================
              PROPERTY NAME
          ==================================== */}

          <div className="basic-information-form-group basic-information-full-width">

            <label
              htmlFor="propertyName"
              className="basic-information-label"
            >
              Property Name{" "}

              <span className="basic-information-required">
                *
              </span>
            </label>

            <input
              type="text"
              id="propertyName"
              name="propertyName"
              value={
                propertyData.propertyName ||
                ""
              }
              onChange={
                handleInputChange
              }
              className="basic-information-input"
              placeholder="Enter property name"
            />

          </div>

          {/* ====================================
              CATEGORY
          ==================================== */}

          <div className="basic-information-form-group">

            <label
              htmlFor="category"
              className="basic-information-label"
            >
              Category{" "}

              <span className="basic-information-required">
                *
              </span>
            </label>

            <div className="basic-information-select-wrapper">

              <select
                id="category"
                name="category"
                value={
                  propertyData.category ||
                  ""
                }
                onChange={
                  handleInputChange
                }
                className="basic-information-input basic-information-select"
                required
              >

                <option value="">

                  {loadingCategories
                    ? "Loading categories..."
                    : categories.length ===
                        0
                      ? "No categories found"
                      : "Select category"}

                </option>

                {categories.map(
                  (
                    category,
                    index
                  ) => (

                    <option
                      key={
                        category._id ||
                        index
                      }
                      value={
                        category.name ||
                        ""
                      }
                    >
                      {category.name ||
                        "Unnamed Category"}
                    </option>

                  )
                )}

              </select>

            </div>

          </div>

          {/* ====================================
              PROPERTY TYPE
          ==================================== */}

          <div className="basic-information-form-group">

            <label
              htmlFor="propertyType"
              className="basic-information-label"
            >
              Property Type{" "}

              <span className="basic-information-required">
                *
              </span>
            </label>

            <div className="basic-information-select-wrapper">

              <select
                id="propertyType"
                name="propertyType"
                value={
                  propertyData.propertyType ||
                  ""
                }
                onChange={
                  handleInputChange
                }
                className="basic-information-input basic-information-select"
              >

                <option
                  value=""
                  disabled
                >
                  Select property type
                </option>

                <option value="Luxury Villas">
                  Luxury Villas
                </option>

                <option value="Standard House">
                  Standard House
                </option>

              </select>

            </div>

          </div>

          {/* ====================================
              STATUS
          ==================================== */}

          <div className="basic-information-form-group">

            <label
              htmlFor="status"
              className="basic-information-label"
            >
              Status{" "}

              <span className="basic-information-required">
                *
              </span>
            </label>

            <div className="basic-information-select-wrapper">

              <select
                id="status"
                name="status"
                value={
                  propertyData.status ||
                  "Active"
                }
                onChange={
                  handleInputChange
                }
                className="basic-information-input basic-information-select"
              >

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Under Construction">
                  Under Construction
                </option>

                <option value="Sold">
                  Sold
                </option>

              </select>

            </div>

          </div>

          {/* ====================================
              PROJECT SIZE
          ==================================== */}

          <div className="basic-information-form-group">

            <label
              htmlFor="projectSize"
              className="basic-information-label"
            >
              Project Size (sq ft)
            </label>

            <input
              type="text"
              id="projectSize"
              name="projectSize"
              value={
                propertyData.projectSize ||
                ""
              }
              onChange={
                handleInputChange
              }
              className="basic-information-input"
              placeholder="e.g. 15000"
            />

          </div>

          {/* ====================================
              COMPLETION STATUS
          ==================================== */}

          <div className="basic-information-form-group basic-information-full-width">

            <label
              htmlFor="completionStatus"
              className="basic-information-label"
            >
              Completion Status
            </label>

            <div className="basic-information-select-wrapper">

              <select
                id="completionStatus"
                name="completionStatus"
                value={
                  propertyData
                    .completionStatus ||
                  "Under Construction"
                }
                onChange={
                  handleInputChange
                }
                className="basic-information-input basic-information-select"
              >

                <option value="Under Construction">
                  Under Construction
                </option>

                <option value="Ready to Move">
                  Ready to Move
                </option>

                <option value="Upcoming">
                  Upcoming
                </option>

              </select>

            </div>

          </div>

          {/* ====================================
              SHORT DESCRIPTION
          ==================================== */}

          <div className="basic-information-form-group basic-information-full-width">

            <label
              htmlFor="shortDescription"
              className="basic-information-label"
            >
              Short Description
            </label>

            <div className="basic-information-textarea-wrapper">

              <textarea
                id="shortDescription"
                name="shortDescription"
                value={
                  propertyData
                    .shortDescription ||
                  ""
                }
                onChange={
                  handleInputChange
                }
                rows="4"
                maxLength={120}
                className="basic-information-input basic-information-textarea"
                placeholder="Enter short description"
              />

              <span className="basic-information-char-counter">

                {(
                  propertyData
                    .shortDescription ||
                  ""
                ).length}

                /120

              </span>

            </div>

          </div>

          {/* ====================================
              PROPERTY PRICE
          ==================================== */}

          <div className="basic-information-form-group">

            <label
              htmlFor="propertyPrice"
              className="basic-information-label"
            >
              Property Price{" "}

              <span className="basic-information-required">
                *
              </span>
            </label>

            <input
              type="text"
              id="propertyPrice"
              name="propertyPrice"
              value={
                propertyData
                  .propertyPrice ||
                ""
              }
              onChange={
                handleInputChange
              }
              className="basic-information-input"
              placeholder="e.g. 12500000"
            />

          </div>

          {/* ====================================
              PRICE PER SQ FT
          ==================================== */}

          <div className="basic-information-form-group">

            <label
              htmlFor="pricePerSqFt"
              className="basic-information-label"
            >
              Price Per Sq Ft
            </label>

            <input
              type="text"
              id="pricePerSqFt"
              name="pricePerSqFt"
              value={
                propertyData.pricePerSqFt ||
                ""
              }
              onChange={
                handleInputChange
              }
              className="basic-information-input"
              placeholder="e.g. 8500"
            />

          </div>

          {/* ====================================
              RERA
          ==================================== */}

          <div className="basic-information-form-group basic-information-full-width">

            <label
              htmlFor="reraNumber"
              className="basic-information-label"
            >
              RERA Number
            </label>

            <input
              type="text"
              id="reraNumber"
              name="reraNumber"
              value={
                propertyData.reraNumber ||
                ""
              }
              onChange={
                handleInputChange
              }
              className="basic-information-input"
              placeholder="Enter RERA registration number"
            />

          </div>

          {/* ====================================
              HIGHLIGHTS
          ==================================== */}

          <div className="basic-information-form-group basic-information-full-width">

            <label
              htmlFor="highlights"
              className="basic-information-label"
            >
              Highlights (Key Features)
            </label>

            <input
              type="text"
              id="highlights"
              name="highlights"
              value={
                highlightInput
              }
              onChange={(e) =>
                setHighlightInput(
                  e.target.value
                )
              }
              className="basic-information-input"
              placeholder="Add key feature"
            />

          </div>

          {/* ====================================
              ADD HIGHLIGHT
          ==================================== */}

          <div className="basic-information-form-group basic-information-full-width">

            <button
              type="button"
              onClick={
                addHighlight
              }
              className="basic-information-add-highlight-btn"
            >

              <span className="basic-information-plus-icon">
                +
              </span>{" "}

              Add Highlight

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default BasicInformation;