import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import API from "../../api/axios";

import PropertyDetailsCard
  from "../../Component/PropertyDetailsCard/PropertyDetailsCard";

import PropertyDetailsProjectOverview
  from "../../Component/PropertyDetailsProjectOverview/PropertyDetailsProjectOverview";

import PropertyDetailsAmenities
  from "../../Component/PropertyDetailsAmenities/PropertyDetailsAmenities";

import PropertyDetailsMap
  from "../../Component/PropertyDetailsMap/PropertyDetailsMap";

import PropertyDetailsSimilarProjects
  from "../../Component/PropertyDetailsSimilarProjects/PropertyDetailsSimilarProjects";

import PropertyDetailsPeopleSay
  from "../../Component/PropertyDetailsPeopleSay/PropertyDetailsPeopleSay";

import PropertyDetailsFaq
  from "../../Component/PropertyDetailsFaq/PropertyDetailsFaq";


const PropertyDetails = () => {

  /* =========================================================
     GET ID FROM URL
  ========================================================= */

  const {
    id,
  } = useParams();


  /* =========================================================
     STATE
  ========================================================= */

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


  /* =========================================================
     FETCH PROPERTY
  ========================================================= */

  useEffect(() => {

    const fetchPropertyById =
      async () => {

        try {

          setLoading(true);

          setError("");

          setProperty(null);


          /* ===============================================
             CHECK ID
          =============================================== */

          if (!id) {

            setError(
              "Property ID not found."
            );

            return;

          }


<<<<<<< HEAD
        // =================================================
        // DEBUG
        // =================================================



        // =================================================
        // API REQUEST
        // =================================================

        const response =
          await API.get(
            `/properties/${id}`
=======
          console.log(
            "FETCH PROPERTY DETAILS:",
            id
>>>>>>> 33dc575c48257ed0367008a23664dd650efa1e77
          );


          /* ===============================================
             API
          =============================================== */

<<<<<<< HEAD
=======
          const response =
            await API.get(
              `/properties/${id}`
            );
>>>>>>> 33dc575c48257ed0367008a23664dd650efa1e77


          console.log(
            "PROPERTY DETAILS RESPONSE:",
            response.data
          );


<<<<<<< HEAD
=======
          /* ===============================================
             SUPPORT DIFFERENT RESPONSE FORMATS
          =============================================== */

          const propertyData =
            response.data?.property ||
            response.data?.data ||
            response.data;

>>>>>>> 33dc575c48257ed0367008a23664dd650efa1e77

          /* ===============================================
             VALIDATE
          =============================================== */

          if (
            !propertyData ||
            typeof propertyData !==
            "object"
          ) {

            throw new Error(
              "Property data not found."
            );

          }


          /* ===============================================
             PROPERTY ID
          =============================================== */

          const propertyId =
            propertyData?._id ||
            propertyData?.id ||
            id;


          /* ===============================================
             SAVE PROPERTY
          =============================================== */

          setProperty({

            ...propertyData,

            _id:
              propertyId,

            id:
              propertyId,

          });


        } catch (requestError) {

          console.error(
            "FETCH PROPERTY DETAILS ERROR:",
            requestError.response?.data ||
            requestError
          );


          setProperty(null);


          setError(
            requestError.response?.data
              ?.message ||
            requestError.message ||
            "Failed to load property details."
          );


        } finally {

          setLoading(false);

        }

      };

<<<<<<< HEAD
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
=======
>>>>>>> 33dc575c48257ed0367008a23664dd650efa1e77

    fetchPropertyById();

  }, [id]);


  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {

    return (

      <div className="property-details-loading">

        Loading property details...

      </div>

    );

  }


  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {

    return (

      <div className="property-details-error">

        {error}

      </div>

    );

  }


  /* =========================================================
     NOT FOUND
  ========================================================= */

  if (!property) {

    return (

      <div className="property-details-error">

        Property not found.

      </div>

    );

  }


  /* =========================================================
     PROPERTY ID
  ========================================================= */

  const propertyId =
    property?._id ||
    property?.id ||
    id;


  /* =========================================================
     DETAILS PAGE
  ========================================================= */

  return (

    <div>


      {/* ===============================================
          PROPERTY CARD
      =============================================== */}

      <PropertyDetailsCard
        property={
          property
        }
      />


      {/* ===============================================
          PROJECT OVERVIEW
      =============================================== */}

      <PropertyDetailsProjectOverview
        property={
          property
        }
      />


      {/* ===============================================
          AMENITIES
      =============================================== */}

      <PropertyDetailsAmenities
        property={
          property
        }
        propertyId={
          propertyId
        }
      />


      {/* ===============================================
          MAP
      =============================================== */}

      <PropertyDetailsMap
        property={
          property
        }
      />


      {/* ===============================================
          SIMILAR PROJECTS
      =============================================== */}

      <PropertyDetailsSimilarProjects
        property={
          property
        }
      />


      {/* ===============================================
          FAQ
      =============================================== */}

      <PropertyDetailsFaq
        property={
          property
        }
      />


      {/* ===============================================
          PEOPLE SAY
      =============================================== */}

      <PropertyDetailsPeopleSay
        property={
          property
        }
      />

    </div>

  );

};


export default PropertyDetails;