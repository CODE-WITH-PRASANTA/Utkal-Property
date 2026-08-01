import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { signOut } from "aws-amplify/auth";

// Layout & Authentication
import MainLayout from "./Layout/MainLayout/MainLayout";
import LogIn from "./Pages/login/login";

// Dashboard
import DashboardMain from "./Components/DashboardMain/DashboardMain";
import DashboardReview from "./Components/DashboardReview/DashboardReview";

// Properties
import PropertiesDashboard from "./Components/PropertiesDashboard/PropertiesDashboard";
import AddNewProperty from "./Components/AddNewProperty/AddNewProperty";
import Categories from "./Components/Categories/Categories";
import Locations from "./Components/Locations/Locations";

// Other Components & Pages
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
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
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
        {/* Public / Auth Route */}
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

        {/* Protected Dashboard Routes Wrapped in MainLayout */}
        <Route
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        >
          {/* Index Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Core Dashboard */}
          <Route path="/dashboard" element={<DashboardMain />} />
          <Route path="/dashboard-review" element={<DashboardReview />} />

          {/* Properties */}
          <Route path="/properties/all" element={<PropertiesDashboard />} />
          <Route path="/properties/add" element={<AddNewProperty />} />
          <Route path="/properties/categories" element={<Categories />} />
          <Route path="/properties/locations" element={<Locations />} />

          {/* Management & Operations */}
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/leads" element={<LeadManagement />} />
          <Route path="/LeadManagement" element={<LeadManagement />} /> {/* Alias */}

          {/* General Pages */}
          <Route path="/enquiry" element={<Enquire />} />
          <Route path="/users" element={<User />} />
          <Route path="/reports" element={<Report />} />
          <Route path="/Report" element={<Report />} /> {/* Alias */}
          <Route path="/settings" element={<Setting />} />
          
          {/* Profiles */}
          <Route path="/profile" element={<ProfileSetting />} />
          <Route path="/ProfileSetting" element={<ProfileSetting />} /> {/* Alias */}
          <Route path="/DashboardProfile" element={<ProfileSetting />} /> {/* Alias */}

          {/* Additional Content */}
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/team" element={<OurTeam />} />
        </Route>

        {/* Global Fallback Catch-All Route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;