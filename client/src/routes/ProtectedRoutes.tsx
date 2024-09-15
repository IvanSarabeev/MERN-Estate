import React, { lazy, Suspense, memo } from "react";
import TriangleLoader from "components/__comp/Loaders/TriangleLoader";
import { Route, Routes, useLocation } from "react-router-dom";

const AuthRequiredRoute = lazy(() => import("auth/AuthRequiredRoute"));
const AccountLayout = lazy(
  () => import("components/Layouts/AccountLayout.tsx")
);
const Dashboard = lazy(() => import("pages/Account/Dashboard.tsx"));
const ProfileLayout = lazy(
  () => import("components/Layouts/ProfileLayout.tsx")
);
const Settings = lazy(() => import("pages/Account/Profile/Settings.tsx"));
const ProfileAccount = lazy(
  () => import("pages/Account/Profile/ProfileAccount.tsx")
);
const Appearance = lazy(() => import("pages/Account/Profile/Appearance.tsx"));
const MyListing = lazy(() => import("pages/Account/MyListing.tsx"));

const ProtectedRoutes: React.FC = memo(() => {
  const location = useLocation();
  console.log("Current location:", location.pathname);
  return (
    <Suspense fallback={<TriangleLoader />}>
      <Routes>
        <Route element={<AuthRequiredRoute />}>
          <Route path="/" element={<AccountLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="my-listing" element={<MyListing />} />
            {/* Profile Section */}
            <Route path="profiles" element={<ProfileLayout />}>
              <Route index element={<Settings />} />
              <Route path="profile-account" element={<ProfileAccount />} />
              <Route path="appearance" element={<Appearance />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
});

export default ProtectedRoutes;
