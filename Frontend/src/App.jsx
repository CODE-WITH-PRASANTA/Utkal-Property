import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Layout & Global Components
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
import PageLoader from "./Component/PageLoader/PageLoader";
import FloatingIcons from "./Component/FloatingIcons/FloatingIcons";
import FloatingForm from "./Component/FloatingForm/FloatingForm";

// Page Components
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
      {/* Global Page Loader */}
      <PageLoader />

      <Navbar />

      <Routes>
        {/* Core Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/abot" element={<AboutUs />} /> {/* Fallback alias */}
        
        {/* Properties */}
        <Route path="/properties" element={<PropertyGrid />} />
        <Route path="/property-details/:id" element={<PropertyDetails />} />
        <Route path="/sell-property" element={<SellProperty />} />
        <Route path="/rent-property" element={<RentProperty />} />
        <Route path="/near-properties" element={<RealNear />} />
        <Route path="/real" element={<RealNear />} />

        {/* Company & Support */}
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contacts />} />

        {/* Blog & Content */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
      </Routes>

      <Footer />
      <FloatingIcons />
      <FloatingForm />
    </BrowserRouter>
  );
}

export default App;