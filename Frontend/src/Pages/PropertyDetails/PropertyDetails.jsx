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

  // =====================================================
  // GET PROPERTY ID FROM URL
  // =====================================================

  const { id } = useParams();


  // =====================================================
  // STATE
  // =====================================================

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


  // =====================================================
  // FETCH PROPERTY BY ID
  // =====================================================

  useEffect(() => {

    const fetchPropertyById = async () => {

      try {

        setLoading(true);

        setError("");


        // =================================================
        // CHECK PROPERTY ID
        // =================================================

        if (!id) {

          setError(
            "Property ID not found."
          );

          setProperty(null);

          return;
        }


        // =================================================
        // DEBUG
        // =================================================



        // =================================================
        // API REQUEST
        // =================================================

        const response =
          await API.get(
            `/properties/${id}`
          );


        // =================================================
        // RESPONSE
        // =================================================



        // =================================================
        // GET PROPERTY DATA
        // =================================================

        const propertyData =
          response.data?.property ||
          response.data?.data ||
          response.data;



        // =================================================
        // VALIDATE PROPERTY
        // =================================================

        if (
          !propertyData ||
          typeof propertyData !==
            "object"
        ) {

          throw new Error(
            "Property data not found."
          );
        }


        // =================================================
        // MAKE SURE PROPERTY ID EXISTS
        // =================================================

        const propertyId =
          propertyData?._id ||
          propertyData?.id ||
          id;


        // =================================================
        // SAVE PROPERTY
        // =================================================

        setProperty({
          ...propertyData,

          // Preserve MongoDB property ID
          _id: propertyId,

          // Also keep id for compatibility
          id: propertyId,
        });


        

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


    // =====================================================
    // CALL API
    // =====================================================

    fetchPropertyById();

  }, [id]);


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div>

        Loading property
        details...

      </div>

    );

  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error) {

    return (

      <div>

        {error}

      </div>

    );

  }


  // =====================================================
  // PROPERTY NOT FOUND
  // =====================================================

  if (!property) {

    return (

      <div>

        Property not found.

      </div>

    );

  }


  // =====================================================
  // PROPERTY ID
  // =====================================================

  const propertyId =
    property?._id ||
    property?.id ||
    id;


  // =====================================================
  // PROPERTY DETAILS PAGE
  // =====================================================

  return (

    <div>

      {/* ===============================================
          PROPERTY CARD
      =============================================== */}

      <PropertyDetailsCard
        property={property}
      />


      {/* ===============================================
          PROJECT OVERVIEW
      =============================================== */}

      <PropertyDetailsProjectOverview
        property={property}
      />


      {/* ===============================================
          AMENITIES
          PROPERTY ID IS EXPLICITLY PASSED
      =============================================== */}

      <PropertyDetailsAmenities
        property={property}
        propertyId={propertyId}
      />


      {/* ===============================================
          MAP
      =============================================== */}

      <PropertyDetailsMap
        property={property}
      />


      {/* ===============================================
          SIMILAR PROJECTS
      =============================================== */}

      <PropertyDetailsSimilarProjects
        property={property}
      />


      {/* ===============================================
          FAQ
      =============================================== */}

      <PropertyDetailsFaq
        property={property}
      />


      {/* ===============================================
          PEOPLE SAY
      =============================================== */}

      <PropertyDetailsPeopleSay
        property={property}
      />

    </div>

  );

};


export default PropertyDetails;