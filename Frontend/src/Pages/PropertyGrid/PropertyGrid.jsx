import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";

import GridBreadcrum from "../../Component/GridBreadcrum/GridBreadcrum";
import GridPropertyListing from "../../Component/GridPropertyListing/GridPropertyListing";
import GridContact from "../../Component/GridContact/GridContact";

import "./PropertyGrid.css";

const PropertyGrid = () => {
  /* =========================================================
      URL PARAMETERS
  ========================================================= */
  const [searchParams, setSearchParams] = useSearchParams();

  /* =========================================================
      FILTER STATE
  ========================================================= */
  const [filters, setFilters] = useState({
    tab: searchParams.get("tab") || "buy",
    keyword: searchParams.get("keyword") || "",
    propertyType: searchParams.get("propertyType") || "",
    location: searchParams.get("location") || "",
    area: searchParams.get("area") || "",
    beds: searchParams.get("beds") || "Any",
    baths: searchParams.get("baths") || "Any",
    amenities: searchParams.get("amenities")
      ? searchParams.get("amenities").split(",")
      : [],
  });

  /* =========================================================
      READ URL AGAIN WHEN URL CHANGES
  ========================================================= */
  useEffect(() => {
    const newFilters = {
      tab: searchParams.get("tab") || "buy",
      keyword: searchParams.get("keyword") || "",
      propertyType: searchParams.get("propertyType") || "",
      location: searchParams.get("location") || "",
      area: searchParams.get("area") || "",
      beds: searchParams.get("beds") || "Any",
      baths: searchParams.get("baths") || "Any",
      amenities: searchParams.get("amenities")
        ? searchParams.get("amenities").split(",")
        : [],
    };

    setFilters(newFilters);
  }, [searchParams]);

  /* =========================================================
      FILTER UPDATE
  ========================================================= */
  const handleFilterChange = (newFilters) => {
    const updatedFilters = {
      ...filters,
      ...newFilters,
    };

    setFilters(updatedFilters);

    /* =======================================================
        UPDATE URL
    ======================================================= */
    const params = new URLSearchParams();

    if (updatedFilters.tab) {
      params.set("tab", updatedFilters.tab);
    }
    if (updatedFilters.keyword) {
      params.set("keyword", updatedFilters.keyword);
    }
    if (updatedFilters.propertyType) {
      params.set("propertyType", updatedFilters.propertyType);
    }
    if (updatedFilters.location) {
      params.set("location", updatedFilters.location);
    }
    if (updatedFilters.area) {
      params.set("area", updatedFilters.area);
    }
    if (updatedFilters.beds && updatedFilters.beds !== "Any") {
      params.set("beds", updatedFilters.beds);
    }
    if (updatedFilters.baths && updatedFilters.baths !== "Any") {
      params.set("baths", updatedFilters.baths);
    }
    if (Array.isArray(updatedFilters.amenities) && updatedFilters.amenities.length) {
      params.set("amenities", updatedFilters.amenities.join(","));
    }

    setSearchParams(params);
  };

  /* =========================================================
      SEO SCHEMA
  ========================================================= */
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Utkal Property",
    "description":
      "Best Property Consultant in Bhubaneswar offering verified residential plots, luxury duplexes, apartments, and commercial spaces.",
    "telephone": "+919861566735",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot No-55, Ln 2, Jagannath Vihar, Baramunda",
      "addressLocality": "Bhubaneswar",
      "addressRegion": "Odisha",
      "postalCode": "751003",
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "20.283243122410134",
      "longitude": "85.79244602883566",
    },
    "openingHours": "Mo-Su 09:00-20:00",
    "priceRange": "₹₹ - ₹₹₹₹",
  };

  /* =========================================================
      PAGE
  ========================================================= */
  return (
    <>
      <Helmet>
        <title>
          Properties in Bhubaneswar | Best Property Consultant in Bhubaneswar - Utkal Property
        </title>

        <meta
          name="description"
          content="Explore verified residential plots, flats, duplexes & commercial spaces with Utkal Property — the best property consultant in Bhubaneswar. 100% legal title assurance."
        />

        <meta
          name="keywords"
          content="Best Property Consultant in Bhubaneswar, top real estate agent in Bhubaneswar, buy property in Bhubaneswar, residential plots in Patia, flats for sale in Khandagiri, Utkal Property, commercial space Bhubaneswar"
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://utkalproperty.com/properties"
        />

        {/* OPEN GRAPH */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://utkalproperty.com/properties" />
        <meta
          property="og:title"
          content="Verified Properties for Sale | Best Property Consultant in Bhubaneswar"
        />
        <meta
          property="og:description"
          content="Find prime plots, luxury apartments, and high-ROI commercial properties across Patia, Khandagiri, Pahala, and Jaydev Vihar."
        />
        <meta
          property="og:image"
          content="https://utkalproperty.com/assets/og-properties.webp"
        />

        {/* TWITTER */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Verified Real Estate Listings in Bhubaneswar | Utkal Property"
        />
        <meta
          name="twitter:description"
          content="Connect with the best property consultant in Bhubaneswar to buy, sell, or invest with zero legal risks."
        />
        <meta
          name="twitter:image"
          content="https://utkalproperty.com/assets/og-properties.webp"
        />

        {/* SCHEMA */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <main className="PropertyGrid-main">
        {/* SEO H1 */}
        <h1 className="visually-hidden">
          Verified Real Estate Listings by the Best Property Consultant in Bhubaneswar
        </h1>

        {/* GRID SEARCH */}
        <GridBreadcrum onSearch={handleFilterChange} />

        {/* PROPERTY LIST */}
        <GridPropertyListing filters={filters} />

        {/* CONTACT */}
        <GridContact />
      </main>
    </>
  );
};

export default PropertyGrid;