import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { signOut } from "aws-amplify/auth"; // Import Amplify signout handler

// Layout & Authentication Components
import MainLayout from "./Layout/MainLayout/MainLayout";
import LogIn from "./Pages/login/login";

// Dashboard Pages
import DashboardMain from "./Components/DashboardMain/DashboardMain";

<<<<<<< HEAD
// Properties Pages
=======
// Properties
import PropertiesDashboard from "./Components/PropertiesDashboard/PropertiesDashboard";
>>>>>>> 40076c9dd6e9f4f618ed8c6af950dbab8001c392
import AddNewProperty from "./Components/AddNewProperty/AddNewProperty";
import Categories from "./Components/Categories/Categories";
import Locations from "./Components/Locations/Locations";
import PropertiesDashboard from "./Components/PropertiesDashboard/PropertiesDashboard";

// Sidebar & Supplementary Pages
import Bookings from "./Components/Bookings/Bookings";
import LeadManagement from "./Components/LeadManagement/LeadManagement";
import ProfileSetting from "./Components/ProfileSetting/ProfileSetting";

import Report from "./Pages/Dashboard/Report/Report";
import Enquire from "./Pages/Enquire/Enquire";
import User from "./Pages/User/User";
import Setting from "./Pages/Setting/Setting";
<<<<<<< HEAD

const ProtectedRoute = ({ isAuthenticated, onLoginSuccess, children }) => {
  if (!isAuthenticated) {
    return <LogIn onLoginSuccess={onLoginSuccess} />;
  }
  return children;
};
=======
import Testimonial from "./Pages/Testimonial/Testimonial";
import Gallery from "./Pages/Gallery/Gallery";
import OurTeam from "./Pages/OurTeam/OurTeam";
>>>>>>> 40076c9dd6e9f4f618ed8c6af950dbab8001c392

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Modern application logout sequence handler
  const handleLogout = async () => {
    try {
      // Trigger AWS signOut if the current session isn't a mock admin session
      if (user && !user.isMock) {
        await signOut();
      }
    } catch (error) {
      console.error("Error signing out from AWS Cognito:", error);
    } finally {
      // Explicitly clear local workspace access contexts
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD

        {/* Redirect Root */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Main Layout */}
        <Route element={<MainLayout />}>

          {/* Dashboard */}
=======
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

        <Route
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} onLoginSuccess={handleLoginSuccess}>
              {/* Pass the handleLogout method down directly into your Main Layout */}
              <MainLayout user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
>>>>>>> 7952a450abffcc68df661464ef5a854989d0d0f2
          <Route path="/dashboard" element={<DashboardMain />} />
<<<<<<< HEAD
          <Route path="/properties/add" element={<AddNewProperty />} />
          <Route path="/properties/all" element={<PropertiesDashboard />} />
=======

          {/* Properties */}
          <Route path="/properties/all" element={<PropertiesDashboard />} />
          <Route path="/properties/add" element={<AddNewProperty />} />
>>>>>>> 40076c9dd6e9f4f618ed8c6af950dbab8001c392
          <Route path="/properties/categories" element={<Categories />} />
          <Route path="/properties/locations" element={<Locations />} />
          <Route path="/bookings" element={<Bookings />} />
<<<<<<< HEAD

          {/* Lead Management */}
=======
>>>>>>> 7952a450abffcc68df661464ef5a854989d0d0f2
          <Route path="/leads" element={<LeadManagement />} />
          <Route path="/enquiry" element={<Enquire />} />
          <Route path="/users" element={<User />} />
          <Route path="/reports" element={<Report />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/profile" element={<ProfileSetting />} />
<<<<<<< HEAD

          {/* Testimonial */}
          <Route path="/testimonial" element={<Testimonial />} />

          {/* Gallery */}
          <Route path="/gallery" element={<Gallery />} />

          {/* Team */}
=======
<<<<<<< HEAD
=======
>>>>>>> 7952a450abffcc68df661464ef5a854989d0d0f2
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/team" element={<OurTeam />} />

          {/* 404 */}
>>>>>>> 40076c9dd6e9f4f618ed8c6af950dbab8001c392
          <Route path="*" element={<Navigate to="/dashboard" replace />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;