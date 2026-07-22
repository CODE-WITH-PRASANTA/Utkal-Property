import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import PropertyGrid from "./Pages/PropertyGrid/PropertyGrid";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/grid" element={<PropertyGrid/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;