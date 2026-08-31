import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

// =====================================================
// LAYOUT & GLOBAL COMPONENTS
// =====================================================

import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
import PageLoader from "./Component/PageLoader/PageLoader";
import FloatingIcons from "./Component/FloatingIcons/FloatingIcons";
import FloatingForm from "./Component/FloatingForm/FloatingForm";

// =====================================================
// PAGES & COMPONENTS
// =====================================================

import Home from "./Pages/Home/Home";
import AboutUs from "./Pages/AboutUs/AboutUs";

import PropertyGrid from "./Pages/PropertyGrid/PropertyGrid";
import PropertyDetails from "./Pages/PropertyDetails/PropertyDetails";

import SellProperty from "./Component/SellProperty/SellProperty";
import RentProperty from "./Component/RentProperty/RentProperty";
import RealNear from "./Component/RealNear/RealNear";
import OurTeam from "./Component/OurTeam/OurTeam";

import Blog from "./Pages/Blog/Blog";
import BlogDetails from "./Component/BlogDetails/BlogDetails";

import Faq from "./Pages/Faq/Faq";
import Contacts from "./Pages/Contacts/Contacts";


function App() {

  return (

    <BrowserRouter>

      {/* =====================================================
          GLOBAL PAGE LOADER
      ===================================================== */}

      <PageLoader />


      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar />


      {/* =====================================================
          APPLICATION ROUTES
      ===================================================== */}

      <Routes>


        {/* ===================================================
            HOME
        =================================================== */}

        <Route
          path="/"
          element={
            <Home />
          }
        />


        {/* ===================================================
            ABOUT
        =================================================== */}

        <Route
          path="/about"
          element={
            <AboutUs />
          }
        />


        {/* OLD / WRONG ABOUT URL
            Redirect to correct URL
        */}

        <Route
          path="/abot"
          element={
            <Navigate
              to="/about"
              replace
            />
          }
        />


        {/* ===================================================
            PROPERTY GRID
        =================================================== */}

        <Route
          path="/properties"
          element={
            <PropertyGrid />
          }
        />


        {/* ===================================================
            PROPERTY DETAILS
        =================================================== */}

        {/*
          IMPORTANT:

          This route receives the property ID.

          Example:

          /property-details/68abc123

          PropertyDetails.jsx gets the ID using:

          const { id } = useParams();

          and calls:

          API.get(`/properties/${id}`)
        */}

        <Route
          path="/property-details/:id"
          element={
            <PropertyDetails />
          }
        />


        {/* ===================================================
            OLD PROPERTY DETAILS URL

            Kept for backward compatibility.
        =================================================== */}

        <Route
          path="/property-details"
          element={
            <PropertyDetails />
          }
        />


        {/* ===================================================
            SELL PROPERTY
        =================================================== */}

        <Route
          path="/sell-property"
          element={
            <SellProperty />
          }
        />


        {/* ===================================================
            RENT PROPERTY
        =================================================== */}

        <Route
          path="/rent-property"
          element={
            <RentProperty />
          }
        />


        {/* ===================================================
            NEAR PROPERTIES
        =================================================== */}

        <Route
          path="/near-properties"
          element={
            <RealNear />
          }
        />


        {/* OLD /real URL */}

        <Route
          path="/real"
          element={
            <RealNear />
          }
        />


        {/* ===================================================
            BLOG
        =================================================== */}

        <Route
          path="/blog"
          element={
            <Blog />
          }
        />


        {/* OLD BLOG POSTING URL */}

        <Route
          path="/blogposting"
          element={
            <Navigate
              to="/blog"
              replace
            />
          }
        />


        {/* ===================================================
            BLOG DETAILS
        =================================================== */}

        <Route
          path="/blog/:id"
          element={
            <BlogDetails />
          }
        />


        <Route
          path="/blog-details/:id"
          element={
            <BlogDetails />
          }
        />


        {/* ===================================================
            OUR TEAM
        =================================================== */}

        <Route
          path="/our-team"
          element={
            <OurTeam />
          }
        />


        {/* ===================================================
            FAQ
        =================================================== */}

        <Route
          path="/faq"
          element={
            <Faq />
          }
        />


        {/* ===================================================
            CONTACT
        =================================================== */}

        <Route
          path="/contact"
          element={
            <Contacts />
          }
        />


        {/* ===================================================
            404 FALLBACK
        =================================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>


      {/* =====================================================
          GLOBAL FOOTER
      ===================================================== */}

      <Footer />


      {/* =====================================================
          FLOATING COMPONENTS
      ===================================================== */}

      <FloatingIcons />

      <FloatingForm />

    </BrowserRouter>

  );

}


export default App;