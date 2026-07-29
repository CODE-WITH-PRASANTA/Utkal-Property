import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'

import Home from "./Pages/Home/Home";
import PropertyGrid from "./Pages/PropertyGrid/PropertyGrid";


import AboutUs from './Pages/AboutUs/AboutUs'
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
import Faq from "./Pages/Faq/Faq";
import Contacts from './Pages/Contacts/Contacts';
import Blog from './Pages/Blog/Blog';
import BlogDetails from './Component/BlogDetails/BlogDetails';
import RealNear from './Component/RealNear/RealNear';
import OurTeam from './Component/OurTeam/OurTeam';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        
      <Route path="/abot" element={<AboutUs/>} />
        <Route path="/" element={<Home/>}/>
        <Route path="/properties" element={<PropertyGrid/>}/>
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/Faq" element={<Faq/>} />
        <Route path="/contact" element={<Contacts/>} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/details" element={<BlogDetails/>} />
        <Route path="/real" element={<RealNear/>} />
        <Route path="/team" element={<OurTeam/>} />


      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;