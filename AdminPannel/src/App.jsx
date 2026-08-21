import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  signOut,
  getCurrentUser,
} from "aws-amplify/auth";

// =====================================================
// LAYOUT
// =====================================================

import MainLayout from "./Layout/MainLayout/MainLayout";

// =====================================================
// AUTHENTICATION
// =====================================================

import LogIn from "./Pages/login/LogIn";

// =====================================================
// DASHBOARD
// =====================================================

import DashboardMain from "./Components/DashboardMain/DashboardMain";

// =====================================================
// PROPERTIES
// =====================================================

import PropertiesDashboard from "./Components/PropertiesDashboard/PropertiesDashboard";
import AddNewProperty from "./Pages/AddNewProperty/AddNewProperty";
import Categories from "./Components/Categories/Categories";
import Locations from "./Components/Locations/Locations";
import NearbyPlaces from "./Components/NearbyPlaces/NearbyPlaces";
import Amenities from "./Components/Amenities/Amenities";
import AdminPropertyReviews from "./Components/AdminPropertyReviews/AdminPropertyReviews";

// =====================================================
// BLOGS
// =====================================================

import BlogPosting from "./Components/BlogPosting/BlogPosting";
import BlogManagement from "./Components/BlogManagement/BlogManagement";

// =====================================================
// OTHER COMPONENTS
// =====================================================

import Bookings from "./Components/Bookings/Bookings";
import LeadManagement from "./Components/LeadManagement/LeadManagement";
import ProfileSetting from "./Components/ProfileSetting/ProfileSetting";

// =====================================================
// PAGES
// =====================================================

import Enquire from "./Pages/Enquire/Enquire";
import User from "./Pages/User/User";
import Report from "./Pages/Dashboard/Report/Report";
import Setting from "./Pages/Setting/Setting";
import Testimonial from "./Pages/Testimonial/Testimonial";
import Gallery from "./Pages/Gallery/Gallery";
import OurTeam from "./Pages/OurTeam/OurTeam";


// =====================================================
// PROTECTED ROUTE
// =====================================================

function ProtectedRoute({
  isAuthenticated,
  isCheckingAuth,
  children,
}) {
  // Check authentication
  if (isCheckingAuth) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        Loading...
      </div>
    );
  }

  // Redirect unauthenticated users
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


// =====================================================
// APP
// =====================================================

function App() {
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const [isCheckingAuth, setIsCheckingAuth] =
    useState(true);

  const [user, setUser] = useState(null);


  // ===================================================
  // CHECK AUTHENTICATION
  // ===================================================

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // -----------------------------------------------
        // Check local session first
        // -----------------------------------------------

        const storedUser =
          localStorage.getItem(
            "utkal_user_session"
          );

        if (storedUser) {
          const parsed = JSON.parse(storedUser);

          setUser(parsed);
          setIsAuthenticated(true);
          setIsCheckingAuth(false);

          return;
        }


        // -----------------------------------------------
        // Check AWS Amplify authentication
        // -----------------------------------------------

        const currentUser =
          await getCurrentUser();

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
        console.log(
          "Authentication check failed:",
          error
        );

        setUser(null);
        setIsAuthenticated(false);

        localStorage.removeItem(
          "utkal_user_session"
        );
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);


  // ===================================================
  // LOGIN SUCCESS
  // ===================================================

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);

    localStorage.setItem(
      "utkal_user_session",
      JSON.stringify(userData)
    );
  };


  // ===================================================
  // LOGOUT
  // ===================================================

  const handleLogout = async () => {
    try {
      if (user && !user.isMock) {
        await signOut();
      }
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );
    }

    localStorage.removeItem(
      "utkal_user_session"
    );

    setUser(null);
    setIsAuthenticated(false);
  };


  // ===================================================
  // ROUTES
  // ===================================================

  return (
    <BrowserRouter>

      <Routes>

        {/* =================================================
            LOGIN
        ================================================= */}

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate
                to="/dashboard"
                replace
              />
            ) : (
              <LogIn
                onLoginSuccess={
                  handleLoginSuccess
                }
              />
            )
          }
        />


        {/* =================================================
            PROTECTED ROUTES
        ================================================= */}

        <Route
          element={
            <ProtectedRoute
              isAuthenticated={
                isAuthenticated
              }
              isCheckingAuth={
                isCheckingAuth
              }
            >
              <MainLayout
                user={user}
                onLogout={
                  handleLogout
                }
              />
            </ProtectedRoute>
          }
        >

          {/* =================================================
              DEFAULT
          ================================================= */}

          <Route
            path="/"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />


          {/* =================================================
              DASHBOARD
          ================================================= */}

          <Route
            path="/dashboard"
            element={
              <DashboardMain />
            }
          />


          {/* =================================================
              PROPERTIES
          ================================================= */}

          <Route
            path="/properties/all"
            element={
              <PropertiesDashboard />
            }
          />

          <Route
            path="/properties/add"
            element={
              <AddNewProperty />
            }
          />

          <Route
            path="/properties/edit/:id"
            element={
              <AddNewProperty />
            }
          />

          <Route
            path="/properties/categories"
            element={
              <Categories />
            }
          />

          <Route
            path="/properties/locations"
            element={
              <Locations />
            }
          />

          <Route
            path="/properties/nearby"
            element={
              <NearbyPlaces />
            }
          />

          <Route
            path="/properties/amenities"
            element={
              <Amenities />
            }
          />

          <Route
            path="/properties/review"
            element={
              <AdminPropertyReviews />
            }
          />


          {/* =================================================
              BLOGS
          ================================================= */}

          <Route
            path="/blogposting"
            element={
              <BlogPosting />
            }
          />

          <Route
            path="/blogmanagement"
            element={
              <BlogManagement />
            }
          />


          {/* =================================================
              BOOKINGS
          ================================================= */}

          <Route
            path="/bookings"
            element={
              <Bookings />
            }
          />


          {/* =================================================
              LEADS
          ================================================= */}

          <Route
            path="/leads"
            element={
              <LeadManagement />
            }
          />


          {/* =================================================
              ENQUIRY
          ================================================= */}

          <Route
            path="/enquiry"
            element={
              <Enquire />
            }
          />


          {/* =================================================
              USERS
          ================================================= */}

          <Route
            path="/users"
            element={
              <User />
            }
          />


          {/* =================================================
              REPORTS
          ================================================= */}

          <Route
            path="/reports"
            element={
              <Report />
            }
          />


          {/* =================================================
              SETTINGS
          ================================================= */}

          <Route
            path="/settings"
            element={
              <Setting />
            }
          />


          {/* =================================================
              PROFILE
          ================================================= */}

          <Route
            path="/profile"
            element={
              <ProfileSetting />
            }
          />


          {/* =================================================
              TESTIMONIAL
          ================================================= */}

          <Route
            path="/testimonial"
            element={
              <Testimonial />
            }
          />


          {/* =================================================
              GALLERY
          ================================================= */}

          <Route
            path="/gallery"
            element={
              <Gallery />
            }
          />


          {/* =================================================
              TEAM
          ================================================= */}

          <Route
            path="/team"
            element={
              <OurTeam />
            }
          />


          {/* =================================================
              404
          ================================================= */}

          <Route
            path="*"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;