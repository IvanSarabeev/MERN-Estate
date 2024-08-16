import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Home = lazy(() => import("pages/home/Home"));
const SignIn = lazy(() => import("pages/sign-in/SignIn"));
const SignUp = lazy(() => import("pages/sign-up/SignUp"));
const About = lazy(() => import("pages/about/About"));
const Contact = lazy(() => import("pages/contact/Contact"));
const AuthRequiredRoute = lazy(() => import("./auth/AuthRequiredRoute"));
const Profile = lazy(() => import("pages/Profile"));
const ErrorPage = lazy(() => import("pages/ErrorPage"));
const CreateListing = lazy(() => import("pages/CreateListing"));
const UpdateListing = lazy(() => import("pages/UpdateListing"));
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
import TriangleLoader from "components/__comp/Loaders/TriangleLoader.tsx";
const PropertyDashboard = lazy(
  () => import("./pages/properties/PropertyDashboard")
);
const PropertyPage = lazy(() => import("pages/property/PropertyPage"));
import "cloudinary-video-player/cld-video-player.min.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<TriangleLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/properties" element={<PropertyDashboard />} />
          <Route path="/property/:id" element={<PropertyPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<AuthRequiredRoute />}>
            <Route path="/account" element={<AccountLayout />}>
              {/*TODO: Add the remaining routes:  Products, Analytics */}
              <Route index element={<Dashboard />} />
              <Route path="my-listing" element={<MyListing />} />
              {/* Profile Section */}
              <Route path="profiles" element={<ProfileLayout />}>
                <Route index element={<Settings />} />
                <Route path="profile-account" element={<ProfileAccount />} />
                <Route path="appearance" element={<Appearance />} />
              </Route>
            </Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/update-listing/:id" element={<UpdateListing />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
