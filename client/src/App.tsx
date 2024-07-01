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
import Dashboard from "./pages/Account/Dashboard.tsx";
import ProfileLayout from "components/Layouts/ProfileLayout.tsx";
import Settings from "./pages/Account/Profile/Settings.tsx";
import ProfileAccount from "./pages/Account/Profile/ProfileAccount.tsx";
import Appearance from "./pages/Account/Profile/Appearance.tsx";

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
          <Route path="profiles" element={<ProfileLayout />}>
            <Route index element={<Settings />}/>
            <Route path="profile-account" element={<ProfileAccount />}/>
            <Route path="appearance" element={<Appearance />} />
            {/* Remaining ?Notifications, My Listings */}
          </Route>
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
