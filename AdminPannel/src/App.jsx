import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout
import MainLayout from "./Layout/MainLayout/MainLayout";

// Dashboard
import DashboardMain from "./Components/DashboardMain/DashboardMain";
import DashboardReview from "./Components/DashboardReview/DashboardReview";

// Properties
import AddNewProperty from "./Components/AddNewProperty/AddNewProperty";
import Categories from "./Components/Categories/Categories";
import Locations from "./Components/Locations/Locations";

// Sidebar & Page Components
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
        {/* Default Redirect to Dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Main Layout Wrapper */}
        <Route element={<MainLayout />}>
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardMain />} />
          <Route path="/dashboard-review" element={<DashboardReview />} />

          {/* Property Routes */}
          <Route path="/properties/add" element={<AddNewProperty />} />
          <Route path="/properties/all" element={<PropertiesDashboard />} />

          <Route path="/properties/categories" element={<Categories />} />
          <Route path="/properties/locations" element={<Locations />} />

          {/* Management Routes */}
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/leads" element={<LeadManagement />} />
          <Route path="/LeadManagement" element={<LeadManagement />} /> {/* Alias route */}

          {/* Pages */}
          <Route path="/enquiry" element={<Enquire />} />
          <Route path="/users" element={<User />} />
          <Route path="/reports" element={<Report />} />
          <Route path="/Report" element={<Report />} /> {/* Alias route */}
          <Route path="/settings" element={<Setting />} />
          <Route path="/profile" element={<ProfileSetting />} />
          <Route path="/ProfileSetting" element={<ProfileSetting />} /> {/* Alias route */}
          <Route path="/DashboardProfile" element={<ProfileSetting />} /> {/* Alias route */}
        </Route>

        {/* Global Fallback (Catch-All Route) */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;