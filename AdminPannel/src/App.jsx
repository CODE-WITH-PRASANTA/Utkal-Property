import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";

// Existing Pages
import DashboardMain from "./Components/DashboardMain/DashboardMain";

import Categories from "./Components/Categories/Categories";
import Locations from "./Components/Locations/Locations";
import LeadManagement from "./Components/LeadManagement/LeadManagement";
import ProfileSetting from "./Components/ProfileSetting/ProfileSetting";
import Report from "./Pages/Dashboard/Report/Report";
import AddNewProperty from "./Components/AddNewProperty/AddNewProperty";
import Bookings from "./Components/Bookings/Bookings";


// Sidebar Path Pages



const App = () => {

  return (
    <BrowserRouter>

      <Routes>

        {/* Default */}
        <Route 
          path="/" 
          element={<Navigate to="/dashboard" replace />} 
        />


        {/* Layout */}
        <Route element={<MainLayout />}>

          {/* Dashboard */}
          <Route 
            path="/dashboard" 
            element={<DashboardMain />} 
          />


          {/* Properties */}
          <Route 
            path="/properties/add" 
            element={<AddNewProperty />} 
          />

          
          <Route 
            path="/properties/categories" 
            element={<Categories />} 
          />

          <Route 
            path="/properties/locations" 
            element={<Locations />} 
          />


          {/* Sidebar Pages */}
         

         
          <Route 
            path="/leads" 
            element={<LeadManagement />} 
          />

          

          <Route 
            path="/reports" 
            element={<Report />} 
          />

          <Route 
            path="/DashboardProfile" 
            element={<ProfileSetting />} 
          />

          <Route path="/bookings" element={<Bookings />} />


        </Route>

      </Routes>

    </BrowserRouter>
  );
};


export default App;