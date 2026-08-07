import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { signOut, getCurrentUser } from "aws-amplify/auth";

// Layout
import MainLayout from "./Layout/MainLayout/MainLayout";

// Authentication
import LogIn from "./Pages/login/LogIn";

// Dashboard
import DashboardMain from "./Components/DashboardMain/DashboardMain";

// Properties
import PropertiesDashboard from "./Components/PropertiesDashboard/PropertiesDashboard";
import AddNewProperty from "./Pages/AddNewProperty/AddNewProperty";
import Categories from "./Components/Categories/Categories";
import Locations from "./Components/Locations/Locations";
import NearbyPlaces from "./Components/NearbyPlaces/NearbyPlaces";

// Blogs
import BlogPosting from "./Components/BlogPosting/BlogPosting";
import BlogManagement from "./Components/BlogManagement/BlogManagement";

// Other Components
import Bookings from "./Components/Bookings/Bookings";
import LeadManagement from "./Components/LeadManagement/LeadManagement";
import ProfileSetting from "./Components/ProfileSetting/ProfileSetting";

// Pages
import Enquire from "./Pages/Enquire/Enquire";
import User from "./Pages/User/User";
import Report from "./Pages/Dashboard/Report/Report";
import Setting from "./Pages/Setting/Setting";
import Testimonial from "./Pages/Testimonial/Testimonial";
import Gallery from "./Pages/Gallery/Gallery";
import OurTeam from "./Pages/OurTeam/OurTeam";

function ProtectedRoute({
  isAuthenticated,
  isCheckingAuth,
  children,
}) {
  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("utkal_user_session");

        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
          setIsAuthenticated(true);
          setIsCheckingAuth(false);
          return;
        }

        const currentUser = await getCurrentUser();

        if (currentUser) {
          const sessionUser = {
            username: currentUser.username,
            userId: currentUser.userId,
            isMock: false,
          };

          setUser(sessionUser);
          setIsAuthenticated(true);

          localStorage.setItem(
            "utkal_user_session",
            JSON.stringify(sessionUser)
          );
        }
      } catch (error) {
        console.log(error);

        setUser(null);
        setIsAuthenticated(false);

        localStorage.removeItem("utkal_user_session");
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);

    localStorage.setItem(
      "utkal_user_session",
      JSON.stringify(userData)
    );
  };

  const handleLogout = async () => {
    try {
      if (user && !user.isMock) {
        await signOut();
      }
    } catch (error) {
      console.error(error);
    }

    localStorage.removeItem("utkal_user_session");

    setUser(null);
    setIsAuthenticated(false);
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
              isCheckingAuth={isCheckingAuth}
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
            path="/properties/edit/:id"
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

          <Route
            path="/properties/Nearby"
            element={<NearbyPlaces />}
          />

          {/* Blogs */}

          <Route
            path="/blogposting"
            element={<BlogPosting />}
          />

          <Route
            path="/blogmanagement"
            element={<BlogManagement />}
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;