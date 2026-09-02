import React, { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import "./App.css";

// Eager load critical above-the-fold layout & Home
import Navbar from "./Component/Navbar/Navbar";
import PageLoader from "./Component/PageLoader/PageLoader";
import Home from "./Pages/Home/Home";

// Lazy-load widgets and secondary pages
const Footer = lazy(() => import("./Component/Footer/Footer"));
const FloatingIcons = lazy(() => import("./Component/FloatingIcons/FloatingIcons"));
const FloatingForm = lazy(() => import("./Component/FloatingForm/FloatingForm"));

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

function RouteHelper() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    requestAnimationFrame(() => {
      let canonicalLink = document.querySelector("link[rel='canonical']");
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      const cleanPath = location.pathname === "/" ? "" : location.pathname;
      canonicalLink.setAttribute("href", `https://utkalproperty.com${cleanPath}`);
    });
  }, [location]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <RouteHelper />
      <PageLoader />
      <Navbar />

      {/* Main Page Content */}
      <Suspense fallback={<div style={{ minHeight: "70vh", backgroundColor: "#ffffff" }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/abot" element={<Navigate to="/about" replace />} />
          <Route path="/properties" element={<PropertyGrid />} />
          <Route path="/property-details" element={<PropertyDetails />} />
          <Route path="/property-details/:id" element={<PropertyDetails />} />
          <Route path="/sell-property" element={<SellProperty />} />
          <Route path="/rent-property" element={<RentProperty />} />
          <Route path="/near-properties" element={<RealNear />} />
          <Route path="/real" element={<RealNear />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogposting" element={<Navigate to="/blog" replace />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/blog-details/:id" element={<BlogDetails />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

      {/* Deferred Utilities */}
      <Suspense fallback={null}>
        <Footer />
        <FloatingIcons />
        <FloatingForm />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;