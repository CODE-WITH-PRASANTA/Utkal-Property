import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import PropertyGrid from "./Pages/PropertyGrid/PropertyGrid";


import './App.css'
import AboutUs from './Pages/AboutUs/AboutUs'
import Faq from "./Pages/Faq/Faq";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/grid" element={<PropertyGrid/>}/>
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/Faq" element={<Faq/>} />


      </Routes>
    </BrowserRouter>
  )
}

export default App;