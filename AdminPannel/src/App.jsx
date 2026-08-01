import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { signOut } from "aws-amplify/auth";

// Layout & Authentication
import MainLayout from "./Layout/MainLayout/MainLayout";
import LogIn from "./Pages/login/login";

// Dashboard
import DashboardMain from "./Components/DashboardMain/DashboardMain";

// Properties
import PropertiesDashboard from "./Components/PropertiesDashboard/PropertiesDashboard";
import AddNewProperty from "./Components/AddNewProperty/AddNewProperty";
import Categories from "./Components/Categories/Categories";
import Locations from "./Components/Locations/Locations";

// Other Components
import Bookings from "./Components/Bookings/Bookings";
import LeadManagement from "./Components/LeadManagement/LeadManagement";
import ProfileSetting from "./Components/ProfileSetting/ProfileSetting";

// Pages
import Report from "./Pages/Dashboard/Report/Report";
import Enquire from "./Pages/Enquire/Enquire";
import User from "./Pages/User/User";
import Setting from "./Pages/Setting/Setting";
import Testimonial from "./Pages/Testimonial/Testimonial";
import Gallery from "./Pages/Gallery/Gallery";
import OurTeam from "./Pages/OurTeam/OurTeam";
import BlogManagement from "./Components/BlogManagement/BlogManagement";
import BlogPosting from "./Components/BlogPosting/BlogPosting";

// Protected Route Component
const ProtectedRoute = ({
  isAuthenticated,
  onLoginSuccess,
  children,
}) => {
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

  const handleLogout = async () => {
    try {
      if (user && !user.isMock) {
        await signOut();
      }
    } catch (error) {
      console.error("AWS SignOut Error:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
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

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              onLoginSuccess={handleLoginSuccess}
            >
              <MainLayout
                user={user}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />
          <Route
            path="/dashboard"
            element={<DashboardMain />}
          />

          {/* Properties */}
          <Route
            path="/properties/all"
            element={<PropertiesDashboard />}
          />
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

          {/* Bookings */}
          <Route
            path="/bookings"
            element={<Bookings />}
          />

          {/* Leads */}
          <Route
            path="/leads"
            element={<LeadManagement />}
          />

          {/* Enquiry */}
          <Route
            path="/enquiry"
            element={<Enquire />}
          />

          {/* Users */}
          <Route
            path="/users"
            element={<User />}
          />

          {/* Reports */}
          <Route
            path="/reports"
            element={<Report />}
          />

          {/* Settings */}
          <Route
            path="/settings"
            element={<Setting />}
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={<ProfileSetting />}
          />

          {/* Testimonial */}
          <Route
            path="/testimonial"
            element={<Testimonial />}
          />

          {/* Gallery */}
          <Route
            path="/gallery"
            element={<Gallery />}
          />

          {/* Team */}
          <Route
            path="/team"
            element={<OurTeam />}
          />

          {/* 404 */}
          <Route
            path="*"
            element={<Navigate to="/dashboard" replace />}
          />
        </Route>
         <Route
            path="/blogmanagement"
            element={<BlogManagement/>}
          />
         <Route
            path="/blogposting"
            element={<BlogPosting/>}
          />

      </Routes>
    </BrowserRouter>
  );
};

export default App;