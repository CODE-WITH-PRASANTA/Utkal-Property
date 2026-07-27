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

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        
      <Route path="/abot" element={<AboutUs/>} />
        <Route path="/" element={<Home/>}/>
        <Route path="/property" element={<PropertyGrid/>}/>
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/Faq" element={<Faq/>} />
        <Route path="/contact" element={<Contacts/>} />


        <Route path="/blog" element={<Blog/>} />


      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;