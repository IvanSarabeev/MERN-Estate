import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import OnboardingRoutes from "./OnboardingRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import TriangleLoader from "components/__comp/Loaders/TriangleLoader";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<TriangleLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/*" element={<PublicRoutes />} />
          {/* Onboarding Routes */}
          <Route path="/onboarding/*" element={<OnboardingRoutes />} />
          {/* Protected / Auth Routes */}
          <Route path="/account/*" element={<ProtectedRoutes />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
