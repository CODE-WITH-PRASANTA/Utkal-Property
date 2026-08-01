import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { signOut } from "aws-amplify/auth"; // Import Amplify signout handler

// Layout & Authentication Components
import MainLayout from "./Layout/MainLayout/MainLayout";
import LogIn from "./Pages/login/login";

// Dashboard Pages
import DashboardMain from "./Components/DashboardMain/DashboardMain";

// Properties Pages
import PropertiesDashboard from "./Components/PropertiesDashboard/PropertiesDashboard";
import AddNewProperty from "./Components/AddNewProperty/AddNewProperty";
import Categories from "./Components/Categories/Categories";
import Locations from "./Components/Locations/Locations";

// Sidebar & Supplementary Pages
import Bookings from "./Components/Bookings/Bookings";
import LeadManagement from "./Components/LeadManagement/LeadManagement";
import ProfileSetting from "./Components/ProfileSetting/ProfileSetting";

import Report from "./Pages/Dashboard/Report/Report";
import Enquire from "./Pages/Enquire/Enquire";
import User from "./Pages/User/User";
import Setting from "./Pages/Setting/Setting";
import Testimonial from "./Pages/Testimonial/Testimonial";
import Gallery from "./Pages/Gallery/Gallery";
import OurTeam from "./Pages/OurTeam/OurTeam";

// Protected Route Guard
const ProtectedRoute = ({ isAuthenticated, onLoginSuccess, children }) => {
  if (!isAuthenticated) {
    return <LogIn onLoginSuccess={onLoginSuccess} />;
  }
  return children;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Logout sequence handler
  const handleLogout = async () => {
    try {
      if (user && !user.isMock) {
        await signOut();
      }
    } catch (error) {
      console.error("Error signing out from AWS Cognito:", error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Login Route */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LogIn onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        {/* Protected Routes inside MainLayout */}
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              onLoginSuccess={handleLoginSuccess}
            >
              <MainLayout user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardMain />} />

          {/* Properties */}
          <Route path="/properties/all" element={<PropertiesDashboard />} />
          <Route path="/properties/add" element={<AddNewProperty />} />
          <Route path="/properties/categories" element={<Categories />} />
          <Route path="/properties/locations" element={<Locations />} />

          {/* Management & Sidebar */}
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/leads" element={<LeadManagement />} />
          <Route path="/enquiry" element={<Enquire />} />
          <Route path="/users" element={<User />} />
          <Route path="/reports" element={<Report />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/profile" element={<ProfileSetting />} />

          {/* Supplementary Pages */}
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/team" element={<OurTeam />} />

          {/* Fallback Catch-all Route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;