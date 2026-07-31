import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";

// Dashboard
import DashboardMain from "./Components/DashboardMain/DashboardMain";

// Properties
import AddNewProperty from "./Components/AddNewProperty/AddNewProperty";
import Categories from "./Components/Categories/Categories";
import Locations from "./Components/Locations/Locations";

// Sidebar Pages
import Bookings from "./Components/Bookings/Bookings";
import LeadManagement from "./Components/LeadManagement/LeadManagement";
import ProfileSetting from "./Components/ProfileSetting/ProfileSetting";
import Report from "./Pages/Dashboard/Report/Report";
import Enquire from "./Pages/Enquire/Enquire";
import User from "./Pages/User/User";
import Setting from "./Pages/Setting/Setting";
import PropertiesDashboard from "./Components/PropertiesDashboard/PropertiesDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect Home */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Main Layout */}
        <Route element={<MainLayout />}>
          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardMain />} />

          {/* Properties */}
          <Route path="/properties/add" element={<AddNewProperty />} />
          <Route path="/properties/all" element={<PropertiesDashboard />} />

          <Route path="/properties/categories" element={<Categories />} />
          <Route path="/properties/locations" element={<Locations />} />

          {/* Bookings */}
          <Route path="/bookings" element={<Bookings />} />

          {/* Leads */}
          <Route path="/leads" element={<LeadManagement />} />

          {/* Enquiry */}
          <Route path="/enquiry" element={<Enquire />} />

          {/* Users */}
          <Route path="/users" element={<User />} />

          {/* Reports */}
          <Route path="/reports" element={<Report />} />

          {/* Settings */}
          <Route path="/settings" element={<Setting />} />

          {/* Profile */}
          <Route path="/profile" element={<ProfileSetting />} />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;