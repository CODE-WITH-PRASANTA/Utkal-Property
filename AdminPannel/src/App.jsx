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

// Make sure this path matches your actual file structure
import DashboardReview from "./Components/DashboardReview/DashboardReview"; 

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Main Layout Wrapper */}
        <Route element={<MainLayout />}>
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardMain />} />
          <Route path="/dashboard-review" element={<DashboardReview />} />

          {/* Property Routes */}
          <Route path="/properties/add" element={<AddNewProperty />} />
          <Route path="/properties/categories" element={<Categories />} />
          <Route path="/properties/locations" element={<Locations />} />

          {/* Lead & Booking Management */}
          <Route path="/leads" element={<LeadManagement />} />
          <Route path="/LeadManagement" element={<LeadManagement />} /> {/* Alias if needed */}
          <Route path="/bookings" element={<Bookings />} />

          {/* Profile & Reports */}
          <Route path="/reports" element={<Report />} />
          <Route path="/Report" element={<Report />} /> {/* Alias if needed */}
          <Route path="/ProfileSetting" element={<ProfileSetting />} />
          <Route path="/DashboardProfile" element={<ProfileSetting />} /> {/* Alias if needed */}
        </Route>

        {/* Fallback Catch-All Route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;