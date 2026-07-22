import { useState } from 'react'

import './App.css'
import AboutUs from './Pages/AboutUs/AboutUs'

function App() {
  const [count, setCount] = useState(0)

  return (
 <BrowserRouter>
      <Routes>
        
      <Route path="/" element={<AboutUs/>} />


      </Routes>
    </BrowserRouter>
  )
}

export default App
