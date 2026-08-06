import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AddNewProperty.css";

import BasicInformation from "../../Components/BasicInformation/BasicInformation";
import LocationDetails from "../../Components/LocationDetails/LocationDetails";
import Overview from "../../Components/Overview/Overview";
import Document from "../../Components/Document/Document";
import NearbyPlaces from "../../Components/NearbyPlaces/NearbyPlaces";
import AllProperty from "../../Components/AllProperty/AllProperty";

import API from "../../api/Axios";

const AddNewProperty = () => {
  const navigate = useNavigate();

  // =====================================================
  // ALL PROPERTY DATA
  // =====================================================

  const [propertyData, setPropertyData] = useState({
    // =================================================
    // BASIC INFORMATION
    // =================================================

    propertyName: "Sunrise Luxury Estate",

    category: "Apartment",

    propertyType: "Luxury Villas",

    status: "Active",

    projectSize: "15000",

    completionStatus: "Under Construction",

    shortDescription:
      "A premier residential project located in the heart of the city, offering world-class amenities and breathtaking views.",

    propertyPrice: "12500000",

    pricePerSqFt: "8500",

    reraNumber: "",

    highlights: [],

    // =================================================
    // LOCATION
    // =================================================

    location: "",

    city: "",

    state: "",

    country: "",

    // =================================================
    // OVERVIEW
    // =================================================

    projectArea: "2.5 Acre",

    noOfHouseVilla: "140",

    totalFloors: "10",

    facing: "North",

    plotArea: "1500 sq.ft",

    bedrooms: "1",

    bathrooms: "1",

    balconies: "1-2",

    parking: "1",

    transactionType: "For Sale",

    propertyOverlooking: "",

    maintenancePerMonth: "0.00",

    expectedRentalReturn: "40000",

    // =================================================
    // AMENITIES
    // =================================================

    amenities: [],

    // =================================================
    // NEARBY PLACES
    // =================================================

    nearbyPlaces: [],

    // =================================================
    // SEO
    // =================================================

    metaTitle: "",

    metaDescription: "",

    urlSlug: "",

    // =================================================
    // PUBLISH
    // =================================================

    publishStatus: true,

    featuredProperty: false,

    publishDate: "",

    promoteProperty: false,
  });

  // =====================================================
  // PROPERTY IMAGES
  // =====================================================

  const [propertyImages, setPropertyImages] =
    useState([]);

  // =====================================================
  // DOCUMENTS
  // =====================================================

  const [documents, setDocuments] =
    useState([]);

  // =====================================================
  // FLOOR PLANS
  // =====================================================

  const [floorPlans, setFloorPlans] =
    useState([]);

  // =====================================================
  // PUBLISHING
  // =====================================================

  const [publishing, setPublishing] =
    useState(false);

  // =====================================================
  // COMMON CHANGE
  // =====================================================

  const updatePropertyData = (
    name,
    value
  ) => {
    setPropertyData((previous) => ({
      ...previous,

      [name]: value,
    }));
  };

  // =====================================================
  // PUBLISH PROPERTY
  // =====================================================

  const handlePublish = async () => {
    try {
      // =================================================
      // VALIDATION
      // =================================================

      if (
        !propertyData.propertyName?.trim()
      ) {
        alert("Property name is required");

        return;
      }

      if (!propertyData.category) {
        alert("Category is required");

        return;
      }

      if (!propertyData.propertyType) {
        alert("Property type is required");

        return;
      }

      if (
        !propertyData.location?.trim()
      ) {
        alert("Location is required");

        return;
      }

      if (!propertyData.propertyPrice) {
        alert("Property price is required");

        return;
      }

      // Optional image validation
      // Uncomment if image is mandatory

      /*
      if (propertyImages.length === 0) {
        alert(
          "Please upload at least one property image"
        );

        return;
      }
      */

      setPublishing(true);

      // =================================================
      // CREATE FORMDATA
      // =================================================

      const form = new FormData();

      // =================================================
      // BASIC INFORMATION
      // =================================================

      // Frontend:
      // propertyName
      //
      // Backend:
      // name

      form.append(
        "name",
        propertyData.propertyName.trim()
      );

      form.append(
        "category",
        propertyData.category
      );

      // Frontend:
      // propertyType
      //
      // Backend:
      // type

      form.append(
        "type",
        propertyData.propertyType
      );

      form.append(
        "subType",
        propertyData.propertyType || ""
      );

      form.append(
        "status",
        propertyData.status || "Active"
      );

      // Transaction type can be used
      // as backend statusType

      form.append(
        "statusType",
        propertyData.transactionType ||
          "For Sale"
      );

      form.append(
        "projectSize",
        propertyData.projectSize || "0"
      );

      form.append(
        "completionStatus",
        propertyData.completionStatus ||
          "Under Construction"
      );

      form.append(
        "shortDescription",
        propertyData.shortDescription ||
          ""
      );

      // =================================================
      // FEATURED
      // =================================================

      form.append(
        "featured",
        String(
          propertyData.featuredProperty
        )
      );

      // =================================================
      // HIGHLIGHTS
      // =================================================

      form.append(
        "highlights",
        JSON.stringify(
          propertyData.highlights || []
        )
      );

      // =================================================
      // PRICE
      // =================================================

      // Frontend:
      // propertyPrice
      //
      // Backend:
      // price

      form.append(
        "price",
        propertyData.propertyPrice
      );

      // Frontend:
      // pricePerSqFt
      //
      // Backend:
      // pricePerSqft

      form.append(
        "pricePerSqft",
        propertyData.pricePerSqFt || "0"
      );

      // Frontend:
      // reraNumber
      //
      // Backend:
      // rera

      form.append(
        "rera",
        propertyData.reraNumber || ""
      );

      // =================================================
      // LOCATION
      // =================================================

      form.append(
        "location",
        propertyData.location.trim()
      );

      form.append(
        "city",
        propertyData.city || ""
      );

      form.append(
        "state",
        propertyData.state || ""
      );

      form.append(
        "country",
        propertyData.country || ""
      );

      // =================================================
      // OVERVIEW
      // =================================================

      form.append(
        "projectArea",
        propertyData.projectArea || ""
      );

      form.append(
        "noOfHouseVilla",
        propertyData.noOfHouseVilla || "0"
      );

      form.append(
        "totalFloors",
        propertyData.totalFloors || "0"
      );

      form.append(
        "facing",
        propertyData.facing || ""
      );

      form.append(
        "plotArea",
        propertyData.plotArea || ""
      );

      form.append(
        "bedrooms",
        propertyData.bedrooms || "0"
      );

      form.append(
        "bathrooms",
        propertyData.bathrooms || "0"
      );

      form.append(
        "balconies",
        propertyData.balconies || ""
      );

      form.append(
        "parking",
        propertyData.parking || ""
      );

      form.append(
        "transactionType",
        propertyData.transactionType ||
          "For Sale"
      );

      form.append(
        "propertyOverlooking",
        propertyData.propertyOverlooking ||
          ""
      );

      form.append(
        "maintenancePerMonth",
        propertyData.maintenancePerMonth ||
          "0"
      );

      form.append(
        "expectedRentalReturn",
        propertyData.expectedRentalReturn ||
          "0"
      );

      // =================================================
      // OLD SCHEMA COMPATIBILITY
      // =================================================
      //
      // If your schema still contains totalUnits,
      // totalArea and plotSize these values will
      // also be available.

      form.append(
        "totalUnits",
        propertyData.noOfHouseVilla || "0"
      );

      form.append(
        "totalArea",
        propertyData.projectArea || ""
      );

      form.append(
        "plotSize",
        propertyData.plotArea || ""
      );

      // =================================================
      // AMENITIES
      // =================================================

      form.append(
        "amenities",
        JSON.stringify(
          propertyData.amenities || []
        )
      );

      // =================================================
      // NEARBY PLACES
      // =================================================

      form.append(
        "nearbyPlaces",
        JSON.stringify(
          propertyData.nearbyPlaces || []
        )
      );

      // =================================================
      // FLOOR PLAN DATA
      // =================================================

      const floorPlanData =
        floorPlans.map((plan) => ({
          planTitle:
            plan.planTitle || "",

          planType:
            plan.planType || "",

          beds:
            Number(plan.beds) || 0,

          baths:
            Number(plan.baths) || 0,

          balconies:
            Number(plan.balconies) || 0,

          pujaRoom:
            Number(plan.pujaRoom) || 0,

          servantRoom:
            Number(plan.servantRoom) || 0,

          storeRoom:
            Number(plan.storeRoom) || 0,

          sbaSqft:
            Number(plan.sbaSqft) || 0,

          plotSqft:
            Number(plan.plotSqft) || 0,
        }));

      form.append(
        "floorPlans",
        JSON.stringify(floorPlanData)
      );

      // =================================================
      // SEO
      // =================================================

      form.append(
        "metaTitle",
        propertyData.metaTitle || ""
      );

      form.append(
        "metaDescription",
        propertyData.metaDescription ||
          ""
      );

      form.append(
        "urlSlug",
        propertyData.urlSlug || ""
      );

      // =================================================
      // PUBLISH SETTINGS
      // =================================================

      form.append(
        "publishStatus",
        String(
          propertyData.publishStatus
        )
      );

      form.append(
        "publishDate",
        propertyData.publishDate || ""
      );

      form.append(
        "promoteProperty",
        String(
          propertyData.promoteProperty
        )
      );

      // =================================================
      // PROPERTY IMAGES
      // =================================================
      //
      // IMPORTANT:
      //
      // Your backend Multer must use:
      //
      // { name: "propertyImages", maxCount: 10 }
      //

      propertyImages.forEach((image) => {
        if (image instanceof File) {
          form.append(
            "propertyImages",
            image
          );
        }
      });

      // =================================================
      // DOCUMENTS
      // =================================================
      //
      // Backend:
      //
      // { name: "documents", maxCount: 10 }
      //

      documents.forEach((document) => {
        if (document instanceof File) {
          form.append(
            "documents",
            document
          );
        }
      });

      // =================================================
      // FLOOR PLAN IMAGES
      // =================================================
      //
      // Backend:
      //
      // {
      //   name: "floorPlanImages",
      //   maxCount: 10
      // }
      //

      floorPlans.forEach((plan) => {
        if (
          plan.floorPlanSketch instanceof
          File
        ) {
          form.append(
            "floorPlanImages",
            plan.floorPlanSketch
          );
        }
      });

      // =================================================
      // DEBUG
      // =================================================

      console.log(
        "======================================"
      );

      console.log(
        "PROPERTY DATA BEFORE API"
      );

      console.log(
        "======================================"
      );

      console.log(propertyData);

      console.log(
        "PROPERTY IMAGES:",
        propertyImages
      );

      console.log(
        "DOCUMENTS:",
        documents
      );

      console.log(
        "FLOOR PLANS:",
        floorPlans
      );

      console.log(
        "NEARBY PLACES:",
        propertyData.nearbyPlaces
      );

      console.log(
        "======================================"
      );

      console.log(
        "FORM DATA SENT TO BACKEND"
      );

      console.log(
        "======================================"
      );

      for (
        const [key, value]
        of form.entries()
      ) {
        console.log(
          `${key}:`,
          value
        );
      }

      // =================================================
      // BACKEND REQUEST
      // =================================================

      const response = await API.post(
        "/properties",
        form
      );

      // =================================================
      // SUCCESS
      // =================================================

      console.log(
        "======================================"
      );

      console.log(
        "PROPERTY CREATED"
      );

      console.log(
        response.data
      );

      console.log(
        "======================================"
      );

      alert(
        response.data.message ||
          "Property published successfully"
      );

      // =================================================
      // REMOVE DRAFT
      // =================================================

      localStorage.removeItem(
        "property_draft"
      );

      // =================================================
      // REDIRECT
      // =================================================

      navigate("/properties/all");

    } catch (error) {
      // =================================================
      // ERROR
      // =================================================

      console.error(
        "======================================"
      );

      console.error(
        "PUBLISH PROPERTY ERROR"
      );

      console.error(
        error.response?.data || error
      );

      console.error(
        "======================================"
      );

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to publish property"
      );
    } finally {
      setPublishing(false);
    }
  };

  // =====================================================
  // COMPONENT
  // =====================================================

  return (
    <div className="add-property-page">

      {/* =================================================
          LEFT SIDE
      ================================================= */}

      <div className="left-section">

        {/* BASIC INFORMATION */}

        <BasicInformation
          propertyData={propertyData}
          setPropertyData={
            setPropertyData
          }
          updatePropertyData={
            updatePropertyData
          }
        />

        {/* LOCATION */}

        <LocationDetails
          propertyData={propertyData}
          setPropertyData={
            setPropertyData
          }
          updatePropertyData={
            updatePropertyData
          }
        />

        {/* OVERVIEW */}

        <Overview
          propertyData={propertyData}
          setPropertyData={
            setPropertyData
          }
          updatePropertyData={
            updatePropertyData
          }
        />

        {/* DOCUMENTS + FLOOR PLANS */}

        <Document
          documents={documents}
          setDocuments={
            setDocuments
          }
          floorPlans={floorPlans}
          setFloorPlans={
            setFloorPlans
          }
        />

        {/* NEARBY PLACES */}

        <NearbyPlaces
          propertyData={propertyData}
          setPropertyData={
            setPropertyData
          }
        />

      </div>

      {/* =================================================
          RIGHT SIDE
      ================================================= */}

      <div className="right-section">

        <AllProperty
          propertyData={propertyData}
          setPropertyData={
            setPropertyData
          }
          propertyImages={
            propertyImages
          }
          setPropertyImages={
            setPropertyImages
          }
          handlePublish={
            handlePublish
          }
          publishing={
            publishing
          }
        />

      </div>

    </div>
  );
};

export default AddNewProperty;