import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import PropertyGrid from "./Pages/PropertyGrid/PropertyGrid";


import './App.css'
import AboutUs from './Pages/AboutUs/AboutUs'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/grid" element={<PropertyGrid/>}/>
        <Route path="/about" element={<AboutUs/>} />


      </Routes>
    </BrowserRouter>
  )
}

export default App;