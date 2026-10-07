import { useEffect, useState } from "react";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import "./AddNewProperty.css";

import BasicInformation from "../../Components/BasicInformation/BasicInformation";
import LocationDetails from "../../Components/LocationDetails/LocationDetails";
import Overview from "../../Components/Overview/Overview";
import Document from "../../Components/Document/Document";
import NearbyPlaces from "../../Components/NearbyPlaces/NearbyPlaces";
import AllProperty from "../../Components/AllProperty/AllProperty";



import API from "../../api/axios";
import FetchAmenities from "../../Components/fetchAmenities/FetchAmenities";

const AddNewProperty = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isSellListingMode =
    searchParams.get("source") === "sell-properties";

  // ==========================================
  // EDIT MODE
  // ==========================================

  const isEditMode = Boolean(id);

  // ==========================================
  // PROPERTY DATA
  // ==========================================

  const [propertyData, setPropertyData] = useState({
    // BASIC
    propertyName: "",

    // Parent:
    // Residential / Commercial / Rent
    categoryParent: "",

    // Child:
    // Apartment / Plot / Villa etc.
    category: "",

    propertyType: "",

    status: "Active",

    projectSize: "",

    completionStatus: "Under Construction",

    shortDescription: "",

    propertyPrice: "",

    pricePerSqFt: "",

    reraNumber: "",

    highlights: [],

    // LOCATION
    location: "",

    city: "",

    state: "",

    country: "",

    // OVERVIEW
    projectArea: "",
    superBuiltUpArea: "",

    noOfHouseVilla: "",

    totalFloors: "",

    facing: "",

    plotArea: "",

    bedrooms: "",

    bathrooms: "",

    balconies: "",

    parking: "",

    transactionType: "For Sale",

    propertyOverlooking: "",

    maintenancePerMonth: "",

    expectedRentalReturn: "",

    // AMENITIES
    amenities: [],

    // NEARBY
    nearbyPlaces: [],

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

  // ==========================================
  // NEW PROPERTY IMAGES
  // File[]
  // ==========================================

  const [propertyImages, setPropertyImages] = useState([]);

  // ==========================================
  // EXISTING PROPERTY IMAGES
  // String[]
  // ==========================================

  const [existingPropertyImages, setExistingPropertyImages] = useState([]);

  // ==========================================
  // NEW DOCUMENTS
  // File[]
  // ==========================================

  const [documents, setDocuments] = useState([]);

  // ==========================================
  // EXISTING DOCUMENTS
  // Object[]
  // ==========================================

  const [existingDocuments, setExistingDocuments] = useState([]);

  // ==========================================
  // FLOOR PLANS
  // ==========================================

  const [floorPlans, setFloorPlans] = useState([]);

  // ==========================================
  // LOADING
  // ==========================================

  const [loadingProperty, setLoadingProperty] = useState(false);

  const [publishing, setPublishing] = useState(false);

  // ==========================================
  // COMMON UPDATE
  // ==========================================

  const updatePropertyData = (name, value) => {
    setPropertyData((previous) => ({
      ...previous,

      [name]: value,
    }));
  };

  // ==========================================
  // DATE FORMAT
  // ==========================================

  const formatDateForInput = (date) => {
    if (!date) {
      return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toISOString().split("T")[0];
  };

  // ==========================================
  // FETCH PROPERTY FOR EDIT
  // ==========================================

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    const fetchProperty = async () => {
      try {
        setLoadingProperty(true);

       

        const response = await API.get(
          isSellListingMode
            ? `/sell-properties/${id}`
            : `/properties/${id}`,
        );

      

        const property =
          response.data?.property || response.data?.data || response.data;
        const propertyDetails =
          property?.propertyDetails &&
          typeof property.propertyDetails === "object"
            ? property.propertyDetails
            : {};

        if (!property) {
          alert("Property not found");

          return;
        }

        // ======================================
        // SET NORMAL PROPERTY DATA
        // ======================================

        setPropertyData({
          ...propertyDetails,

          propertyName:
            propertyDetails.propertyName ||
            property.name ||
            property.propertyName ||
            property.propertyTitle ||
            "",

          // ====================================
          // PARENT CATEGORY
          // ====================================

          categoryParent:
            propertyDetails.categoryParent ||
            property.categoryParent ||
            (isSellListingMode ? property.category : "") ||
            "",

          // ====================================
          // CHILD CATEGORY
          // ====================================

          category:
            propertyDetails.category ||
            property.propertyCategory ||
            (isSellListingMode ? property.propertyType : property.category) ||
            "",

          propertyType:
            propertyDetails.propertyType ||
            property.type ||
            property.propertyType ||
            "",

          status:
            propertyDetails.status ||
            (isSellListingMode ? "Active" : property.status) ||
            "Active",

          projectSize: propertyDetails.projectSize ?? property.projectSize ?? "",

          completionStatus:
            propertyDetails.completionStatus ||
            property.completionStatus ||
            "Under Construction",

          shortDescription:
            propertyDetails.shortDescription || property.shortDescription || "",

          propertyPrice:
            propertyDetails.propertyPrice ??
            property.price ??
            property.propertyPrice ??
            property.expectedPrice ??
            "",

          pricePerSqFt:
            propertyDetails.pricePerSqFt ??
            property.pricePerSqft ??
            property.pricePerSqFt ??
            "",

          reraNumber:
            propertyDetails.reraNumber ||
            property.rera ||
            property.reraNumber ||
            "",

          highlights: Array.isArray(propertyDetails.highlights)
            ? propertyDetails.highlights
            : Array.isArray(property.highlights)
              ? property.highlights
              : [],

          // LOCATION

          location:
            propertyDetails.location ||
            property.location ||
            (isSellListingMode ? property.locality : "") ||
            "",

          city: propertyDetails.city || property.city || "",

          state: propertyDetails.state || property.state || "",

          country: propertyDetails.country || property.country || "",

          // OVERVIEW

          projectArea:
            propertyDetails.projectArea ||
            property.projectArea ||
            property.totalArea ||
            (isSellListingMode ? property.builtUpArea : "") ||
            "",

          superBuiltUpArea:
            propertyDetails.superBuiltUpArea ??
            property.superBuiltUpArea ??
            "",

          noOfHouseVilla:
            propertyDetails.noOfHouseVilla ??
            property.noOfHouseVilla ??
            property.totalUnits ??
            "",

          totalFloors: propertyDetails.totalFloors ?? property.totalFloors ?? "",

          facing: propertyDetails.facing || property.facing || "",

          plotArea:
            propertyDetails.plotArea ||
            property.plotArea ||
            property.plotSize ||
            "",

          bedrooms:
            propertyDetails.bedrooms ??
            property.bedrooms ??
            (isSellListingMode
              ? String(property.bhk || "").match(/\d+/)?.[0] || ""
              : ""),

          bathrooms: propertyDetails.bathrooms ?? property.bathrooms ?? "",

          balconies: propertyDetails.balconies ?? property.balconies ?? "",

          parking: propertyDetails.parking || property.parking || "",

          transactionType:
            propertyDetails.transactionType ||
            property.transactionType ||
            property.statusType ||
            (isSellListingMode && property.propertyFor === "Rent"
              ? "Rent"
              : isSellListingMode && property.propertyFor === "Lease"
                ? "Lease"
                : "For Sale"),

          propertyOverlooking:
            propertyDetails.propertyOverlooking ||
            property.propertyOverlooking ||
            "",

          maintenancePerMonth:
            propertyDetails.maintenancePerMonth ??
            property.maintenancePerMonth ??
            "",

          expectedRentalReturn:
            propertyDetails.expectedRentalReturn ??
            property.expectedRentalReturn ??
            "",

          // AMENITIES

          amenities: Array.isArray(propertyDetails.amenities)
            ? propertyDetails.amenities
            : Array.isArray(property.amenities)
              ? property.amenities
              : [],

          // NEARBY

          nearbyPlaces: Array.isArray(propertyDetails.nearbyPlaces)
            ? propertyDetails.nearbyPlaces
            : Array.isArray(property.nearbyPlaces)
              ? property.nearbyPlaces
              : [],

          // SEO

          metaTitle: propertyDetails.metaTitle || property.metaTitle || "",

          metaDescription:
            propertyDetails.metaDescription || property.metaDescription || "",

          urlSlug: propertyDetails.urlSlug || property.urlSlug || "",

          // PUBLISH

          publishStatus: propertyDetails.publishStatus ?? property.publishStatus ?? true,

          featuredProperty:
            propertyDetails.featuredProperty ??
            property.featured ??
            property.featuredProperty ??
            false,

          publishDate: formatDateForInput(
            propertyDetails.publishDate || property.publishDate,
          ),

          promoteProperty:
            propertyDetails.promoteProperty ?? property.promoteProperty ?? false,
        });

        // ======================================
        // EXISTING PROPERTY IMAGES
        // ======================================

        let oldImages = [];

        if (Array.isArray(property.propertyImages)) {
          oldImages = property.propertyImages;
        }

        if (
          oldImages.length === 0 &&
          isSellListingMode &&
          Array.isArray(property.images)
        ) {
          oldImages = property.images;
        }

        // Support old image field

        if (oldImages.length === 0 && property.image) {
          oldImages = [property.image];
        }

        setExistingPropertyImages(oldImages);

        // propertyImages contains ONLY
        // newly selected File objects

        setPropertyImages([]);

        // ======================================
        // EXISTING DOCUMENTS
        // ======================================

        setExistingDocuments(
          Array.isArray(property.documents) ? property.documents : [],
        );

        // documents contains only new files

        setDocuments([]);

        // ======================================
        // FLOOR PLANS
        // ======================================

        setFloorPlans(
          Array.isArray(property.floorPlans)
            ? property.floorPlans.map((plan) => ({
                ...plan,

                // Keep existing image
                existingFloorPlanSketch: plan.floorPlanSketch || "",

                // New uploaded File
                floorPlanSketch: null,
              }))
            : [],
        );

      
      } catch (error) {
        console.error("GET PROPERTY ERROR:", error.response?.data || error);

        alert(error.response?.data?.message || "Failed to load property");
      } finally {
        setLoadingProperty(false);
      }
    };

    fetchProperty();
  }, [id, isEditMode, isSellListingMode]);

  // ==========================================
  // PUBLISH / UPDATE
  // ==========================================

  const handlePublish = async () => {
    try {
      // ======================================
      // VALIDATION
      // ======================================

      if (!propertyData.propertyName?.trim()) {
        alert("Property name is required");

        return;
      }

      // ======================================
      // PARENT CATEGORY VALIDATION
      // ======================================

      if (!propertyData.categoryParent?.trim()) {
        alert("Parent category is required");

        return;
      }

      // ======================================
      // CHILD CATEGORY VALIDATION
      // ======================================

      if (!propertyData.category?.trim()) {
        alert("Category is required");

        return;
      }

      if (!propertyData.propertyType) {
        alert("Property type is required");

        return;
      }

      if (!propertyData.location?.trim()) {
        alert("Location is required");

        return;
      }

      if (!propertyData.propertyPrice) {
        alert("Property price is required");

        return;
      }

      setPublishing(true);

      // ======================================
      // CREATE FORMDATA
      // ======================================

      const form = new FormData();

      // ======================================
      // BASIC
      // ======================================

      form.append("name", propertyData.propertyName.trim());

      // ======================================
      // CATEGORY PARENT
      // ======================================

      form.append("categoryParent", propertyData.categoryParent.trim());

      // ======================================
      // CATEGORY
      // ======================================

      form.append("category", propertyData.category.trim());

      form.append("type", propertyData.propertyType);

      form.append("subType", propertyData.propertyType || "");

      form.append("status", propertyData.status || "Active");

      form.append("statusType", propertyData.transactionType || "For Sale");

      form.append("projectSize", propertyData.projectSize || "0");

      form.append(
        "completionStatus",
        propertyData.completionStatus || "Under Construction",
      );

      form.append("shortDescription", propertyData.shortDescription || "");

      form.append("featured", String(propertyData.featuredProperty));

      // ======================================
      // HIGHLIGHTS
      // ======================================

      form.append("highlights", JSON.stringify(propertyData.highlights || []));

      // ======================================
      // PRICE
      // ======================================

      form.append("price", propertyData.propertyPrice);

      form.append("pricePerSqft", propertyData.pricePerSqFt || "0");

      form.append("rera", propertyData.reraNumber || "");

      // ======================================
      // LOCATION
      // ======================================

      form.append("location", propertyData.location.trim());

      form.append("city", propertyData.city || "");

      form.append("state", propertyData.state || "");

      form.append("country", propertyData.country || "");

      // ======================================
      // OVERVIEW
      // ======================================

      form.append("projectArea", propertyData.projectArea || "");

      form.append("superBuiltUpArea", propertyData.superBuiltUpArea || "");

      form.append("noOfHouseVilla", propertyData.noOfHouseVilla || "0");

      form.append("totalFloors", propertyData.totalFloors || "0");

      form.append("facing", propertyData.facing || "");

      form.append("plotArea", propertyData.plotArea || "");

      form.append("bedrooms", propertyData.bedrooms || "0");

      form.append("bathrooms", propertyData.bathrooms || "0");

      form.append("balconies", propertyData.balconies || "");

      form.append("parking", propertyData.parking || "");

      form.append(
        "transactionType",
        propertyData.transactionType || "For Sale",
      );

      form.append(
        "propertyOverlooking",
        propertyData.propertyOverlooking || "",
      );

      form.append(
        "maintenancePerMonth",
        propertyData.maintenancePerMonth || "0",
      );

      form.append(
        "expectedRentalReturn",
        propertyData.expectedRentalReturn || "0",
      );

      // ======================================
      // OLD SCHEMA COMPATIBILITY
      // ======================================

      form.append("totalUnits", propertyData.noOfHouseVilla || "0");

      form.append("totalArea", propertyData.projectArea || "");

      form.append("plotSize", propertyData.plotArea || "");

      // ======================================
      // AMENITIES
      // ======================================

      form.append("amenities", JSON.stringify(propertyData.amenities || []));

      // ======================================
      // NEARBY
      // ======================================

      form.append(
        "nearbyPlaces",
        JSON.stringify(propertyData.nearbyPlaces || []),
      );

      // ======================================
      // FLOOR PLAN DATA
      // ======================================

      const floorPlanData = floorPlans.map((plan) => ({
        _id: plan._id || undefined,

        planTitle: plan.planTitle || "",

        planType: plan.planType || "",

        beds: Number(plan.beds) || 0,

        baths: Number(plan.baths) || 0,

        balconies: Number(plan.balconies) || 0,

        pujaRoom: Number(plan.pujaRoom) || 0,

        servantRoom: Number(plan.servantRoom) || 0,

        storeRoom: Number(plan.storeRoom) || 0,

        sbaSqft: Number(plan.sbaSqft) || 0,

        plotSqft: Number(plan.plotSqft) || 0,

        // KEEP EXISTING IMAGE

        floorPlanSketch:
          plan.existingFloorPlanSketch ||
          (typeof plan.floorPlanSketch === "string"
            ? plan.floorPlanSketch
            : ""),
      }));

      let nextFloorPlanImageIndex = 0;
      floorPlans.forEach((plan, index) => {
        if (plan.floorPlanSketch instanceof File) {
          floorPlanData[index].floorPlanImageIndex =
            nextFloorPlanImageIndex;
          nextFloorPlanImageIndex += 1;
        }
      });

      form.append("floorPlans", JSON.stringify(floorPlanData));

      if (isSellListingMode) {
        form.append("propertyDetails", JSON.stringify(propertyData));
      }

      // ======================================
      // SEO
      // ======================================

      form.append("metaTitle", propertyData.metaTitle || "");

      form.append("metaDescription", propertyData.metaDescription || "");

      form.append("urlSlug", propertyData.urlSlug || "");

      // ======================================
      // PUBLISH
      // ======================================

      form.append("publishStatus", String(propertyData.publishStatus));

      form.append("publishDate", propertyData.publishDate || "");

      form.append("promoteProperty", String(propertyData.promoteProperty));

      // ======================================
      // KEEP OLD PROPERTY IMAGES
      // ======================================

      form.append(
        "existingPropertyImages",
        JSON.stringify(existingPropertyImages),
      );

      // ======================================
      // NEW PROPERTY IMAGES
      // ======================================

      propertyImages.forEach((image) => {
        if (image instanceof File) {
          form.append("propertyImages", image);
        }
      });

      // ======================================
      // KEEP OLD DOCUMENTS
      // ======================================

      form.append("existingDocuments", JSON.stringify(existingDocuments));

      // ======================================
      // NEW DOCUMENTS
      // ======================================

      documents.forEach((document) => {
        if (document instanceof File) {
          form.append("documents", document);
        }
      });

      // ======================================
      // NEW FLOOR PLAN IMAGES
      // ======================================

      floorPlans.forEach((plan) => {
        if (plan.floorPlanSketch instanceof File) {
          form.append("floorPlanImages", plan.floorPlanSketch);
        }
      });

      // ======================================
      // DEBUG
      // ======================================

    

     

      // for (const [key, value] of form.entries()) {
      //   console.log(key, value);
      // }

   

      // ======================================
      // CREATE OR UPDATE API
      // ======================================

      let response;

      if (isSellListingMode) {
        response = await API.put(
          `/sell-properties/${id}/details`,
          form,
        );
      } else if (isEditMode) {
        response = await API.put(`/properties/${id}`, form);
      } else {
        response = await API.post("/properties", form);
      }

   

      alert(
        response.data?.message ||
          (isEditMode
            ? "Property updated successfully"
            : "Property published successfully"),
      );

      localStorage.removeItem("property_draft");

      navigate(isSellListingMode ? "/PropertyListing" : "/properties/all");
    } catch (error) {
     

      console.error(
        isEditMode ? "UPDATE PROPERTY ERROR" : "PUBLISH PROPERTY ERROR",
      );

      console.error(error.response?.data || error);

     

      alert(
        error.response?.data?.message ||
          error.message ||
          (isEditMode
            ? "Failed to update property"
            : "Failed to publish property"),
      );
    } finally {
      setPublishing(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (isEditMode && loadingProperty) {
    return <div className="add-property-page">Loading property...</div>;
  }

  // ==========================================
  // COMPONENT
  // ==========================================

  return (
    <div className="add-property-page">
      {/* LEFT SIDE */}

      <div className="left-section">
        <BasicInformation
          propertyData={propertyData}
          setPropertyData={setPropertyData}
          updatePropertyData={updatePropertyData}
        />

        <LocationDetails
          propertyData={propertyData}
          setPropertyData={setPropertyData}
          updatePropertyData={updatePropertyData}
        />

        <Overview
          propertyData={propertyData}
          setPropertyData={setPropertyData}
          updatePropertyData={updatePropertyData}
        />

        <FetchAmenities
          propertyData={propertyData}
          setPropertyData={setPropertyData}
        />

        <Document
          documents={documents}
          setDocuments={setDocuments}
          existingDocuments={existingDocuments}
          setExistingDocuments={setExistingDocuments}
          floorPlans={floorPlans}
          setFloorPlans={setFloorPlans}
        />

        <NearbyPlaces
          propertyData={propertyData}
          setPropertyData={setPropertyData}
        />
      </div>

      {/* RIGHT SIDE */}

      <div className="right-section">
        <AllProperty
          propertyData={propertyData}
          setPropertyData={setPropertyData}
          propertyImages={propertyImages}
          setPropertyImages={setPropertyImages}
          existingPropertyImages={existingPropertyImages}
          setExistingPropertyImages={setExistingPropertyImages}
          handlePublish={handlePublish}
          publishing={publishing}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );
};

export default AddNewProperty;
