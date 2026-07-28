import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardMain from "./Components/DashboardMain/DashboardMain";
import DashboardProfile from "./Components/DashboardProfile/DashboardProfile";
import DashboardReview from "./Components/DashboardReview/DashboardReview";
import MyProperties from "./Components/MyProperties/MyProperties";
import AddNewProperty from "./Components/AddNewProperty/AddNewProperty";
import PropertiesDashboard from "./Components/PropertiesDashboard/PropertiesDashboard";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
           <Route path="/dashboard" element={<DashboardMain/>} />
           <Route path="/DashboardReview" element={<DashboardReview/>} />
           <Route path="/DashboardProfile" element={<DashboardProfile/>} />
           <Route path="/MyProperties" element={<MyProperties/>} />
           <Route path="/NewProperties" element={<AddNewProperty/>} />
           <Route path="/properties" element={<PropertiesDashboard/>} />




      </Routes>
    </BrowserRouter>
  );
};

export default App;