import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { signOut, getCurrentUser } from "aws-amplify/auth";

// Layout & Authentication
import MainLayout from "./Layout/MainLayout/MainLayout";
import LogIn from "./Pages/login/LogIn";

// Dashboard Components
import DashboardMain from "./Components/DashboardMain/DashboardMain";
import DashboardReview from "./Components/DashboardReview/DashboardReview";

// Properties Components
import PropertiesDashboard from "./Components/PropertiesDashboard/PropertiesDashboard";

import Categories from "./Components/Categories/Categories";
import Locations from "./Components/Locations/Locations";

// Management & Other Components
import Bookings from "./Components/Bookings/Bookings";
import LeadManagement from "./Components/LeadManagement/LeadManagement";
import ProfileSetting from "./Components/ProfileSetting/ProfileSetting";
import BlogManagement from "./Components/BlogManagement/BlogManagement";
import BlogPosting from "./Components/BlogPosting/BlogPosting";

// Pages
import Report from "./Pages/Dashboard/Report/Report";
import Enquire from "./Pages/Enquire/Enquire";
import User from "./Pages/User/User";
import Setting from "./Pages/Setting/Setting";
import Testimonial from "./Pages/Testimonial/Testimonial";
import Gallery from "./Pages/Gallery/Gallery";
import OurTeam from "./Pages/OurTeam/OurTeam";
import AddNewProperty from "./Pages/AddNewProperty/AddNewProperty";
import Amenities from "./Components/Amenities/Amenities";

// Protected Route Component
const ProtectedRoute = ({ isAuthenticated, onLoginSuccess, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check and restore existing session on reload
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // 1. Check local storage for mock/persisted session
        const storedUser = localStorage.getItem("utkal_user_session");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
          setIsCheckingAuth(false);
          return;
        }

        // 2. Check AWS Cognito auth session if active
        const currentUser = await getCurrentUser();
        if (currentUser) {
          const sessionUser = {
            username: currentUser.username,
            userId: currentUser.userId,
            isMock: false,
          };
          setUser(sessionUser);
          setIsAuthenticated(true);
          localStorage.setItem("utkal_user_session", JSON.stringify(sessionUser));
        }
      } catch (err) {
        // No active session found
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("utkal_user_session");
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("utkal_user_session", JSON.stringify(userData));
  };

  // Explicit logout handler
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
      localStorage.removeItem("utkal_user_session");
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

        {/* Protected Admin Routes Wrapped inside MainLayout */}
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              isCheckingAuth={isCheckingAuth}
            >
              <MainLayout user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardMain />} />
  
          {/* Properties */}
          <Route path="/properties/all" element={<PropertiesDashboard />} />
          <Route path="/properties/add" element={<AddNewProperty />} />

          <Route path="/properties/edit/:id" element={<AddNewProperty />} />

          <Route path="/properties/categories" element={<Categories />} />
          
          <Route path="/properties/locations" element={<Locations />} />

          <Route path="/properties/Amenities" element={<Amenities />} />


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

          {/* Testimonial */}
          <Route path="/testimonial" element={<Testimonial />} />

          {/* Gallery */}
          <Route path="/gallery" element={<Gallery />} />

          {/* Team */}
          <Route path="/team" element={<OurTeam />} />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
