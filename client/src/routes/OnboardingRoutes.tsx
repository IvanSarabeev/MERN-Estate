import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import TriangleLoader from "components/__comp/Loaders/TriangleLoader";
const MemoOnboarding = lazy(() => import("pages/enroll/Onboarding"));

const OnboardingRoutes: React.FC = () => {
  return (
    <Suspense fallback={<TriangleLoader />}>
      <Routes>
        <Route path="/" element={<MemoOnboarding />} />
      </Routes>
    </Suspense>
  );
};

export default OnboardingRoutes;
