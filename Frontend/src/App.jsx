import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
      {/* Global Loaders & Overlays */}
      <PageLoader />

      {/* Main Header */}
      <Navbar />

      {/* Application Routes */}
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

      {/* Global Footer & Floating Widgets */}
      <Footer />
      <FloatingIcons />
      <FloatingForm />
    </BrowserRouter>
  );
}

export default App;