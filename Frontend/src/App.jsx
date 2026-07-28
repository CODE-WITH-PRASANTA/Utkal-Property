import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import PropertyGrid from "./Pages/PropertyGrid/PropertyGrid";


import './App.css'
import AboutUs from './Pages/AboutUs/AboutUs'
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
import Faq from "./Pages/Faq/Faq";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/grid" element={<PropertyGrid/>}/>
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/Faq" element={<Faq/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;