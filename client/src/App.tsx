import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AuthRequiredRoute from "./auth/AuthRequiredRoute";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import SearchPage from "./pages/SearchPage";
import Property from "./pages/Property";
import AccountLayout from "components/Layouts/AccountLayout.tsx";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/listing/:id" element={<Property />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/*TODO: Add Middleware to protected routes*/}
        <Route path="/account" element={<AccountLayout />}>
          {/*TODO: Add the remaining routes: Your Listings, Products, Analytics */}
          <Route index element={<Dashboard />} />
          {/*  TODO: Create Custom ErrorPage for account*/}
        </Route>
        <Route element={<AuthRequiredRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/update-listing/:id" element={<UpdateListing />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
