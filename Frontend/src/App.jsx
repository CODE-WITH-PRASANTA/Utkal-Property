import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

// =====================================================
// GLOBAL COMPONENTS
// =====================================================

import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
import PageLoader from "./Component/PageLoader/PageLoader";
import FloatingIcons from "./Component/FloatingIcons/FloatingIcons";
import FloatingForm from "./Component/FloatingForm/FloatingForm";

// =====================================================
// PAGES
// =====================================================

import Home from "./Pages/Home/Home";
import AboutUs from "./Pages/AboutUs/AboutUs";
import PropertyGrid from "./Pages/PropertyGrid/PropertyGrid";
import PropertyDetails from "./Pages/PropertyDetails/PropertyDetails";

import Blog from "./Pages/Blog/Blog";
import Faq from "./Pages/Faq/Faq";
import Contacts from "./Pages/Contacts/Contacts";

// =====================================================
// PROPERTY COMPONENTS
// =====================================================

import SellProperty from "./Component/SellProperty/SellProperty";
import RentProperty from "./Component/RentProperty/RentProperty";
import RealNear from "./Component/RealNear/RealNear";

// =====================================================
// OTHER COMPONENTS
// =====================================================

import OurTeam from "./Component/OurTeam/OurTeam";
import BlogDetails from "./Component/BlogDetails/BlogDetails";


// =====================================================
// APP
// =====================================================

function App() {
  return (
    <BrowserRouter>

      {/* =================================================
          GLOBAL LOADER
      ================================================= */}

      <PageLoader />


      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar />


      {/* =================================================
          ROUTES
      ================================================= */}

      <Routes>

        {/* =================================================
            HOME
        ================================================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* =================================================
            ABOUT
        ================================================= */}

        <Route
          path="/about"
          element={<AboutUs />}
        />

        {/* Old URL redirect */}
        <Route
          path="/abot"
          element={
            <Navigate
              to="/about"
              replace
            />
          }
        />


        {/* =================================================
            PROPERTIES
        ================================================= */}

        <Route
          path="/properties"
          element={<PropertyGrid />}
        />

        <Route
          path="/property-details"
          element={<PropertyDetails />}
        />

        <Route
          path="/property-details/:id"
          element={<PropertyDetails />}
        />


        {/* =================================================
            SELL PROPERTY
        ================================================= */}

        <Route
          path="/sell-property"
          element={<SellProperty />}
        />


        {/* =================================================
            RENT PROPERTY
        ================================================= */}

        <Route
          path="/rent-property"
          element={<RentProperty />}
        />


        {/* =================================================
            NEAR PROPERTIES
        ================================================= */}

        <Route
          path="/near-properties"
          element={<RealNear />}
        />

        <Route
          path="/real"
          element={<RealNear />}
        />


        {/* =================================================
            BLOG
        ================================================= */}

        <Route
          path="/blog"
          element={<Blog />}
        />

        <Route
          path="/blogposting"
          element={
            <Navigate
              to="/blog"
              replace
            />
          }
        />

        <Route
          path="/blog/:id"
          element={<BlogDetails />}
        />

        <Route
          path="/blog-details/:id"
          element={<BlogDetails />}
        />


        {/* =================================================
            TEAM
        ================================================= */}

        <Route
          path="/our-team"
          element={<OurTeam />}
        />


        {/* =================================================
            FAQ
        ================================================= */}

        <Route
          path="/faq"
          element={<Faq />}
        />


        {/* =================================================
            CONTACT
        ================================================= */}

        <Route
          path="/contact"
          element={<Contacts />}
        />


        {/* =================================================
            404 / FALLBACK
        ================================================= */}

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


      {/* =================================================
          GLOBAL FOOTER
      ================================================= */}

      <Footer />


      {/* =================================================
          FLOATING ICONS
      ================================================= */}

      <FloatingIcons />


      {/* =================================================
          FLOATING ENQUIRY FORM
      ================================================= */}

      <FloatingForm />

    </BrowserRouter>
  );
}


export default App;