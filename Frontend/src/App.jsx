import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Layout Components
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";

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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/properties" element={<PropertyGrid />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/sell-property" element={<SellProperty />} />
        <Route path="/rent-property" element={<RentProperty />} />
        <Route path="/near-properties" element={<RealNear />} />
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contacts />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;