import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import AboutUs from './Pages/AboutUs/AboutUs'

function App() {
  const [count, setCount] = useState(0)

  return (
 <BrowserRouter>
      <Routes>
        
      <Route path="/abot" element={<AboutUs/>} />


      </Routes>
    </BrowserRouter>
  )
}

export default App
