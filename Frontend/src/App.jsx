import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
// LAZY LOADED ROUTE COMPONENTS
// =====================================================
const Home = lazy(() => import("./Pages/Home/Home"));
const AboutUs = lazy(() => import("./Pages/AboutUs/AboutUs"));
const PropertyGrid = lazy(() => import("./Pages/PropertyGrid/PropertyGrid"));
const PropertyDetails = lazy(() => import("./Pages/PropertyDetails/PropertyDetails"));
const SellProperty = lazy(() => import("./Component/SellProperty/SellProperty"));
const RentProperty = lazy(() => import("./Component/RentProperty/RentProperty"));
const RealNear = lazy(() => import("./Component/RealNear/RealNear"));
const OurTeam = lazy(() => import("./Component/OurTeam/OurTeam"));
const Blog = lazy(() => import("./Pages/Blog/Blog"));
const BlogDetails = lazy(() => import("./Component/BlogDetails/BlogDetails"));
const Faq = lazy(() => import("./Pages/Faq/Faq"));
const Contacts = lazy(() => import("./Pages/Contacts/Contacts"));

// =====================================================
// ROUTE CHANGE HELPERS (SEO Canonical & Scroll Restoration)
// =====================================================
function RouteHelper() {
  const location = useLocation();

  useEffect(() => {
    // 1. Scroll window to top smoothly on route navigation
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // 2. Manage single Canonical tag dynamically
    let canonicalLink = document.querySelector("link[rel='canonical']");

    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }

    const cleanPath = location.pathname === "/" ? "" : location.pathname;
    canonicalLink.setAttribute("href", `https://utkalproperty.com${cleanPath}`);
  }, [location]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      {/* Route-level SEO & scroll sync */}
      <RouteHelper />

      {/* Global Loaders & Overlays */}
      <PageLoader />

      {/* Main Header */}
      <Navbar />

      {/* Application Routes */}
      <Suspense fallback={<div style={{ minHeight: "85vh", backgroundColor: "#ffffff" }} />}>
        <Routes>
          {/* Core Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/abot" element={<Navigate to="/about" replace />} />

          {/* Properties */}
          <Route path="/properties" element={<PropertyGrid />} />
          <Route path="/property-details" element={<PropertyDetails />} />
          <Route path="/property-details/:id" element={<PropertyDetails />} />
          <Route path="/sell-property" element={<SellProperty />} />
          <Route path="/rent-property" element={<RentProperty />} />
          <Route path="/near-properties" element={<RealNear />} />
          <Route path="/real" element={<RealNear />} />

          {/* Blog & Content */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogposting" element={<Navigate to="/blog" replace />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/blog-details/:id" element={<BlogDetails />} />

          {/* Company & Support */}
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contacts />} />

          {/* Fallback 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

      {/* Global Footer & Floating Widgets */}
      <Footer />
      <FloatingIcons />
      <FloatingForm />
    </BrowserRouter>
  );
}

export default App;