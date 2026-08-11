import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import API from "../../api/axios";

import PropertyDetailsCard from "../../Component/PropertyDetailsCard/PropertyDetailsCard";

import PropertyDetailsProjectOverview from "../../Component/PropertyDetailsProjectOverview/PropertyDetailsProjectOverview";

import PropertyDetailsAmenities from "../../Component/PropertyDetailsAmenities/PropertyDetailsAmenities";

import PropertyDetailsMap from "../../Component/PropertyDetailsMap/PropertyDetailsMap";

import PropertyDetailsSimilarProjects from "../../Component/PropertyDetailsSimilarProjects/PropertyDetailsSimilarProjects";

import PropertyDetailsPeopleSay from "../../Component/PropertyDetailsPeopleSay/PropertyDetailsPeopleSay";

import PropertyDetailsFaq from "../../Component/PropertyDetailsFaq/PropertyDetailsFaq";

const PropertyDetails = () => {
  // ============================================
  // GET PROPERTY ID FROM URL
  // ============================================

  const { id } = useParams();

  // ============================================
  // STATE
  // ============================================

  const [
    property,
    setProperty,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  // ============================================
  // FETCH PROPERTY BY ID
  // ============================================

  useEffect(() => {
    const fetchPropertyById =
      async () => {
        try {
          setLoading(true);

          setError("");

          console.log(
            "================================"
          );

          console.log(
            "FETCH PROPERTY DETAILS"
          );

          console.log(
            "PROPERTY ID:",
            id
          );

          console.log(
            "================================"
          );

          // ====================================
          // API REQUEST
          // ====================================

          const response =
            await API.get(
              `/properties/${id}`
            );

          console.log(
            "PROPERTY DETAILS RESPONSE:",
            response.data
          );

          // ====================================
          // GET PROPERTY FROM RESPONSE
          // ====================================

          const propertyData =
            response.data?.property ||
            response.data?.data ||
            response.data;

          console.log(
            "PROPERTY DATA:",
            propertyData
          );

          // ====================================
          // VALIDATE PROPERTY
          // ====================================

          if (
            !propertyData ||
            typeof propertyData !==
              "object"
          ) {
            throw new Error(
              "Property data not found."
            );
          }

          // ====================================
          // SAVE PROPERTY
          // ====================================

          setProperty(
            propertyData
          );

          console.log(
            "================================"
          );
        } catch (error) {
          console.error(
            "================================"
          );

          console.error(
            "FETCH PROPERTY DETAILS ERROR"
          );

          console.error(
            error.response?.data ||
              error
          );

          console.error(
            "================================"
          );

          setProperty(null);

          setError(
            error.response?.data
              ?.message ||
              error.message ||
              "Failed to load property details."
          );
        } finally {
          setLoading(false);
        }
      };

    // ============================================
    // CALL ONLY WHEN ID EXISTS
    // ============================================

    if (id) {
      fetchPropertyById();
    } else {
      setLoading(false);

      setError(
        "Property ID not found."
      );
    }
  }, [id]);

  // ============================================
  // LOADING
  // ============================================

  if (loading) {
    return (
      <div>
        Loading property
        details...
      </div>
    );
  }

  // ============================================
  // ERROR
  // ============================================

  if (error) {
    return (
      <div>
        {error}
      </div>
    );
  }

  // ============================================
  // PROPERTY NOT FOUND
  // ============================================

  if (!property) {
    return (
      <div>
        Property not found.
      </div>
    );
  }

  // ============================================
  // PROPERTY DETAILS PAGE
  // ============================================

  return (
    <div>

      {/* ================================= */}
      {/* PROPERTY CARD */}
      {/* ================================= */}

      <PropertyDetailsCard
        property={property}
      />

      {/* ================================= */}
      {/* PROJECT OVERVIEW */}
      {/* ================================= */}

      <PropertyDetailsProjectOverview
        property={property}
      />

      {/* ================================= */}
      {/* AMENITIES */}
      {/* ================================= */}

      <PropertyDetailsAmenities
        property={property}
      />

      {/* ================================= */}
      {/* MAP */}
      {/* ================================= */}

      <PropertyDetailsMap
        property={property}
      />

      {/* ================================= */}
      {/* SIMILAR PROJECTS */}
      {/* ================================= */}

      <PropertyDetailsSimilarProjects
        property={property}
      />

      {/* ================================= */}
      {/* FAQ */}
      {/* ================================= */}

      <PropertyDetailsFaq
        property={property}
      />

      {/* ================================= */}
      {/* PEOPLE SAY */}
      {/* ================================= */}

      <PropertyDetailsPeopleSay
        property={property}
      />

    </div>
  );
};

export default PropertyDetails;