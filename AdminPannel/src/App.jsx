import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardMain from "./Components/DashboardMain/DashboardMain";
import DashboardProfile from "./Components/DashboardProfile/DashboardProfile";
import DashboardReview from "./Components/DashboardReview/DashboardReview";
import MyProperties from "./Components/MyProperties/MyProperties";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
           <Route path="/dashboard" element={<DashboardMain/>} />
           <Route path="/DashboardReview" element={<DashboardReview/>} />
           <Route path="/DashboardProfile" element={<DashboardProfile/>} />
           <Route path="/MyProperties" element={<MyProperties/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;