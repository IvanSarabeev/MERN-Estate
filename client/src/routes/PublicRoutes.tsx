import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import TriangleLoader from "components/__comp/Loaders/TriangleLoader";

const Home = lazy(() => import("pages/home/Home"));
const About = lazy(() => import("pages/about/About"));
const Contact = lazy(() => import("pages/contact/Contact"));
const PropertyDashboard = lazy(
  () => import("pages/properties/PropertyDashboard")
);
const PropertyPage = lazy(() => import("pages/property/PropertyPage"));
const SignIn = lazy(() => import("pages/sign-in/SignIn"));
const SignUp = lazy(() => import("pages/sign-up/SignUp"));
const ErrorPage = lazy(() => import("pages/ErrorPage"));

const PublicRoutes: React.FC = () => {
  return (
    <Suspense fallback={<TriangleLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/properties" element={<PropertyDashboard />} />
        <Route path="/property/:id" element={<PropertyPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
};

export default PublicRoutes;
