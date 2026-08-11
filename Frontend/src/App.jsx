import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import PropertyGrid from "./Pages/PropertyGrid/PropertyGrid";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
import Faq from "./Pages/Faq/Faq";
import Contacts from "./Pages/Contacts/Contacts";
import Blog from "./Pages/Blog/Blog";
import BlogDetails from "./Component/BlogDetails/BlogDetails";
import RealNear from "./Component/RealNear/RealNear";
import OurTeam from "./Component/OurTeam/OurTeam";
import PropertyDetails from "./Pages/PropertyDetails/PropertyDetails";
import SellProperty from "./Component/SellProperty/SellProperty";
import RentProperty from "./Component/RentProperty/RentProperty";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/abot" element={<AboutUs />} />
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<PropertyGrid />} />

        


        <Route path="/property-details" element={<PropertyDetails/>} />
        <Route path="/blogposting" element={<Blog/>} />
        <Route path="/blogmanagement/:id" element={<BlogDetails/>} />
        <Route path="/real" element={<RealNear/>} />
        <Route path="/our-team" element={<OurTeam/>} />
        
        <Route path="/rent-property" element={<RentProperty/>} />
        <Route path="/property-details/:id" element={<PropertyDetails />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/Faq" element={<Faq />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/details/:id" element={<BlogDetails />} />
        <Route path="/real" element={<RealNear />} />
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/sell-property" element={<SellProperty />} />
        <Route path="/rent-property" element={<RentProperty />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
