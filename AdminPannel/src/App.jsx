import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";



import DashboardMain from "./Components/DashboardMain/DashboardMain";
import DashboardProfile from "./Components/DashboardProfile/DashboardProfile";
import DashboardReview from "./Components/DashboardReview/DashboardReview";
import MyProperties from "./Components/MyProperties/MyProperties";
import MainLayout from "./Layout/MainLayout/MainLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect Home */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Layout */}
        <Route element={<MainLayout />}>

          <Route path="/dashboard" element={<DashboardMain />} />

          <Route
            path="/dashboard-review"
            element={<DashboardReview />}
          />

          <Route
            path="/dashboard-profile"
            element={<DashboardProfile />}
          />

          <Route
            path="/my-properties"
            element={<MyProperties />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;