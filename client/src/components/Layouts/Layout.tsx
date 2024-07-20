import React from "react";
import Header from "components/Navigation/Header";
import Footer from "components/Footer.tsx";
import { Toaster } from "../ui/toaster";
// import CookieReminder from "components/__comp/CookieReminder";
// import useToggle from "hooks/useToggle";

type LayoutProp = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProp) => {
  // const [show, setShow] = useToggle();

  // const handleCookie = () => {
  //   setShow();
  // };

  return (
    <>
      <Header />
      <main className="relative h-fit lg:min-h-screen w-full overflow-x-hidden">
        {children}
        {/* {show ? <></> : <CookieReminder handleCookie={handleCookie} />} */}
        <Toaster />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
